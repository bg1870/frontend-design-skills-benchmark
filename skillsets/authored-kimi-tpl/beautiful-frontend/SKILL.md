---
name: beautiful-frontend
description: This skill governs tasks that build or extend a browser-rendered visual artifact — marketing, pricing, or landing pages, dashboards, app screens, clickable prototypes, or new sections of an existing site — where the output must look deliberately designed rather than AI-generated. It should be loaded before any markup or styling is written for such an artifact. It should not be loaded for non-visual engineering (APIs, CLIs, pipelines, tests), for logic-only fixes that leave styling untouched, or when the task already supplies a complete mockup or design system to reproduce verbatim, because in those cases its direction-choosing machinery has nothing to decide.
---

# Beautiful front-end: commit to a direction, kill the generated default

## Scope
Apply whenever the deliverable is a browser-rendered visual artifact: marketing/pricing/landing pages, dashboards, app screens, clickable prototypes, or new sections of an existing site.
Outside this scope (non-visual code, logic-only fixes inside already-styled components, verbatim mockup implementation), do not impose this skill's workflow or output rules.

## Result contract
Return working code for the artifact, styled by exactly one direction from the table below, encoded as design tokens (:root custom properties or a Tailwind theme) before any markup is written.
Success requires: (a) every font, color, radius, shadow, and texture choice traceable to one table row; (b) hierarchy built from extreme contrast (R2), not even size ramps; (c) zero generated-look tells (R1, R6, R7); (d) no horizontal overflow at 360px and 1440px; (e) reduced-motion support (R8).
Treat the brief's explicit requirements and the anti-slop rules R1/R6/R7 as mandatory; treat row choice and signature moves as defaults that yield to explicit brief instructions.

## Direction table
Pick exactly one row: match on artifact type first, then product domain. If several rows fit, choose the one whose signature moves match the product's core emotion and commit; never blend rows' palettes or type.

| Direction | Use for | Type (display / body) | bg · ink · accent | Signature moves |
|---|---|---|---|---|
| Editorial print | culture, finance, law, publishing | Fraunces→Georgia / grotesk sans | #FAF7F2 · #1B1A17 · #6B1F2A | hairline rules, 5–7-column asymmetry, drop cap, kickers tracked +0.18em |
| Raw brutalist | dev tools, indie, music, fashion | Archivo Black→Arial Black / ui-monospace | #FFFFFF · #111111 · #0000EE | 2px black borders, 4px 4px 0 hard shadows, radius 0, marquee |
| Terminal data | infra, fintech, dashboards, metrics | JetBrains Mono→ui-monospace throughout | #0C0E12 · #E6E8EB · #7EE787 | 1px #222 borders, tabular-nums, 8px spacing density, dotted-grid ground |
| Soft product | consumer apps, health, education | DM Sans→system sans, both roles | #F6F4EF · #232323 · #E85D3D | 20px radius, layered soft shadows, oversized numerals, pill buttons |
| Dark cinematic | AI, gaming, media, portfolios | Space Grotesk→system sans, both roles | #0A0A0B · #F2F2F0 · #C6FF3E | duotone imagery via mix-blend, 100vh sticky scenes, thin 1px frames |
| Heritage luxe | hospitality, food, real estate | Playfair Display→Georgia / small-caps sans | #F5EFE6 · #141310 · #8A6D3B | double hairlines, small-cap labels, slow 600–800ms reveals |

## Decision rules
- R1. Always reject the SaaS default: Inter or Roboto as the only family, indigo/violet 135° gradients, a centered hero inside max-w-*, three equal rounded-xl icon cards, gray-600 body text, emoji icons. Encode the chosen row as tokens first; every type, color, radius, and shadow value must come from those tokens.
- R2. Always build hierarchy by contrast. Display type: clamp(2.5rem, 6–8vw, 5–7rem), line-height 1.0–1.1, letter-spacing −0.02 to −0.04em; body 15–18px, line-height 1.5–1.7, measure 45–70ch. Each screen-height section gets exactly one dominant element at least 2.5× the visual weight of the next-largest; never ship the 48px/18px/16px evenly-stepped centered stack.
- R3. Always: one background, one ink, one accent, plus at most one tint of the background — custom hex values, not unmodified Tailwind palette classes. Accent on ≤10% of visible area; if everything is accented, nothing is. Gradients only as duotone over imagery where the row allows, never as full-bleed background wash.
- R4. Default page structure: 12-column grid, content spanning 5–8 columns, with at least one offset, overlap, or full-bleed break-out per page. Allow at most one uniform card-grid section, and within it cards must differ in span, tone, or media; reject pages where every section is a py-24 centered max-w-7xl 3-column grid.
- R5. Ship exactly one signature moment from the row's moves, executed fully — not five half-done effects. Also always: ::selection in the accent, an inline-SVG favicon, a focus-visible ring in the accent, and hover states that translate/scale/reveal rather than only recolor.
- R6. Never emit lorem ipsum, "Welcome to…", or empty verbs (Supercharge, Unlock, Elevate, Seamless, world-class, cutting-edge). Every headline makes a specific claim or carries a number ("Roasted 9 days before it ships", "$4,312 saved per quarter"). If the brief supplies no facts, invent concrete, internally consistent ones; leave nothing placeholder-shaped.
- R7. No gray placeholder boxes, no stock or placeholder image URLs, no emoji as icons. Build visuals in code: SVG line art and patterns, conic/radial meshes per the row, solid blocks carrying type, CSS-drawn product abstractions. Icons: inline SVG only, one stroke width (1.5px), one style.
- R8. Motion: 150–500ms for UI states, ≤800ms for scroll scenes; ease-out cubic-bezier(0.22,1,0.36,1), overshoot cubic-bezier(0.34,1.56,0.64,1) only in Soft product and Raw brutalist. Reject ease-in-out defaults and instant color snaps. Gate all animation behind @media (prefers-reduced-motion: no-preference) or provide a reduced fallback.
- R9. At most 3 font families total (display, body, mono-for-data). Load display faces with the row's fallback stack so an offline render still shows the intended pairing (serif vs grotesk vs mono); never load extra families "for options".

## Limits and fallbacks
- Explicit style or brand instructions in the brief or governing instructions override any rule here; apply the remaining rules to whatever is left unspecified. Local precedence otherwise: R1/R6/R7 > R2 > R3/R9 > R4/R5/R8.
- When extending an existing site, treat its established palette and type as the row instead of importing a table row over it; still apply R2 and R4–R8 to the new sections.
- If the artifact fits no row (e.g., a dense form-heavy tool), default to Terminal data for data-centric tools or Soft product for consumer flows — never to the SaaS default.
- If a mandated color fails 4.5:1 contrast for body text, darken or lighten its shade while preserving hue; do not drop the color and do not ship low-contrast text.
- If R4's overlap or break-out destroys R2's single dominant element in a section, R2 wins for that section: relax the overlap, not the hierarchy.

## Before returning
- Scan the final code for: lorem|ipsum, "Welcome to", Supercharge|Unlock|Elevate|Seamless, linear-gradient(135deg, unsplash|picsum|placehold URLs, emoji in markup, Inter or Roboto as the sole family. Replace each per R6/R7/R1 and re-check.
- Verify every screen-height section has one dominant element ≥2.5× the next; rework any section that is an even ramp or a centered-column clone per R2/R4.
- Count: ≤3 font families, exactly one signature moment, accent on roughly ≤10% of elements; trim or add per R9/R5/R3.
- Check 360px and 1440px widths: no horizontal overflow (reduce clamp maxima or re-wrap before shrinking body text); confirm the reduced-motion fallback (R8) and 4.5:1 body-text contrast (shade rule above).
- Return when all checks pass. If one cannot pass, apply its fallback and record the deviation in a single code comment, not in prose around the deliverable.

## Decision examples
- Normal case: pricing page for a meditation app, no brand supplied. Choose Soft product: #F6F4EF ground, DM Sans, #E85D3D only on the recommended tier, price figures at clamp(3rem,6vw,5rem) with tabular-nums, tiers equal-width but the recommended one inverted dark (R4) — not a centered "Find your calm" hero over an indigo gradient with three identical check-icon cards (R1, R6).
- Boundary case: same meditation company, but the artifact is its internal metrics dashboard. Choose Terminal data — #0C0E12 ground, JetBrains Mono, tabular numerals on an 8px-density grid — not the Soft product tokens, because row selection keys on artifact type first (Direction table rule): identical brand, different artifact type ⇒ different row.
