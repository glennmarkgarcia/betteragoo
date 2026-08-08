export async function onRequestGet(context) {
  try {
    const { env } = context;
    const url = new URL(context.request.url);
    const limit = parseInt(url.searchParams.get('limit') || '100', 10);

    if (!env.DB) {
      return new Response(
        JSON.stringify({ error: 'D1 Database binding (DB) not found.' }),
        { status: 500, headers: { 'content-type': 'application/json' } }
      );
    }

    const { results } = await env.DB.prepare(`
      SELECT player_name, gender, high_score, total_items, percentage, time_taken_seconds, division_name, updated_at
      FROM quiz_sessions
      ORDER BY high_score DESC, time_taken_seconds ASC
      LIMIT ?
    `).bind(limit).all();

    return new Response(JSON.stringify({ success: true, count: results.length, leaderboard: results }), {
      headers: {
        'content-type': 'application/json; charset=utf-8',
        'access-control-allow-origin': '*',
      },
    });
  } catch (err) {
    return new Response(JSON.stringify({ success: false, error: err.message }), {
      status: 500,
      headers: { 'content-type': 'application/json' },
    });
  }
}
