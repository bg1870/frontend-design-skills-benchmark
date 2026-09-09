# Material assumptions

- The dashboard’s operating date is **Tuesday, September 8, 2026**, inferred from the fixture’s schedule and the supplied run date.
- “Active queue” means jobs with `open` or `assigned` status; “unassigned” means no technician is present.
- A job is marked “Today” by its local calendar date, without converting the fixture’s `-05:00` timestamps.
- The fixture is read-only. The New job control demonstrates the intended integration point rather than mutating source data.
- Times are labeled CDT because all fixture timestamps use UTC−05:00 in September.
- The dashboard loads `fixtures/jobs.json` over HTTP; use a local static server rather than opening `index.html` directly.
