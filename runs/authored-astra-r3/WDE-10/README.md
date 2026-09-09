# Loomwork signup

A responsive, dependency-free signup prototype for a physiotherapy-clinic scheduling product. Open `index.html` directly in a browser.

## Material assumptions

- Loomwork is a new product identity; no existing brand system or backend contract was supplied.
- Signup is modeled as a three-step flow. This artifact implements and validates step 1, then hands off to a truthful local success state rather than simulating account creation.
- Pricing, compliance certification, customer proof, and availability claims are intentionally omitted because no source facts were supplied.
- The schedule is visibly labeled as a sample and exists as product context, not operational data.
- Sign-in, Terms, and Privacy destinations are represented as route anchors pending real product URLs.

## Acceptance evidence

Browser-rendered captures and machine-readable checks are in `evidence/`:

- `mobile-390x844.png`
- `tablet-768x1024.png`
- `laptop-1440x1000.png`
- `acceptance-results.json`

The acceptance script checked horizontal overflow and control geometry at all three sizes. It also exercised empty submission (three inline errors and focus on the first invalid field) and valid submission (success state with managed focus).
