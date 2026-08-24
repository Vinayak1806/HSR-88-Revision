# Environment Variables

Every app has a `.env.example` at its root. Copy it to `.env` and fill in real values. **Never commit `.env`.**

## Backend — `apps/backend/.env`

| Variable                | Required | Example / Default                     | Notes |
|-------------------------|----------|---------------------------------------|-------|
| `NODE_ENV`              | yes      | `development`                         | `development` \| `test` \| `production` |
| `PORT`                  | yes      | `4000`                                | HTTP port |
| `MONGO_URI`             | yes      | `mongodb://localhost:27017/neet`      | Mongo connection string |
| `JWT_ACCESS_SECRET`     | yes      | 32+ char random string                | Rotate periodically |
| `JWT_REFRESH_SECRET`    | yes      | 32+ char random string                | Rotate periodically |
| `JWT_ACCESS_TTL`        | no       | `15m`                                 | zeit/ms format |
| `JWT_REFRESH_TTL`       | no       | `30d`                                 | zeit/ms format |
| `CORS_ORIGINS`          | yes      | `http://localhost:5173`               | Comma-separated |
| `AI_PROVIDER`           | yes      | `anthropic`                           | `anthropic` \| `openai` |
| `AI_API_KEY`            | yes      | provider key                          | Server-side only, never sent to client |
| `AI_MODEL`              | no       | `claude-sonnet-5`                     | Provider-specific |
| `AI_DAILY_DOUBT_LIMIT`  | no       | `5`                                   | Per-user daily cap |
| `LOG_LEVEL`             | no       | `info`                                | `error` \| `warn` \| `info` \| `debug` |
| `SENTRY_DSN`            | no       | -                                     | Enable when ready |

## Web — `apps/web/.env`

Vite exposes only variables prefixed with `VITE_` to the client. Anything sensitive stays on the backend.

| Variable            | Required | Example / Default              | Notes |
|---------------------|----------|--------------------------------|-------|
| `VITE_API_BASE_URL` | yes      | `http://localhost:4000/api`    | Backend API base |
| `VITE_SENTRY_DSN`   | no       | -                              | Enable when ready |
| `VITE_ADSENSE_ID`   | no       | -                              | Phase 2+ only |

## GenAI / ML — `services/ml/.env`

| Variable            | Required | Example / Default              | Notes |
|---------------------|----------|--------------------------------|-------|
| `MONGO_URI`         | yes      | `mongodb://localhost:27017/neet` | For batch pipelines writing back into Mongo |
| `ANTHROPIC_API_KEY` | yes*     | provider key                   | * At least one provider key required |
| `OPENAI_API_KEY`    | yes*     | provider key                   | * At least one provider key required |
| `DEFAULT_MODEL`     | no       | `claude-sonnet-5`              | Overridden by manifest per prompt |
| `EVAL_OUT_DIR`      | no       | `./data/eval-runs`             | Where eval reports are written |

## Mobile — `apps/mobile/.env`

Loaded via `flutter_dotenv` at build time.

| Variable            | Required | Example / Default              | Notes |
|---------------------|----------|--------------------------------|-------|
| `API_BASE_URL`      | yes      | `http://10.0.2.2:4000/api`     | Emulator loopback for Android |
| `ADMOB_APP_ID`      | no       | -                              | Phase 2+ only |
| `SENTRY_DSN`        | no       | -                              | Enable when ready |

## Rotation

- Rotate AI provider keys quarterly, or immediately if a leak is suspected.
- Rotate JWT secrets on any confirmed breach; forces a global logout by invalidating existing tokens.

## Secret Storage

- **Local dev:** `.env` files (git-ignored).
- **CI:** GitHub Actions **Encrypted Secrets** (repo settings → Secrets and variables → Actions).
- **Production:** platform-native secret store (Render env vars / Railway env / AWS Secrets Manager — decide before first deploy).
