# Responsive browser acceptance

Run with Chromium against the finished local artifact.

| Viewport | Result | Horizontal overflow | Console errors | Primary action |
|---|---|---:|---:|---|
| Mobile · 390 × 844 | Pass | None | None | 52 px high, visible |
| Tablet · 768 × 1024 | Pass | None | None | 52 px high, visible |
| Laptop · 1440 × 900 | Pass | None | None | 52 px high, visible |

## Journey checks

- Empty submission reveals inline errors and moves focus to `#name`: **Pass**
- Valid signup reveals the workspace-ready status: **Pass**
- Password visibility control is keyboard-accessible and updates its accessible state.
- Reduced-motion preference, visible focus treatments, labels, autocomplete attributes, and 44 px+ controls are present.

## Repairs made during the pass

- Removed the sole console 404 by supplying an inline favicon.
- Added a skip link, live validation announcements, email spellcheck suppression, and page theme metadata in the static compliance audit.
- Confirmed the responsive split changes from side-by-side at laptop to an evidence band at tablet/mobile without clipping.

## Evidence

- `mobile-390x844.png`
- `tablet-768x1024.png`
- `laptop-1440x900.png`
- `mobile-success.png`
- `acceptance-results.json` (machine-readable assertions)

Re-run: serve this directory on port `43871`, then execute `node acceptance.js`.
