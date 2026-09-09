# Material assumptions

- The dashboard is a static, framework-free web artifact and should be served over HTTP so `fetch()` can load `fixtures/jobs.json` (for example: `python3 -m http.server`).
- Job summary values are derived from the full fixture, while queue filters and search affect only the table.
- `open` means “Needs assignment,” `assigned` means technician-confirmed, and `done` means completed.
- Fixture timestamps use UTC-05:00 and are displayed in the plumbing company's assumed Central time zone.
- The header date is fixed to Friday, September 11 to align with the fixture's 2026 schedule.
- “New job” is represented as a non-destructive workflow entry point because the fixture is read-only; it provides immediate UI feedback rather than persisting a record.
