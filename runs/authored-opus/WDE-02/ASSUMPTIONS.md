# Material assumptions

- The dashboard date is anchored to September 8, 2026—the operating date implied by completed jobs through September 7 and upcoming jobs from September 9—so “today” remains meaningful when reviewing the static artifact later.
- `open` means a job needs dispatch, `assigned` means it has a technician, and `done` means completed.
- “Completed / Last 7 days” is measured relative to the anchored dashboard date.
- Jobs are sorted by scheduled time by default; all six fixture records appear in the queue.
- The New job control is presented as a non-destructive demo interaction because no persistence/API was requested.
