# Contributing

Welcome. Read this once end-to-end before your first PR.

## The Loop

```
Linear ticket → branch → code → local test → PR → review → squash-merge → Linear "Done"
```

## Code Style

We enforce style with tooling. If tooling flags something, fix it — don't argue with the linter.

- **JS/TS** — ESLint + Prettier. Config lives in each app.
- **Dart** — `flutter analyze` + `dart format`.
- **Editors** — `.editorconfig` is committed; enable your editor's EditorConfig plugin.

### General rules

- Small functions. If a function needs a comment to explain its overall purpose, it's probably too big.
- Name things clearly. `getUserQuizAttempts` beats `getData`.
- Avoid premature abstraction. Three similar lines is better than a wrong helper.
- No dead code. If it's not called, delete it.
- No commented-out code — Git remembers.
- Comments explain **why**, not **what**.

### Frontend (web)

- Prefer Ant Design components. Tailwind for spacing/layout only.
- Server state goes through React Query. Never store server data in Zustand.
- Every API call goes through `src/lib/api.ts` — never `fetch` inline in a component.
- Every user-facing string should be extractable for i18n later — don't hard-code Hindi/English mixing.

### Backend

- Routes are thin. Business logic lives in `services/`.
- Validate every request body with `zod` at the route boundary. Never trust the client.
- Never return a raw Mongoose document — map to a DTO.
- Errors are thrown as `AppError`. The central error middleware converts them to JSON.
- Logs go through the logger, not `console.log`.

### Mobile (Flutter)

- One widget per file when it's non-trivial.
- Prefer `const` constructors.
- No business logic in widgets — push it into providers/services.
- Follow the feature-first layout: `lib/features/<feature>/{data,domain,ui}`.

## Testing

- Add tests for anything **non-trivial**: business logic, math, edge cases, bug fixes.
- Don't test framework glue.
- Don't chase 100% coverage. Chase useful tests.
- Backend integration tests hit a **real** Mongo (via `mongodb-memory-server` in CI). No mocks for the DB layer.

## Dependencies

- New dep? Justify it in the PR description. Small, well-maintained, and popular > large, abandoned, or exotic.
- Never introduce a dep for something a 30-line utility would do.
- Lockfiles are committed. Do not delete them casually.

## Secrets

- Never commit `.env`, API keys, or credentials.
- If you commit one by accident, tell the lead immediately and rotate the credential — do not just delete the file in the next commit; it lives in Git history.

## Documentation

- If your PR changes how something is run, configured, or consumed, update the doc in the same PR.
- Docs debt compounds fast. Do not ship undocumented magic.

## Reporting Bugs

- Open a Linear ticket in the appropriate project. Do not use GitHub issues except for public-facing tracking.
- For urgent issues (prod down, security), ping the lead directly.

## Being Nice

- Reviews critique the code, not the coder.
- Assume good intent.
- If a discussion is going more than 3 rounds in comments, hop on a call.
