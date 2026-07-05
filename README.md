# Image Manager

A SEO- and performance-first image management app — upload, organize, tag, search, and share images.

- **Architecture & tech stack reasoning:** [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)
- **Feature backlog / build order:** [docs/ROADMAP.md](docs/ROADMAP.md)
- **AI agent handoff guide:** [CLAUDE.md](CLAUDE.md)

## Getting started

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command                        | Purpose                                                    |
| ------------------------------ | ---------------------------------------------------------- |
| `pnpm dev`                     | Start the dev server (Turbopack)                           |
| `pnpm build`                   | Production build                                           |
| `pnpm start`                   | Run the production build                                   |
| `pnpm lint`                    | ESLint                                                     |
| `pnpm format` / `format:check` | Prettier                                                   |
| `pnpm typecheck`               | `tsc --noEmit`                                             |
| `pnpm test` / `test:watch`     | Vitest                                                     |
| `pnpm test:e2e`                | Playwright (run `pnpm exec playwright install` once first) |
| `pnpm analyze`                 | Bundle analyzer build                                      |

## Stack

Next.js 16 (App Router, RSC, Cache Components) · TypeScript · Tailwind CSS · tRPC · Drizzle ORM · PostgreSQL (Neon) · Better-Auth · Cloudflare R2 · Vitest · Playwright. Full reasoning in [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md).

This is a scaffold — most of the above is planned, not wired up yet. See [docs/ROADMAP.md](docs/ROADMAP.md) for current status.
