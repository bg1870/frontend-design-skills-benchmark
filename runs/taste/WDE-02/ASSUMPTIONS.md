# Material assumptions

- The dashboard date is anchored to **Tuesday, September 8, 2026**, matching the fixture’s active workday rather than the viewer’s system date.
- `fixtures/jobs.json` is the source of truth and is loaded at runtime; serve the directory over HTTP rather than opening `index.html` as a `file://` URL.
- “Today’s route” means every fixture job scheduled on 2026-09-08, regardless of status.
- Technician count is derived from unique names on currently assigned jobs.
- Completed means all fixture records with `status: done`; the fixture’s two completed jobs both fall within the displayed work week.
- New jobs are a lightweight demo interaction and persist only in memory until refresh. Newly created work starts as `open` and unassigned.
- The fixture’s explicit UTC offsets are preserved by formatting against `America/Chicago`, inferred from `-05:00` in September.
- Dispatcher identity (“Alex Morgan” / “AM”) and company name (“Flowline Plumbing Co.”) are presentation defaults because neither is included in the data.
