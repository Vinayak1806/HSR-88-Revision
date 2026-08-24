# NEET Community — Backend

Node 20 + Express + TypeScript + MongoDB (Mongoose).

## Scripts

```bash
npm install
cp .env.example .env
npm run dev              # http://localhost:4000
npm run build
npm start                # runs dist/index.js
npm run lint
npm run typecheck
npm test
```

## Structure

```
src/
├── index.ts             # bootstrap: connect DB, start server, shutdown
├── app.ts               # Express app factory (used in prod and tests)
├── config/
│   ├── env.ts           # Zod-validated env
│   └── db.ts            # Mongoose connect/disconnect
├── routes/              # Thin routers per module — no logic here
├── controllers/         # HTTP glue: parse → call service → shape response
├── services/            # Business logic (the meat)
├── models/              # Mongoose schemas
├── middleware/          # Auth, rate-limit, error handler, etc.
├── utils/               # Logger, AppError, small helpers
└── types/               # Shared TS types
tests/                   # Vitest + Supertest
```

## Conventions

- Routes are thin — call a service, return `{ data }` or throw `AppError`.
- Every request body is validated with Zod at the route boundary.
- Every response follows the shape in `docs/API_CONTRACT.md`.
- Never return a raw Mongoose doc — map to a DTO first.
- Use the logger, not `console.log`.
- Integration tests use `mongodb-memory-server` — no mocking Mongo.

## Env

See [../../docs/ENVIRONMENT.md](../../docs/ENVIRONMENT.md). Required: `MONGO_URI`, `JWT_ACCESS_SECRET`, `JWT_REFRESH_SECRET`, `AI_API_KEY`.

## Deploy

Any Node host works (Render, Railway, Fly, EC2, Cloud Run). Build once (`npm run build`) and run `npm start`. The health check is `GET /api/health`.
