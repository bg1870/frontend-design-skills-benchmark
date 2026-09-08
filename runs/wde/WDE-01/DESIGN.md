# Ridgeline — Design Handoff

## 1. Subject & provenance
Ridgeline is treated as a greenfield payroll and shift-scheduling product for independent restaurant owners; no existing identity or product assets were present in the workspace and the named brand could not be verified from supplied materials. Subject colours: Kitchen Steel (`#DDE0DA`) — stainless prep surfaces; Ticket Paper (`#F3F0E7`) — printed kitchen tickets; Grease-Pencil Red (`#E5482D`) — urgent handwritten marks.

Recipe shortlist: Pentagram (Information Architecture) would make direct operational language the graphic system; Linear (Modern Tool) would make the product feel polished but too technology-first; Mailchimp Freddie (Warm Humanist) would feel friendly but less decisive for payroll trust. Pentagram wins because short, bold owner-language can carry a useful no-stock-photo launch page. Structure is adapted; hues are re-derived from the restaurant world.

Assumptions: “Ridgeline” is pre-launch/greenfield; primary audience is an independent owner/operator managing roughly one location or a small group; conversion is a demo request, not self-serve signup; desktop and mobile web are required; all product rows are explicitly sample content. Alternatives rejected: stock restaurant photography (no sourced rights or brand art direction), invented testimonials/logos/metrics/pricing, and a long feature catalog. Deliberately omitted: pricing, integrations list, customer proof, legal claims, and a real app screenshot until source material exists.

## 2. Visual theme
**Design Read**
- artifact: single-page marketing landing
- audience: independent restaurant owner/operators
- visual-language: bold operational editorial — kitchen-ticket directness on a strict poster grid
- mode: greenfield
- visual-variance: 7 — oversized off-grid type and a full-bleed red manifesto, while navigation stays conventional
- motion-intensity: 4 — baseline reveals and tactile states only
- information-density: 5 — clear marketing narrative plus one legible product demonstration
- asset-dependence: 2 — typography and interface structure carry the page; missing identity is exposed
- brand-fidelity: 2 — exploratory identity pending owner-supplied assets

The temperature is urgent, capable, and human rather than soft SaaS. Each viewport has one dominant idea; the product section increases density intentionally.

## 3. Colour palette & roles
Primitives and semantics:
- Charcoal Ink 950 (`#171A18`) — primary text and dark footer ground
- Charcoal Ink 700 (`#454A46`) — body/secondary text
- Charcoal Ink 500 (`#6B716C`) — muted labels
- Kitchen Steel 300 (`#DDE0DA`) — strong rules and disabled borders
- Kitchen Steel 150 (`#E8EAE4`) — standard rules
- Ticket Paper 100 (`#F3F0E7`) — page ground
- Ticket Paper 50 (`#FAF8F1`) — raised/product surface
- Grease-Pencil Red 600 (`#C9331F`) — active/hover accent
- Grease-Pencil Red 500 (`#E5482D`) — primary action and statement field
- Grease-Pencil Red 100 (`#F7D7CF`) — error/alert soft field
- Clean White (`#FFFFFF`) — text on dark/accent and focus separation

Measured contrast targets: Charcoal Ink 950 on Ticket Paper 100 > 14:1; Charcoal Ink 700 on Ticket Paper 100 > 8:1; Clean White on Grease-Pencil Red 600 > 5:1; Clean White on Charcoal Ink 950 > 15:1. Accent-filled buttons use Red 600 for accessible white text.

## 4. Typography
Single-family grotesque system in the recipe spirit, with no external dependency.
- Display: `"Helvetica Neue", "Nimbus Sans Narrow", sans-serif`; weight 800–900; tracking -0.055em; 64–150px fluid; line-height .82–.9.
- Body: `"Helvetica Neue", "Nimbus Sans", sans-serif`; weight 400–600; tracking -0.015em; 16–20px; line-height 1.45–1.55.
- Mono/operational labels: `"Nimbus Mono PS", "Liberation Mono", monospace`; weight 400–700; tracking .04em; 11–13px.
- Numerals use tabular-nums.

## 5. Component behaviours
- Button: square corners, minimum 48px, filled red only for the single primary action in each view; hover darkens to Red 600 and translates 2px; focus uses 2px Charcoal + 2px Clean White separation; active loses translation; disabled uses Steel 300/Ink 500; loading label becomes “Sending…”; success and error are announced in the form.
- Cards: only the product preview and workflow grouping use bounded surfaces; radius 0, no shadow. Hover is not applied unless interactive.
- Input: Ticket Paper 50 with Charcoal border; hover darkens border; focus uses Red 600 outline; disabled uses Steel; error uses Red 100 field and Red 600 border. Empty is placeholder text; loading disables the field.
- Accordion: bordered rows, plus/minus state, keyboard-native button, focus-visible outline.
- Mobile menu: explicit toggle, expanded state updates `aria-expanded`; menu closes after navigation.

## 6. Layout
12-column grid, maximum content width 1440px, side padding 24px mobile / 40px tablet / 64px desktop, gutters 16–28px. Spacing ladder: 4, 8, 12, 16, 24, 32, 48, 72, 96, 144px. Radius grammar: 0px throughout; round only status dots and initials where shape encodes identity/state. Desktop hero uses 8/4 columns; product spread uses 5/7; workflow uses a three-column rule grid. Below 820px everything collapses to one column, navigation becomes a menu, display size reduces, and all touch targets remain at least 44px.

## 7. Motion
Ease `cubic-bezier(.22,1,.36,1)`; fast 160ms, standard 320ms, reveal 700ms. On load, hero lines rise on the baseline in sequence; product rows enter only by CSS load animation, never hidden pending JavaScript. Buttons use 160ms tactile motion. Reduced-motion removes transforms and animations while preserving all content and states.

## 8. Assets
- Brand logo: pending — no source supplied. Surface uses a clearly labelled `[logo pending]` slot beside the plain-text product name rather than presenting a fabricated mark.
- Product screenshot: pending — no source supplied. Surface includes an explicitly labelled illustrative HTML product preview with sample shifts, not an image passed off as product truth.
- Photography: intentionally omitted; no licensed, supplied, or authoritative brand photography exists.

## 9. Anti-patterns
No gradients, shadows, rounded SaaS cards, floating decorative geometry, fake customer logos, testimonials, ratings, time-saved metrics, emoji icons, stock kitchen photography, repeated eyebrow-heading stacks, or three-part zigzag sections. No card grid as a substitute for composition. Exactly one filled CTA per viewport/section. Product sample figures are computed from row data at render time.

## 10. Blockers & open questions
Captured clock: `2026-09-08T01:50:08+03:00` (from `date -Iseconds`).

Human-supplied blockers: final Ridgeline logo/brand guidelines; verified product screenshots and feature names; pricing; integration partners; customer quotes/logos; legal/compliance claims; demo form endpoint and privacy/legal URLs. The shipped surface labels asset/data placeholders and avoids asserting these. The demo form simulates a successful local submission and clearly states that no data is sent.
