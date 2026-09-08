# Fieldline dispatcher dashboard

A responsive, dependency-free dashboard driven by `fixtures/jobs.json`.

## Run

Because the browser fetches the fixture, serve the directory over HTTP:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## Assumptions

- The operating date is **September 8, 2026**, matching the fixture’s active jobs; the header intentionally represents that dispatch shift rather than the viewer’s date.
- Fixture timestamps use the company’s local timezone (`-05:00`) and are displayed in US English.
- “Needs dispatch” means `status: open`; “active technicians” counts unique technicians on assigned jobs.
- Creating or assigning a call updates the in-memory queue for this prototype. The source fixture is read-only and resets on refresh.
- Completed historical jobs remain visible so dispatch can search the full supplied queue.
