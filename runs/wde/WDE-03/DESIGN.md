# Design System: Northstar Pricing

## 1. Subject & Provenance
Subject colours:
- **Query Violet** (`#8176E8`) — the glow of a selected query in a dark analytics workspace.
- **Warehouse Ink** (`#0A0B10`) — the low-glare canvas of a data operations console.
- **Signal White** (`#F5F5F7`) — high-confidence output against the console.

Recipe shortlist (three schools):
1. **Linear** (Modern Tool / Builder SaaS) — restrained dark tooling language makes a technical buyer feel at home.
2. **Tufte Data-Ink** (Information Architecture) — would maximize comparison density and evidence over atmosphere.
3. **Stripe Press** (Warm Humanist) — would make pricing approachable, but less native to an analytics workflow.
Chosen: **Linear** — the audience is choosing infrastructure-adjacent analytics software; precise hairlines, restrained color, and tool-like details reinforce trust.

Assumptions made in place of spec answers:
- Product is a greenfield fictional B2B analytics platform named **Northstar**; no external brand facts are asserted.
- Primary audience is analytics and data-team leaders comparing self-serve and sales-led plans.
- Prices, feature packaging, and limits are illustrative product decisions rather than market claims; the page labels them clearly as sample pricing.
- Scope is a single responsive pricing page with monthly/annual switching, plan comparison, FAQ, and CTA; checkout, authentication, legal pages, and backend billing are deliberately out of scope.
Alternatives rejected:
- A light editorial page — less congruent with an analytics workbench.
- A dense spreadsheet-only comparison — efficient but too weak as a commercial first impression.
- Customer logos, testimonials, and usage statistics — no real evidence was supplied.

## 2. Visual Theme & Atmosphere
A quiet midnight workbench: generous black space around a precise pricing instrument, where fine rules and small monospace annotations make the commercial model feel legible rather than promotional. One violet selection state is the sole bright note.

Design Read:
- artifact: pricing landing page
- audience: data leaders, analytics engineers, and procurement evaluators
- visual-language: restrained builder SaaS with analytical comparison detail
- mode: greenfield
- visual-variance: 6
- motion-intensity: 4
- information-density: 6
- asset-dependence: 1
- brand-fidelity: 3

What each bought: variance 6 creates an offset hero and a featured-plan interruption; motion 4 limits movement to billing and disclosure feedback; density 6 keeps decision-critical limits visible; assets 1 lets typography and UI structure carry the page; fidelity 3 permits a purpose-built identity without pretending an existing brand system.

## 3. Colour Palette & Roles
Primitives:
- **Warehouse Ink** (`#0A0B10`) — page ground.
- **Console Slate** (`#12131A`) — primary raised surface.
- **Panel Slate** (`#191A23`) — hover and secondary surface.
- **Control Slate** (`#22232D`) — selected neutral controls.
- **Rule Slate** (`#2C2D38`) — visible borders and separators.
- **Muted Graphite** (`#77798A`) — tertiary copy.
- **Metadata Silver** (`#A7A8B5`) — secondary copy.
- **Signal White** (`#F5F5F7`) — primary text and filled-action label.
- **Query Violet** (`#8176E8`) — interactive accent and focus.
- **Query Violet Lift** (`#9B92F1`) — hover accent.
- **Query Violet Wash** (`#25223E`) — subtle selected surface.
- **Error Coral** (`#E77979`) — inline errors only.

Semantics:
- `--color-ground` → Warehouse Ink.
- `--color-surface` → Console Slate; `--color-surface-hover` → Panel Slate; `--color-control` → Control Slate.
- `--color-border` → Rule Slate.
- `--color-text` → Signal White; `--color-text-secondary` → Metadata Silver; `--color-text-muted` → Muted Graphite.
- `--color-accent` → Query Violet; interactive only, with one filled action per pricing card.
- `--color-accent-hover` → Query Violet Lift; `--color-accent-wash` → Query Violet Wash.
- `--color-error` → Error Coral.
Neutral ramp: violet-hued neutrals at roughly 4–10% saturation, eight functional steps from Warehouse Ink through Signal White; neither end is pure black or white.
Measured pairs (WCAG contrast computed from sRGB values): Signal White on Warehouse Ink 18.05:1; Metadata Silver on Warehouse Ink 8.34:1; Muted Graphite on Warehouse Ink 4.57:1; Signal White on Query Violet fails at 3.39:1, therefore violet filled buttons use Warehouse Ink text at 5.33:1.
Dark mode: single-theme by product decision; pricing is presented as part of the dark product environment.

## 4. Typography
- **Display:** Geist, weights 560–650, tracking `-0.04em`, stack: `Geist, "Avenir Next", "Segoe UI", sans-serif`.
- **Body:** Geist, 16px/1.55, measure 66ch max, stack: `Geist, "Avenir Next", "Segoe UI", sans-serif`.
- **Mono:** `"Geist Mono", "SFMono-Regular", Consolas, monospace` — billing units, plan labels, and compact metadata.
- Scale: 12 / 14 / 16 / 20 / 28 / 48 / 76.
- Banned-face check: no Inter, Roboto, Arial, Fraunces, or system-ui appears; each stack ends in a generic.

## 5. Component Behaviours
- **Button:** 8px radius, compact weight, violet fill only for the recommended action; outlined elsewhere. States: default / lighter hover / violet focus-visible ring / 1px translate active / disabled with reduced opacity and no pointer / loading label with reserved width.
- **Card:** reserved for selectable plan groupings; 12px radius, hairline border, no decorative floating cards. Recommended plan uses an inset violet rule rather than a colored side border.
- **Input:** not required in this scope. If added, label above, error below, 8px radius, Query Violet focus ring; never floating label.
- **Billing switch:** segmented control with `aria-pressed`; state changes update all computed rates and savings copy.
- **FAQ disclosure:** native buttons update `aria-expanded`; answer region opens without hiding content from no-JS users (details/summary).
- **Loading:** not needed because pricing is embedded; billing transition preserves dimensions.
- **Empty:** not applicable; plans are required content.
- **Error:** billing script failure leaves monthly prices and the full page functional; no user input can error.

## 6. Layout Principles
12-column grid inside a 1200px max-width container. Hero uses a 7/4 offset composition; three plan columns share one outlined comparison field; feature comparison uses aligned rows rather than nested cards. Spacing ladder: 4 / 8 / 12 / 16 / 24 / 40 / 64 / 96. Sections alternate between compressed decision surfaces and 96px breathing intervals.
- Mobile: multi-column layouts collapse to one column below 760px; navigation condenses, plan cards stack, and comparison rows become labeled blocks. No horizontal page overflow.
- Medium widths: three pricing columns collapse at 980px to avoid compressed labels.

## 7. Motion
- Easing: `cubic-bezier(0.22, 1, 0.36, 1)`. Durations: 150ms for state feedback, 400ms for plan-price transitions.
- Triggers: hover/focus, billing selection, and FAQ disclosure only. Price transitions use opacity and transform.
- `prefers-reduced-motion`: all transitions and smooth behavior are removed; content and states remain complete.

## 8. Assets
- Logo: not applicable — greenfield wordmark is live text plus a geometric data-cell mark, not an external brand claim.
- Product imagery: not applicable — pricing decision surface is carried by type and comparison structure.
- UI screenshots: not applicable to this page scope.
- Fonts: Geist preferred from local installation; robust non-banned local fallbacks provided, with no network dependency.

## 9. Anti-Patterns (banned in this build)
No purple-pink-blue gradient; no fabricated trust statistics, logos, testimonials, or badges; no universal pill shapes; no rounded-card-per-paragraph; no repeated eyebrow formula; no stock photography; no emoji; no feature checkmarks as visual confetti; no more than one saturated hue; no glows or colored shadows; no hidden pricing qualifiers; no duplicated CTA intent with inconsistent labels.

## 10. Blockers & Open Questions
Captured clock: `2026-09-08T01:50:14+03:00` — captured with `date -Iseconds`; reused unchanged on re-run.
Blockers (only a human can resolve):
- **Approved product identity and legal entity** — the live-text Northstar identity is explicitly a concept — blocks production brand launch.
- **Approved pricing, limits, tax/currency policy, and contract terms** — labelled “Illustrative pricing” beside the billing control — blocks production checkout and sales enablement.
- **Destination routes for account creation, demo booking, login, privacy, and terms** — controls use in-page demo behavior or inert links — blocks production navigation.
Unverified facts: none; no real company or market claims are asserted.
