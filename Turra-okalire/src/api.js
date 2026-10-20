// All requests go through /api/tmdb (a proxy), so no secret is in frontend code.
const BASE = '/api/tmdb';

export async function get(path, params = {}) {
  const qs = new URLSearchParams({ language: 'en-US', ...params });
  const res = await fetch(`${BASE}${path}?${qs}`);
  if (!res.ok) throw new Error(`Request failed (${res.status})`);
  return res.json();
}

export const img = (p, size = 'w342') => (p ? `https://image.tmdb.org/t/p/${size}${p}` : null);

// Turn a TMDB movie/TV object into one shape; missing fields get safe defaults.
export const norm = (i, type) => ({
  id: i.id,
  type: i.media_type || type,
  title: i.title || i.name || 'Untitled',
  poster: i.poster_path || null,
  backdrop: i.backdrop_path || null,
  rating: i.vote_average,
  date: i.release_date || i.first_air_date || '',
  overview: i.overview || '',
  genres: (i.genres || []).map((g) => g.name),
});

export const year = (d) => (d ? d.slice(0, 4) : 'N/A');
export const rating = (r) => (r ? r.toFixed(1) : 'N/A');
