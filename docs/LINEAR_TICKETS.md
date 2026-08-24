# Linear Tickets — MVP Backlog

Import-ready backlog for the "NEET Community" Linear project. IDs below are placeholders (`NEET-1`, `NEET-2`, ...) — Linear will assign real IDs on import. Keep the ordering stable so cross-references (`depends on: NEET-4`) survive.

> **Note:** This session could not push to Linear directly (Linear MCP requires OAuth and this session is non-interactive). To bulk-import:
>
> 1. In Linear → *Project settings* → *Import*, select CSV, and use `docs/linear-tickets.csv` (generate from this doc — see the table at the bottom).
> 2. Or paste each ticket into Linear manually — the sections below are ordered so pasting them into columns preserves the milestone/domain grouping.

## Labels used

- **domain:** `web`, `backend`, `mobile`, `ml`, `devops`, `content`, `docs`
- **type:** `feature`, `bug`, `chore`, `spike`, `eval`
- **priority:** `P0` (blocker) · `P1` (must-have MVP) · `P2` (should-have) · `P3` (nice-to-have)
- **milestone:** `MVP`, `Phase-2`, `Phase-3`
- **tag:** `good-first-issue` — starter tickets for interns

## Milestones

- **M0 — Foundations** (week 1): repo, envs, CI, auth, base shells
- **M1 — Quiz Loop** (week 2–3): questions, daily quiz, attempts, results
- **M2 — Test Engine + Analytics** (week 4): weekly/monthly/mock, analytics
- **M3 — AI Doubt + Notifications** (week 5): AI wrapper, doubts UI, push/email
- **M4 — Admin + Polish** (week 6): admin console, AI question gen, hardening
- **M-AI — GenAI track (parallel)**: prompt bundle, eval harness, RAG, guardrails

---

## M0 — Foundations

### NEET-1 · Repo & workspace bootstrap (`chore`, `devops`, P0)
**Assignee:** PM
**Description:** Initialize monorepo layout (`apps/web`, `apps/backend`, `apps/mobile`, `docs`), create `main`+`develop` branches, add branch protection, connect repo to Linear.
**Acceptance criteria:**
- [ ] `main` and `develop` exist with protection rules per [GIT_WORKFLOW.md](GIT_WORKFLOW.md)
- [ ] Linear ↔ GitHub two-way link works (moving a ticket to In Progress links the PR)
- [ ] README + docs directory present

### NEET-2 · CI baseline for all three apps (`chore`, `devops`, P0)
**Assignee:** I-BE-1
**Description:** Add GitHub Actions workflows for lint/typecheck/test on PRs to `develop` and `main`, for web, backend, and mobile.
**Acceptance criteria:**
- [ ] Web: `npm ci`, `lint`, `typecheck`, `build`
- [ ] Backend: `npm ci`, `lint`, `typecheck`, `test`
- [ ] Mobile: `flutter analyze`, `flutter test`
- [ ] Status checks required by branch protection

### NEET-3 · Env & secrets setup guide (`chore`, `docs`, P1)
**Assignee:** PM
**Description:** Finalize `.env.example` in each app; write `docs/ENVIRONMENT.md`; configure GH Actions secrets.
**Acceptance criteria:**
- [ ] Every `.env` var appears in `.env.example` with placeholder
- [ ] Secrets stored in GH Actions Encrypted Secrets
- [ ] Docs updated

### NEET-4 · MongoDB connection + health endpoint (`feature`, `backend`, P0)
**Assignee:** I-BE-1
**Description:** Wire up Mongoose with retry, health-check endpoint `/api/health` returning DB status.
**Acceptance criteria:**
- [ ] `GET /api/health` returns `{ data: { db: "up", uptime: <sec> } }`
- [ ] Server exits cleanly on SIGTERM
- [ ] Unit test for health handler

### NEET-5 · Express base app + error middleware + logger (`feature`, `backend`, P0)
**Assignee:** I-BE-1
**Description:** Set up Express with CORS, JSON body parser, request logging (pino), central error middleware that maps `AppError` and Zod errors to the standard error response.
**Acceptance criteria:**
- [ ] `AppError(code, statusCode, message, details)` class in place
- [ ] Unknown errors return `500 INTERNAL_ERROR` and are logged with stack
- [ ] CORS honors `CORS_ORIGINS`
- [ ] Basic integration test

### NEET-6 · React app skeleton with routing + Antd theme (`feature`, `web`, P0)
**Assignee:** I-WEB-1
**Description:** Vite + React + TS + Tailwind + Antd wired together. Route layout: `/login`, `/register`, `/dashboard` (protected).
**Acceptance criteria:**
- [ ] `npm run dev` shows a themed dashboard shell at `/dashboard`
- [ ] Antd `ConfigProvider` sets primary color from tailwind theme tokens
- [ ] Auth guard redirects unauthenticated users to `/login`

### NEET-7 · Flutter app skeleton with theme + routes (`feature`, `mobile`, P0)
**Assignee:** I-MOB-1
**Description:** Flutter 3.x app with GoRouter, Riverpod, theme, three placeholder screens (`Login`, `Register`, `Dashboard`).
**Acceptance criteria:**
- [ ] `flutter run` launches on Android emulator
- [ ] Bottom nav / drawer scaffold visible on `Dashboard`
- [ ] Riverpod set up with a sample provider

### NEET-8 · Design tokens (colors, spacing, typography) doc (`chore`, `docs`, P1, `good-first-issue`)
**Assignee:** I-WEB-2
**Description:** Pick primary/secondary/accent, font stack, spacing scale; document in `docs/DESIGN_TOKENS.md`; reflect in Tailwind config and Flutter theme.
**Acceptance criteria:**
- [ ] Tokens documented
- [ ] Web `tailwind.config.js` uses them
- [ ] Flutter `lib/theme/` uses them

---

## M0 — Auth

### NEET-9 · User model + password hashing (`feature`, `backend`, P0)
**Assignee:** I-BE-1
**Description:** `User` collection with `name, email (unique), passwordHash, role, streak, aiDoubtsUsedToday, createdAt`. Bcrypt for hashing.
**Acceptance criteria:**
- [ ] Model validates email format, min password length
- [ ] Password never leaves the DB layer
- [ ] Index on `email`

### NEET-10 · POST /api/auth/register (`feature`, `backend`, P0)
**Assignee:** I-BE-1
**Description:** Create user, return access + set refresh cookie.
**Acceptance criteria:**
- [ ] Zod validates body
- [ ] Duplicate email returns `409 EMAIL_TAKEN`
- [ ] Response: `{ data: { user, accessToken } }`

### NEET-11 · POST /api/auth/login + refresh + logout (`feature`, `backend`, P0)
**Assignee:** I-BE-1
**Description:** Login issues access + refresh; refresh rotates; logout invalidates refresh.
**Acceptance criteria:**
- [ ] `POST /auth/login`, `POST /auth/refresh`, `POST /auth/logout`
- [ ] Refresh token rotation with reuse detection (revoke family on reuse)
- [ ] Rate-limit: 20 req/min per IP

### NEET-12 · Web auth pages: login + register + forgot-password stub (`feature`, `web`, P0)
**Assignee:** I-WEB-1
**Description:** Antd forms, client-side validation, error surfacing from backend.
**Acceptance criteria:**
- [ ] `/login`, `/register` fully working against backend
- [ ] Auth token stored in memory; refresh handled by cookie
- [ ] Redirect to `/dashboard` on success

### NEET-13 · Mobile auth screens (`feature`, `mobile`, P0)
**Assignee:** I-MOB-1
**Description:** Flutter login + register screens using shared API client.
**Acceptance criteria:**
- [ ] Login and register flows work against backend
- [ ] Access token stored in secure storage
- [ ] Auto-login on app launch when token valid

---

## M1 — Quiz Loop

### NEET-14 · Subject / Chapter / Topic models + seed (`feature`, `backend`, P1)
**Assignee:** I-BE-2
**Description:** Models for taxonomy plus a seed script covering NEET syllabus (Physics, Chemistry, Botany, Zoology).
**Acceptance criteria:**
- [ ] Seed script idempotent
- [ ] Endpoints `/api/subjects`, `/api/subjects/:id/chapters`, `/api/chapters/:id/topics`
- [ ] Cached in Redis or in-memory for MVP (in-memory is fine)

### NEET-15 · Question model + admin CRUD (`feature`, `backend`, P1)
**Assignee:** I-BE-2
**Description:** Question schema (stem, options, correct, explanation, difficulty, tags, validated flag). Admin routes protected by role.
**Acceptance criteria:**
- [ ] `POST/GET/PATCH/DELETE /api/admin/questions`
- [ ] Only role `admin` or `editor` can write
- [ ] Zod validation

### NEET-16 · Daily quiz generation job (`feature`, `backend`, P1)
**Assignee:** I-BE-2
**Description:** Cron-triggered job at 04:00 IST that assembles the day's daily quiz per user (or per cohort) using weak-topic bias.
**Acceptance criteria:**
- [ ] `Quiz` record `kind=daily` with 15 questions
- [ ] Idempotent — running twice doesn't duplicate
- [ ] Manual trigger endpoint for dev

### NEET-17 · GET /api/quizzes/today + POST attempts (`feature`, `backend`, P1)
**Assignee:** I-BE-2
**Description:** Fetch today's quiz for user; submit attempt; server scores it.
**Acceptance criteria:**
- [ ] Attempt scoring stores per-question correct/incorrect/time
- [ ] Re-submission blocked once complete
- [ ] Response returns score, accuracy, breakdown

### NEET-18 · Web: Daily Quiz UI + result page (`feature`, `web`, P1)
**Assignee:** I-WEB-2
**Description:** Full quiz-taking flow — timer, next/prev, mark for review, submit, result screen with explanations.
**Acceptance criteria:**
- [ ] Timer counts down, auto-submits at 0
- [ ] Explanations shown on result page
- [ ] Works on mobile viewport

### NEET-19 · Mobile: Daily Quiz UI + result screen (`feature`, `mobile`, P1)
**Assignee:** I-MOB-2
**Description:** Same flow as web, native controls.
**Acceptance criteria:**
- [ ] Timer + auto-submit
- [ ] Explanations on result
- [ ] Handles orientation change

### NEET-20 · Streak logic (`feature`, `backend`, P1)
**Assignee:** I-BE-1
**Description:** Increment streak when user completes today's daily quiz; reset if a day is skipped. Timezone: IST.
**Acceptance criteria:**
- [ ] `user.streak.current`, `user.streak.longest`
- [ ] Cron at 00:05 IST checks yesterday's completion
- [ ] Unit tests around boundary (leap day, DST)

---

## M2 — Test Engine + Analytics

### NEET-21 · Weekly / Monthly quiz kinds (`feature`, `backend`, P1)
**Assignee:** I-BE-2
**Description:** Extend quiz kinds; add scheduling (`publishAt`, `expiresAt`); ranking on submission.
**Acceptance criteria:**
- [ ] Kinds: `weekly`, `monthly`
- [ ] Attempts include `rank`, `percentile`
- [ ] Leaderboard endpoint per kind

### NEET-22 · Chapter / Subject / Full-syllabus mock tests (`feature`, `backend`, P1)
**Assignee:** I-BE-2
**Description:** Admin can define a test template (subject/chapter/difficulty distribution); backend assembles the test.
**Acceptance criteria:**
- [ ] `POST /api/admin/tests` accepts a template
- [ ] Question distribution matches within ±1
- [ ] Negative marking configurable

### NEET-23 · Analytics: per-attempt breakdown (`feature`, `backend`, P1)
**Assignee:** I-BE-3
**Description:** Compute subject/chapter/topic accuracy, time-per-question, mistake tags on submission.
**Acceptance criteria:**
- [ ] Stored on `Attempt.analysis`
- [ ] Endpoint: `GET /api/attempts/:id/analysis`
- [ ] Handles 0-question edge case

### NEET-24 · Analytics dashboard (Web) (`feature`, `web`, P1)
**Assignee:** I-WEB-2
**Description:** Charts for accuracy trend, weak topics, subject balance. Use Antd Charts or Recharts.
**Acceptance criteria:**
- [ ] Renders empty state for new user
- [ ] Filters by time window (7d / 30d / all)
- [ ] Loads under 1s on cached data

### NEET-25 · Analytics screen (Mobile) (`feature`, `mobile`, P2)
**Assignee:** I-MOB-2
**Description:** Same charts, native library (fl_chart).
**Acceptance criteria:**
- [ ] Charts render on Android + iOS
- [ ] Handles empty state

### NEET-26 · Leaderboards (daily / weekly / monthly) (`feature`, `backend`, P2)
**Assignee:** I-BE-3
**Description:** Rank tables recomputed on attempt submission for the corresponding kind.
**Acceptance criteria:**
- [ ] `GET /api/leaderboards/:kind`
- [ ] Ties broken by earlier submission time
- [ ] Pagination

### NEET-27 · Leaderboards UI (Web + Mobile) (`feature`, `web`, `mobile`, P2)
**Assignee:** I-WEB-2 (web), I-MOB-2 (mobile)
**Description:** Split into two sub-tickets on import if needed. Show top 100, user's current rank pinned.
**Acceptance criteria:**
- [ ] Filter by scope
- [ ] User row highlighted
- [ ] Loads under 1s

---

## M3 — AI Doubt + Notifications

### NEET-28 · AI provider wrapper (`feature`, `backend`, P1)
**Assignee:** I-BE-3
**Description:** Provider-agnostic client (`src/services/ai/`); Anthropic first. Includes system prompt shaped for a NEET tutor persona.
**Acceptance criteria:**
- [ ] Interface: `askDoubt({ userId, question, subject }): Promise<{ answer, model, tokens }>`
- [ ] Retries on transient errors, no retry on 4xx
- [ ] Provider switchable by env var

### NEET-29 · Daily doubt quota (5/user/day) (`feature`, `backend`, P1)
**Assignee:** I-BE-3
**Description:** Increment counter; reset at IST midnight via cron; enforce quota at endpoint level.
**Acceptance criteria:**
- [ ] `POST /api/doubts` returns `429 QUOTA_EXCEEDED` when over
- [ ] Response includes `remainingToday`
- [ ] Counter is atomic

### NEET-30 · Web: AI Doubt UI (`feature`, `web`, P1)
**Assignee:** I-WEB-2
**Description:** Chat-style panel. Shows remaining doubts. Sends question + optional subject.
**Acceptance criteria:**
- [ ] Streaming or loading state while awaiting response
- [ ] Renders markdown / LaTeX in the answer
- [ ] Feedback thumbs up/down persists to backend

### NEET-31 · Mobile: AI Doubt UI (`feature`, `mobile`, P2)
**Assignee:** I-MOB-2
**Description:** Same as web, native controls.
**Acceptance criteria:**
- [ ] Handles long answers with scroll
- [ ] Markdown/LaTeX rendering
- [ ] Feedback persisted

### NEET-32 · Notifications: model + inbox endpoint (`feature`, `backend`, P2)
**Assignee:** I-BE-3
**Description:** Notification collection + fanout function. Endpoints: list, mark-read.
**Acceptance criteria:**
- [ ] `GET /api/notifications` paginated
- [ ] `PATCH /api/notifications/:id/read`
- [ ] Kinds: `daily_quiz_reminder`, `test_reminder`, `result_ready`, `streak_reminder`, `recommendation`

### NEET-33 · Daily quiz reminder (email + in-app) (`feature`, `backend`, P2)
**Assignee:** I-BE-3
**Description:** 07:00 IST reminder if user hasn't done today's quiz.
**Acceptance criteria:**
- [ ] Skips users who already completed
- [ ] Email via transactional provider (Postmark / Resend — decide in NEET-3)
- [ ] In-app notification created

### NEET-34 · Web: Notification bell + inbox (`feature`, `web`, P2, `good-first-issue`)
**Assignee:** I-WEB-1
**Description:** Bell icon in top bar with unread count; dropdown or drawer listing recent notifications.
**Acceptance criteria:**
- [ ] Poll every 60s while tab focused
- [ ] Mark-read on open
- [ ] Empty state

### NEET-35 · Mobile: Push notifications (`feature`, `mobile`, P2)
**Assignee:** I-MOB-1
**Description:** FCM setup, permission flow, delivery of daily-quiz reminders.
**Acceptance criteria:**
- [ ] Device token registered with backend
- [ ] Reminder actually arrives on Android
- [ ] Foreground handler navigates to correct screen

---

## M4 — Admin, AI content, polish

### NEET-36 · Admin console shell (`feature`, `web`, P1)
**Assignee:** I-WEB-1
**Description:** Separate `/admin` area with nav for Questions, Tests, Users, Doubts. Role-guarded.
**Acceptance criteria:**
- [ ] Non-admin gets 403 page
- [ ] Sidebar layout with Antd `Layout`
- [ ] Empty pages routed correctly

### NEET-37 · Admin: Question CRUD UI (`feature`, `web`, P1)
**Assignee:** I-WEB-2
**Description:** Table with filters (subject, chapter, difficulty, validated). Create/edit modal with LaTeX preview.
**Acceptance criteria:**
- [ ] Search, filter, paginate
- [ ] Bulk-import CSV (out of scope initially — spike as NEET-46)
- [ ] Validation toggle

### NEET-38 · AI question generation endpoint (`feature`, `backend`, P1)
**Assignee:** I-BE-3
**Description:** `POST /api/admin/ai/generate-questions` — takes `{ subject, chapter, topic, difficulty, type, count }`. Returns candidate questions.
**Acceptance criteria:**
- [ ] Streams progress if generating multiple
- [ ] Candidates go into `Question` collection with `validated=false`, `source=ai`
- [ ] Rate-limited per admin user

### NEET-39 · AI question validation endpoint (`feature`, `backend`, P1)
**Assignee:** I-BE-3
**Description:** `POST /api/admin/ai/validate/:questionId` — checks correctness, ambiguity, duplicates, option quality, explanation quality, NEET relevance.
**Acceptance criteria:**
- [ ] Returns `{ score, issues[], recommendation: approve | reject | review }`
- [ ] High-risk → queued for human review (label `needs-review`)
- [ ] Deterministic-ish (temperature = 0)

### NEET-40 · AI test generation endpoint (`feature`, `backend`, P1)
**Assignee:** I-BE-3
**Description:** Given a template + question pool, AI assembles a test. Admin can preview / regenerate.
**Acceptance criteria:**
- [ ] Distribution honored ±1
- [ ] Explanation of choices for the admin (which weak-topic bias applied)
- [ ] Saves test as draft

### NEET-41 · Admin: AI generation UI (`feature`, `web`, P1)
**Assignee:** I-WEB-2
**Description:** UI for NEET-38/39/40 — parameters, preview, approve / reject, batch validate.
**Acceptance criteria:**
- [ ] Batch approve moves questions to validated
- [ ] Rejected candidates get a note
- [ ] Loading + error states

### NEET-42 · Rate-limiting middleware (`feature`, `backend`, P1)
**Assignee:** I-BE-1
**Description:** Global rate limiting per IP for `/auth/*` and per user for others; Redis or in-memory (in-memory OK for MVP with single instance).
**Acceptance criteria:**
- [ ] Returns `429` with `Retry-After`
- [ ] Configurable per route

### NEET-43 · Sentry integration (web + backend + mobile) (`chore`, `devops`, P2)
**Assignee:** I-BE-1
**Description:** Wire Sentry across all three; source maps for web.
**Acceptance criteria:**
- [ ] Errors reach Sentry with release tag
- [ ] Source maps uploaded in CI on `main`

### NEET-44 · Deployment: backend to hosting (`chore`, `devops`, P1)
**Assignee:** PM + I-BE-1
**Description:** Choose Render / Railway / Fly, deploy backend, connect Atlas, set env vars.
**Acceptance criteria:**
- [ ] Prod URL live
- [ ] Health endpoint 200 from public
- [ ] Rollback documented

### NEET-45 · Deployment: web to Vercel/Netlify (`chore`, `devops`, P1)
**Assignee:** PM + I-WEB-1
**Description:** Configure hosting for the web app with envs.
**Acceptance criteria:**
- [ ] Prod URL live
- [ ] Auto-deploy on `main` merge
- [ ] Preview URLs on PRs

### NEET-46 · Spike: CSV bulk import for questions (`spike`, `backend`, P2)
**Assignee:** I-BE-2
**Description:** 1-day timebox. Investigate format, validation approach, dedupe strategy.
**Acceptance criteria:**
- [ ] Written proposal in `docs/spikes/csv-import.md`
- [ ] Next-step tickets filed

---

## M-AI — GenAI track (parallel to app milestones)

The GenAI team owns every prompt the backend ships and every eval that gates a prompt change. Their tickets are versioned separately from the app milestones because they cut across M1–M4.

### NEET-100 · GenAI service scaffold + provider wrapper (`feature`, `ml`, P1)
**Assignee:** I-ML-1
**Description:** Stand up `services/ml/`: Python env, provider-agnostic client (`AnthropicClient`, `OpenAIClient`), retry with tenacity, structured-output helper (pydantic), config loader for `prompts/manifest.json`.
**Acceptance criteria:**
- [ ] `pytest` green on empty test suite
- [ ] `python -m src.eval.run --suite doubt-solver` runs (no-op ok)
- [ ] Manifest loader validates schema
- [ ] Provider selectable by env var

### NEET-101 · Prompt bundle publish pipeline (`feature`, `ml`, `backend`, P1)
**Assignee:** I-ML-1 + I-BE-3
**Description:** Publish `services/ml/prompts/` as a JSON bundle the backend loads at boot. Version stamped in the bundle. Backend refuses to boot on a missing/malformed bundle.
**Acceptance criteria:**
- [ ] `npm run build:prompts` (or equivalent) produces `apps/backend/src/services/ai/prompts.generated.json`
- [ ] Backend loads on startup, exposes `GET /api/health` with `promptBundleVersion`
- [ ] CI runs the build step on PRs

### NEET-102 · Doubt-solver prompt v1 + gold set + smoke eval (`feature`, `ml`, `eval`, P1)
**Assignee:** I-ML-1
**Description:** Author `v1.doubt-solver.md` (done as a seed). Build a 20-item gold set covering physics/chem/bio, English + Hinglish, math and conceptual. Add LLM-as-judge scoring for correctness, style, and refusal.
**Acceptance criteria:**
- [ ] Gold set in `services/ml/data/gold/doubt-solver.jsonl`
- [ ] `python -m src.eval.run --suite doubt-solver` produces report
- [ ] Baseline scores committed to `data/eval-runs/baseline/`
- [ ] Refusal cases pass

### NEET-103 · Question generation prompt + structured output schema (`feature`, `ml`, P1)
**Assignee:** I-ML-2
**Description:** Author `v1.question-generation.md` + pydantic schema. Generation must always return valid JSON matching the schema; on failure, retry with self-repair.
**Acceptance criteria:**
- [ ] Pydantic schema in `services/ml/src/generation/schema.py`
- [ ] `generate_questions()` returns typed list
- [ ] Handles refusal ("out of syllabus") gracefully
- [ ] Unit tests cover parse-failure retry

### NEET-104 · Question validation judge + panel voting (`feature`, `ml`, `eval`, P1)
**Assignee:** I-ML-2
**Description:** LLM-as-judge validator with `temperature=0`. Optionally run a 3-judge panel and take majority; disagreement → `recommendation=review`.
**Acceptance criteria:**
- [ ] Judge returns valid JSON matching schema
- [ ] Panel mode wired
- [ ] Backfill script rescoring existing questions
- [ ] Eval: precision/recall on a labeled set of 30 known good/bad questions

### NEET-105 · Test assembly prompt + constraint checker (`feature`, `ml`, P1)
**Assignee:** I-ML-2
**Description:** Prompt + a Python post-check that verifies distribution exactly matches template. If mismatch, retry with feedback.
**Acceptance criteria:**
- [ ] Assembly satisfies distribution ±0 on templates with feasible pools
- [ ] Reports `issues[]` when infeasible
- [ ] Integration test with a synthetic pool

### NEET-106 · Embeddings index for question dedupe (`feature`, `ml`, P1)
**Assignee:** I-ML-3
**Description:** Embed every question stem with `sentence-transformers`, store in Mongo Atlas vector index (or in-memory faiss for MVP). Expose `/api/admin/questions/similar?questionId=...`.
**Acceptance criteria:**
- [ ] Backfill pipeline computes embeddings
- [ ] Similarity endpoint returns top-5
- [ ] Dedupe threshold documented after empirical tuning

### NEET-107 · RAG for question generation grounding (`feature`, `ml`, P1)
**Assignee:** I-ML-1 + I-ML-3
**Description:** Chunk syllabus + NCERT excerpts, embed, retrieve top-k at generation time, pass as `referenceSnippets`. Blocks off-syllabus generations.
**Acceptance criteria:**
- [ ] Ingest pipeline for syllabus PDFs
- [ ] Retriever module used by generation
- [ ] Eval delta: on-syllabus rate ≥ 95% on 50-item sample

### NEET-108 · Guardrails: PII scrub + jailbreak resistance + safety filter (`feature`, `ml`, `backend`, P1)
**Assignee:** I-ML-3
**Description:** Pre-call scrub (regex + light NER) removes emails/phone/names. Add a safety judge post-call for doubt-solver. Add jailbreak eval suite.
**Acceptance criteria:**
- [ ] Scrub covered by tests (positive + negative)
- [ ] Post-call safety judge blocks disallowed content
- [ ] Jailbreak eval suite ≥ 95% refusal rate

### NEET-109 · Weak-topic brief (LLM summary) for next-quiz assembly (`feature`, `ml`, P2)
**Assignee:** I-ML-3
**Description:** LLM summarizes a student's last-N attempts into a compact "next-quiz brief" that the quiz builder uses to bias question selection. Runs nightly per active user.
**Acceptance criteria:**
- [ ] Brief stored on `User.aiCoach.nextQuizBrief`
- [ ] Backend uses it in daily quiz assembly (behind flag)
- [ ] Eval: quiz better targets weak topics vs. random baseline

### NEET-110 · Nightly eval CI + regression alerts (`chore`, `ml`, `devops`, P2)
**Assignee:** I-ML-1
**Description:** GH Action runs full eval suite nightly on `develop`; if any suite regresses > threshold, opens an issue and pings the lead.
**Acceptance criteria:**
- [ ] Workflow committed
- [ ] Report artifact uploaded per run
- [ ] Regression alert tested

### NEET-111 · Prompt-change PR gate (`chore`, `ml`, `devops`, P2)
**Assignee:** I-ML-1
**Description:** PR check that fails if `services/ml/prompts/**` changes without a corresponding new file in `services/ml/data/eval-runs/`.
**Acceptance criteria:**
- [ ] Check enforced on branch protection
- [ ] Documented in `docs/CONTRIBUTING.md`

### NEET-112 · Cost + latency dashboard (`chore`, `ml`, P2)
**Assignee:** I-ML-3
**Description:** Log per-call tokens/latency/cost from backend; publish a simple internal dashboard.
**Acceptance criteria:**
- [ ] Fields captured in `DoubtSession` and generation logs
- [ ] Weekly summary emailed to lead
- [ ] Runaway cost alert at daily threshold

### NEET-113 · Spike: fine-tune vs. prompt+RAG (`spike`, `ml`, P3)
**Assignee:** I-ML-2
**Description:** 2-day timebox. Compare current prompt+RAG generation quality vs. a small fine-tune on 500 NEET questions. Written recommendation.
**Acceptance criteria:**
- [ ] Report in `docs/spikes/ft-vs-rag.md`
- [ ] Numbers from a shared eval suite
- [ ] Decision + next-step tickets filed

---

## Post-MVP tickets (created but backlog)

- NEET-47 · Community: posts, replies, moderation (Phase 2)
- NEET-48 · Badges + achievements (Phase 2)
- NEET-49 · Personalized recommended tests (Phase 2)
- NEET-50 · Multilingual AI (Phase 2)
- NEET-51 · Parent dashboard (Phase 3)
- NEET-52 · Human expert doubts (Phase 3)
- NEET-53 · Voice / image doubts (Phase 3)

---

## CSV for Linear import

Save the following block as `docs/linear-tickets.csv` (or paste into Linear's importer). Header names match Linear's default CSV importer.

```csv
Title,Description,Priority,Labels,Assignee
"NEET-1 Repo & workspace bootstrap","Initialize monorepo layout, main+develop branches, protection, Linear link.",1,"chore,devops,MVP,M0","PM"
"NEET-2 CI baseline","GH Actions lint/typecheck/test for web, backend, mobile.",1,"chore,devops,MVP,M0","I-BE-1"
"NEET-3 Env & secrets setup","Finalize env examples, secrets, docs.",2,"chore,docs,MVP,M0","PM"
"NEET-4 Mongo + health","Mongoose connection, /api/health.",1,"feature,backend,MVP,M0","I-BE-1"
"NEET-5 Express base + errors","App setup, error middleware, logger.",1,"feature,backend,MVP,M0","I-BE-1"
"NEET-6 React skeleton","Vite+React+TS+Tailwind+Antd, routes, auth guard.",1,"feature,web,MVP,M0","I-WEB-1"
"NEET-7 Flutter skeleton","Flutter with GoRouter, Riverpod, theme, placeholder screens.",1,"feature,mobile,MVP,M0","I-MOB-1"
"NEET-8 Design tokens","Colors, spacing, typography documented and applied.",2,"chore,docs,MVP,M0,good-first-issue","I-WEB-2"
"NEET-9 User model + hashing","User collection, bcrypt.",1,"feature,backend,MVP,M0","I-BE-1"
"NEET-10 Auth register","POST /api/auth/register.",1,"feature,backend,MVP,M0","I-BE-1"
"NEET-11 Auth login/refresh/logout","Login+refresh rotation+logout, rate limited.",1,"feature,backend,MVP,M0","I-BE-1"
"NEET-12 Web auth pages","Login, register, forgot-password stub.",1,"feature,web,MVP,M0","I-WEB-1"
"NEET-13 Mobile auth screens","Login, register, secure token storage.",1,"feature,mobile,MVP,M0","I-MOB-1"
"NEET-14 Taxonomy models","Subject/Chapter/Topic + seed.",2,"feature,backend,MVP,M1","I-BE-2"
"NEET-15 Question CRUD","Question schema + admin endpoints.",2,"feature,backend,MVP,M1","I-BE-2"
"NEET-16 Daily quiz generation","Cron assembler, idempotent.",2,"feature,backend,MVP,M1","I-BE-2"
"NEET-17 Today quiz + attempts","GET today, POST attempt, scoring.",2,"feature,backend,MVP,M1","I-BE-2"
"NEET-18 Web daily quiz UI","Timer, navigation, submit, result.",2,"feature,web,MVP,M1","I-WEB-2"
"NEET-19 Mobile daily quiz UI","Timer, submit, result.",2,"feature,mobile,MVP,M1","I-MOB-2"
"NEET-20 Streak logic","IST-based, daily reset job.",2,"feature,backend,MVP,M1","I-BE-1"
"NEET-21 Weekly/Monthly quizzes","Kinds + rank/percentile.",2,"feature,backend,MVP,M2","I-BE-2"
"NEET-22 Chapter/Subject/Mock tests","Template-driven test assembly.",2,"feature,backend,MVP,M2","I-BE-2"
"NEET-23 Attempt analytics","Compute breakdown on submission.",2,"feature,backend,MVP,M2","I-BE-3"
"NEET-24 Analytics UI (web)","Charts, filters, empty states.",2,"feature,web,MVP,M2","I-WEB-2"
"NEET-25 Analytics UI (mobile)","fl_chart, empty states.",3,"feature,mobile,MVP,M2","I-MOB-2"
"NEET-26 Leaderboards backend","Compute + endpoints per kind.",3,"feature,backend,MVP,M2","I-BE-3"
"NEET-27 Leaderboards UI","Web + mobile leaderboard screens.",3,"feature,web,mobile,MVP,M2","I-WEB-2,I-MOB-2"
"NEET-28 AI provider wrapper","Anthropic first, retryable.",2,"feature,backend,MVP,M3","I-BE-3"
"NEET-29 Doubt quota (5/day)","Atomic counter + reset.",2,"feature,backend,MVP,M3","I-BE-3"
"NEET-30 Web AI doubt UI","Chat panel, markdown/LaTeX, feedback.",2,"feature,web,MVP,M3","I-WEB-2"
"NEET-31 Mobile AI doubt UI","Chat, markdown, feedback.",3,"feature,mobile,MVP,M3","I-MOB-2"
"NEET-32 Notifications backend","Model, fanout, inbox endpoints.",3,"feature,backend,MVP,M3","I-BE-3"
"NEET-33 Daily quiz reminder","Email + in-app at 07:00 IST.",3,"feature,backend,MVP,M3","I-BE-3"
"NEET-34 Web notification bell","Bell + inbox drawer.",3,"feature,web,MVP,M3,good-first-issue","I-WEB-1"
"NEET-35 Mobile push","FCM, permission, delivery.",3,"feature,mobile,MVP,M3","I-MOB-1"
"NEET-36 Admin console shell","Role-guarded /admin.",2,"feature,web,MVP,M4","I-WEB-1"
"NEET-37 Admin question CRUD UI","Table, filters, edit modal.",2,"feature,web,MVP,M4","I-WEB-2"
"NEET-38 AI question generation","Backend endpoint + storage.",2,"feature,backend,MVP,M4","I-BE-3"
"NEET-39 AI question validation","Score + issues + recommendation.",2,"feature,backend,MVP,M4","I-BE-3"
"NEET-40 AI test generation","Template-driven assembly.",2,"feature,backend,MVP,M4","I-BE-3"
"NEET-41 Admin AI generation UI","UI for 38/39/40.",2,"feature,web,MVP,M4","I-WEB-2"
"NEET-42 Rate-limiting","Global + per-user rate limits.",2,"feature,backend,MVP,M4","I-BE-1"
"NEET-43 Sentry integration","Web + backend + mobile.",3,"chore,devops,MVP,M4","I-BE-1"
"NEET-44 Backend deploy","Choose host, deploy, secrets.",2,"chore,devops,MVP,M4","PM,I-BE-1"
"NEET-45 Web deploy","Vercel/Netlify, previews.",2,"chore,devops,MVP,M4","PM,I-WEB-1"
"NEET-46 Spike: CSV import","Investigate, propose approach.",3,"spike,backend,MVP,M4","I-BE-2"
"NEET-100 GenAI service scaffold","Python env, provider wrapper, structured outputs, manifest loader.",2,"feature,ml,MVP,M-AI","I-ML-1"
"NEET-101 Prompt bundle publish","Build+load JSON bundle in backend on boot.",2,"feature,ml,backend,MVP,M-AI","I-ML-1,I-BE-3"
"NEET-102 Doubt-solver v1 + eval","Prompt, gold set, LLM-as-judge scoring.",2,"feature,ml,eval,MVP,M-AI","I-ML-1"
"NEET-103 Q generation + schema","Prompt + pydantic schema, self-repair retry.",2,"feature,ml,MVP,M-AI","I-ML-2"
"NEET-104 Validation judge + panel","Deterministic judge, majority vote, backfill.",2,"feature,ml,eval,MVP,M-AI","I-ML-2"
"NEET-105 Test assembly + checker","Prompt + Python post-check for distribution.",2,"feature,ml,MVP,M-AI","I-ML-2"
"NEET-106 Embeddings dedupe","Backfill embeddings, similarity endpoint.",2,"feature,ml,MVP,M-AI","I-ML-3"
"NEET-107 RAG grounding","Ingest syllabus, retrieve at generation.",2,"feature,ml,MVP,M-AI","I-ML-1,I-ML-3"
"NEET-108 Guardrails + PII scrub","Scrub, post-call safety judge, jailbreak eval.",2,"feature,ml,backend,MVP,M-AI","I-ML-3"
"NEET-109 Weak-topic brief","Nightly LLM brief per user; drive quiz builder.",3,"feature,ml,MVP,M-AI","I-ML-3"
"NEET-110 Nightly eval + alerts","GH Action + regression pings.",3,"chore,ml,devops,MVP,M-AI","I-ML-1"
"NEET-111 Prompt-change PR gate","Fail PR if prompt changes without new eval.",3,"chore,ml,devops,MVP,M-AI","I-ML-1"
"NEET-112 Cost + latency dashboard","Log tokens/latency/cost; internal report.",3,"chore,ml,MVP,M-AI","I-ML-3"
"NEET-113 Spike: FT vs prompt+RAG","2-day timebox comparison.",4,"spike,ml,MVP,M-AI","I-ML-2"
```

Priority mapping (Linear): 1=Urgent (P0), 2=High (P1), 3=Medium (P2), 4=Low (P3).
