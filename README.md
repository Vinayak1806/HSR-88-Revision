# NEET Aspirants Community

> Practice every day. Clear doubts with AI. Track preparation. Prepare smarter for NEET.

A free, AI-powered digital community and preparation ecosystem for NEET UG aspirants. This monorepo houses the web app, backend API, and mobile app.

---

## Table of Contents

1. [Product Overview](#product-overview)
2. [Repository Layout](#repository-layout)
3. [Tech Stack](#tech-stack)
4. [Prerequisites](#prerequisites)
5. [Quick Start](#quick-start)
6. [Environment Variables](#environment-variables)
7. [Development Workflow](#development-workflow)
8. [Documentation Index](#documentation-index)
9. [Team](#team)

---

## Product Overview

NEET Aspirants Community offers:

- **Daily / Weekly / Monthly quizzes** and **Major test series** (chapter, subject, full-syllabus mocks)
- **AI Doubt Solver** — 5 free daily sessions per student
- **Performance Analytics** — accuracy, rank, percentile, weak-topic detection
- **Community** — subject discussions, study strategy, motivation
- **Gamification** — streaks, badges, leaderboards
- **Admin tooling** — AI-assisted question generation, validation, and test assembly

The core preparation experience is free. See [PRD context](docs/PRODUCT_CONTEXT.md) for the full product vision.

---

## Repository Layout

This is a polyglot monorepo. Each app owns its own dependencies and can be run independently.

```
NEET-Community/
├── apps/
│   ├── web/          # Student Dashboard — React + Vite + TS + Tailwind + Ant Design
│   ├── backend/      # API — Node + Express + TypeScript + MongoDB (Mongoose)
│   └── mobile/       # Flutter app for Android/iOS
├── services/
│   └── ml/           # GenAI / ML — Python 3.11 (prompts, evals, RAG, guardrails)
├── docs/             # Architecture, workflow, onboarding, tickets, PR/branch rules
├── .github/          # PR template, issue templates, CI workflows
├── .editorconfig
├── .nvmrc
├── .gitignore
└── README.md
```

Each app also has its own `README.md` with app-specific instructions.

---

## Tech Stack

| Layer            | Choice                                            |
|------------------|---------------------------------------------------|
| Web frontend     | React 18, Vite, TypeScript, Tailwind CSS, Ant Design |
| State / data     | React Query (server state), Zustand (UI state)    |
| Backend          | Node.js 20, Express, TypeScript                   |
| Database         | MongoDB (Mongoose ODM)                            |
| Auth             | JWT (access + refresh)                            |
| Mobile           | Flutter 3.x (Dart), Riverpod                      |
| GenAI / ML       | Python 3.11, provider-agnostic LLM wrapper (Anthropic / OpenAI), pydantic structured outputs, RAG via sentence-transformers |
| CI               | GitHub Actions                                    |
| Ticketing        | Linear                                            |

---

## Prerequisites

- **Node.js** 20 (use `nvm use` to pick up `.nvmrc`)
- **npm** 10+ (or **pnpm** if the team standardizes on it later)
- **MongoDB** 6+ (local or Atlas)
- **Flutter** 3.19+ with a configured Android/iOS toolchain (mobile devs only)
- **Git** 2.40+

---

## Quick Start

Clone and bootstrap each app:

```bash
git clone <repo-url> neet-community
cd neet-community

# Backend
cd apps/backend
cp .env.example .env      # then fill in MONGO_URI etc.
npm install
npm run dev               # http://localhost:4000

# Web (new terminal)
cd apps/web
cp .env.example .env
npm install
npm run dev               # http://localhost:5173

# Mobile (new terminal, mobile devs only)
cd apps/mobile
flutter pub get
flutter run
```

Backend must be running before the web/mobile apps expect data.

---

## Environment Variables

Every app has a `.env.example` at its root. Never commit real secrets. Add new variables to the example file with a placeholder so teammates know they exist.

See [docs/ENVIRONMENT.md](docs/ENVIRONMENT.md) for the full variable reference.

---

## Development Workflow

1. Pick a Linear ticket assigned to you (or self-assign one from the backlog).
2. Create a branch off `develop`: `feat/NEET-123-daily-quiz-api` (see [docs/GIT_WORKFLOW.md](docs/GIT_WORKFLOW.md)).
3. Commit using Conventional Commits: `feat(backend): add daily quiz endpoint`.
4. Open a PR into `develop` using the PR template. Link the Linear ticket in the title/description.
5. Get at least **1 approving review** and green CI before merge.
6. Squash-merge. Delete the branch.

Full rules: [docs/GIT_WORKFLOW.md](docs/GIT_WORKFLOW.md), [docs/CONTRIBUTING.md](docs/CONTRIBUTING.md).

---

## Documentation Index

- [Product context (from PRD)](docs/PRODUCT_CONTEXT.md)
- [Architecture overview](docs/ARCHITECTURE.md)
- [Git workflow & branch rules](docs/GIT_WORKFLOW.md)
- [Pull request rules](docs/PR_RULES.md)
- [Contributing guide](docs/CONTRIBUTING.md)
- [Environment variables](docs/ENVIRONMENT.md)
- [Onboarding for new engineers](docs/ONBOARDING.md)
- [Linear tickets (import-ready)](docs/LINEAR_TICKETS.md)
- [Team assignments](docs/TEAM_ASSIGNMENTS.md)
- [API contract & conventions](docs/API_CONTRACT.md)

Per-app READMEs:

- [apps/web/README.md](apps/web/README.md)
- [apps/backend/README.md](apps/backend/README.md)
- [apps/mobile/README.md](apps/mobile/README.md)
- [services/ml/README.md](services/ml/README.md)

---

## Team

| Role                | Owner                                    |
|---------------------|------------------------------------------|
| Project lead / PM   | Himanshu Raj (`himanshu@myaifrontdesk.com`) |
| Web engineering     | *TBD interns — see docs/TEAM_ASSIGNMENTS.md* |
| Backend engineering | *TBD interns — see docs/TEAM_ASSIGNMENTS.md* |
| Mobile engineering  | *TBD interns — see docs/TEAM_ASSIGNMENTS.md* |
| GenAI / ML engineering | *TBD interns — see docs/TEAM_ASSIGNMENTS.md* |
| Academic review     | *TBD*                                    |

---

## License

Proprietary — internal use only until an OSS decision is made.
