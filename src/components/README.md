# components/

Shared, cross-feature UI only. If a component is used by exactly one feature, it belongs in that feature's `components/` folder instead.

- `ui/` — design-system primitives (Button, Badge, Panel, Toast, Select, ...). Add a new one only in the feature commit that first needs it — see [ROADMAP.md](../../docs/ROADMAP.md).
- `layout/` — app shell pieces used across routes (header, footer, nav, breadcrumbs).
