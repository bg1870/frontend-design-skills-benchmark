# Loomwork signup — responsive acceptance

## Material assumptions

- Loomwork is a new brand with no supplied visual system or existing application shell.
- The primary user is a clinic owner or practice manager creating the clinic’s first workspace.
- Signup supports Google or work email; identity-provider and account APIs are represented as front-end states because no backend was supplied.
- A 14-day, card-free trial is the sensible default for reducing signup friction.
- Static patient names were intentionally avoided in the schedule preview.

## Acceptance environment

Rendered `index.html` in headless Chromium from the local filesystem on 8 September 2026.

| Breakpoint | Viewport | Evidence | Result |
|---|---:|---|---|
| Mobile | 360 × 800 | `mobile-360x800.png` | Pass — single-column recomposition, no clipped horizontal content, 44px+ controls, form continues naturally below fold |
| Tablet | 768 × 1024 | `tablet-768x1024.png` | Pass — compact split view remains legible; schedule and form do not collide |
| Laptop | 1440 × 1000 | `laptop-1440x1000.png` | Pass — balanced split, primary task centered in reading area, supporting schedule stays secondary |

## Interaction and accessibility checks

- Native buttons, links, labels, and form semantics used.
- Keyboard focus is visibly styled; the compound password control uses `:focus-within`.
- Submit validates inline, announces errors politely, and focuses the first invalid field.
- Password visibility control updates its accessible label and pressed state.
- Submit enters a disabled loading state only after valid input.
- Inputs provide autocomplete hints; email uses the correct type, input mode, and disabled spellcheck.
- Touch targets are at least 44px; reduced-motion preferences are honored.
- A keyboard skip link bypasses the brand panel.

## Repairs made after review

1. Added mobile safe-area padding for notched devices.
2. Added a skip link and live regions for validation feedback.
3. Added compound focus treatment around the password field and its visibility control.
4. Added email spellcheck suppression, theme color, balanced heading wrapping, and intentional touch behavior.
5. Confirmed the decorative schedule hides on mobile before it can compete with the signup task.

## Static guideline audit

`index.html`: ✓ pass — no unresolved Web Interface Guidelines findings.
