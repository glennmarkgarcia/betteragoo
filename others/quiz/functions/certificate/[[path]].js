export async function onRequest(context) {
  const { request, env } = context;
  const url = new URL(request.url);

  // Fetch static asset
  const response = await env.ASSETS.fetch(request);
  if (!response.ok) {
    return response;
  }

  const html = await response.text();
  const params = url.searchParams;

  // Extract user parameters
  const rawName = params.get('name') || 'Valiant Civic Hero';
  const name = sanitizeText(rawName);
  const rank = sanitizeText(params.get('rank') || '1');
  const score = Math.min(Math.max(Number(params.get('score') || '10'), 0), 10);
  const percent = Math.round((score / 10) * 100);

  let division = sanitizeText(params.get('division') || 'Eagle Master');
  if (score >= 9 && !division.toLowerCase().includes('eagle')) division = 'Eagle Master Division';
  else if (score >= 8 && !division.toLowerCase().includes('basilica')) division = 'Basilica Scholar Division';
  else if (score >= 6 && !division.toLowerCase().includes('dinengdeng')) division = 'Dinengdeng Explorer Division';

  const dynamicOgImage = `https://quiz.betteragoo.org/api/og/certificate?name=${encodeURIComponent(name)}&rank=${encodeURIComponent(rank)}&score=${encodeURIComponent(score)}&division=${encodeURIComponent(division)}`;

  const ogTitle = `${name} — Rank #${rank} (${division})`;
  const ogDesc = `Official Diploma of Honor conferred in the 10 Civic Trials of Agoo, La Union! Score: ${score}/10 (${percent}%).`;

  // Dynamically replace Open Graph meta tags for Facebook / Twitter / Social Web Crawlers
  let modifiedHtml = html
    .replace(/<meta property="og:title" content="[^"]*">/i, `<meta property="og:title" content="${escapeAttr(ogTitle)}">`)
    .replace(/<meta property="og:description" content="[^"]*">/i, `<meta property="og:description" content="${escapeAttr(ogDesc)}">`)
    .replace(/<meta property="og:image" content="[^"]*">/i, `<meta property="og:image" content="${dynamicOgImage}">`);

  return new Response(modifiedHtml, {
    headers: {
      'content-type': 'text/html; charset=utf-8',
      'cache-control': 'public, max-age=60',
    },
  });
}

function sanitizeText(str) {
  return String(str || '').trim().replace(/[<>"'&]/g, '');
}

function escapeAttr(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
