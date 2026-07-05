# app/api/

Public, plain-HTTP Route Handlers only: webhooks, `og`/share-link redirects, health checks — anything that isn't internal app-to-server traffic. Internal typed calls go through tRPC (`server/api/`), not here. Group by resource, e.g. `api/share/[token]/route.ts`.
