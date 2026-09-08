# Flowline dispatcher dashboard

A responsive, dependency-free dispatcher dashboard driven by `fixtures/jobs.json`.

## Run

```bash
python3 -m http.server 8000
```

Open http://localhost:8000. A local server is required because the browser fetches the JSON fixture.

## Material assumptions

- The operational date is **September 8, 2026**, matching the fixture and session context; “Scheduled today” uses that date.
- `open` means a job needs dispatch, `assigned` means scheduled with a technician, and `done` means completed.
- Summary counts cover all fixture records; “Scheduled today” only counts September 8.
- Assignments and newly created jobs are prototype interactions held in memory and intentionally do not modify the fixture.
- The listed technician names plus S. Chen form the available assignment roster.
