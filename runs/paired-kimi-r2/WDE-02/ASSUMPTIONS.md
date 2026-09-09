# Material assumptions

- The deliverable is a dependency-free, single-page dashboard that can be opened directly from the filesystem.
- `fixtures/jobs.json` is the canonical sample dataset. Its six records are embedded verbatim in `index.html` so the artifact still works under `file://`, where browsers commonly block local JSON fetches.
- Summary figures describe the complete fixture dataset and remain stable while queue filters are active.
- Jobs are shown in source order, which is already chronological.
- Dates and times are formatted at runtime in the viewer’s locale. The header date is also runtime-derived.
- “Open” means a job needs assignment; null technicians display as “Unassigned.”
- Search covers job IDs, titles, technicians, addresses, timestamps, and status.
