# Clearflow Dispatch Dashboard

A responsive, dependency-free dispatcher dashboard using `fixtures/jobs.json` as its runtime data source.

## Run

Serve the project directory with any static server, for example:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## Assumptions

- The operational date is Tuesday, September 8, 2026, based on the fixture schedule.
- “Total jobs” includes every fixture record; completed means the source status `done`.
- Unassigned work is represented by the source's null technician value.
- Filtering is provided through status tabs; the Filter button cycles an “unassigned only” view.
- Times are displayed in the schedule's supplied local offset.
