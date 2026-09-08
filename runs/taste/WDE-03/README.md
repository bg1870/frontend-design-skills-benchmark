# Meridian pricing page

A responsive, dependency-free pricing page for a fictional B2B analytics product.

## Run

```bash
python3 -m http.server 4173
```

Open `http://localhost:4173`.

## Material assumptions

- Meridian is a fictional analytics brand with no existing identity or codebase.
- The primary audience is data leaders, finance buyers, and enterprise procurement teams.
- USD, per-editor pricing is the sensible default; viewer access is free.
- The example prices and product capabilities are presentation copy, not market claims.
- CTA links use safe example email addresses and should be replaced with production routes.
- The visual system uses a restrained green accent, 14px card radius, 10px control radius, and system dark-mode preference.
- No build tooling or third-party dependencies are required.

## Interaction and accessibility

- Monthly and annual billing controls update all numeric plan prices.
- Mobile navigation is keyboard operable and exposes expanded state.
- Comparison content remains a semantic table and scrolls on narrow screens.
- Focus states, reduced motion, skip navigation, contrast-aware themes, and semantic headings are included.
