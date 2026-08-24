# Architecture Overview

High-level shape of the NEET Aspirants Community system. Keep this doc in sync with reality — if you diverge from it, update it in the same PR.

## System Diagram (logical)

```
                    ┌────────────────────────┐
                    │    Student devices     │
                    │  ┌───────────────────┐ │
                    │  │  React Web (Vite) │ │
                    │  └───────────────────┘ │
                    │  ┌───────────────────┐ │
                    │  │   Flutter mobile  │ │
                    │  └───────────────────┘ │
                    └───────────┬────────────┘
                                │  HTTPS  (JSON, JWT)
                                ▼
                    ┌────────────────────────┐
                    │  Express API (Node)    │
                    │  ─ Auth                │
                    │  ─ Quiz / Test engine  │
                    │  ─ AI proxy            │◄──── loads prompt bundle
                    │  ─ Analytics           │      from services/ml
                    │  ─ Community           │
                    │  ─ Notifications       │
                    │  ─ Admin               │
                    └──────┬──────┬──────────┘
                           │      │
                  ┌────────▼──┐   │
                  │  MongoDB  │◄──┼──── batch writes from
                  └───────────┘   │     services/ml pipelines
                                  │     (embeddings, weak-topic briefs)
                        ┌─────────▼──────────┐
                        │  LLM Provider(s)   │
                        │  Anthropic / OpenAI│
                        └────────────────────┘

                    ┌────────────────────────┐
                    │   services/ml (Python) │
                    │   ─ Prompt bundle      │──► built into backend at build time
                    │   ─ Eval harness       │
                    │   ─ RAG index          │──► published to Mongo (vector search)
                    │   ─ Guardrails         │
                    │   ─ Batch pipelines    │──► writes back into Mongo
                    └────────────────────────┘
```

## Apps

### `apps/web` — Student Dashboard
- **Stack:** React 18, Vite, TypeScript, Tailwind CSS, Ant Design.
- **Data:** React Query for server state, Zustand for UI state (auth, drawer, theme).
- **Routing:** `react-router-dom` v6.
- **Auth:** JWT in memory + refresh in httpOnly cookie (backend responsibility).
- **Design system:** Ant Design components themed with Tailwind utility classes for spacing/layout.

### `apps/backend` — API
- **Stack:** Node 20, Express, TypeScript, Mongoose.
- **Layers:** `routes → controllers → services → models`. No business logic in routes.
- **Auth:** JWT access (short TTL) + refresh (longer TTL, rotated).
- **Validation:** `zod` at the route boundary.
- **Errors:** central error middleware; typed `AppError` class.
- **AI:** thin provider-agnostic wrapper in `src/services/ai/` so we can swap models without touching callers.
- **Jobs:** cron / queue-based tasks (streak resets, daily quiz generation, leaderboard rollups) — worker process to be added in Phase 2.

### `apps/mobile` — Flutter
- **Stack:** Flutter 3.x, Riverpod (state), Dio (HTTP), GoRouter (nav), Hive/SharedPreferences (local cache).
- **Structure:** feature-first (`lib/features/<feature>/{data,domain,ui}`), shared code under `lib/core/`.

### `services/ml` — GenAI / ML
- **Stack:** Python 3.11, provider-agnostic LLM wrapper (Anthropic / OpenAI), `pydantic` for structured outputs, `sentence-transformers` for embeddings, `pytest` for tests.
- **Role:** owns every prompt the backend ships, every eval that gates a prompt change, the RAG index for syllabus grounding, and offline pipelines that write derived data (embeddings, weak-topic briefs) back into Mongo.
- **Not runtime.** The customer-facing AI endpoints live in the backend; `services/ml` publishes a **prompt bundle** the backend loads at boot. This keeps latency low and lets the backend deploy on Node without a Python runtime.
- **Rules:** no prompt change without an eval run; no fine-tuning without sign-off; deterministic where it matters (`temperature=0` for judges).

## Cross-cutting Concerns

- **API contract** — defined by backend; documented per-endpoint in `docs/API_CONTRACT.md`. Breaking changes require a version bump on the endpoint prefix.
- **Env config** — 12-factor. `.env.example` in each app, real `.env` never committed.
- **Logging** — structured JSON in prod (backend), console in dev.
- **Observability** — Phase 2: OpenTelemetry + a hosted APM (Datadog / Sentry Performance).
- **Error reporting** — Sentry on web, mobile, and backend (Phase 2).
- **Feature flags** — simple config table in Mongo first; graduate to a real provider if needed.

## Data Model (initial sketch)

```
User            { _id, name, email, passwordHash, role, streak, aiDoubtsUsedToday, createdAt }
Subject         { _id, name, order }
Chapter         { _id, subjectId, name, order }
Topic           { _id, chapterId, name }
Question        { _id, subjectId, chapterId, topicId, difficulty, type,
                  stem, options[], correctOption, explanation, source,
                  validated: bool, validationNotes, createdBy, createdAt }
Quiz            { _id, kind: daily|weekly|monthly|chapter|subject|full,
                  questionIds[], durationSec, negativeMarking, publishAt, expiresAt }
Attempt         { _id, userId, quizId, answers[], score, accuracy, timeSpent,
                  submittedAt, analysis{...} }
DoubtSession    { _id, userId, subjectId, question, aiResponse, feedback, createdAt }
Post            { _id, authorId, kind, title, body, tags[], moderationStatus }
Notification    { _id, userId, kind, payload, readAt, createdAt }
Leaderboard     { _id, scope: daily|weekly|monthly, entries[{userId, score, rank}] }
```

Only a sketch — teams may refine collections per feature as long as changes are documented in the PR.

## Non-Goals (for now)

- SSR/SEO for the student dashboard (SPA is fine — it's a logged-in tool).
- Building our own AI model — we consume providers.
- Real-time (WebSocket) features — polling is fine for MVP.
