# Clearflow dispatcher dashboard

A responsive, dependency-free dashboard driven by `fixtures/jobs.json`.

## Run

Serve the directory over HTTP (the browser must be able to fetch the fixture):

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## Material assumptions

- `open` means unassigned, `assigned` means dispatched, and `done` means completed.
- The fixture's explicit `-05:00` timestamps are presented as Central Time.
- The displayed period is derived from the earliest and latest fixture dates.
- Assignments made through the UI are session-only prototype changes and are not written back to the fixture.
- Existing named technicians are the available assignment pool.
