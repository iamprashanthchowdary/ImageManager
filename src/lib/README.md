# lib/

Framework-agnostic utilities with no business logic: `cn()` class-merging helper, `env.ts` (typed/validated environment variables), `seo.ts` (metadata + JSON-LD builders shared across routes), `constants.ts`.

If a function needs a database connection or knows about a specific feature, it doesn't belong here — see `server/` or `features/`.

## image/

The shared image-format "service": format registry (`formats.ts`), runtime encoder-support detection (`detect-format-support.ts`), canvas → Blob encoding (`encode-canvas.ts`), and the browser download trigger (`download-blob.ts`). Used by the crop feature and will be reused as-is by the future image converter feature — don't fork or duplicate this for a new feature; import it. If you need format/encoding behavior this doesn't support yet, extend it here rather than reimplementing locally.
