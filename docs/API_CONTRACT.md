# API Contract & Conventions

Rules the backend must follow and the web/mobile clients can rely on.

## Base

- All endpoints are prefixed with `/api`.
- Content type: `application/json; charset=utf-8`.
- Every response is a JSON object. Never return a bare array at the top level (breaks future evolution).

## Response shape

**Success**

```json
{
  "data": { ... }        // object or array under this key
}
```

**Error**

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Human-readable message",
    "details": { ... }   // optional, structured
  }
}
```

Error `code` is a stable machine-readable slug. `message` may change wording; `code` cannot.

## Status codes

| Code | When                                            |
|------|-------------------------------------------------|
| 200  | Success, response body present                  |
| 201  | Resource created                                |
| 204  | Success, no body                                |
| 400  | Validation error, malformed request             |
| 401  | Missing or invalid auth                         |
| 403  | Authenticated but not allowed                   |
| 404  | Resource does not exist                         |
| 409  | Conflict (e.g., duplicate email)                |
| 422  | Semantic validation failure                     |
| 429  | Rate limit exceeded                             |
| 500  | Unexpected server error                         |

## Auth

- **Access token** — short-lived JWT, sent in `Authorization: Bearer <token>` header.
- **Refresh token** — longer-lived, stored server-side as an httpOnly cookie (`Set-Cookie: refresh=...; HttpOnly; Secure; SameSite=Lax`).
- Refresh rotates on every use.

## Pagination

Cursor-based:

```
GET /api/quizzes?limit=20&cursor=abc
```

Response:

```json
{
  "data": {
    "items": [ ... ],
    "nextCursor": "def"   // null when done
  }
}
```

## Naming

- URLs: kebab-case (`/quiz-attempts`)
- JSON keys: camelCase (`quizId`, `submittedAt`)
- Resource collections plural (`/quizzes`, `/users`)
- Nested resources under owner (`/users/:id/attempts`)

## Versioning

Don't version until a breaking change is unavoidable. When it is, add `/api/v2/...` and keep `/api/v1/...` running for at least 30 days.

## Idempotency

Any endpoint that creates or charges something (Phase 2 payments) accepts an `Idempotency-Key` header. The server stores the response for 24h keyed on it.

## Rate limits

- Public endpoints (`/api/auth/*`): 20 req/min per IP.
- Authenticated endpoints: 120 req/min per user.
- AI doubt endpoint: hard cap by daily limit **first**, then rate-limited.

Return `429` with a `Retry-After` header.

## Time

- All timestamps are **ISO 8601 UTC** strings (`2026-08-24T12:34:56.000Z`). Never epoch, never local.

## IDs

- Mongo `ObjectId` as string. Do not expose internal numeric IDs.

## Documentation

Each endpoint is documented in the module folder under `apps/backend/src/routes/<module>/README.md` with:

- Method + path
- Purpose (1 line)
- Request shape
- Response shape
- Errors it can throw
- Example curl

When we're closer to launch, we'll generate OpenAPI from `zod` schemas — but the module README is the source of truth in the interim.
