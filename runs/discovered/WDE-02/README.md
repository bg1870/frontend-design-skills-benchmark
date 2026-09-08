# Flowline dispatcher dashboard

A responsive, dependency-free dispatcher dashboard driven by `fixtures/jobs.json`.

## Run

Serve the project directory over HTTP (the browser must be able to fetch the JSON):

```bash
python3 -m http.server 8080
```

Open `http://localhost:8080`.

## Material assumptions

- The fixture represents the active dispatch week of September 7–11, 2026.
- “Needs assignment” maps to `open`, and “Completed” maps to `done`.
- Week load means completed jobs divided by all jobs in the fixture.
- Jobs are ordered chronologically; search and status filters operate entirely client-side.
- The new-job control demonstrates the intended interaction but does not mutate the read-only fixture.
- Times display in the browser’s local timezone from the ISO timestamps.
