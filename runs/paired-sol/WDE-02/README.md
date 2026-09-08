# Clearline Dispatch

A responsive dispatcher dashboard powered by `fixtures/jobs.json`.

## Run

Serve the directory over HTTP so the browser can fetch the fixture:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## Material assumptions

- The fixture represents the active dispatch board, and the dashboard date is **September 8, 2026** (the fixture's operational day).
- Times are displayed in Central Time because every fixture timestamp uses the `-05:00` offset.
- “On today” counts calls scheduled on September 8, while the remaining summary metrics count all loaded calls by status.
- Assignment and detail actions are intentionally demonstrative because no technician roster or write API was supplied; they provide interface feedback without mutating source data.
- Jobs are ordered chronologically. Search covers job ID, title, technician, and address.
