# Northline Plumbing Dispatch

A responsive dispatcher dashboard powered by `fixtures/jobs.json`.

## Run

Serve the directory over HTTP (the browser blocks JSON fetching from `file://`):

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## Material assumptions

- The operating date is **September 9, 2026**, inferred from the supplied fixture schedule and task context.
- All supplied timestamps use UTC−05:00, displayed as **Central** time.
- `open` means a job needs assignment, `assigned` means scheduled with a technician, and `done` means completed.
- Technician assignment is an in-session prototype update; the source JSON is not mutated.
- The shown dispatcher and company name are illustrative interface context; job facts come directly from the fixture.
