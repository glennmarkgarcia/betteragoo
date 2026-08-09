const ALLOWED_ORIGINS = [
  'https://quiz.betteragoo.org',
  'https://www.quiz.betteragoo.org',
  'https://betteragoo.org',
  'https://www.betteragoo.org',
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

    // Rate Limiting: Max 10 session starts per 60s per IP
    if (env.QUIZ_SESSIONS) {
      const ip = request.headers.get('CF-Connecting-IP') || '127.0.0.1';
      const rateLimitKey = `ratelimit:start:${ip}`;
      const windowSeconds = 60;
      const maxRequests = 10;
      const currentCount = parseInt((await env.QUIZ_SESSIONS.get(rateLimitKey)) || '0', 10);

      if (currentCount >= maxRequests) {
        return new Response(
          JSON.stringify({ success: false, error: 'Too many session start requests. Please wait before starting another quiz.' }),
          { status: 429, headers: { ...cors, 'Retry-After': String(windowSeconds) } }
        );
      }
      await env.QUIZ_SESSIONS.put(rateLimitKey, String(currentCount + 1), { expirationTtl: windowSeconds });
    }

    if (!env.DB) {
      return new Response(
        JSON.stringify({ success: false, error: 'D1 Database binding (DB) not found.' }),
        { status: 500, headers: cors }
      );
    }

    const { results } = await env.DB.prepare(
      `SELECT id, category, question_text, option_a, option_b, option_c, option_d, correct_option, explanation, difficulty FROM questions ORDER BY RANDOM() LIMIT 10`
    ).all();

    if (!results || results.length === 0) {
      return new Response(
        JSON.stringify({ success: false, error: 'No questions available.' }),
        { status: 500, headers: cors }
      );
    }

    const sessionId = crypto.randomUUID();
    const correctAnswers = {};
    const safeQuestions = results.map(q => {
      correctAnswers[String(q.id)] = q.correct_option;
      return q;
    });

    if (env.QUIZ_SESSIONS) {
      await env.QUIZ_SESSIONS.put(
        `session:${sessionId}`,
        JSON.stringify({ correctAnswers, createdAt: Date.now() }),
        { expirationTtl: 1800 } // 30 minutes TTL
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        sessionId,
        count: safeQuestions.length,
        questions: safeQuestions,
      }),
      { status: 200, headers: cors }
    );
  } catch (err) {
    console.error('[session/start] Unhandled error:', err.message, err.stack);
    return new Response(
      JSON.stringify({ success: false, error: 'An internal error occurred. Please try again later.' }),
      { status: 500, headers: getCorsHeaders(context.request) }
    );
  }
}
