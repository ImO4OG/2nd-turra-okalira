 import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5000;
const TMDB_TOKEN = process.env.TMDB_TOKEN;

app.use(cors());

app.get('/', (_req, res) => {
  res.status(200).send('Turra-okalire Movie App backend is running.');
});

app.use('/api/tmdb', async (req, res) => {
  if (!TMDB_TOKEN) {
    return res.status(500).json({ error: 'TMDB_TOKEN is not configured on the server.' });
  }

  const tmdbPath = req.path.replace(/^\/+/, '');
  if (!tmdbPath) {
    return res.status(400).json({ error: 'A TMDB endpoint path is required.' });
  }

  try {
    const query = new URLSearchParams(req.query);
    const target = `https://api.themoviedb.org/3/${tmdbPath}?${query.toString()}`;
    const upstream = await fetch(target, {
      headers: {
        Authorization: `Bearer ${TMDB_TOKEN}`,
        Accept: 'application/json'
      }
    });

    const body = await upstream.json();
    res.set('Cache-Control', 'public, max-age=60');
    return res.status(upstream.status).json(body);
  } catch (error) {
    console.error('TMDB request failed:', error.message);
    return res.status(502).json({ error: 'Unable to retrieve data from TMDB.' });
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Turra-okalire backend listening on port ${PORT}`);
});
