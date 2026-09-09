# Material assumptions

- `fixtures/jobs.json` is fixture/sample data, not a live production feed. The interface labels it as **Sample data** in persistent page chrome and repeats the source below the queue.
- The schedule offset is taken from the supplied timestamps (`-05:00`) and is displayed as `UTC−05:00`; no city or named timezone is inferred.
- Summary counts cover all records in the fixture. “Needs a technician” means records with a null technician, matching the open jobs in the supplied data.
- Known technician choices are derived only from technician names already present in the fixture. Assignments update the in-memory dashboard state and are intentionally not persisted back to the fixture.
- No company name or branding was supplied, so the product is titled generically “Dispatch Board.”
- The artifact is dependency-free static HTML/CSS/JavaScript. Serve the project directory over HTTP so the browser can load `fixtures/jobs.json` (for example, `python3 -m http.server`).
