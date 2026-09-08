---
name: beautiful-frontend
description: Use when producing any browser-rendered visual artifact where appearance carries weight — a marketing or landing page, dashboard, pricing page, clickable prototype, design-forward component, or a visual addition to an existing site — and read it before writing the first line of markup or choosing a single color. It replaces the model's autopilot aesthetic (Inter, indigo-to-purple gradient, three equal rounded cards, everything centered) with one deliberate design direction chosen per project, and it enumerates the specific defaults to refuse. It does not apply to non-visual work: API and backend code, build config, CLI tools, tests, or refactors that do not change rendered output. It also does not apply when the task is to extend an existing design system faithfully — there, match the established tokens and read only step 1's last line and step 8. It assumes no human is available to answer questions; every choice is derived from the brief alone.
---

# Beautiful frontend

Left alone, I ship the same page every time. This file's job is to force divergence at the top and craft at the bottom. Work in order; step 1 is not optional.

## 1. Commit to a direction before any markup

Decide and state four things: **direction** (a row below), **the one memorable gesture**, **density** (tool vs. editorial), **the single dominant element** on first screen.

| Direction | Type | Surface / ink / accent (OKLCH) | Edge | Signature |
|---|---|---|---|---|
| Editorial print | Instrument Serif or Fraunces display + Work Sans text | `0.97 0.012 85` / `0.22 0.02 60` / `0.55 0.19 35` | 0–2px, hairline rules | asymmetric measure, drop cap, footnote captions |
| Swiss grid | Archivo, or Inter Tight tracked −0.03em; all-caps labels | `0.98 0 0` / `0.15 0 0` / `0.52 0.24 260` | 0px, visible grid lines | numbered sections, one huge left-aligned headline |
| Technical / terminal | IBM Plex Mono or JetBrains Mono throughout | `0.16 0.01 250` / `0.93 0.01 250` / `0.78 0.19 145` | 2px, dotted 1px rules | tabular numerals, `[bracket]` labels, ASCII diagram |
| Warm craft | Newsreader or Fraunces + DM Sans | `0.93 0.02 75` / `0.28 0.03 50` / `0.58 0.11 45` | 12–16px, no borders | oversized soft imagery, wide margins, long measure |
| Utility brutalist | Space Grotesk + Archivo Black | `0.92 0.19 100` / `0.12 0 0` / inverse | 0–4px, 2px black borders | 4px hard offset shadows, zero blur, raw form controls |
| Dark instrument | Inter Tight + IBM Plex Mono for all numbers | `0.19 0.012 255` / `0.95 0.005 255` / `0.75 0.17 190` | 6px, 1px `fg/8%` | dense 8px rhythm, hairline dividers, sparklines inline |
| Quiet luxury | Cormorant Garamond + tracked +0.14em sans caps | `0.15 0.015 30` / `0.9 0.01 60` / `0.86 0.04 85` | 0px | enormous whitespace, small type, one full-bleed image |

Choose by content domain (finance→instrument, publishing→editorial, devtool→technical). If genuinely arbitrary, index the table by the product name's first letter mod 7 — anything but reaching for the one that feels natural, which is the generic one. You may hybridise two rows; you may not average all seven.

The gesture is one non-obvious move the whole piece is remembered for: an oversized numeral column, headline overlapping an image, a data table as the hero, a marquee of real values, one sentence set in two families, a full-bleed chart bleeding under the nav. Exactly one. Two if they reinforce each other.

**Extending an existing site:** skip the table. Read its computed CSS, extract font stacks, the neutral ramp, radius, shadow and spacing values, and use only those. Novelty here is a bug.

## 2. Tokens, then components

Define every value once as CSS custom properties on `:root` — surfaces, ink, accent, 6 type steps, spacing scale, 2 radii, 2 shadows, 2 durations. Nothing hardcoded downstream. If using Tailwind, override `theme` (fontFamily, colors, borderRadius, boxShadow) — stock `slate-*`, `rounded-2xl`, `shadow-lg` are the generic look in utility form.

Neutrals are never pure gray: build the ramp in OKLCH at a single hue with chroma 0.005–0.02, matching the accent's temperature. Ban `#f3f4f6`, `#e5e7eb`, `gray-*`. Text is never `#000` on white nor `#fff` on black — clamp to L 0.18–0.25 and L 0.94.

One accent hue. It covers under 10% of pixels; a second hue exists only for semantic status. Gradients only if the gradient *is* the gesture: then 2 stops, under 40° of hue, on exactly one element.

Load real fonts from a font CDN with `font-display: swap` and a genuine fallback stack. Three families is the ceiling: display, text, mono.

## 3. Type

Pick one ratio and generate the scale: 1.2 for dense tools, 1.333 for marketing, 1.5+ for editorial. Six sizes total, no more.

Optical corrections I skip by default and must not: tracking −0.02em to −0.04em above 32px; +0.06em to +0.14em on uppercase labels under 13px; 0 on body. Line-height 1.05–1.15 for display, 1.5–1.65 for body. Measure capped at 62–72ch for body, 20–30ch for display — a headline that runs the full container width is a headline nobody chose.

Largest text at least 6× the smallest. If everything lands mid-size, delete the middle tier and push both ends.

Numbers in tables, prices, metrics and charts get `font-variant-numeric: tabular-nums` and the mono family. Currency symbols and units set one step smaller than their digits.

## 4. Layout

One spacing scale (4 8 12 16 24 32 48 64 96 128, or a 6px base). Zero off-scale values.

At least one section must break the container: full-bleed, offset grid, a card overhanging its section edge, or content deliberately flush to the viewport edge. Sections must not all share the same left/right rhythm and the same `py`.

Never three equal cards in a row as the primary layout. Use unequal spans — 7/5, 8/4, or a bento where one tile is 2×2 and carries real content while the small ones carry one number each.

Density is a decision, not a default: tool → 13px body, 32–40px rows, 8px gutters, visible data on first screen; marketing → 17–18px body, section padding ≥96px, one idea per screen.

Mobile reflows rather than shrinks: display type drops two steps, asymmetric grids collapse to one column, the gesture survives in some form.

## 5. Depth

Pick **one** elevation language for the whole artifact: hairline borders (1px at 6–10% foreground alpha), or shadows, or flat surfaces separated by lightness shift. Applying border + shadow + background change to the same component is the generic tell.

If shadows: two layers, tinted with the neutral hue rather than black, and y-offset greater than half the blur. `0 10px 15px rgba(0,0,0,0.1)` on everything is banned.

Two radii — large for containers, small for chips and inputs. Nested radius = outer − padding. Zero radius is a legitimate choice and reads more designed than 16px does.

## 6. Icons, imagery, motion

Emoji are never UI icons. Use inline SVG at 1.5px stroke and a consistent 24px box, sized to the cap height of adjacent text, or one mono glyph set.

No gray placeholder rectangles, ever. Generate the visual: CSS gradient mesh, SVG noise or pattern, a real chart, a real table, or a typographic composition where an image would have gone.

Motion: 120–200ms for state changes, 300–450ms for entrances, `cubic-bezier(0.2, 0, 0, 1)`. Only transform, opacity and color animate — never `transition: all`, never `hover:scale-105` on cards (use a border, surface or 1px translateY instead). One `prefers-reduced-motion` block that zeroes durations.

## 7. Content is half the design

Write real, specific copy: a named product, claims with actual numbers, plausible names, dates, prices, versions. No lorem. Banned words: supercharge, seamless, unlock, effortless, elevate, next level, revolutionize, "Trusted by 10,000+ teams".

Invented data must look measured: no round numbers, no monotone series, one outlier, one negative value, uneven intervals, at least one long string that has to truncate.

Build the states I skip: empty, loading, one error, and the row where a name is 60 characters long.

## 8. Refuse these specifically

`#6366f1`, `#8b5cf6`, indigo→purple or purple→pink gradient heroes · Inter or `system-ui` as the only family · `rounded-2xl shadow-lg border` on every card · everything centered in `max-w-7xl` · hero → 3 feature cards → logo strip → testimonial → CTA in that order · glassmorphism cards over blurred blobs · `text-5xl font-bold` at default tracking · full-width headline · emoji bullets · a dark mode that is only inverted colors, rather than L≈0.18 surfaces with accent chroma reduced ~15%.

## 9. Before delivering

Search my own output for every banned value in step 8 — zero hits. Count: font families ≤3, font sizes ≤6, accent hues 1, off-scale spacing 0.

Name the direction from a squint at the render. If it could be any SaaS page, return to step 1 and take a different row — do not patch.

Tab through it: focus-visible ring in the accent, 2px offset, never the browser default. Then check the dominant element actually dominates and the gesture is still legible at 390px.
