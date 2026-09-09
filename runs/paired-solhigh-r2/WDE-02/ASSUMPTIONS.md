# Material assumptions

- The dashboard is a fixture-backed prototype, not a live operations system; this is labeled in the header.
- `America/Chicago` is the dispatch timezone because fixture timestamps use a `-05:00` offset in September.
- Jobs are sorted by scheduled time ascending. Status counts cover the full fixture, not “today.”
- `open` means unassigned, `assigned` means a technician is allocated, and `done` means complete.
- The artifact is framework-free and expects to be served over HTTP so `fetch('fixtures/jobs.json')` is permitted by the browser.
- Filtering is client-side and does not modify fixture data.
