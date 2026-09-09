# Material assumptions

- `fixtures/jobs.json` is sample operational data, not a live dispatch feed. The interface labels it accordingly and local status changes are not persisted.
- Job timestamps use UTC-05:00 and are presented in `America/Chicago` (Central time) for a single dispatch region.
- “Needs dispatch” maps to `open`, “Assigned” maps to `assigned`, and “Complete” maps to `done`.
- The dashboard is a dependency-free static artifact intended to be served over HTTP so the browser can fetch the fixture (for example, `python3 -m http.server`).
- No company brand assets or technician roster were supplied. “Pipewise” is interface labeling only; assignment uses a non-person placeholder rather than inventing staff.
