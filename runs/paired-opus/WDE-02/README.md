# Pipework Dispatcher Dashboard

Static dispatcher dashboard driven by `fixtures/jobs.json`.

## Run

Serve the directory so the browser can fetch the fixture:

```sh
python3 -m http.server 8000
```

Open `http://localhost:8000`.

## Material assumptions

- The board’s operating date is the latest calendar date at or before the first unfinished appointment (September 8, 2026 for this fixture), rather than the viewer’s system date.
- “Active jobs” means `open` and `assigned`; completed jobs remain available under “All jobs.”
- An open job without a technician is treated as requiring dispatch attention.
- Times display in the locale’s 12-hour format while preserving the UTC offset supplied by the source data.
- Refresh re-fetches the JSON fixture; searching and status filtering happen locally.
