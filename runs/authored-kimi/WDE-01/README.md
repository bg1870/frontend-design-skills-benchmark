# Ridgeline marketing site

A responsive, single-page marketing site for an independent-restaurant payroll and scheduling product.

## Run

Open `index.html` directly, or serve the directory:

```bash
python3 -m http.server 8000
```

## Material assumptions

- Ridgeline is a fictional US payroll product aimed at independent restaurants.
- The primary conversion is a 30-day product trial; no signup backend was requested, so CTAs lead to the closing conversion section.
- Pricing, customer quote, business names, metrics, and contact details are illustrative marketing content.
- Payroll includes tax filing, scheduling, timecards, shift swaps, and multi-location support.
- Google Fonts are loaded from the public CDN; the page otherwise has no runtime dependencies.
- The abstract customer portrait is original inline SVG artwork rather than a stock image.

## Included

- Responsive desktop/mobile layout and navigation
- Accessible focus states, semantic landmarks, reduced-motion support, and tab semantics
- Interactive schedule/payroll product preview
- Self-contained CSS, JavaScript, SVG, and favicon in `index.html`
