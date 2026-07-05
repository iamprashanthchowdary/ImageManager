# server/

Server-only infrastructure, shared across all features. Nothing here is feature-specific.

- `db/` — database client + schema (Drizzle ORM, Postgres). Not wired up yet: added when the first feature needs persistence.
- `auth/` — authentication/session/RBAC setup (Better-Auth). Not wired up yet: added when the auth feature is built.
- `api/` — tRPC router setup (root router + shared context/middleware). Feature routers live alongside their feature in `features/<name>/`.

Rule of thumb: if code needs secrets or a server-only SDK, it lives under `server/`, not `lib/`.
