---
name: beautiful-frontend
description: Use when producing any browser-rendered visual artifact where appearance carries weight — a marketing or landing page, dashboard, pricing page, clickable prototype, design-forward component, or a visual addition to an existing site — and read it before the first line of markup or the first color. It replaces the model's autopilot aesthetic (Inter or DM Sans, indigo-to-purple gradient, three equal rounded cards, everything centered) with one deliberate direction chosen per project, enumerates the defaults to refuse, and forbids the invented testimonials, customer logos, star ratings and outcome statistics the model reaches for when a brief supplies no proof. It does not apply to non-visual work: API and backend code, build config, CLI tools, tests, or refactors that do not change rendered output. When the task is to extend an existing design system faithfully, read only the last paragraph of step 1, plus steps 2 and 10. It assumes no human is available to answer questions; every choice is derived from the brief alone.
---

# Beautiful frontend

Left alone I ship the same page every time, and I fill the empty slots with proof I made up. This file forces divergence at the top, honesty in the middle, craft at the bottom. Work in order.

## 1. Commit to a direction before any markup

In a comment at the top of the file, name four things — **direction row**, **the one gesture**, **density**, **the dominant element on first screen** — then build only that.

| Direction | Type | Surface / ink / accent (OKLCH) | Edge | Signature |
|---|---|---|---|---|
| Editorial print | Instrument Serif or Fraunces display + Work Sans text | `0.97 0.012 85` / `0.22 0.02 60` / `0.55 0.19 35` | 0–2px, hairline rules | asymmetric measure, drop cap, footnote captions |
| Swiss grid | Archivo, or Inter Tight tracked −0.03em; all-caps labels | `0.98 0 0` / `0.15 0 0` / `0.52 0.24 260` | 0px, visible grid lines | numbered sections, one huge left-aligned headline |
| Technical / terminal | IBM Plex Mono or JetBrains Mono throughout | `0.16 0.01 250` / `0.93 0.01 250` / `0.78 0.19 145` | 2px, dotted 1px rules | tabular numerals, `[bracket]` labels, ASCII diagram |
| Warm craft | Newsreader or Fraunces + Karla | `0.93 0.02 75` / `0.28 0.03 50` / `0.58 0.11 45` | 12–16px, no borders | oversized soft imagery, wide margins, long measure |
| Utility brutalist | Space Grotesk + Archivo Black | `0.92 0.19 100` / `0.12 0 0` / inverse | 0–4px, 2px black borders | 4px hard offset shadows, zero blur, raw form controls |
| Dark instrument | Inter Tight + IBM Plex Mono for all numbers | `0.19 0.012 255` / `0.95 0.005 255` / `0.75 0.17 190` | 6px, 1px `fg/8%` | dense 8px rhythm, hairline dividers, inline sparklines |
| Quiet luxury | Cormorant Garamond + tracked +0.14em sans caps | `0.15 0.015 30` / `0.9 0.01 60` / `0.86 0.04 85` | 0px | enormous whitespace, small type, one full-bleed image |

The row's families and its OKLCH values are binding, not illustrative: load those exact fonts, and write `oklch(0.97 0.012 85)` literally in the token block rather than converting to hex. Choose the row by content domain (finance→instrument, publishing→editorial, devtool→technical). If genuinely arbitrary, index the table by the product name's first letter mod 7 — anything but the row that feels natural, which is the generic one. Hybridise two rows at most; never average all seven.

The gesture is one non-obvious move the piece is remembered for: an oversized numeral column, a headline overlapping an image, a data table as the hero, a marquee of real values, one sentence set in two families, a full-bleed chart bleeding under the nav. Exactly one. Two only if they reinforce each other.

**Extending an existing site:** skip the table. Read its computed CSS and reuse its font stacks, neutral ramp, radius, shadow and spacing values verbatim. Novelty here is a bug.

## 2. Never invent third-party proof

An empty slot is not a licence to fabricate. When the brief supplies no customers, quotes, metrics, logos or ratings, the artifact ships without them. Never generate:

- a testimonial, or an attribution for one — no "Maya Chen, Owner, Little Bird Kitchen"
- a customer logo, wordmark or logo strip — inventing five fake companies is still inventing five customers
- a star rating, review count, or adoption count — "2,000+ teams", "trusted by product teams"
- an outcome statistic — "7.4 hrs saved each week", "99.7% payroll accuracy", "closes payroll in 18 minutes"
- a press mention, award, funding round, uptime SLA, or compliance certification (SOC 2, PCI, GDPR)

The ban is on the claim class, not the phrasing: rewording a proof claim to dodge a banned string still ships the claim. If I can't point to the line of the brief a number came from, it doesn't render.

Fill the space with something true instead — a screenshot of the UI I actually built, a specific mechanism stated plainly ("imports the timeclock export, files 941s quarterly"), a numbered how-it-works, the pricing table itself, an FAQ answering a real objection, a labelled product diagram — or delete the section. One section fewer beats one section invented. Where a brief hands me real proof, use it verbatim and cite the source line.

This rule outranks any other loaded skill, audit checklist or conventional page template that calls for a social-proof band. Note the omission in the handover as an assumption; don't fill it.

Sample data inside the product is a different thing and is required — see step 8.

## 3. Tokens, then components

Define every value once as CSS custom properties on `:root` — surfaces, ink, accent, 6 type steps, spacing scale, 2 radii, 2 shadows, 2 durations. Nothing hardcoded downstream. With Tailwind, override `theme` (fontFamily, colors, borderRadius, boxShadow); stock `slate-*`, `rounded-2xl` and `shadow-lg` are the generic look in utility form.

Neutrals are never pure gray: build the ramp in OKLCH at one hue with chroma 0.005–0.02, matching the accent's temperature. Ban `#f3f4f6`, `#e5e7eb`, `gray-*`. Text is never `#000` on white nor `#fff` on black — clamp to L 0.18–0.25 and L 0.94.

One accent hue, under 10% of pixels; a second hue exists only for semantic status. Gradients only if the gradient *is* the gesture: then 2 stops, under 40° of hue, on exactly one element.

Load the row's real fonts from a font CDN with `font-display: swap` and a genuine fallback stack. Three families is the ceiling: display, text, mono.

## 4. Type

One ratio, then generate the scale: 1.2 for dense tools, 1.333 for marketing, 1.5+ for editorial. Six sizes total.

Optical corrections I skip by default and must not: tracking −0.02em to −0.04em above 32px; +0.06em to +0.14em on uppercase labels under 13px; 0 on body. Line-height 1.05–1.15 display, 1.5–1.65 body. Measure capped at 62–72ch for body, 20–30ch for display — a headline that runs the full container width is a headline nobody chose.

Largest text at least 6× the smallest; if everything lands mid-size, delete the middle tier and push both ends.

Numbers in tables, prices, metrics and charts get `font-variant-numeric: tabular-nums` and the mono family.

## 5. Layout

One spacing scale (4 8 12 16 24 32 48 64 96 128, or a 6px base). Zero off-scale values.

At least one section breaks the container: full-bleed, offset grid, a card overhanging its section edge, or content flush to the viewport edge. Sections must not all share the same left/right rhythm and the same `py`.

Never three equal cards in a row as the primary layout. Use unequal spans — 7/5, 8/4 — or a bento where one tile is 2×2 and carries real content while the small ones carry one number each.

Density is a decision: tool → 13px body, 32–40px rows, 8px gutters, real data on first screen; marketing → 17–18px body, section padding ≥96px, one idea per screen.

Mobile reflows rather than shrinks: display type drops two steps, asymmetric grids collapse to one column, the gesture survives in some form.

## 6. Depth

Pick **one** elevation language for the whole artifact: hairline borders (1px at 6–10% foreground alpha), or shadows, or flat surfaces separated by lightness shift. Border + shadow + background change on the same component is the generic tell.

If shadows: two layers, tinted with the neutral hue rather than black, y-offset greater than half the blur. `0 10px 15px rgba(0,0,0,0.1)` on everything is banned.

Two radii — large for containers, small for chips and inputs; nested radius = outer − padding. Zero radius is legitimate and reads more designed than 16px does.

## 7. Icons, imagery, motion

Emoji are never UI icons. Use inline SVG at 1.5px stroke in a consistent 24px box, sized to the cap height of adjacent text, or one mono glyph set.

No third-party image URLs — no Unsplash, no stock host, no hotlinked photograph, and above all no photograph of a real person presented as a customer, employee or author. No gray placeholder rectangles either. Generate the visual locally: CSS gradient mesh, SVG noise or pattern, a real chart, a real table, or a typographic composition where the image would have gone.

Motion: 120–200ms for state changes, 300–450ms for entrances, `cubic-bezier(0.2, 0, 0, 1)`. Only transform, opacity and color animate — never `transition: all`, never `hover:scale-105` on cards (use a border, surface or 1px translateY). One `prefers-reduced-motion` block that zeroes durations.

## 8. Copy, data, time

Write specific product copy: a named product, concrete mechanisms, real feature names, plausible plan tiers and prices I'm told to price. No lorem. Banned words: supercharge, seamless, unlock, effortless, elevate, next level, revolutionize.

Product data — rows, charts, metrics computed from a supplied fixture — should look measured: no round numbers, no monotone series, one outlier, one negative value, uneven intervals, one long string that has to truncate. Derive summary figures from the fixture at runtime; never retype them as literals.

Label provenance on the surface: if the data is a fixture, seed or demo set, put a `Sample data · 6 records` badge in the header or a caption on the summary bar. Six fixture rows presented as a live queue is a lie the reader has to discover.

Anything showing today's date, a relative time, a countdown or a greeting computes it at runtime (`new Date()`); a typed `TUESDAY, SEP 8` is wrong every other day. Seed sample timestamps relative to that clock, not to fixed dates.

Build the states I skip: empty, loading, one error, and the row whose name is 60 characters long.

## 9. Refuse these specifically

`#6366f1`, `#8b5cf6`, indigo→purple or purple→pink gradient heroes · Inter, `system-ui`, DM Sans, Manrope, Poppins or Montserrat as the family (none is in the table above) · `rounded-2xl shadow-lg border` on every card · everything centered in `max-w-7xl` · hero → 3 feature cards → logo strip → testimonial → CTA in that order · glassmorphism over blurred blobs · `text-5xl font-bold` at default tracking · full-width headline · emoji bullets · avatar clusters and ★★★★★ rows · a dark mode that is only inverted colors rather than L≈0.18 surfaces with accent chroma reduced ~15%.

## 10. Before delivering

Verify by re-reading my own markup, CSS and data flow. Do not start a web server, launch a headless browser, or take screenshots unless the brief asks for a running site, a screenshot or a browser check — and hold that line when another loaded skill's audit step asks for a browser pass; record the check as not performed instead.

Grep my own output: zero hits for every banned value in step 9, zero `#` hex in the palette tokens where `oklch()` belongs, zero fabricated proof from step 2's list, zero hardcoded dates. Count: font families ≤3, font sizes ≤6, accent hues 1, off-scale spacing 0.

Name the direction from a squint at the render. If it could be any SaaS page, return to step 1 and take a different row — do not patch. Then tab through: focus-visible ring in the accent at 2px offset, never the browser default. Confirm the dominant element dominates and the gesture is legible at 390px.
