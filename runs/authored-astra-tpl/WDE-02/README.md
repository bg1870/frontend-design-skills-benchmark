# Northline Plumbing dispatcher dashboard

A responsive, dependency-free dispatcher dashboard using `fixtures/jobs.json` as its only job data source.

## Run

Serve the directory over HTTP (the browser fetches the fixture):

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## Material assumptions

- The fixture represents the complete dispatch queue and its local `-05:00` timestamps are authoritative.
- September 8, 2026 is the board's working date, inferred from the fixture's active schedule; no live clock or API was supplied.
- “Needs dispatch” means jobs whose technician is `null`.
- Assignment is a clearly local demo action: “Assign to me” updates in-memory UI state only and resets on reload.
- Search covers job ID, title, address, and technician; summary figures always describe the full queue rather than filtered results.
