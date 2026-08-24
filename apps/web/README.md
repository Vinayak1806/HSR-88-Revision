# NEET Community — Web (Student Dashboard)

React + Vite + TypeScript + Tailwind CSS + Ant Design.

## Scripts

```bash
npm install
cp .env.example .env
npm run dev          # http://localhost:5173
npm run build
npm run preview
npm run lint
npm run typecheck
```

## Structure

```
src/
├── main.tsx             # entry — providers (React Query, Antd theme, Router)
├── App.tsx              # routes
├── pages/               # route-level components (Login, Register, Dashboard, ...)
├── components/          # shared UI components
├── hooks/               # custom hooks
├── lib/                 # api client, helpers
├── store/               # Zustand slices (auth, ui)
├── types/               # shared TS types
└── index.css            # Tailwind entry
```

## Conventions

- Server state via **React Query** — never store server data in Zustand.
- API calls go through `src/lib/api.ts` — never `fetch` inline.
- Antd for components. Tailwind for layout/spacing utility classes only.
- `preflight` is **disabled** in Tailwind so Antd's reset wins.
- Route-level components are lazy-loaded for smaller initial bundles.

## Env

See [../../docs/ENVIRONMENT.md](../../docs/ENVIRONMENT.md). Only `VITE_*` variables reach the client.

## Building for prod

`npm run build` produces `dist/`. Deploy to Vercel/Netlify with:

- **Build command:** `npm run build`
- **Output dir:** `dist`
- **Env vars:** set `VITE_API_BASE_URL` per environment.
