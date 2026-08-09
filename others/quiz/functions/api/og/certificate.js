export async function onRequest(context) {
  const { request } = context;
  const url = new URL(request.url);
  const params = url.searchParams;

  const name = sanitizeText(params.get('name') || 'Valiant Civic Hero');
  const rank = sanitizeText(params.get('rank') || '1');
  const score = Math.min(Math.max(Number(params.get('score') || '10'), 0), 10);
  const percent = Math.round((score / 10) * 100);
  const division = sanitizeText(params.get('division') || 'Eagle Master');
  const date = sanitizeText(params.get('date') || 'August 2026');

  let badgeColor = '#f5d061';
  const divLower = division.toLowerCase();
  if (divLower.includes('basilica') || score === 8) {
    badgeColor = '#60a5fa';
  } else if (divLower.includes('dinengdeng') || divLower.includes('explorer') || (score >= 6 && score <= 7)) {
    badgeColor = '#4ade80';
  } else if (score < 6) {
    badgeColor = '#f97316';
  }

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
    <defs>
      <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#090a0f"/>
        <stop offset="50%" stop-color="#12151f"/>
        <stop offset="100%" stop-color="#171b26"/>
      </linearGradient>
      <linearGradient id="gold" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#f5d061"/>
        <stop offset="50%" stop-color="#d4af37"/>
        <stop offset="100%" stop-color="#99751e"/>
      </linearGradient>
      <filter id="glow">
        <feGaussianBlur stdDeviation="4" result="blur"/>
        <feComposite in="SourceGraphic" in2="blur" operator="over"/>
      </filter>
    </defs>

    <!-- Outer Frame & Background -->
    <rect width="1200" height="630" fill="url(#bg)"/>
    <rect x="20" y="20" width="1160" height="590" rx="16" fill="none" stroke="url(#gold)" stroke-width="4" opacity="0.85"/>
    <rect x="32" y="32" width="1136" height="566" rx="12" fill="none" stroke="#d4af37" stroke-width="1.5" stroke-dasharray="8 4" opacity="0.5"/>

    <!-- Corner Ornaments -->
    <text x="45" y="65" fill="#f5d061" font-size="28" opacity="0.7">❖</text>
    <text x="1135" y="65" fill="#f5d061" font-size="28" opacity="0.7">❖</text>
    <text x="45" y="585" fill="#f5d061" font-size="28" opacity="0.7">❖</text>
    <text x="1135" y="585" fill="#f5d061" font-size="28" opacity="0.7">❖</text>

    <!-- Header Subtitle & Title -->
    <text x="600" y="85" text-anchor="middle" fill="#d4af37" font-family="'Outfit', Georgia, serif" font-size="18" font-weight="700" letter-spacing="3">BETTERAGOO.ORG CIVIC QUEST PORTAL</text>
    <text x="600" y="135" text-anchor="middle" fill="url(#gold)" font-family="'Cinzel Decorative', 'Cinzel', serif" font-size="36" font-weight="900" letter-spacing="4" filter="url(#glow)">DIPLOMA OF CIVIC HONOR</text>
    <text x="600" y="170" text-anchor="middle" fill="#94a3b8" font-family="'Outfit', sans-serif" font-size="15" letter-spacing="2">THIS OFFICIAL DECREE CONFIRMS THAT</text>

    <!-- Hero Name -->
    <text x="600" y="240" text-anchor="middle" fill="#f8fafc" font-family="'Cinzel', Georgia, serif" font-size="44" font-weight="800">${escapeSvg(name)}</text>

    <!-- Rank & Division Box -->
    <rect x="350" y="280" width="500" height="90" rx="14" fill="#1f2433" stroke="url(#gold)" stroke-width="2"/>
    <text x="600" y="317" text-anchor="middle" fill="${badgeColor}" font-family="'Outfit', sans-serif" font-size="22" font-weight="800" letter-spacing="2">RANK #${escapeSvg(rank)} OVERALL</text>
    <text x="600" y="347" text-anchor="middle" fill="#e2e8f0" font-family="'Outfit', sans-serif" font-size="18" font-weight="700">${escapeSvg(division)}</text>

    <!-- Score & Metrics Bar -->
    <rect x="380" y="400" width="440" height="46" rx="23" fill="#12151f" stroke="#2a3045" stroke-width="1.5"/>
    <text x="600" y="429" text-anchor="middle" fill="#f5d061" font-family="'Outfit', sans-serif" font-size="18" font-weight="700">🏆 Score: ${score} / 10 (${percent}%)  |  Official D1 Record Sealed</text>

    <!-- Congratulatory Decree Text -->
    <text x="600" y="485" text-anchor="middle" fill="#cbd5e1" font-family="Georgia, serif" font-style="italic" font-size="16">Has courageously undertaken the 10 Civic Trials of Agoo, La Union,</text>
    <text x="600" y="509" text-anchor="middle" fill="#cbd5e1" font-family="Georgia, serif" font-style="italic" font-size="16">demonstrating stellar civic literacy, heritage stewardship, and community leadership.</text>

    <!-- Footer Seals & Authority -->
    <line x1="150" y1="550" x2="450" y2="550" stroke="#334155" stroke-width="1"/>
    <text x="300" y="570" text-anchor="middle" fill="#d4af37" font-family="'Outfit', sans-serif" font-size="14" font-weight="700">Agoo Civic Quest Board</text>
    <text x="300" y="587" text-anchor="middle" fill="#64748b" font-family="sans-serif" font-size="12">BetterAgoo.org Realm Authority</text>

    <line x1="750" y1="550" x2="1050" y2="550" stroke="#334155" stroke-width="1"/>
    <text x="900" y="570" text-anchor="middle" fill="#d4af37" font-family="'Outfit', sans-serif" font-size="14" font-weight="700">Conferred: ${escapeSvg(date)}</text>
    <text x="900" y="587" text-anchor="middle" fill="#64748b" font-family="sans-serif" font-size="12">Municipality of Agoo, La Union</text>
  </svg>`;

  return new Response(svg, {
    headers: {
      'content-type': 'image/svg+xml',
      'cache-control': 'public, max-age=86400, s-maxage=86400',
      'access-control-allow-origin': '*',
    },
  });
}

function sanitizeText(str) {
  return String(str || '').trim().replace(/[<>"'&]/g, '');
}

function escapeSvg(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}
