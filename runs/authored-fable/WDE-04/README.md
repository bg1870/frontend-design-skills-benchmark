# Tally habit prototype

## Assumptions
- Designed as a 390px mobile app; on larger screens it is presented in a device-like canvas.
- Habit completion is local prototype state and resets on reload.
- Today is derived from the browser clock; streak history is illustrative.
- The primary flow is: complete habits, open a streak, add a new habit.
- No account, persistence, reminders, or backend are included.

## Run
```bash
npm install
npm run dev
```

Views are hash-routed: `#/today`, `#/streak`, and `#/add`.
