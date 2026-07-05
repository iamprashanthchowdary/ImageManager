# lib/

Framework-agnostic utilities with no business logic: `cn()` class-merging helper, `env.ts` (typed/validated environment variables), `seo.ts` (metadata + JSON-LD builders shared across routes), `constants.ts`.

If a function needs a database connection or knows about a specific feature, it doesn't belong here — see `server/` or `features/`.
