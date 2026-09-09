# Material assumptions

- The dashboard loads `fixtures/jobs.json` at runtime and treats it as the authoritative initial queue.
- The fixture’s explicit UTC offsets are used for display; the board does not infer a separate company timezone.
- “Need dispatch” means jobs whose status is `open`; “Assigned” and “Completed” map directly to their fixture statuses.
- The quick-dispatch technician list is derived from technicians already present in the fixture. Assignments are session-only and are not written back to the fixture.
- Jobs are ordered chronologically, with all fixture dates shown rather than assuming a particular “today.”
