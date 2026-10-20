import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// In development, /api/tmdb/* is proxied to TMDB and the secret token is added
// here on the dev server, so it never reaches the browser bundle.
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const token = env.TMDB_TOKEN?.trim();
  const isApiKey = token?.length === 32;

  return {
    plugins: [react()],
    server: {
      proxy: {
        '/api/tmdb': {
          target: 'https://api.themoviedb.org',
          changeOrigin: true,
          rewrite: (p) => {
            const [path, search = ''] = p.split('?');
            const params = new URLSearchParams(search);
            if (isApiKey) params.set('api_key', token);
            return `${path.replace(/^\/api\/tmdb/, '/3')}?${params}`;
          },
          headers: token && !isApiKey ? { Authorization: `Bearer ${token}` } : {},
        },
      },
    },
  };
});
