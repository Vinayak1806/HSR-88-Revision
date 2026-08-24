# Git Workflow & Branch Rules

Everyone on the team follows this. No exceptions without approval from the project lead.

## Branch Model

We use a lightweight **trunk-based flow with a shared `develop` integration branch**.

```
main       ← production-ready. Tagged releases only. Protected.
  ▲
develop    ← integration. All feature branches merge here. Protected.
  ▲
feat/*     ← feature work
fix/*      ← bug fixes
chore/*    ← tooling, deps, non-user-facing
docs/*     ← doc-only changes
hotfix/*   ← urgent prod fix branched from main
```

### Branch naming

Format: `<type>/<TICKET-ID>-<short-slug>`

Examples:
- `feat/NEET-42-daily-quiz-endpoint`
- `fix/NEET-88-streak-reset-off-by-one`
- `chore/NEET-15-add-eslint-config`
- `docs/NEET-101-update-onboarding`
- `hotfix/NEET-201-broken-login`

Rules:
- Lowercase, kebab-case slug.
- Ticket ID is **required** unless the change is trivial (typos, README nits) — those may use `chore/no-ticket-<slug>`.
- Keep slugs ≤ 5 words.

## Commit Messages

Use **Conventional Commits**:

```
<type>(<scope>): <subject>

<optional body>

<optional footer>
```

- `type` — `feat`, `fix`, `chore`, `docs`, `refactor`, `test`, `perf`, `build`, `ci`, `revert`
- `scope` — `web`, `backend`, `mobile`, `docs`, `ci`, or a feature area (`quiz`, `auth`, `ai`, `analytics`, `community`, `notifications`, `admin`)
- Subject in imperative mood, ≤ 72 chars, no trailing period.

Examples:
```
feat(quiz): add daily quiz endpoint
fix(auth): rotate refresh token on login
docs(readme): document env variables
```

Reference the Linear ticket in the body:
```
feat(quiz): add daily quiz endpoint

Adds POST /api/quizzes/daily. Question selection is randomised per user
using their weak-topic profile.

Refs: NEET-42
```

## Workflow — Feature

1. `git checkout develop && git pull`
2. `git checkout -b feat/NEET-42-daily-quiz-endpoint`
3. Commit early, commit often. Push at least once a day so work is not lost.
4. Rebase onto latest `develop` before opening a PR:
   ```
   git fetch origin
   git rebase origin/develop
   ```
5. Open a PR into `develop` using the PR template.
6. Address review comments in **new commits** (do not force-push while review is in progress — reviewers lose context).
7. Once approved and CI is green, **squash-merge**. The PM or a maintainer performs the merge.
8. Delete the branch.

## Workflow — Hotfix

1. Branch `hotfix/NEET-XXX-...` off `main`.
2. Fix, PR to `main` **and** to `develop` (or merge `main` back into `develop` after).
3. Tag a patch release on `main`.

## Branch Protection Rules (configure in GitHub)

For `main`:
- Require PR before merge
- Require **2 approving reviews**
- Require CI to pass (`ci/build`, `ci/test`, `ci/lint`)
- Require branches to be up to date before merging
- Require signed commits (recommended, not blocking initially)
- Disallow direct pushes and force-pushes
- Include administrators

For `develop`:
- Require PR before merge
- Require **1 approving review**
- Require CI to pass
- Require branches to be up to date before merging
- Disallow direct pushes and force-pushes

## Rebasing vs Merging

- **Inside a feature branch** — rebase onto `develop` to keep history clean.
- **Into `develop`** — always **squash-merge** via the GitHub UI.
- **From `develop` into `main`** — release PR, merge commit (preserves the release moment in history).

## What NOT to Do

- ❌ Don't push directly to `main` or `develop`.
- ❌ Don't force-push a shared branch.
- ❌ Don't merge your own PR without a review (except trivial doc-only PRs and only if the lead has whitelisted you).
- ❌ Don't commit secrets. Ever. If you do, rotate the secret immediately and tell the lead.
- ❌ Don't mix unrelated changes in one PR. Split them.
- ❌ Don't `git commit --no-verify`. Fix the pre-commit issue.

## Handling Merge Conflicts

Prefer resolving in your feature branch by rebasing onto latest `develop`. If a conflict is tricky, pair up — don't guess.
