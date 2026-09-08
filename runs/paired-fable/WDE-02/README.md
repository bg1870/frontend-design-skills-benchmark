# Rivet Dispatch

Static dispatcher dashboard driven by `fixtures/jobs.json`.

## Run

```bash
python3 -m http.server 8000
```

Open `http://localhost:8000`. A web server is required because the browser loads the JSON with `fetch()`.

## Material assumptions

- The dashboard's operating date is **September 8, 2026**, inferred from the fixture's active work and the session date.
- “In queue” means all non-completed jobs; “Needs assignment” maps to `open`; “Assigned” maps to `assigned`.
- Jobs are ordered by scheduled time. The next dispatch is the earliest non-completed job.
- Fixture timestamps include a `-05:00` offset; times display in the business timezone `America/Chicago`.
- “Assign tech” is a lightweight prototype action: it assigns an available placeholder technician in memory and does not modify the fixture.
- Search covers work order ID, title, address, technician, and status.
