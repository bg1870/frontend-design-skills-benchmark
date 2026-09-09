# Material assumptions

- This is a static dispatcher view named **Flowline Dispatch**; no company name was supplied.
- `fixtures/jobs.json` is explicitly labeled as sample data in the interface and remains the sole job-data source.
- Status values map as `open` → unassigned queue, `assigned` → dispatched, and `done` → completed.
- Summary counts are computed from the full fixture at runtime; filtering does not alter them.
- Jobs are sorted by scheduled appointment. Dates render in the dispatcher’s browser locale/time zone.
- Search covers job ID, title, address, and technician. Filters and refresh are client-side controls.
- Serve the directory over HTTP so the browser can fetch the fixture (for example, `python3 -m http.server`).
- Assigning technicians, editing jobs, persistence, and authentication are outside the supplied data and scope.
