# Loomwork signup — responsive acceptance pass

Run date: 2026-09-09
Browser: Chromium (headless)

## Viewports

| Target | Viewport | Evidence | Result |
|---|---:|---|---|
| Mobile | 390 × 844 | `mobile.png` | Pass — single-column form, 20 px gutters, 47–50 px controls, no horizontal clipping; product panel removed to keep signup focused. |
| Tablet | 768 × 1024 | `tablet.png` | Pass — centered 500 px form, two-column names, product story continues below the signup, no horizontal clipping. |
| Laptop | 1440 × 900 | `laptop.png` | Pass — balanced split screen, complete form and product preview visible without scrolling, no overlap or clipping. |

## Acceptance checks

- Semantic heading, labels, form autocomplete hints and live status region are present.
- Required-name, email-format, password-length/number and terms validation are implemented inline.
- Password visibility control updates its accessible label and pressed state.
- Keyboard focus is visible on all text inputs; controls meet practical touch sizing.
- Google and account-creation actions return visible status feedback in this frontend artifact.
- Layout breakpoints checked at mobile, tablet and laptop dimensions.

## Repairs made during the pass

- Collapsed the name fields to one column below 560 px to prevent cramped mobile inputs.
- Hid the decorative product preview on mobile so the signup remains the primary task.
- Added a short-height desktop adjustment to keep the complete form visible at 900 px and below.
- Allowed the tablet product story to flow below the signup rather than compressing both panels.

## Material assumptions

- This is a frontend-only artifact; authentication endpoints, OAuth redirect and legal destinations are represented as UI states/placeholders.
- “Tablet” uses a stacked composition; “laptop” uses the split product/form composition.
- Google Fonts enhance the presentation when online; system sans-serif remains a functional fallback.
