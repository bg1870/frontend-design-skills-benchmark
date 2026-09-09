# Material assumptions

## Product direction
- The launch is a small, independent software product rather than a physical product or service.
- The product is **Morrow**, a calm weekly planning app that turns a short list into a realistic week.
- The primary pre-launch goal is email waitlist registration; the product is expected next month, but no exact date is stated because none was supplied.
- The audience is individuals who plan their own work: freelancers, makers, students, and small-team contributors.

## Brand and content
- The chosen visual direction is “quiet utility”: ink blue, paper white, signal orange, crisp geometry, and a repeated ruled-week motif.
- No customers, testimonials, usage figures, integrations, prices, performance claims, or availability promises are shown because none were supplied.
- Product-interface content is explicitly labeled illustrative.

## Implementation
- The landing page is a dependency-free static site in `index.html`.
- Waitlist submission is a local prototype interaction only. It validates an email and shows a success state; it does not transmit or persist personal data. Connect the form to the eventual mailing-list endpoint before production.
- Navigation links target sections on the same page. The privacy link opens an inline disclosure describing the prototype’s current data behavior.
