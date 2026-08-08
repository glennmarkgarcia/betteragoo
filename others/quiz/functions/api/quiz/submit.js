export async function onRequestPost(context) {
  try {
    const { env, request } = context;
    const body = await request.json();

    const email = body.email ? body.email.trim().toLowerCase() : '';
    const name = (body.name || body.player_name || '').trim().replace(/\s+/g, ' ');
    const gender = body.gender || 'Prefer not to say';
    const dob = body.dob || '2000-01-01';
    const score = body.score !== undefined ? Number(body.score) : undefined;
    const time_taken_seconds = body.time_taken_seconds !== undefined ? Number(body.time_taken_seconds) : (body.time !== undefined ? Number(body.time) : undefined);

    if (!email || !name || score === undefined || time_taken_seconds === undefined) {
      return new Response(
        JSON.stringify({ success: false, error: 'Missing required parameters (email, name, score, time_taken_seconds).' }),
        { status: 400, headers: { 'content-type': 'application/json' } }
      );
    }

    const totalItems = 10;
    const percentage = Math.round((score / totalItems) * 100 * 10) / 10;

    // Calculate Division Name based on potential rank / score
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
        JSON.stringify({ error: 'D1 Database binding (DB) not found.' }),
        { status: 500, headers: { 'content-type': 'application/json' } }
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
    `).bind(email.toLowerCase().trim(), name.trim(), gender || 'Prefer not to say', dob || '2000-01-01', score, percentage, time_taken_seconds, divisionName);

    await upsertStmt.run();

    // Query exact current rank on Leaderboard
    const { results: rankResults } = await env.DB.prepare(`
      SELECT COUNT(*) + 1 as rank FROM quiz_sessions
      WHERE high_score > (SELECT high_score FROM quiz_sessions WHERE email = ?1)
         OR (high_score = (SELECT high_score FROM quiz_sessions WHERE email = ?1) AND time_taken_seconds < (SELECT time_taken_seconds FROM quiz_sessions WHERE email = ?1))
    `).bind(email.toLowerCase().trim()).all();

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
      {
        headers: {
          'content-type': 'application/json; charset=utf-8',
          'access-control-allow-origin': '*',
        },
      }
    );
  } catch (err) {
    return new Response(JSON.stringify({ success: false, error: err.message }), {
      status: 500,
      headers: { 'content-type': 'application/json' },
    });
  }
}
