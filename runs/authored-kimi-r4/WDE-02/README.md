# FieldFlow dispatcher dashboard

A responsive, dependency-free dispatcher dashboard powered by `fixtures/jobs.json`.

## Run

Serve the directory so the browser can fetch the fixture:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## Material assumptions

- The fixture is the authoritative data source; all totals, filters, and rows are calculated from it.
- `open` means “Needs assignment,” `assigned` means dispatched, and `done` means completed.
- The operating date is September 9, 2026, matching the fixture’s schedule context.
- “New job” is represented as a non-destructive UI affordance because no persistence/API was provided.
- Dates and times render in the browser’s locale; fixture timezone offsets are respected.
