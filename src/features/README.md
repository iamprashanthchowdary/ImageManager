# features/

One folder per business domain (e.g. `upload/`, `gallery/`, `folders/`, `tags/`, `sharing/`). This is where product logic lives — `app/` stays a thin routing layer that imports from here.

Each feature folder follows the same shape:

```
features/<name>/
  components/   feature-specific UI (not reused elsewhere — if it becomes shared, promote it to components/ui or components/layout)
  hooks/        feature-specific client hooks
  actions.ts    Server Actions (mutations)
  queries.ts    data-reading functions, wrapped in `"use cache"` or `cache()` as appropriate
  schema.ts     Zod schemas — the single source of truth for validation + inferred TS types
  types.ts      types not derivable from schema.ts
```

No feature folders exist yet — they're added one at a time as we build. Don't pre-create empty ones for features that haven't been scoped.
