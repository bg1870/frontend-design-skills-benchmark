# Material assumptions

- The artifact is an internal dispatcher tool for one plumbing company, not a public marketing page.
- `fixtures/jobs.json` is the canonical schedule source. The interface fetches it at runtime and uses an identical embedded fallback only when opened directly from the file system, where browsers often block local JSON requests.
- Summary values are calculated from the source records, never hardcoded as business claims.
- The visible scheduling window is derived from the earliest and latest job dates in the source.
- Existing technician names from the source form the assignment choices. No extra employees were invented.
- Status edits are prototype interactions held in browser memory; the source fixture is not mutated.
- “Dana Kim” and “Northline Plumbing” are interface identity defaults because no company or dispatcher name was supplied.
- “Complete” is the dispatcher facing label for the source status `done`.
- The dashboard uses a single light theme to prioritize daylight legibility in an operations setting.
