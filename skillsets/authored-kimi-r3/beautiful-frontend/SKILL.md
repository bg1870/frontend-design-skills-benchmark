---
name: beautiful-frontend
description: This skill should be loaded whenever the agent is about to write browser-rendered visual output — landing/marketing/pricing pages, dashboards, product UI, clickable prototypes, or visual additions to an existing site — and the bar is work that looks art-directed rather than AI-generated. It is self-contained: it forces a committed art direction before any code, replaces autopilot patterns with concrete typographic, color, layout, and motion decisions, audits the finished artifact against that commitment, and bars fabricated proof — invented metrics, invented testimonials, unlabeled sample data. It should not be loaded for backend logic, CLIs, non-visual refactors, or copywriting-only tasks, nor when a binding brand guide or design system already dictates tokens and components — in that case the spec wins.
---

# Beautiful Frontend

## 1. Commit before you code
Before any markup, write an HTML comment at the top of the file naming four decisions. If you cannot name them, you have not decided.

- **Register** — the aesthetic world, argued from a concrete detail of the subject and its audience (name that detail): editorial, technical, brutalist, warm-consumer, luxe-dark, or one you coin. Your reflexes — dark-mode-with-glow, pale paper under near-black ink — are habits, not a decision.
- **Palette** — ground, ink, accent, as hex values. The ground is argued from the register, not inherited (§4).
- **Type pairing** — display face + text face, each with an explicit job, both actually loaded (§3).
- **Signature move** — the single element a viewer would screenshot (§6).

## 2. Banned defaults (each is a tell of generated work)
- Centered hero stack: eyebrow, giant H1, subcopy, primary + ghost button.
- Three-up icon feature grid; icon-in-a-colored-circle.
- Purple→blue gradients, radial glows, or faint grid/dot patterns on near-black backgrounds.
- Glassmorphism: blurred panels with 1px white borders.
- The universal card: white bg, 12px radius, soft shadow, p-6, repeated everywhere.
- Gradient text on headlines. Emoji or generic line-icon grids as visual content. Grey boxes labeled "image".
- system-ui / Inter / Roboto as the entire design — load at least one real typeface.
- Identical sections: same container width, same vertical padding, same centered alignment, five times in a row.
- Fade-up-on-scroll applied to every block as the page's only motion.
- Placeholder copy: "Lorem", "Feature title", "Welcome to X, the best way to…".

## 3. Type
- Largest display size ≥ 4× body size: `clamp(3rem, 7vw, 7.5rem)`, line-height 0.95–1.05, letter-spacing −0.02 to −0.04em.
- Body 16–18px, line-height 1.5–1.65, measure ≤ 68ch. Kickers/labels 11–12px, uppercase, letter-spacing 0.14em+.
- Two faces max, both loaded via `<link>` stylesheet tags from a font CDN. Every family named in CSS must be one actually loaded — never an invented name, never `local()` over a font the machine may lack.
- The display face must have character (high-contrast serif, wide grotesk, mono); the text face stays quiet.
- `font-feature-settings: "tnum"` and right-aligned figures anywhere numbers appear.

## 4. Color
- Three-color discipline: ground, ink, accent, plus tints of those. Accent covers <10% of pixels — CTAs, one word in a headline, key figures.
- The ground is chosen per artifact from the subject's material world — its lightness and its hue, both argued. Pale neutral ground + near-black ink is the combination that needs justification every time; ship it only when the register's argument says paper. Dark, pure-white, tinted, and saturated grounds are equal citizens — a night-shift tool, a trade business, and a luxury brand must not share one ground.
- Never pure #000 on pure #fff. Paper ≈ #f6f3ec–#faf8f2; ink ≈ #12110e–#1a1a1e; dark grounds ≈ #0d0d0f or a deep chromatic, never navy-purple.
- Starting points per register, not a fixed palette: editorial (paper #f6f3ec, ink #1b1815, oxblood #7c2d2d) · technical (white #ffffff, ink #101014, ultramarine #2b3bff) · brutal (#ffffff, #000000 2px rules, acid #d9ff00) · warm (cream #fbf1e3, espresso #241a10, cherry #e0342f) · luxe-dark (#0e0e10, bone #ece7dd, gold #c9a227) · nocturne (deep teal #0d2925, mist #dcebe4, signal #ff5a3c). The grounds span paper → white → cream → near-black → deep color on purpose; that spread is the point.

## 5. Layout
- Required per page: at least one full-bleed band, one element that overlaps a boundary or breaks the grid, one asymmetric split (e.g. 5/7 columns). All-centered alignment is a failure.
- Alternate section surfaces for rhythm (light → dark → light, or ground → tint). Five identical sections is a failure.
- Vary container widths (mix full-bleed, ~1280px, ~640px measures) and vertical padding (96–160px, different per section). Let one section be mostly whitespace.
- Separate with 1px hairlines at 10–15% ink opacity, not shadows. Shadows only on genuinely floating elements, large and soft: `0 24px 48px -12px rgb(0 0 0 / .18)`.
- Build "imagery" in code — SVG diagrams, generative canvas, charts, rendered mini-UI of the product — never empty placeholder boxes.

## 6. Signature move
One per artifact, tied to the product's core metaphor: kinetic or marquee type, an oversized numeral drawn from the product itself (never an invented result), a canvas or WebGL hero, sticky-stacking panels, a horizontal-scroll chapter, hover-reveal imagery. Execute it fully and keep everything around it quiet. It usually lives in the hero; if not, the hero must be oversized typography doing the talking or the product itself rendered live — never a text stack.

## 7. Motion
- Entrances 600–900ms, `cubic-bezier(0.22, 1, 0.36, 1)`, stagger children 50–90ms, animate transform/opacity only. Micro-interactions 150–250ms.
- Every interactive element gets a hover state that moves something — translate, underline draw, arrow nudge, color invert — not a bare opacity dip. Style `:focus-visible` in the accent.
- Choreograph the hero on load; do not make scroll-reveal the only trick. Honor `prefers-reduced-motion`.

## 8. Copy, data, and honesty
- Invent a plausible brand name. Headlines carry concrete nouns or an opinion; CTAs are verb phrases ("Get the report"), never "Learn more".
- Invent voice, never evidence. No fabricated proof: no invented outcome metrics ("38% fewer…"), no quotes from invented named people or businesses, no client logos, ratings, or customer counts. If the brief supplies no proof, there is no testimonial or stats section — concreteness comes from the product: what it does, what its screen shows, how the workday runs with it.
- Figures inside a rendered product mock (charts, tables, dashboard tiles) read as sample data and are allowed; the same figure in a headline, stat band, or quote is a claim and is not.
- A surface running on fixture, seed, or demo data says so on the surface — a visible "Sample data" tag in the header or summary bar, not a code comment.
- Dates, times, and relative labels ("today", "in 2h") come from the runtime clock (`new Date()`), formatted with `Intl.DateTimeFormat` — never typed strings, never a hand-written weekday or month name. Anything that can go stale must be derived, not written down.
- Set `::selection` to the accent. Ship an inline SVG favicon. For paper and luxe registers, lay 3–5% opacity SVG-noise grain over the surface.
- The footer is a canvas — oversized wordmark or wordmark-as-graphic — not a four-column link farm.
- Dashboards: density is the aesthetic. Hairline grid, tabular right-aligned figures, one excellent chart beats five placeholder cards.

## 9. Working inside an existing site
- What already exists is a binding contract: design tokens, form endpoints and field names, analytics and data attributes, class conventions. Extend within them; replace or rename none.
- Add no new files to the delivered site's own directory. Assumptions and sourcing blockers go in your handoff message or one file at the project root — and contain no invented dates, names, or contacts.

## 10. Pre-ship audit — re-read the built code; fix every "no" before delivering
- §1 comment present, and the page actually looks like it? Ground argued per §4 — not the reflex paper-and-near-black?
- Display type ≥ 4× body? Exactly one accent? At least one broken-grid or overlap moment? Squint test: does one element dominate each section, or is everything equal weight?
- Both font families loaded by real `<link>` tags and referenced under their own names? Every clickable thing has a hover and a `:focus-visible` state?
- Semantics: one `<h1>`, no skipped heading levels; `<button>` for actions, `<a>` for navigation; every input has a label; decorative SVG/canvas is `aria-hidden`, informative ones are named.
- Contrast computed, not eyeballed: body and label text ≥ 4.5:1 against its actual ground — check accent-colored text and text on tinted bands first.
- Touch layouts: every interactive target ≥ 44×44px. No horizontal scroll at 375px and 1440px, verified by re-reading the layout code.
- Zero banned patterns from §2? All copy real per §8? Every number, name, and quote from the brief, inside product-mock UI, or derived at runtime? Sample data labeled on the surface?
- Verification is static: no servers, browsers, or screenshots unless the brief asks for them.
