# Responsive browser acceptance

Checked 2026-09-09 at 12:33 EEST using headless Chromium against the local `file://` build.

| Viewport | Evidence | Result |
|---|---|---|
| Mobile — 360 × 800 | `mobile-360x800.png` | Pass: single-column form, 20px gutters, readable 42px heading, 44px+ inputs/actions, no horizontal clipping. Supporting schedule follows the signup flow below the captured viewport. |
| Tablet — 768 × 1024 | `tablet-768x1024.png` | Pass: form remains a comfortable 500px measure; supporting schedule becomes a full-width second section rather than a squeezed split. |
| Laptop — 1440 × 900 | `laptop-1440x900.png` | Pass: full-height asymmetric split; complete form and schedule remain visible without overflow. |

## Acceptance coverage

- Rendered each target viewport in Chromium and visually inspected the resulting PNG.
- Checked hierarchy, wrapping, gutters, content order, clipping, control sizing, and persistence of the “Illustrative schedule” disclosure.
- Source audit confirmed semantic landmarks/labels, keyboard focus treatment, reduced-motion handling, text-based errors, and responsive rules at mobile/tablet/laptop widths.
- Signup validation, password visibility toggle, and success status are implemented in `script.js`.

## Repair from the pass

The first pass referenced environment-owned font files, which made the rendered result non-portable. Lato Regular/Bold were bundled under `assets/`, CSS sources were changed to project-relative URLs, and all three screenshots were regenerated from the repaired build.
