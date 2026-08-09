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

export async function onRequestGet(context) {
  try {
    const { env, request } = context;
    const cors = getCorsHeaders(request);

    // Rate Limiting: Max 30 requests per 60s per IP
    if (env.QUIZ_SESSIONS) {
      const ip = request.headers.get('CF-Connecting-IP') || '127.0.0.1';
      const rateLimitKey = `ratelimit:leaderboard:${ip}`;
      const windowSeconds = 60;
      const maxRequests = 30;
      const currentCount = parseInt((await env.QUIZ_SESSIONS.get(rateLimitKey)) || '0', 10);

      if (currentCount >= maxRequests) {
        return new Response(
          JSON.stringify({ success: false, error: 'Too many leaderboard requests. Please wait.' }),
          { status: 429, headers: { ...cors, 'Retry-After': String(windowSeconds) } }
        );
      }
      await env.QUIZ_SESSIONS.put(rateLimitKey, String(currentCount + 1), { expirationTtl: windowSeconds });
    }

    const url = new URL(request.url);
    const limit = Math.min(Math.max(parseInt(url.searchParams.get('limit') || '100', 10), 1), 100);

    if (!env.DB) {
      return new Response(
        JSON.stringify({ success: false, error: 'D1 Database binding (DB) not found.' }),
        { status: 500, headers: cors }
      );
    }

    const { results } = await env.DB.prepare(`
      SELECT player_name, gender, high_score, total_items, percentage, time_taken_seconds, division_name, updated_at
      FROM quiz_sessions
      ORDER BY high_score DESC, time_taken_seconds ASC
      LIMIT ?
    `).bind(limit).all();

    return new Response(
      JSON.stringify({ success: true, count: results.length, leaderboard: results }),
      { status: 200, headers: cors }
    );
  } catch (err) {
    console.error('[leaderboard] Unhandled error:', err.message, err.stack);
    return new Response(
      JSON.stringify({ success: false, error: 'An internal error occurred. Please try again later.' }),
      { status: 500, headers: getCorsHeaders(context.request) }
    );
  }
}
