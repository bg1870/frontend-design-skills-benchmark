# Pipework dispatcher dashboard

## Run

From this directory, start any static server, for example:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## Material assumptions

- Schedule times are displayed in the browser's local time; the source records use UTC−05:00.
- “Need dispatch” means `status: open`; “Assigned” and “Completed” map directly to their source statuses.
- The earliest open work order is treated as the next unassigned job.
- Assign/complete actions are prototype-only UI state and do not modify `fixtures/jobs.json`.
- The schedule range is derived from all fixture records rather than assuming a specific “today.”
