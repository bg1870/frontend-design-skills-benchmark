# Responsive browser acceptance pass

**Browser:** Chromium (headless)  
**Page:** `http://127.0.0.1:4173/index.html`  
**Date:** 2026-09-09

| Viewport | Evidence | Result | Notes |
|---|---|---|---|
| Mobile — 390 × 844 | [`mobile-390x844.png`](mobile-390x844.png) | Pass | Single-column signup; 20 px gutters; controls remain full-width and ≥44 px; no horizontal overflow; primary action is reachable in normal scroll order. Supporting schedule follows below the form. |
| Tablet — 768 × 1024 | [`tablet-768x1024.png`](tablet-768x1024.png) | Pass | Focused form composition with a 440 px readable measure; all controls and copy remain legible; schedule reflows below the first viewport rather than compressing beside the form. |
| Laptop — 1440 × 1000 | [`laptop-1440x1000.png`](laptop-1440x1000.png) | Pass | 46/54 split is balanced; complete form and schedule fit without clipping; schedule labels and appointment rows preserve hierarchy. |

## Interaction and accessibility checks

- Tab order follows brand → Google signup → form controls → legal links → submit → login.
- Every form control has a visible label; password visibility is a real button and updates its accessible label.
- Focus uses a high-contrast 3 px focus-visible outline.
- Empty submission places focus on the first invalid control and displays actionable inline errors.
- Valid submission exposes a polite status message and moves focus to it.
- Password reveal and Google prototype actions work with keyboard and pointer input.
- Motion preference is honored; the page has no ambient animation.
- At all 3 widths, no unintended horizontal scrollbar, overlap, clipped control, or unreadable text was observed.

## Repairs made during the pass

1. Added explicit email spellcheck suppression and improved its example placeholder.
2. Changed failed submission behavior to focus the first invalid field, avoiding an error state announced only visually.
3. Added explicit polite live-region semantics to the success confirmation.
4. Added browser theme color metadata so mobile browser chrome matches the signup surface.

## Static guideline audit after repairs

`index.html`, `styles.css`, and `app.js`: **pass** — semantic controls, labels, autocomplete, input types, visible focus, reduced-motion handling, inline errors, touch-sized controls, and responsive reflow present. No zoom restriction, outline suppression, `transition: all`, unlabelled icon control, or non-semantic click target found.
