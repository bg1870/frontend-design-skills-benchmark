# Material assumptions

- This is a lightweight browser artifact with no existing application framework, so it is implemented with semantic HTML, CSS, and vanilla JavaScript.
- `fixtures/jobs.json` is the sole job data source and is loaded at runtime; counts, dates, filters, search, and sorting are derived from it.
- The dataset’s earliest and latest scheduled dates define the visible operating window. No job is labeled “today,” since the fixture does not provide a business clock.
- “Needs assignment” maps to `open`, “Assigned” maps to `assigned`, and “Completed” maps to `done`.
- New-job creation is a clearly labeled demo interaction and does not persist, because no write API is supplied.
- The company name, operator identity, and brand treatment are illustrative interface framing only.
