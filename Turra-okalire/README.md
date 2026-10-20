# Turra-okalire - Movie Discovery Web App

**Author:** Katandika Butandisi

A responsive React app for browsing and searching movies and TV shows, with a details page and a watchlist saved in the browser.

- **Live app:** _add your Vercel/Netlify link here_
- **Screenshots:** see `/screenshots` (homepage and details view)

## Features
- Home with 4 sections: Trending, Popular Movies, Action Movies, Popular TV Shows
- Movies and TV Shows pages with genre filter and pagination
- Title search (live API results, loading, empty and error messages)
- Details page: poster, overview, release date, rating, genres
- My Watchlist: add/remove, kept after refresh with `localStorage`
- Dark theme, responsive layout (permanent sidebar on desktop, drawer menu on mobile)

## Technologies
React 18 (JSX), Vite, Material UI, React Router v6, Fetch API, React Hooks (`useState`, `useEffect`, custom `useFetch`, Context).

## API
[TMDB API](https://www.themoviedb.org/documentation/api). This product uses the TMDB API but is not endorsed or certified by TMDB. Images are served by TMDB's image CDN.

The TMDB token is a secret, so the browser never sees it: the frontend calls `/api/tmdb/...`, which is proxied by Vite in development (`vite.config.js`) and by a Vercel serverless function in production (`api/tmdb/[...path].js`).

## Run locally
1. Create a free TMDB account and copy either your **API Key** or **API Read Access Token** (Settings > API).
2. ```
   npm install
   cp .env.example .env     # then paste your API key or read access token into .env
   npm run dev
   ```
3. Open http://localhost:5173

Set the credential in `.env` as `TMDB_TOKEN=...`. The app detects a 32-character API Key and uses it as a query parameter on the server; longer Read Access Tokens are sent as Bearer tokens. Neither credential is included in the browser bundle.

## Deploy (Vercel)
Import the GitHub repo in Vercel, add the environment variable `TMDB_TOKEN`, and deploy. `vercel.json` handles page routing.

## Structure
```
api/tmdb/[...path].js   serverless proxy (production)
src/api.js              fetch helper and data normalising
src/hooks/useFetch.js   loading / error / data hook
src/context/Watchlist.jsx  watchlist + localStorage
src/components/         Layout, MovieCard, MovieGrid, MovieRow
src/pages/              Home, Browse, Search, Details, Watchlist
```
