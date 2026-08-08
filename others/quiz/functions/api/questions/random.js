export async function onRequestGet(context) {
  try {
    const { env } = context;
    const url = new URL(context.request.url);
    const count = parseInt(url.searchParams.get('count') || '10', 10);
    const limit = Math.min(Math.max(count, 1), 20);

    // Query D1 for randomized questions
    if (!env.DB) {
      return new Response(
        JSON.stringify({ error: 'D1 Database binding (DB) not found.' }),
        { status: 500, headers: { 'content-type': 'application/json' } }
      );
    }

    const { results } = await env.DB.prepare(
      `SELECT id, category, question_text, option_a, option_b, option_c, option_d, correct_option, explanation, difficulty FROM questions ORDER BY RANDOM() LIMIT ?`
    ).bind(limit).all();

    return new Response(JSON.stringify({ success: true, count: results.length, questions: results }), {
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
