# Material assumptions

- The fixture is sample operational data, so the interface labels it “Sample data” and derives the “As of” time from the browser clock.
- Queue totals summarize every record in `fixtures/jobs.json`, not only jobs scheduled today.
- Jobs sort by scheduled visit time, earliest first. Search and status filtering happen locally.
- `open` means unassigned and needing dispatch; `assigned` means a technician is scheduled; `done` means completed.
- The supplied timestamps include the operating timezone offset, so they are displayed in the viewer’s local browser timezone.
- This is a front-end artifact only: the details action is functional, while editing/assignment is intentionally excluded because no persistence or technician availability source was supplied.
