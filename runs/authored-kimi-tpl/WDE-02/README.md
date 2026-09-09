# Pipeboard dispatcher dashboard

Static, responsive dispatcher dashboard built from `fixtures/jobs.json`.

## Run

Serve the directory so the fixture can be fetched:

```bash
python3 -m http.server 8000
```

Open `http://localhost:8000`. The page includes an exact embedded fallback so it also works when opened directly as a file.

## Material assumptions

- The operational date is September 8, 2026, inferred from the fixture's central cluster of scheduled jobs and UTC-05 offsets.
- “On the board” means active jobs (`open` + `assigned`); completed jobs remain in the searchable queue for context.
- Null technicians are displayed as awaiting assignment.
- The New Job control focuses the dispatcher on open/unassigned work because no write API was supplied.
- Times are rendered in the browser locale from the ISO timestamps; the source data identifies the operating context as Central.
