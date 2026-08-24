# Onboarding — NEET Aspirants Community

Welcome to the team. This is a step-by-step so you can be productive by end of day 1.

## Day 0 — Access

Before your first day, the lead should have granted you:

- GitHub access to the `neet-community` repo
- Linear access to the "NEET Community" workspace
- Slack / Discord invite to the internal channel
- (If applicable) MongoDB Atlas invite to the dev cluster
- (If applicable) AI provider access (dev key only)

If any of the above is missing, ping the lead.

## Day 1 — Setup

### 1. Install tools

| Tool     | Version   | Install                                  |
|----------|-----------|------------------------------------------|
| Node.js  | 20.x      | `nvm install 20 && nvm use`              |
| npm      | 10+       | comes with Node 20                       |
| Git      | 2.40+     | brew / apt / winget                      |
| MongoDB  | 6+        | brew / Docker (`docker run -p 27017:27017 mongo:6`) |
| Flutter  | 3.19+     | https://docs.flutter.dev/get-started/install (mobile devs only) |

### 2. Clone and bootstrap

```bash
git clone <repo-url> neet-community
cd neet-community

# Backend
cd apps/backend
cp .env.example .env         # fill in MONGO_URI, JWT secrets, AI key
npm install
npm run dev

# Web (new terminal)
cd apps/web
cp .env.example .env
npm install
npm run dev
```

Open http://localhost:5173 — you should see the dashboard shell talking to the backend.

### 3. Read these, in order

1. [README.md](../README.md) — repo map
2. [PRODUCT_CONTEXT.md](PRODUCT_CONTEXT.md) — what we're building and why
3. [ARCHITECTURE.md](ARCHITECTURE.md) — how the pieces fit
4. [GIT_WORKFLOW.md](GIT_WORKFLOW.md) — branches, commits, merges
5. [PR_RULES.md](PR_RULES.md) — how to open and get PRs merged
6. [CONTRIBUTING.md](CONTRIBUTING.md) — code style + expectations
7. The `README.md` for the app you'll work on (`apps/web`, `apps/backend`, or `apps/mobile`)

### 4. Pick a starter ticket

Every intern has a **"Starter" ticket** waiting in Linear tagged `good-first-issue`. It should take under half a day and forces you to touch the full loop: branch → commit → PR → review → merge.

See [TEAM_ASSIGNMENTS.md](TEAM_ASSIGNMENTS.md).

### 5. Ship it

- Branch off `develop`.
- Commit using Conventional Commits.
- Open a PR into `develop`.
- Get review from the lead. Merge. Delete branch.

Once you've closed your first ticket end-to-end, you're "onboarded".

## Week 1 — Rhythm

- **Standup** — 10:00 IST daily, 10 min max. What you did yesterday, what you're doing today, blockers.
- **PR review turnaround** — 1 business day for reviewers, 1 business day for authors on comments.
- **1:1 with lead** — 30 min weekly.
- **Retro** — end of week, 30 min.

## Where things live

| Thing                       | Place                             |
|-----------------------------|-----------------------------------|
| Code                        | This repo                         |
| Tickets                     | Linear — `NEET` project           |
| Docs                        | `docs/` in this repo              |
| Design (later)              | Figma (link TBD)                  |
| Chat                        | Slack `#neet-community`           |
| Deployments (later)         | GitHub Actions → hosting platform |

## Getting Unstuck

1. Search the repo (`grep -r`) and docs.
2. Ask in the team channel.
3. If blocked > 1 hour, ping the lead. Don't sit stuck for a day.

## First-week checklist

- [ ] Dev env is running (backend + your app locally)
- [ ] You've read all the docs listed above
- [ ] You've merged your starter PR
- [ ] You've reviewed at least 1 teammate's PR
- [ ] You've moved a real feature ticket to In Progress
