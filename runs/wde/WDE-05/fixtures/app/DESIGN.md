# Design System: Kettell Product Proof Extension

## 1. Subject & Provenance
Subject colours:
- **Enamel Ink** (`#1C1A17`) — near-black markings on workshop equipment.
- **Boiler Copper** (`#8A4B2A`) — the warm metal of espresso hardware.
- **Bench Paper** (`#F4F1EC`) — service-manual stock.

Recipe shortlist (three schools):
1. **Dieter Rams / Braun** (Editorial / Minimalist) — makes serviceable hardware feel precise and honest.
2. **Pentagram** (Information Architecture) — would make the contents list systematic and editorial.
3. **Are.na** (Brutalist / Raw) — would foreground provenance but conflict with the established warmth.
Chosen: **the existing Kettell system, closest to Dieter Rams / Braun** — this is an extension, so the supplied code outranks a new recipe; the recipe only confirms the functional, no-shadow restraint.

Assumptions made in place of spec answers:
- Testimonials are not yet approved — no customer names, quotes, avatars, ratings, or counts are invented.
- Box contents are not documented in the repository or discoverable from search — no item is asserted.
- New sections sit between Craft and Contact, preserving the existing conversion journey and all form contracts.
Alternatives rejected:
- Generic espresso-machine photography and plausible accessories — both would misrepresent this named product.
- Invented beta-customer quotes — decorative trust theater.
- Restyling the existing page — outside the bounded extension.

## 2. Visual Theme & Atmosphere
A quiet service-manual register: warm paper, fine rules, compact labels, and generous reading space. Missing evidence is treated as a clearly marked production state rather than hidden behind lifestyle polish.

Design Read: landing page · prospective home espresso buyers · restrained workshop editorial · extension.
Dials: visual-variance 3 · motion-intensity 1 · information-density 5 · asset-dependence 7 · brand-fidelity 10.
What each bought: stable grids; static feedback-only behavior; scannable evidence blocks; explicit asset placeholders; exact reuse of existing tokens, typography, radius, borders, and voice.

## 3. Colour Palette & Roles
Primitives:
- **Enamel Ink** (`#1C1A17`) — primary text.
- **Soft Graphite** (`#55504A`) — supporting text.
- **Bench Paper** (`#F4F1EC`) — page ground.
- **Clean Ceramic** (`#FFFFFF`) — raised cards and inputs.
- **Workshop Rule** (`#D8D2C8`) — borders and dividers.
- **Boiler Copper** (`#8A4B2A`) — primary action.
- **Dark Copper** (`#73401F`) — primary-action hover.

Semantics retain the supplied `--k-*` token names. Neutral ramp carries warm copper/brown undertones from Bench Paper to Enamel Ink. Measured pairs: Enamel Ink on Bench Paper 15.41:1; Soft Graphite on Bench Paper 7.08:1; Clean Ceramic on Boiler Copper 6.73:1. Dark mode: not applicable; supplied site is single-theme.

## 4. Typography
- **Display:** Bitter, regular, tracking normal except existing wordmark at `0.04em`; stack: `"Bitter", Georgia, serif`.
- **Body:** Bitter, 17px/1.55, 64ch; stack: `"Bitter", Georgia, serif`.
- **Mono:** none; no verified specification data exists.
- Scale: 14 / 16 / 17 / 20 / 28 / 34 / 44.
- Existing brand typography is preserved; banned-face check passes and stacks end in a generic family.

## 5. Component Behaviours
- **Button:** existing copper fill, 6px radius, solid border. Existing default / hover / focus-visible / disabled states remain unchanged; no distinct active or loading state is introduced because buttons are outside this extension and submission behavior is server-owned.
- **Card:** white, fine border, 6px radius, no shadow; used for bounded evidence and fulfillment groups only.
- **Input:** existing label-above pattern and browser-native required/error semantics, unchanged.
- **Placeholder:** dashed rule, plain-language pending label, and a useful request describing exactly what must replace it.
- **Empty:** the testimonial and box-content states explain that verified material has not been supplied.
- **Error:** no new network behavior is introduced.

## 6. Layout Principles
Existing 1040px wrapper, 8px base unit, and 24px gutters are retained. New evidence sections use a two-column grid with 24px gap; testimonial requests use the existing three-column grid. Section rhythm remains 40px vertical padding with 1px separators.
- Mobile: all new grids collapse to one column below 760px; no fixed widths or horizontal overflow.

## 7. Motion
Static by decision — the existing surface uses only immediate hover/focus feedback, and these proof-oriented states should not appear animated. Reduced-motion therefore requires no override.

## 8. Assets
- Logo: `assets/kettell-brand/` — **pending**; no official logo asset exists in the workspace or was found in the sourcing attempt. The supplied text wordmark remains unchanged as a protected existing contract.
- Product imagery: `assets/kettell-brand/` — **pending**; the in-box image slot is visibly labelled.
- Customer portraits: `assets/kettell-brand/` — **pending**; omitted rather than faked.
- Fonts: Bitter via the existing CSS family declaration; font files/import are not supplied.

## 9. Anti-Patterns (banned in this build)
No fabricated customer, quote, rating, review count, box item, logo, product photo, accessory silhouette, metric, or badge. No stock espresso imagery, emoji icons, card inflation, decorative eyebrows, gradients, shadows, new accent colours, or unrelated modernization.

## 10. Blockers & Open Questions
Captured clock: `2026-09-08T01:53:37+03:00` — captured with `date -Iseconds`; no seeded dates are rendered.
Blockers (only a human can resolve):
- **Approved customer testimonials** — three clearly labelled testimonial-request slots — blocks publishing customer proof.
- **Authoritative shipping manifest** — labelled contents-list state — blocks naming any included hardware.
- **Official product/unboxing photography** — labelled 4:3 image slot — blocks visual confirmation of packaging.
- **Official Kettell logo files** — existing text wordmark remains while asset is pending — blocks asset-level brand verification.
- **Bitter font files or import** — browser may fall back to Georgia — blocks exact type rendering on systems without Bitter.

Unverified facts:
- Kettell's official web presence, testimonials, product photography, and box contents — repository search found no supporting assets/content; a Google web search for “Kettell countertop espresso machine” returned no usable authoritative result. The extension asserts none of these.
