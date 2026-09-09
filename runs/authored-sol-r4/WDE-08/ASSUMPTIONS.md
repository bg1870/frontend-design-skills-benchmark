# Material assumptions

- No project files or internal Nojom SDK documentation were present. The page assumes the package is `@nojom/sdk`, exports `Nojom`, reads `ANTHROPIC_API_KEY` by default, and exposes `nojom.messages.create()` with camel-cased `maxTokens`. Confirm these interfaces against the internal package before publishing.
- Node.js 18+ is presented as the runtime baseline; confirm against the package's actual `engines` field.
- “Current model” means Anthropic’s current balanced speed/intelligence option rather than its recommended highest-capability default. Anthropic’s primary model overview listed Claude Sonnet 5 with API ID `claude-sonnet-5`, at $2 per million input tokens and $10 per million output tokens when retrieved on 2026-09-09 at approximately 10:11 UTC.
- Pricing shown is standard direct API token pricing in USD. It excludes prompt caching, batch discounts, data residency premiums, and cloud-platform differences.

## Primary sources

- https://platform.claude.com/docs/en/models/overview
- https://platform.claude.com/docs/en/about-claude/pricing

## Next action

Validate the assumed Nojom API surface and package name with the internal SDK owner before deployment. Recheck Anthropic’s model and pricing pages at release time because both are externally controlled and changeable.
