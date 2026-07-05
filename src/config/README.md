# config/

Static, environment-independent app configuration: `site.ts` (name, canonical URL, description, social/OG defaults consumed by metadata + JSON-LD), nav definitions, feature flags list. Values here should be constants, not runtime secrets (those go through `lib/env.ts`).
