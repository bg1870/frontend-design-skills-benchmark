# Northline Plumbing — Dispatcher Dashboard

A responsive, dependency-free dashboard that loads its queue from `fixtures/jobs.json`.

## Run

Serve the directory so the browser can fetch the JSON fixture:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## Material assumptions

- The fixture represents the current operating period; summary counts cover every fixture record rather than a calendar-day subset.
- The dashboard's operating date is Tuesday, September 8, 2026, inferred from the concentration of active work in the fixture.
- Timestamps are displayed in the fixture's Central Time offset (`America/Chicago`).
- Assignment changes are prototype-only and remain in browser memory; refreshing restores the fixture.
- A fixture-shaped fallback is included so the artifact still renders when opened directly with `file://`, where browsers block JSON fetches.
