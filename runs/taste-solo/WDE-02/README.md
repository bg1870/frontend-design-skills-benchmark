# Northline Plumbing Dispatch

A responsive dispatcher dashboard driven by `fixtures/jobs.json`.

## Run

Because the app fetches JSON, serve the directory over HTTP:

```bash
python3 -m http.server 8000
```

Open `http://localhost:8000`.

## Material assumptions

- The operating date is **September 8, 2026**, inferred from the fixture schedule and session context.
- "Today" counts active jobs scheduled on the operating date; completed jobs remain in the queue but do not count as today's active work.
- Fixture times include a `-05:00` offset and are displayed using the browser's locale formatting.
- Technician assignments and status changes are session-only UI state. The source fixture is never modified.
- The available technician roster is inferred from fixture values: R. Okafor, M. Duarte, and T. Blanchard.
- "Completed" summarizes all completed records in this fixture, not a separate daily KPI.

## Features

- Summary bar for today's work, unassigned jobs, assigned jobs, and completed jobs
- Search by job ID, title, address, or technician
- Status filters with live result counts
- Assign, complete, reopen, and reset interactions
- Loading, empty, and error states
- Keyboard shortcut: `/` focuses search
- Responsive layout, keyboard focus treatment, reduced-motion support, and automatic light/dark themes
