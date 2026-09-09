# Rhythm prototype

A clickable mobile-first habit tracker with a Today view, streak detail, and add-habit sheet.

## Run

```bash
npm install
npm run dev
```

## Material assumptions

- Audience: people who want a low-friction daily routine rather than a data-heavy quantified-self tool.
- Today is the primary workspace; checking a row toggles completion immediately.
- The 12-day streak opens the Progress view. Bottom navigation also switches views.
- New habits default to “1 time,” “Anytime,” and no streak; prototype state lasts for the current session.
- Visual direction: calm and rhythmic, using orbit-like progress circles and a botanical green / coral palette rather than gamified trophies.
- Desktop intentionally frames the mobile product at handset width; mobile uses the full viewport.
