# Flowline dispatcher dashboard

A dependency-free dispatcher dashboard backed by `fixtures/jobs.json`.

## Run

Serve the project directory with any static server (the app fetches the JSON fixture), for example:

```sh
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## Material assumptions

- Fixture timestamps consistently use UTC−05:00, so that fixed offset is treated as the plumbing company's operating timezone. The dashboard labels this explicitly.
- “Active” means any job whose status is not `done`; “unassigned” means the fixture status is `open` or there is no technician.
- A job is “due today” when its scheduled calendar date in the operating timezone matches the runtime date in that timezone.
- Active jobs scheduled before the runtime clock are labeled overdue; no duration or completion deadline is inferred.
- The technician picker is derived only from technician names present in the fixture. Assignments are temporary UI state and do not mutate the fixture.
- Summary metrics cover all fixture records, while search/status/sort controls affect the queue only.
