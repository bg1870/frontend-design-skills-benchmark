# Nojom SDK quickstart

A responsive, dependency-free documentation page. Open `index.html` directly in a browser.

## Material assumptions

- Package name: `@nojom/sdk`
- Runtime: Node.js 18+ with ESM
- Authentication: `ANTHROPIC_API_KEY`
- Wrapper shape: `new Nojom()`, `messages.create()`, camel-case `maxTokens`, and normalized `response.text`
- Model: `claude-sonnet-4-20250514` (Claude Sonnet 4)
- Standard pricing: $3 per million input tokens and $15 per million output tokens; caching, batch, and regional adjustments are excluded

These values should be checked against the internal package contract and current Anthropic model/pricing reference before publication.
