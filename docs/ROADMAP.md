# Roadmap

Status tracker for feature-incremental development. Update this file as part of finishing any feature — see the workflow in [CLAUDE.md](../CLAUDE.md). Don't build ahead of this list; don't leave it stale behind what's actually shipped.

Status values: `not started` · `in progress` · `done`

## Phase 0 — Scaffold

| Item                                                        | Status |
| ----------------------------------------------------------- | ------ |
| Next.js 16 + TypeScript + Tailwind scaffold                 | done   |
| Feature-based folder structure                              | done   |
| ESLint + Prettier + Vitest + Playwright + Husky/lint-staged | done   |
| CI (lint/typecheck/test/build)                              | done   |
| Architecture & AI-handoff docs                              | done   |
| Git repo pushed to GitHub                                   | done   |

## Phase 1 — Design system

_Waiting on input: colors, typography, spacing scale, component library preference (build on Radix primitives vs. adopt shadcn/ui vs. fully custom)._

| Item                                                                                   | Status      |
| -------------------------------------------------------------------------------------- | ----------- |
| Design tokens (color/type/spacing)                                                     | not started |
| Core primitives in `src/components/ui/` (button, input, dialog, dropdown, toast, etc.) | not started |
| App shell (`src/components/layout/`: header, nav, footer)                              | not started |

## Phase 2 — Auth

| Item                                               | Status      |
| -------------------------------------------------- | ----------- |
| Better-Auth setup + session handling               | not started |
| `users` / `organizations` / `memberships` schema   | not started |
| Sign in / sign up / sign out flow                  | not started |
| `proxy.ts` optimistic route protection             | not started |
| Role-based permissions (owner/admin/member/viewer) | not started |

## Phase 3 — Core image storage

| Item                                                      | Status      |
| --------------------------------------------------------- | ----------- |
| Cloudflare R2 bucket + SDK wiring                         | not started |
| `images` / `folders` schema (Drizzle + Neon)              | not started |
| Upload (single + bulk)                                    | not started |
| Drag-and-drop upload                                      | not started |
| Sharp processing pipeline (resize, AVIF/WebP, thumbnails) | not started |
| Image preview                                             | not started |
| Metadata viewing (dimensions, size, EXIF where relevant)  | not started |
| Rename / delete / move / duplicate                        | not started |
| Folder organization (nested folders)                      | not started |

## Phase 4 — Organization & discovery

| Item                                        | Status      |
| ------------------------------------------- | ----------- |
| Tags (create/assign/remove)                 | not started |
| Search                                      | not started |
| Filters (type, tag, folder, date)           | not started |
| Bulk actions (multi-select delete/move/tag) | not started |
| Favorites                                   | not started |
| Collections                                 | not started |

## Phase 5 — Sharing (public/SEO surface)

| Item                                                                   | Status      |
| ---------------------------------------------------------------------- | ----------- |
| Secure public share links (signed, expiring tokens)                    | not started |
| Public share page (SSR/ISR, full SEO treatment per ARCHITECTURE.md §8) | not started |
| JSON-LD (ImageObject, BreadcrumbList, CollectionPage)                  | not started |
| Dynamic OG image generation per share/collection                       | not started |
| Sitemap/robots reflecting real public URLs                             | not started |

## Phase 6 — Hardening

| Item                                                     | Status      |
| -------------------------------------------------------- | ----------- |
| Sentry + Speed Insights wired to a real deployment       | not started |
| Lighthouse CI budget gate in CI                          | not started |
| Playwright e2e job in CI (against a deployed preview)    | not started |
| Security review pass (rate limiting live, CSP finalized) | not started |
| PostHog analytics + feature flags                        | not started |

---

**Next up:** waiting on the user for (1) the design system direction and (2) which feature to build first — see Phase 1/2 ordering above as the suggested default if no preference is given.
