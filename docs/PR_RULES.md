# Pull Request Rules

Every code change reaches `develop` (and eventually `main`) via a Pull Request. These are the ground rules.

## Before You Open a PR

- [ ] Rebased onto latest `develop`
- [ ] Lint passes locally (`npm run lint` in the app)
- [ ] Tests pass locally (`npm test` / `flutter test`)
- [ ] Type-check passes (`npm run typecheck` / `flutter analyze`)
- [ ] You ran the app and manually verified the change
- [ ] No `console.log` / `print` debug spam in shipped files
- [ ] No commented-out code
- [ ] No secrets, tokens, or personal data in the diff
- [ ] The Linear ticket has been moved to **In Review**

## PR Title

Same format as commit subject:

```
<type>(<scope>): <subject> (NEET-XXX)
```

Example:
```
feat(quiz): add daily quiz endpoint (NEET-42)
```

## PR Description

Use the template in `.github/PULL_REQUEST_TEMPLATE.md`. Minimum required:

- **What** — one line, plain English
- **Why** — link to the Linear ticket + a sentence on motivation
- **How** — key implementation decisions (only if non-obvious)
- **Screenshots / recording** — mandatory for UI changes
- **Test plan** — bulleted list of what you actually tested
- **Rollout notes** — anything reviewers or ops need to know (new env var, DB migration, feature flag)

## Size

- **Ideal PR:** < 400 lines of diff (excluding lockfiles, snapshots, generated code).
- **Hard cap:** 800 lines. Above that, split — split by module or by "scaffolding vs behavior".

Big PRs get bounced back to be split. It's not personal; small PRs get reviewed faster and merge sooner.

## Review

- **`develop`** — 1 approving review from a peer.
- **`main`** — 2 approving reviews, at least 1 from the lead.
- Reviewers respond within **1 business day**. If you can't, hand the review to someone else.
- Authors respond to comments within **1 business day**.

### Review checklist (for reviewers)

- Does it do what the ticket says? Nothing more, nothing less.
- Is the change safe for existing users (data migrations, breaking API changes)?
- Are edge cases handled — empty states, errors, network failures?
- Are new dependencies justified? (Every new dep is a supply-chain risk.)
- Does it match the style of the surrounding code?
- Are there tests for anything non-trivial?
- Any obvious perf or security issues?

## Merging

- **Squash-merge** into `develop`.
- **Merge commit** from `develop` into `main` on release.
- The final squash message follows the same Conventional Commits format as the PR title.
- Delete the branch after merge.

## After Merge

- Move the Linear ticket to **Done**.
- If the change introduces user-visible behavior, add a line to the running changelog (`docs/CHANGELOG.md`, create if absent).
- Deploy according to the environment target the ticket asks for.

## Draft PRs

Open a **Draft** PR early — as soon as there's something to look at — even if it's not ready for review. Useful for:
- Getting early feedback on direction
- Signaling "I'm working on this" (avoids duplicate work)
- Letting CI run against your branch

Convert to **Ready for review** only when the checklist at the top is green.
