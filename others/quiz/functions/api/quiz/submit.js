const ALLOWED_ORIGINS = [
  'https://quiz.betteragoo.org',
  'https://betteragoo.org',
  'http://localhost:3000',
  'http://localhost:8788',
  'http://127.0.0.1:8788',
];

function getCorsHeaders(request) {
  const origin = request.headers.get('Origin') || '';
  const allowed = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    'content-type': 'application/json; charset=utf-8',
    'access-control-allow-origin': allowed,
    'access-control-allow-methods': 'GET, POST, OPTIONS',
    'access-control-allow-headers': 'Content-Type',
    'Vary': 'Origin',
  };
}

export async function onRequestOptions(context) {
  return new Response(null, { status: 204, headers: getCorsHeaders(context.request) });
}

export async function onRequestPost(context) {
  try {
    const { env, request } = context;
    const cors = getCorsHeaders(request);

    // Rate Limiting: Max 1 submission per 60s per IP
    if (env.QUIZ_SESSIONS) {
      const ip = request.headers.get('CF-Connecting-IP') || '127.0.0.1';
      const rateLimitKey = `ratelimit:submit:${ip}`;
      const windowSeconds = 60;
      const maxRequests = 1;
      const currentCount = parseInt((await env.QUIZ_SESSIONS.get(rateLimitKey)) || '0', 10);

      if (currentCount >= maxRequests) {
        return new Response(
          JSON.stringify({ success: false, error: 'Too many submissions. Please wait 60 seconds before submitting another trial.' }),
          { status: 429, headers: { ...cors, 'Retry-After': String(windowSeconds) } }
        );
      }
      await env.QUIZ_SESSIONS.put(rateLimitKey, String(currentCount + 1), { expirationTtl: windowSeconds });
    }

    const body = await request.json();

    // 1. Email Sanitization & Validation
    const emailRaw = body.email ? body.email.trim().toLowerCase() : '';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRaw || emailRaw.length > 254 || !emailRegex.test(emailRaw)) {
      return new Response(
        JSON.stringify({ success: false, error: 'A valid email address is required.' }),
        { status: 400, headers: cors }
      );
    }

    // 2. Name Sanitization & Validation (Strip HTML unsafe chars & cap length at 80)
    const rawName = (body.name || body.player_name || '').trim();
    const cleanName = rawName
      .replace(/\s+/g, ' ')
      .replace(/[<>"'&]/g, '')
      .slice(0, 80);

    if (!cleanName || cleanName.length < 2) {
      return new Response(
        JSON.stringify({ success: false, error: 'Name must be at least 2 characters long.' }),
        { status: 400, headers: cors }
      );
    }

    // 3. Gender & DOB Validation
    const validGenders = ['Male', 'Female', 'Prefer not to say'];
    const gender = validGenders.includes(body.gender) ? body.gender : 'Prefer not to say';
    
    const dobRegex = /^\d{4}-\d{2}-\d{2}$/;
    const dob = body.dob && dobRegex.test(body.dob) ? body.dob : '2000-01-01';

    // 4. Time Validation (Must be between 30 seconds and 3600 seconds)
    const time_taken_seconds = body.time_taken_seconds !== undefined
      ? Number(body.time_taken_seconds)
      : (body.time !== undefined ? Number(body.time) : undefined);

    if (
      time_taken_seconds === undefined ||
      isNaN(time_taken_seconds) ||
      time_taken_seconds < 30 ||
      time_taken_seconds > 3600
    ) {
      return new Response(
        JSON.stringify({ success: false, error: 'Invalid submission time. Trials require at least 30 seconds to complete.' }),
        { status: 400, headers: cors }
      );
    }

    // 5. Server-Side Score Verification via Session Token
    let score = 0;
    const sessionId = body.sessionId;
    const userAnswers = body.answers || {};

    if (sessionId && env.QUIZ_SESSIONS) {
      const sessionRaw = await env.QUIZ_SESSIONS.get(`session:${sessionId}`);
      if (!sessionRaw) {
        return new Response(
          JSON.stringify({ success: false, error: 'Invalid or expired quiz session. Please start a new trial.' }),
          { status: 401, headers: cors }
        );
      }

      // Delete session immediately to enforce single-use token
      await env.QUIZ_SESSIONS.delete(`session:${sessionId}`);

      const sessionData = JSON.parse(sessionRaw);
      const correctAnswers = sessionData.correctAnswers || {};

      // Calculate score server-side against verified answer key
      for (const [qId, userChoice] of Object.entries(userAnswers)) {
        if (correctAnswers[qId] && correctAnswers[qId] === userChoice) {
          score++;
        }
      }
    } else if (body.score !== undefined) {
      // Fallback for offline / legacy score calculation with strict boundary check
      score = Math.min(Math.max(Number(body.score) || 0, 0), 10);
    } else {
      return new Response(
        JSON.stringify({ success: false, error: 'Session token or trial answers are required.' }),
        { status: 400, headers: cors }
      );
    }

    const totalItems = 10;
    const percentage = Math.round((score / totalItems) * 100 * 10) / 10;

    // Calculate Division Name based on score
    let divisionName = 'Agoho Trailblazer (#76-100)';
    if (score >= 9) {
      divisionName = 'Eagle Master (#1-25)';
    } else if (score >= 8) {
      divisionName = 'Basilica Scholar (#26-50)';
    } else if (score >= 6) {
      divisionName = 'Dinengdeng Explorer (#51-75)';
    }

    if (!env.DB) {
      return new Response(
        JSON.stringify({ success: false, error: 'D1 Database binding (DB) not found.' }),
        { status: 500, headers: cors }
      );
    }

    // Execute UPSERT logic in D1
    const upsertStmt = env.DB.prepare(`
      INSERT INTO quiz_sessions (
        email, player_name, gender, dob, high_score, total_items, percentage, time_taken_seconds, division_name, attempts_count, updated_at
      ) VALUES (
        ?1, ?2, ?3, ?4, ?5, 10, ?6, ?7, ?8, 1, CURRENT_TIMESTAMP
      ) ON CONFLICT(email) DO UPDATE SET
        player_name = ?2,
        gender = ?3,
        dob = ?4,
        attempts_count = quiz_sessions.attempts_count + 1,
        updated_at = CURRENT_TIMESTAMP,
        high_score = CASE 
          WHEN ?5 > quiz_sessions.high_score THEN ?5
          WHEN ?5 = quiz_sessions.high_score AND ?7 < quiz_sessions.time_taken_seconds THEN ?5
          ELSE quiz_sessions.high_score
        END,
        time_taken_seconds = CASE 
          WHEN ?5 > quiz_sessions.high_score THEN ?7
          WHEN ?5 = quiz_sessions.high_score AND ?7 < quiz_sessions.time_taken_seconds THEN ?7
          ELSE quiz_sessions.time_taken_seconds
        END,
        percentage = CASE 
          WHEN ?5 > quiz_sessions.high_score THEN ?6
          WHEN ?5 = quiz_sessions.high_score AND ?7 < quiz_sessions.time_taken_seconds THEN ?6
          ELSE quiz_sessions.percentage
        END,
        division_name = CASE 
          WHEN ?5 > quiz_sessions.high_score THEN ?8
          WHEN ?5 = quiz_sessions.high_score AND ?7 < quiz_sessions.time_taken_seconds THEN ?8
          ELSE quiz_sessions.division_name
        END;
    `).bind(emailRaw, cleanName, gender, dob, score, percentage, time_taken_seconds, divisionName);

    await upsertStmt.run();

    // Query exact current rank on Leaderboard
    const { results: rankResults } = await env.DB.prepare(`
      SELECT COUNT(*) + 1 as rank FROM quiz_sessions
      WHERE high_score > (SELECT high_score FROM quiz_sessions WHERE email = ?1)
         OR (high_score = (SELECT high_score FROM quiz_sessions WHERE email = ?1) AND time_taken_seconds < (SELECT time_taken_seconds FROM quiz_sessions WHERE email = ?1))
    `).bind(emailRaw).all();

    const rank = rankResults && rankResults[0] ? rankResults[0].rank : 1;
    const isTop100 = rank <= 100;

    return new Response(
      JSON.stringify({
        success: true,
        rank,
        isTop100,
        score,
        percentage,
        divisionName,
        message: isTop100
          ? `Outstanding! You placed #${rank} in the ${divisionName}!`
          : `Great effort! You placed #${rank} overall. You're ${rank - 100} spots away from the Top 100!`,
      }),
      { status: 200, headers: cors }
    );
  } catch (err) {
    console.error('[submit] Unhandled error:', err.message, err.stack);
    return new Response(
      JSON.stringify({ success: false, error: 'An internal error occurred. Please try again later.' }),
      { status: 500, headers: getCorsHeaders(context.request) }
    );
  }
}
