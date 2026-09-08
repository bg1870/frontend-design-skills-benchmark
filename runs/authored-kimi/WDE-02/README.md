# Northline Plumbing — Dispatcher Dashboard

Open `index.html` through a local web server so it can load `fixtures/jobs.json`, for example:

```bash
python3 -m http.server 8080
```

Then visit `http://localhost:8080`.

## Material assumptions

- The fixture represents the operational week of September 5–11, 2026; September 8 is treated as the dispatcher's current day.
- `open` means unassigned and needing dispatch, `assigned` means scheduled with a technician, and `done` means completed.
- Summary counts cover the full fixture, while search and status filters only change the visible queue count.
- Crew load counts assigned, unfinished work. The fixture's three named technicians are the available roster.
- New jobs are session-only UI additions because no persistence API was supplied.
- A bundled fixture fallback is used only when the page is opened directly from the filesystem and browser fetch restrictions prevent reading the JSON file.
