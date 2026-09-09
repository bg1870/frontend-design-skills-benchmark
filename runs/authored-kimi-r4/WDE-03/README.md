# Looma pricing page

A responsive, dependency-free pricing page for a fictional B2B analytics product.

## Run

Open `index.html` directly, or serve the directory with any static server (for example, `python3 -m http.server 8080`).

## Material assumptions

- Looma is a fictional product; brand, copy, plan limits, and prices are illustrative.
- Growth costs $79 monthly or $63/month billed annually (20% discount).
- Starter is free forever; Scale uses custom volume-based pricing.
- Primary conversion is a 14-day, card-free trial, with sales contact for enterprise.

## Verification

- HTML parsed successfully with Python's standard HTML parser.
- JavaScript passed `node --check`.
- Desktop rendering was reviewed in headless Chromium at 1440×1000.
