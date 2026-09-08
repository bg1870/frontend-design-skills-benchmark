# Nojom SDK quickstart

Static quickstart page. Open `index.html` directly or serve the directory with any static server.

## Material assumptions

- No existing app, brand system, or package API was present in the working directory, so this is a standalone HTML/CSS/JS artifact.
- The SDK package/API are represented as `@nojom/sdk`, `new Nojom()`, and `nojom.messages.create(...)` based on the brief’s description of an internal TypeScript wrapper.
- The “current” model is pinned to `claude-sonnet-4-5-20250929` for reproducibility.
- Pricing shown is Claude Sonnet 4.5 standard API pricing: $3 per million input tokens and $15 per million output tokens. Prompt caching and batch discounts are intentionally excluded.
- Authentication uses `ANTHROPIC_API_KEY` and is assumed to happen in a server-side Node.js environment.
