# Sprig habit tracker prototype

A clickable React prototype with a Today view, streak detail, and add-habit sheet.

## Run

```bash
npm install
npm run dev
```

## Material assumptions

- This is a mobile-first personal habit tracker, presented in a desktop phone frame at wider widths.
- All visible habits and streaks are illustrative sample data; this is disclosed in the interface.
- Dates and weekday labels are derived from the user's local runtime clock.
- State is session-only: completions and newly added habits reset on refresh.
- One habit may be added at a time with a name, cadence, and optional reminder.
