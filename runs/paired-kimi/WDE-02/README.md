# Fieldline dispatcher dashboard

A responsive, dependency-free dispatcher dashboard backed by `fixtures/jobs.json`.

## Run

Serve the folder over HTTP (the browser blocks JSON fetches from `file://`):

```bash
python3 -m http.server 8000
```

Open <http://localhost:8000>.

## Material assumptions

- **Operating date:** September 8, 2026, inferred from the fixture’s cluster of active jobs. “Scheduled today” uses this date rather than the viewer’s current clock so the supplied dataset remains meaningful.
- **Summary meanings:** “Open jobs” is status `open`; “Assigned” is status `assigned`; “Need a tech” means `technician` is null. Completed jobs remain in the queue for recent context.
- **Ordering:** Jobs are sorted ascending by `scheduled_at`.
- **Time display:** Timestamps are formatted in the browser’s locale; source ISO values retain their explicit UTC−05:00 offset.
- **Interactions:** Dispatchers can search job ID, title, address, or technician and filter by status. The fixture is read-only, so the interface does not imply reassignment or status editing.
