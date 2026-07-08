@AGENTS.md

# Image Manager — agent handoff guide

Read this before touching code. It's written so any AI session — including one with no memory of prior conversations — can pick up exactly where the last one left off.

## What this is

A SEO- and performance-first Image Manager (upload, organize, tag, search, share images). Full reasoning for every technology choice lives in [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md). The feature backlog and build order lives in [docs/ROADMAP.md](docs/ROADMAP.md) — **check it first** to know what's already shipped vs. what's next.

## Current state (read this before assuming anything is wired up)

This repo is a **scaffold only**. Nothing below has real code yet, on purpose — each is added when its first feature needs it, not speculatively:

- No database connection (`src/server/db/` is an empty stub)
- No auth (`src/server/auth/` is an empty stub)
- No tRPC router (`src/server/api/` is an empty stub)
- No storage/CDN/image-processing integration

The design system (tokens + Button/Badge/Panel/AppShell/Sidebar/ThemeToggle) **is** wired up — see [Design system](#design-system) below. Additional primitives (input, dialog, dropdown, toast, etc.) are added on demand, per feature, not speculatively.

Do not add the still-missing pieces speculatively. Add each one in the commit/PR that actually needs it, per [docs/ROADMAP.md](docs/ROADMAP.md).

## Tech stack (why → docs/ARCHITECTURE.md §1)

| Layer            | Choice                                                                                                                                                            |
| ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Framework        | Next.js 16 (App Router, React Server Components, Cache Components)                                                                                                |
| Language         | TypeScript, strict mode                                                                                                                                           |
| API              | tRPC (internal, typed) + Route Handlers (public/webhooks)                                                                                                         |
| ORM / DB         | Drizzle ORM / PostgreSQL (Neon)                                                                                                                                   |
| Auth             | Better-Auth (RBAC via organization plugin)                                                                                                                        |
| Styling          | Tailwind CSS v4 + custom Apple HIG-inspired design tokens (`src/app/globals.css`), `next-themes` for dark mode, `class-variance-authority` for component variants |
| Image processing | Sharp (server-side resize/AVIF/WebP) + `next/image`                                                                                                               |
| Storage          | Cloudflare R2 (S3-compatible, zero egress)                                                                                                                        |
| Caching          | Upstash Redis + Next.js Cache Components                                                                                                                          |
| CDN / hosting    | Vercel (app) + Cloudflare (R2 assets)                                                                                                                             |
| Package manager  | pnpm                                                                                                                                                              |
| Testing          | Vitest + Testing Library (unit), Playwright (e2e)                                                                                                                 |
| Lint/format      | ESLint (`eslint-config-next`, includes `jsx-a11y`) + Prettier                                                                                                     |
| State            | Server state via TanStack Query/tRPC; client UI state via Zustand; forms via React Hook Form + Zod                                                                |

## Framework-specific gotchas (Next.js 16 — do not use stale Next 14/15 patterns)

These are recent enough that pretrained knowledge is likely wrong. Verify against `node_modules/next/dist/docs/` if unsure — it ships the version-matched docs.

1. **Middleware is now "Proxy."** The file is `proxy.ts` (exporting `proxy()`), not `middleware.ts`. Same purpose, new name.
2. **Cache Components is enabled** (`cacheComponents: true` in `next.config.ts`). This makes Partial Prerendering the default rendering model. Use the `"use cache"` directive (+ `cacheLife()`/`cacheTag()` from `next/cache`) to cache data or components; wrap genuinely per-request/uncached data in `<Suspense>`. Don't reach for the old `export const revalidate = ...` / `fetch(..., { next: { revalidate } })` route-segment-config model — read `docs/app/getting-started/caching.md` in `node_modules/next` before writing caching code.
3. `params` and `searchParams` in pages/layouts are `Promise`s — `await` them.

## Design system

Apple HIG-inspired: clarity/deference/depth, near-monochrome UI with a single accent color, content (the images) is the hero. Full token source: `src/app/globals.css`. Don't hardcode colors/spacing/radii in components — always use the tokens below.

**Color tokens** (oklch, light/dark pair via `.dark` class, named after Apple's semantic color roles): `bg`, `bg-secondary`, `bg-elevated`, `border`, `border-subtle`, `label` (primary text), `secondary-label`, `tertiary-label`, `accent`, `accent-subtle`. Used as Tailwind utilities directly, e.g. `bg-bg-secondary`, `text-label`, `border-border-subtle`.

**Type scale** (Apple HIG names, `font-display` for headings / `font-sans` for body — both resolve to the OS system font, no webfont download): `text-large-title` (34px/700), `text-title-1` (28px/700), `text-title-2` (22px/700), `text-title-3` (20px/600), `text-headline` (17px/600), `text-body` (17px/400), `text-subhead` (15px/400), `text-footnote` (13px/400). Pair with a `font-*` weight utility; `font-medium` is remapped to 590 (SF Pro's true "Medium") rather than the CSS-standard 500.

**Radius scale:** `rounded-sm` (6px) → `rounded-md` (10px) → `rounded-lg` (14px) → `rounded-xl` (20px) → `rounded-2xl` (28px). **Shadow/elevation scale:** `shadow-e1`…`shadow-e4`, low-opacity and tinted (not flat black) — depth comes from these + translucency, not hard borders (hairline borders only where a real edge is needed: sidebar, inputs).

**Dark mode:** `next-themes`, class strategy (`.dark` on `<html>`), defaults to system preference, user-toggleable via `<ThemeToggle>` (`src/components/layout/theme-toggle.tsx`). If you add a component that reads `useTheme()`, gate first-render-dependent output on a `mounted` flag (see that file for the pattern + why) — otherwise the `react-hooks/set-state-in-effect` lint rule will flag it, and skipping the gate causes a real one-frame flash of the wrong theme.

**Components that exist today** (`src/components/ui/`: `Button`, `Badge`, `Panel`; `src/components/layout/`: `AppShell`, `Sidebar`/`SidebarSection`/`SidebarItem`, `ThemeToggle`, `ThemeProvider`). Nothing else (input, select, dialog, dropdown, toast, avatar...) exists yet — add it in the feature commit that first needs it, matching the same token/variant conventions (`cva` for variants, tokens above for color/spacing), not ahead of time.

**JSX whitespace gotcha:** when text follows a `</code>` (or any inline element) and the JSX source line-wraps before the next closing tag, JSX's whitespace-collapsing can silently eat the space (e.g. `docs/ROADMAP.md</code> for what's next.` wrapping before `</p>` renders as `...mdfor...`). Prettier can also reintroduce this by rewrapping lines you'd manually fixed with `{" "}`. The robust fix is a full string expression, not a trailing `{" "}`: `{" for what's next."}` as its own child — Prettier won't reformat inside a string literal, so it can't reintroduce the bug. See `src/app/page.tsx` for the working pattern.

## Conventions

- **Feature-based structure.** Business logic lives in `src/features/<name>/`, not in `src/app/`. `src/app/` is routing + composition only. See [src/features/README.md](src/features/README.md).
- **No speculative abstraction.** Don't build a plugin system, a generic repository layer, or config for hypothetical future needs. Three similar lines beat a premature abstraction.
- **Validation source of truth is Zod.** Define a feature's schema once in `schema.ts`, infer TS types from it (`z.infer<...>`), reuse it for form validation, server action input, and tRPC input.
- **Every feature ships with:** a co-located Vitest test for non-trivial logic, and — once the feature has a user-visible flow — one Playwright happy-path spec in `e2e/`.
- **Accessibility is a hard requirement, not a nice-to-have** (this project targets Lighthouse a11y 100). Semantic HTML first; reach for ARIA only when semantic HTML can't express it. Every image needs real `alt` text — never leave it empty or auto-generated from a filename.
- **Commits:** conventional-commit-style prefixes (`feat:`, `fix:`, `chore:`, `docs:`) since the CI/changelog story will likely lean on them later.
- No comments explaining _what_ code does — only _why_, and only when non-obvious (see root project conventions).

## Workflow for picking up a new feature

1. Read [docs/ROADMAP.md](docs/ROADMAP.md) — find the feature, its scope, and any noted dependencies (e.g. "needs auth first").
2. If the feature needs a piece of infrastructure that's still a stub (db/auth/storage/etc.), wire up _only_ the minimal slice needed — don't set up the whole subsystem in one shot if the feature only touches part of it.
3. Build it under `src/features/<name>/` following the shape in `src/features/README.md`.
4. Add/update tests as described above.
5. Update `docs/ROADMAP.md` — move the feature to done, note any deviation from the original plan and why.
6. Run `pnpm lint && pnpm typecheck && pnpm test && pnpm build` before considering it done — CI runs the same checks.

## Commands

```
pnpm dev          # start dev server (Turbopack)
pnpm build        # production build
pnpm lint         # eslint
pnpm format       # prettier --write
pnpm typecheck    # tsc --noEmit
pnpm test         # vitest run
pnpm test:e2e     # playwright (run `pnpm exec playwright install` once first)
pnpm analyze      # bundle analyzer build
```
