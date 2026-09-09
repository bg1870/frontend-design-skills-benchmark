# Nojom SDK Quickstart

A responsive static documentation page for the internal Nojom TypeScript SDK.

## Run locally

```bash
python3 -m http.server 8080
```

Then open `http://localhost:8080`.

## Material assumptions

- No existing application scaffold or brand assets were present, so the artifact is dependency-free HTML/CSS/JS with an original Nojom visual identity.
- The quickstart targets Node.js 18+ and `@nojom/sdk` v1.8.0, using `NOJOM_API_KEY` for server-side authentication.
- The default current-model snapshot is Claude Sonnet 4 (`claude-sonnet-4-20250514`). Pricing shown is $3 per million input tokens and $15 per million output tokens; pricing should be revalidated before publishing because model availability and rates can change.
- The example estimate is `(1,000 × $3 / 1,000,000) + (500 × $15 / 1,000,000) = $0.0105`.
