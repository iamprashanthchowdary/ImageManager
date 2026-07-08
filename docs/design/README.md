# Design reference

`design-system-reference.html` is the original design system artifact (Apple HIG-inspired, oklch tokens, type/spacing/radius/shadow scales, and a reference "Upload Dropzone" screen mockup with empty + drag-active states). It renders as a standalone interactive doc if opened in a browser — it's a custom component format, not a real app page, so don't try to import it.

**Already implemented** (tokens, Button, Badge, Panel, AppShell, Sidebar, ThemeToggle) — see [CLAUDE.md § Design system](../../CLAUDE.md#design-system) for the token names as actually used in code; they were translated from this file's labels (e.g. "Text Primary" → `--color-label`, matching Apple's own `UIColor.label` naming) rather than copied verbatim, so check CLAUDE.md for the real names, not this file.

**Not yet implemented:** the upload dropzone screen (empty state + drag-active state, with the sidebar Library/Folders nav) shown in this reference. That's Phase 3 (Core image storage) scope in [ROADMAP.md](../ROADMAP.md), not Phase 1 — it's feature UI, not a reusable primitive, and needs the real upload feature behind it. When building that feature, use this file for the exact visual spec (icon treatment, motion, copy).
