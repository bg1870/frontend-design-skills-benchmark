# Material assumptions

- The operating date is Tuesday, September 8, 2026, inferred from the supplied schedule and session date.
- “Today” counts jobs scheduled on September 8 regardless of status.
- “Needs dispatch” means `status: open` and no technician; “In field” maps to `assigned`.
- The fictional company name is Northline Plumbing. No customer names or service details beyond the fixture were invented.
- Queue edits are prototype-only and remain in browser memory; `fixtures/jobs.json` stays the authoritative initial data source.
- Times are displayed in the offset supplied by the fixture (Central time, UTC−05:00 on these dates).
