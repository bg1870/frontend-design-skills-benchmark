---
name: beautiful-frontend
description: Loads when the task produces or restyles something a browser renders and a person will look at, such as a landing or marketing page, dashboard, pricing page, clickable prototype, component demo, HTML email, or a new section or feature added to an existing site, in plain HTML/CSS, React, Vue, Svelte, Tailwind, or any UI framework. It governs the visual and interaction decisions (direction, type, color, layout, spacing, states, motion, copy) and must be read before the first line of markup or styles is written. It should not be loaded for backend, CLI, or data work with no rendered UI, for logic-only edits inside an existing UI where no visual change is intended, or when a complete design spec, Figma file, or brand system is supplied to be matched exactly (match the spec instead).
---

## 1. Decide before markup
Write this block as the first comment in the stylesheet (or top of the root component) and fill every field;
everything below derives from it. "Clean", "modern", or "minimal" in any field means you have not decided.

    /* DIRECTION: <one from §2> for <audience>. Reads as <two specific adjectives>.
       REFERENCE: <a physical thing, not a website: magazine, receipt, timetable, museum label, a car's
                   dashboard>. Two details borrowed from it: <e.g. its 0.5pt rules, its caps labels>
       TYPE: display <face> / text <face> / mono <face or none>
       HUE: <0-360>  accent oklch(L C H)  bg oklch(L C H)  ink oklch(L C H)  THEME: <light|dark>
       RADIUS: <one value>  SPACE BASE: <4|6|8>px  DENSITY: <airy|standard|dense>
       ONE GESTURE: <the single layout or motion idea this artifact will be remembered for> */

Pick DIRECTION from the brief's domain, audience, and tone words: shortlist the two that fit, take the one
the domain's typical websites do NOT use unless tone words demand the other. Domain clichés are banned:
fintech navy-with-blue-glow, AI purple gradients, SaaS centered-hero-plus-three-cards, wellness
sage-and-rounded, dev-tool black-with-green-terminal. Light theme unless DIRECTION or brief says dark.
Spend novelty in exactly two places, normally type pairing and ONE GESTURE; everything else is quiet and
correct. Novel grid + novel palette + novel type + novel motion reads as noise.

## 2. Directions (starting points; the REFERENCE makes each instance specific)
- Editorial: serif display 64-120px, 1px rules, numbered sections, pull quotes, paper bg, ink text, one
  saturated accent on at most three elements.
- Swiss: grotesque sans (not Inter), visible 12-col grid, flush-left, 96px beside 12px, black + white +
  one primary, radius 0, no shadows.
- Technical: 13px UI, mono for values and labels, 1px borders form the layout, muted bg with one signal
  color, tabular numbers, zero decoration.
- Warm humanist: cream or sand bg, humanist sans, soft ink (L 25%), radius 12-16px, earthy accent
  (terracotta, olive, ochre), line-height 1.6, no hard borders.
- Quiet luxury: light serif or thin grotesque, letter-spaced caps labels, whitespace at 2x, near-black on
  bone, no shadows, radius 0, 11px metadata, slow 600ms motion.
- Brutalist: system or wide sans at extreme size, 2-3px solid borders, hard offset shadows, primary colors,
  radius 0, hover inverts colors.
- Playful: chunky rounded display, 2-3 saturated hues from one triad, pill shapes, sticker decoration,
  springy motion, deliberately irregular grid.
- Industrial: condensed caps sans, black on safety yellow or orange (or inverted), stamps, tags,
  coordinates, mono metadata, strict rectangles.

## 3. Autopilot defaults, banned unless DIRECTION explicitly calls for them
Inter, Roboto, or system-ui as display face. Pure #fff bg or #000 text. Tailwind default gray/slate/zinc
with indigo or violet accent. Purple-to-pink gradients, gradient text, blurred color blobs, glassmorphism.
The centered hero stack: badge pill, headline, subhead, two buttons, screenshot in a browser frame with a
glow. Three equal feature cards with icon-in-colored-circle. Card inside card. `rounded-xl shadow-md` on
everything. Emoji anywhere. Hover `scale(1.05)`. `transition: all`. Zebra tables. Rainbow chart series.
A scaled-up "Most Popular" tier. A gray box labeled "Image". Lorem ipsum, Acme, John Doe. Headlines using
Unlock, Supercharge, Seamless, Empower, Elevate, Revolutionize, Streamline, Powerful, Effortless.

## 4. Type
- Two families max (three if mono is structural). Pair by contrast: serif display with grotesque text, or
  heavy grotesque display with light humanist text. Never one family at five weights.
- Load from Google Fonts with `display=swap`; name a same-class fallback (Georgia, ui-sans-serif, ui-monospace).
- Sizes from one ratio: 1.2 for dense UI, 1.25-1.333 for marketing. Display is fluid, e.g.
  `clamp(2.5rem, 1rem + 6vw, 6rem)`. Contrast is 96px beside 14px, not 32px beside 20px.
- Tracking: grotesque display -0.02 to -0.045em; serif display -0.01 to 0; body 0; caps labels +0.08 to
  +0.14em at 11-12px medium. Leading: display 0.95-1.05, headings 1.1-1.2, body 1.5-1.65, UI 1.3-1.4.
- Measure: body `max-width: 65ch`; headlines 12-24ch. `text-wrap: balance` on headings, `pretty` on body.
- `font-variant-numeric: tabular-nums` on every price, stat, table cell, timer; `"zero"` feature on mono data.
- Adjacent heading levels differ by at least two of: size, weight, color, tracking, case. Secondary text is
  a lighter ink (L 45-55%), never `opacity`.

## 5. Color
- Build the whole palette in OKLCH from the single HUE. Neutrals carry it at chroma 0.005-0.02 (that hue
  or its complement). No untinted gray, no `#f9fafb`.
- Light bg L 96-99%, ink L 15-25%. Dark bg L 12-20% with chroma 0.01-0.03 (never #000 or #111); dark ink
  L 88-94%, never pure white. Body contrast at least 7:1, secondary at least 4.5:1.
- Accent on at most 10% of pixels: primary action, one focal element, links. A second hue only for semantic
  status. Adjacent surfaces differ by 3-6% L, separated by a 1px hairline, not by shadow-on-white.
- A gradient, if any, appears once: one hue across two lightnesses, or two hues within 30 degrees.
- Even in Tailwind, define tokens as `:root` custom properties and extend the theme; default palette class
  names (`bg-gray-100`, `text-blue-600`) are a tell.

## 6. Layout and spacing
- One dominant element per viewport, obvious at 10% zoom. If two compete, shrink one.
- Spacing scale = base x {1,2,3,4,6,8,12,16,24,32}. Inside-group gap to between-group gap at least 1:2
  (label to value 4-8px, heading to body 12-16px, groups 32-64px). Section padding varies (64, 128, 96px)
  so the page has rhythm; identical section padding is a tell.
- Break the centered column at least once per page: a 5/7 or 4/8 split, a headline offset into the margin,
  an element bleeding to the viewport edge, or something overlapping a section boundary. Left-align any
  text over two lines; center only single-line headings.
- Containers per content type: prose 65ch, grids 1200-1400px, imagery full-bleed. Not one `max-w-7xl`.
- Fewer, larger: cut list items until each gets at least 200px of width or a full row.
- Structure via grid lines and hairline dividers before boxes. If cards: one elevation level, no nesting,
  equal padding on all sides. Left edges of heading, body, and button in a block coincide exactly.
- At 390px: `repeat(auto-fit, minmax(min(100%, 280px), 1fr))`, type shrinks via clamp, nothing scrolls
  horizontally, tap targets at least 44px.

## 7. Surfaces, controls, states
- One RADIUS token; nested radius = outer minus padding. Pills only for tags and toggles.
- Borders: 1px `color-mix(in oklch, currentColor 12%, transparent)`, or bg L plus or minus 10%.
- Shadows tinted with the HUE and layered: `0 1px 2px oklch(20% .02 var(--hue) / .06), 0 12px 32px -12px
  oklch(20% .02 var(--hue) / .14)`. Or none at all, hairlines only. Never one gray shadow on everything.
- Buttons: three levels (solid, outline or ghost, text link). Height 36/40/44, horizontal padding 2x
  vertical, `line-height: 1`. Every interactive element has hover (bg or border shift, or translateY(-1px)),
  active (translateY(1px) or darker), `:focus-visible` 2px ring offset 2px in accent, disabled at 50%
  opacity with no hover.
- Inputs: label above (never placeholder-as-label), 1px border, focus ring, error text below.
- Icons: one set, one stroke width (1.5 or 2), sizes 16/20/24, `currentColor`.
- Imagery: never a placeholder box or an external URL that can 404. Build it: an SVG pattern, a CSS
  gradient mesh, a product mock made of real UI elements, a typographic figure, or a tinted block at the
  correct aspect ratio with a caption.
- `<title>`, inline-SVG favicon, `::selection` in an accent tint, `-webkit-font-smoothing: antialiased`
  on dark bg, `scroll-margin-top` on anchor targets.

## 8. Motion
- Three moments max: entrance (fade + translateY 8-12px, 400-600ms, stagger 40-70ms), hover (150-200ms), ONE GESTURE.
- Easing `cubic-bezier(.2,.8,.2,1)` in, `cubic-bezier(.4,0,1,1)` out. Never `ease`, `linear`, or
  `transition: all`. Animate only transform, opacity, color, background-color, border-color, box-shadow.
- `@media (prefers-reduced-motion: reduce)` removes transforms and entrances.

## 9. Content is part of the design
- Invent a plausible product and write as its designer: a two-syllable name (not Acme, Nexus, Synergy,
  Nova), one concrete sentence of what it does, features named by outcome ("Reconcile 40k invoices before
  lunch"), never by category ("Powerful analytics").
- Headline at most 8 words, concrete noun plus verb. Body 1-2 sentences. CTA labels differ by context
  ("Open a workspace", "Watch the 4-minute tour"); "Get started" and "Learn more" at most once each.
- Numbers specific and un-round (12,847; 99.97%; $4.20), formatted with `Intl.NumberFormat` in JS. Dates
  plausible relative to today. Names diverse and plausible. A footer with real-looking nav, legal, year.

## 10. Per artifact
- Marketing page: 5-7 sections; no two adjacent sections share structure or bg. Hero is one of: split
  (copy 5 cols, visual 7), oversized typographic (headline spans the width, one line of body, one CTA), or
  full-bleed visual with copy bottom-left. Features as alternating rows, a bento with unequal cells
  (2x2, 2x1, 1x1), or a numbered list with 96px numerals. Social proof is one large-type quote with
  attribution, not a three-card grid.
- Dashboard: 13px base, 12px labels, tabular nums. Nav 220-240px or a 48px top bar. 12-col grid, 16px
  gaps. KPIs as one strip of numbers separated by hairlines with inline delta text or 40px sparklines, not
  four icon cards. One chart owns at least 40% of the area. Series in neutrals with one accent for the
  primary; red and green only for real status. Tables: sticky header, right-aligned numbers, 36-40px rows,
  row hover, no zebra. Design the empty and loading states.
- Pricing: at most 3 tiers in one row. Highlight via bg or border, not scale or a gradient badge. Price in
  display type, period small. One line naming each tier's audience; a distinct CTA per tier. More than 5
  features becomes a comparison table below, not repeated checkmark lists.
- Clickable prototype: nav switches views (hash routing), forms validate, one flow completes to a success
  state, Esc closes modals, Tab order works, every control has all four states.
- Extending an existing site: skip §1-2. Read its CSS first and extract font, sizes, colors, radius,
  spacing, shadow, and button styles; reuse its tokens and classes; add no font or accent; match its
  density and tone even where you would choose otherwise. Native-looking beats better-looking.

## 11. Before shipping
- Search the output for every item in §3 plus `#fff`, `#000`, `transition: all`, `Inter`, `shadow-md`,
  `blur-3xl`, emoji, "Lorem", "Acme". Fix every hit.
- Name the DIRECTION in one word from the render alone. If the word is "clean" or "modern", return to §1.
- At 1440px and 390px: one dominant element, no horizontal scroll, visible section rhythm, all numbers
  tabular, all controls have four states, reduced-motion respected, the §1 block matches what shipped.
