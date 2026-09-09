# Material assumptions

- The internal package is published as `@nojom/sdk` and exposes `Nojom#messages.create` with camel-cased `maxTokens`.
- Authentication uses the server-side `NOJOM_API_KEY` environment variable.
- The organization’s current recommended model alias resolves to the dated model ID `claude-sonnet-4-5-20250929`.
- Standard Claude Sonnet 4.5 text pricing is $3 per million input tokens and $15 per million output tokens; prompt caching, batch discounts, tools, and regional pricing are excluded.
- The target runtime is Node.js 18+ with TypeScript and `tsx` available through `npx`.

These assumptions are surfaced where they affect shipping: the page names the exact model ID, includes the pricing basis, and tells developers to verify availability and pricing in the internal Nojom catalog before production deployment.
