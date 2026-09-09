# Material assumptions

No existing application, brand assets, SDK contract, package metadata, or internal documentation was present in the source directory.

- The npm package is assumed to be `@nojom/sdk` and its client export is assumed to be `Nojom`.
- Authentication is assumed to use `NOJOM_API_KEY`, loaded automatically by the client.
- The wrapper API is assumed to expose `nojom.messages.create()` with camel-cased `maxTokens`.
- The current default is represented as `claude-sonnet-4-20250514`, with standard Claude Sonnet 4 rates of $3 / million input tokens and $15 / million output tokens. Confirm model lifecycle and internal/commercial rates against the organization’s current API configuration before publishing.
- “Internal developer portal” is intentionally not linked because no valid route was supplied.

These assumptions affect executable accuracy and pricing. Replace them with generated examples and pricing sourced from the Nojom package/API configuration when available.
