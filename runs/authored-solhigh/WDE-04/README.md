# Steady — clickable habit tracker prototype

## Run

```bash
npm install
npm run dev
```

## Material assumptions

- The prototype is mobile-first, with a focused phone-sized workspace on larger screens.
- Habits are binary daily completions; tapping a row toggles completion.
- The flame/streak control or any habit's streak opens streak detail.
- Adding a habit requires a name; schedule and reminder are optional demo controls.
- Data is intentionally local, sample-based, and resets on refresh.
- “Journey” is represented by the streak detail screen; its bottom navigation item opens that view.
