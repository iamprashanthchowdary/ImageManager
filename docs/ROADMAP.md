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

Apple HIG-inspired (clarity/deference/depth), oklch tokens, system font stack, light/dark via `next-themes`. Full token reference: [CLAUDE.md](../CLAUDE.md#design-system).

| Item                                                                                 | Status                                              |
| ------------------------------------------------------------------------------------ | --------------------------------------------------- |
| Design tokens (color/type/spacing/radius/shadow) — `src/app/globals.css`             | done                                                |
| Core primitives in `src/components/ui/`: Button, Badge, Panel                        | done                                                |
| App shell in `src/components/layout/`: AppShell, Sidebar, ThemeToggle, ThemeProvider | done                                                |
| Toast (`src/components/ui/toast.tsx`)                                                | done — built in Phase 2 for the delete/undo pattern |
| Other primitives (input, select, dialog, dropdown, avatar, etc.)                     | add each when a feature needs it, not speculatively |

## Phase 2 — Crop tool

`/crop`. Fully client-side (no auth/storage dependency) — crops in the browser via canvas, exports as a direct download. This is the first real product feature; it deliberately ships ahead of Auth/Storage because it doesn't need either. Interaction model follows Apple Photos: pick a ratio, the crop frame is fixed, pan/zoom the image underneath it (not a resizable marquee).

| Item                                                                                           | Status |
| ---------------------------------------------------------------------------------------------- | ------ |
| Image selection (drag-and-drop or file picker, local file only)                                | done   |
| Crop workspace (fixed-frame pan/zoom, `react-easy-crop`)                                       | done   |
| Ratio presets: curated social sizes (Instagram, YouTube, Twitter/X, Facebook, Pinterest, etc.) | done   |
| Custom ratio (save your own W:H)                                                               | done   |
| Delete a preset (built-in or custom), non-destructive — undo via toast, built-ins restorable   | done   |
| Export cropped image as PNG download                                                           | done   |
| Preferences persisted in `localStorage` (no account needed yet)                                | done   |

**Future increment (needs Phase 3 — Auth):** sync custom ratios + deletions to the user's account instead of `localStorage`, so they follow the user across devices. Not built now — `localStorage` is the right amount of persistence for an anonymous tool.

## Phase 3 — Auth

| Item                                               | Status      |
| -------------------------------------------------- | ----------- |
| Better-Auth setup + session handling               | not started |
| `users` / `organizations` / `memberships` schema   | not started |
| Sign in / sign up / sign out flow                  | not started |
| `proxy.ts` optimistic route protection             | not started |
| Role-based permissions (owner/admin/member/viewer) | not started |

## Phase 4 — Core image storage

| Item                                                                                                                                                              | Status      |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| Cloudflare R2 bucket + SDK wiring                                                                                                                                 | not started |
| `images` / `folders` schema (Drizzle + Neon)                                                                                                                      | not started |
| Upload (single + bulk)                                                                                                                                            | not started |
| Drag-and-drop upload — visual spec in [docs/design/design-system-reference.html](design/design-system-reference.html); can reuse/extend Phase 2's `ImageDropzone` | not started |
| Sharp processing pipeline (resize, AVIF/WebP, thumbnails)                                                                                                         | not started |
| Image preview                                                                                                                                                     | not started |
| Metadata viewing (dimensions, size, EXIF where relevant)                                                                                                          | not started |
| Rename / delete / move / duplicate                                                                                                                                | not started |
| Folder organization (nested folders)                                                                                                                              | not started |

## Phase 5 — Organization & discovery

| Item                                        | Status      |
| ------------------------------------------- | ----------- |
| Tags (create/assign/remove)                 | not started |
| Search                                      | not started |
| Filters (type, tag, folder, date)           | not started |
| Bulk actions (multi-select delete/move/tag) | not started |
| Favorites                                   | not started |
| Collections                                 | not started |

## Phase 6 — Sharing (public/SEO surface)

| Item                                                                   | Status      |
| ---------------------------------------------------------------------- | ----------- |
| Secure public share links (signed, expiring tokens)                    | not started |
| Public share page (SSR/ISR, full SEO treatment per ARCHITECTURE.md §8) | not started |
| JSON-LD (ImageObject, BreadcrumbList, CollectionPage)                  | not started |
| Dynamic OG image generation per share/collection                       | not started |
| Sitemap/robots reflecting real public URLs                             | not started |

## Phase 7 — Hardening

| Item                                                                             | Status      |
| -------------------------------------------------------------------------------- | ----------- |
| Sentry + Speed Insights wired to a real deployment                               | not started |
| Lighthouse CI budget gate in CI                                                  | not started |
| Playwright e2e job in CI (runs `pnpm build && pnpm start` locally in the runner) | done        |
| Security review pass (rate limiting live, CSP finalized)                         | not started |
| PostHog analytics + feature flags                                                | not started |

---

**Next up:** Phase 3 (Auth) is the suggested default now that Phase 2 has shipped, since storage/organization/sharing all depend on having a user to own data.
