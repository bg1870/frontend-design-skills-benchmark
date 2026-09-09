# Everyday habit prototype

## Run

```bash
npm install
npm run dev
```

## Material assumptions

- Designed as a single-user, mobile-first daily tracker; data is intentionally session-only.
- The current date and example habits are illustrative prototype content.
- Tapping a habit row opens streak detail; the circular check toggles completion independently.
- “Add habit” captures a name, optional cue, icon, and color, then adds it to Today.
- Desktop presentation uses a centered 390px mobile canvas; narrow viewports become full-screen.
