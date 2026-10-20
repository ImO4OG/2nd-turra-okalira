// Vercel serverless proxy: keeps the TMDB token on the server (not in frontend code).
export default async function handler(req, res) {
  const { path = [], ...query } = req.query;
  const token = process.env.TMDB_TOKEN?.trim();
  if (!token) {
    res.status(500).json({ error: 'TMDB_TOKEN is not configured' });
    return;
  }

  const isApiKey = token.length === 32;
  if (isApiKey) query.api_key = token;
  const target = `https://api.themoviedb.org/3/${[].concat(path).join('/')}?${new URLSearchParams(query)}`;
  const headers = isApiKey ? {} : { Authorization: `Bearer ${token}` };

  try {
    const r = await fetch(target, { headers });
    res.setHeader('Cache-Control', 's-maxage=300');
    res.status(r.status).json(await r.json());
  } catch {
    res.status(502).json({ error: 'Upstream request failed' });
  }
}
