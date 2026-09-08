# Ridgeline marketing site

Single-page, dependency-free marketing site for a restaurant payroll and shift-scheduling product.

## Run

Open `index.html` directly, or serve locally:

```bash
python3 -m http.server 8080
```

Then visit `http://localhost:8080`.

## Material assumptions

- Ridgeline is a new fictional B2B SaaS brand with no supplied visual identity or existing site.
- The primary conversion is a demo request, not self-service signup.
- Pricing is custom because no commercial terms were provided.
- Customer quote, restaurant name, contact address, and claims are illustrative placeholders and should be replaced before production.
- Photography uses deterministic Picsum placeholders because no brand imagery or image-generation tool was available.
- The demo form intentionally simulates submission locally; connect it to a CRM or form endpoint for production.
- The page supports system light/dark preferences and reduced motion.
