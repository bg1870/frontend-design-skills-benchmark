---
name: beautiful-frontend
description: This skill directs the creation or visual revision of browser-rendered interfaces—marketing pages, product surfaces, dashboards, pricing, commerce, editorial pages, and interactive prototypes. It should be loaded whenever a task requires choosing or implementing web layout, typography, color, imagery, motion, responsive behavior, or UI styling, including a visual addition to an existing site; it should not be loaded for backend-only work, non-visual refactors, isolated business logic, native apps, or documents with no rendered web interface.
---

# Beautiful Frontend

## Establish truth before art direction

- Separate supplied production facts and assets from fixture, mock, seed, sample, or unknown material before composing the page.
- Never invent customers, testimonials, logos, integrations, certifications, compliance claims, performance gains, usage totals, review counts, or attributed quotes. Omit absent proof instead of disguising it as placeholder content.
- Product mock-up values may illustrate behavior, but mark the containing surface “Sample,” “Demo,” or “Illustrative”; never place invented values where they read as company or customer evidence.
- If a dataset is named or located as a fixture, mock, sample, or seed, put a persistent visible marker beside the page title or scope control (“Sample data” or a subject-specific equivalent). Do not call it live; the marker must survive the mobile layout and cannot live only in a tooltip or handoff note.
- Before deriving `today`, weekday, relative age, overdue state, greeting, or schedule status, establish one reference instant and timezone: use a supplied simulation clock, otherwise the runtime clock. Format UI dates from that value with locale-aware APIs; never type a date that is meant to stay current.
- When time affects an operational decision, show an “As of” time and timezone near the affected summary. Do not infer live status merely because records are loaded at runtime.
- Do not invent provenance about your own work. If a requested note needs “checked,” “generated,” or similar metadata, read the system clock immediately before writing it; otherwise omit the date.
- Do not add README, assumptions, blocker, screenshot, or audit files unless the brief names them. Put requested assumptions in the final handoff when no file destination is specified.

## Set a direction before coding

1. Infer the artifact’s job, audience, density, and emotional register from the brief and product category; do not pause for clarification.
2. Write a private thesis: “This should feel **[two specific adjectives]**, expressed through **[type behavior]**, **[spatial behavior]**, and **[one subject-derived motif]**, never **[opposing cliché]**.” Reject choices that do not support it.
3. Map three cues from the subject to visible decisions: for example, “archival” → folio numbers and hairlines; “fast” → compressed type and forward diagonals; “human” → warm neutrals and irregular crops. Do not attach an unrelated aesthetic.
4. Choose one fitting composition model: editorial field, dense instrument panel, framed object, chronological stream, catalog grid, or staged narrative. Do not default to a centered hero followed by equal cards.
5. Choose one memorable device—crop, rule, numbering, typographic interruption, diagram language, texture, or overlap—and repeat it 2–4 times at different scales. Use other decoration only when it clarifies hierarchy.
6. In an existing product, inventory its type scale, spacing, radii, colors, icons, container widths, and states before editing. Preserve URLs, form names, IDs, data attributes, analytics hooks, event behavior, and design tokens unless the brief explicitly changes them; make the smallest visual intervention that solves the task.

## Build hierarchy from content

- Give one promise, task, or metric first-read status above the fold, one element second-read status, and visibly recede the rest.
- Make headings carry information, not atmosphere. Replace “Welcome back” with the useful state and vague slogans with a concrete outcome supported by the brief.
- Use final-feeling copy without lorem ipsum, “Acme,” fake people, or unverifiable claims. Unknown facts become omitted sections or neutral interface labels, not invented specifics.
- Give primary actions a verb plus outcome (“Create workspace,” “See pricing”) and allow only one primary action per visual region.
- Reserve uppercase eyebrows for real categories or sequence; do not place one above every heading.
- In dashboards, pair each key number with its unit, comparison or reference period, source state, and the decision or next action it supports.

## Compose instead of tiling

- Establish 2–3 recurring alignment lines across unrelated sections. Break at most one deliberately for emphasis.
- Define no more than eight spacing tokens, such as 4, 8, 12, 20, 32, 52, 84, and 136px; do not introduce near-duplicate one-off gaps.
- Keep prose at 55–72ch and forms at 28–40rem. Dashboards may fill the viewport, but each reading column must remain scannable.
- Give at least one region a distinct 1440px silhouette: narrow/wide split, edge crop, rail, controlled asymmetry, or deliberate dense field. Do not make every section the same centered rectangle.
- If border, background, radius, and shadow all express one grouping, keep only the least two needed. Cards are for independently actionable, movable, selectable, or genuinely grouped objects—not every paragraph or statistic.
- Vary rhythm by importance: one expansive focal passage, compact supporting passages, and a decisive ending. Avoid repeated equal-height bands.
- Counterweight deliberate empty space with type, image, color, or a strong edge so it reads as composition rather than missing content.

## Make typography carry identity

- Use at most two font families and three weights. Prefer project fonts; otherwise choose a deliberate serif, neo-grotesk, humanist, monospace, or system stack from the thesis rather than importing a fashionable default.
- Pair contrasting roles—expressive display with quiet body, or one family with strongly different width, weight, and size. Never pair two nearly identical sans-serifs.
- Use a modular ratio near 1.2 for dense tools, 1.25 for general UI, or 1.333 for editorial/marketing; break it only for the single focal statement.
- Set body copy at 16–18px with 1.45–1.7 line-height. Keep labels at 12–14px only with clear contrast and spacing; never put mobile body copy below 16px.
- Use `clamp()` for display type and section spacing with useful minimums and bounded maximums. Tighten tracking only as display size rises; track uppercase outward and leave body tracking near normal.
- Author beneficial hero line breaks at wide widths, release them on narrow screens, and prevent single-word heading widows where practical.
- Use tabular numerals for changing metrics, prices, timers, and tables; align numbers by decimal or unit rather than centering them.

## Control color, surface, and imagery

- Define semantic tokens before components: canvas, surface, text, muted text, line, action, accent, success, warning, danger, and focus.
- Use one dominant field, one supporting family, and one scarce accent under roughly 10% of visible area unless exuberant color is the concept.
- Tint neutrals toward the subject: warm brown/cream for tactile or hospitable work; cool or achromatic for technical work. Use pure black/white only for intentionally hard contrast.
- Maintain at least 4.5:1 contrast for normal text and 3:1 for large text and component boundaries; pair status hues with labels or symbols.
- A gradient must describe light, depth, progression, or supplied brand motion. Do not add purple-blue glows, blurred orbs, or random abstract gradients as filler.
- Choose one radius family: 0–4px for precise/editorial work, 6–12px for approachable products, larger only for pills or an explicit soft-object language. Nested radii must share centers.
- Use at most three elevation levels. Prefer borders, tonal separation, and overlap; if shadows remain, increase blur and reduce opacity with height rather than repeating one halo.
- Reuse supplied assets first and crop around their subjects. With no imagery, use type, data, CSS geometry, or one small inline SVG motif—not stock-photo panels or gray placeholders.
- Use one existing icon family; otherwise draw only necessary inline SVGs with one viewBox, stroke width, cap, and join system. Do not use emoji as product icons.
- Make charts share the interface’s strokes, corners, labels, and palette; emphasize the insight and mute axes, grids, and nonessential series.

## Make interaction and responsiveness intentional

- Every visible control must work: links navigate or anchor, tabs switch, menus open and close, toggles change, and forms expose relevant focus, invalid, disabled, loading, and success states.
- Use motion for cause and spatial relation: controls 120–180ms, panels/reveals 240–450ms, deceleration on entrance and acceleration on exit. Animate transform and opacity, stagger at most six items by 30–60ms, and avoid perpetual motion except real activity or one ambient motif.
- Keep hover travel under 2px and never scale text or whole cards. Add a visible `:focus-visible` indicator at least 2px thick with offset; remove travel, parallax, and loops under `prefers-reduced-motion`.
- Keep touch targets at least 44×44px. Anything revealed on hover must also be available by focus, click, or inline disclosure.
- Treat 360px, 768px, and 1440px as separate compositions: decide what stays primary, reflows, scrolls, or disappears. Preserve meaningful DOM order and remove decorative overlap before it clips.
- Stack by meaning—summary before detail, controls before results, content before supporting art—not blindly by desktop left-to-right order.
- Keep table headers and comparison context through horizontal scroll, priority columns, or labeled rows; never squeeze every column unreadably.
- Bound gutters near 16–24px on mobile and 40–80px on desktop. Art may bleed; readable text may not. Navigation needs a real compact state rather than hidden links.

## Reject generated-looking defaults

- No automatic bento grid, equal feature-card trio, pill on every label, oversized quote mark, sparkle icon, gradient text, fake browser chrome, decorative grid, logo cloud, or “AI constellation.” Use one only when the subject or supplied brand language specifically calls for it.
- Do not center prose, forms, data, or multi-step tasks. Center only short singular statements.
- Do not round every corner, elevate every surface, or change the background each section. Spend those devices only at hierarchy changes.
- Delete badges and microcopy that repeat adjacent information. Delete any ornament whose removal improves clarity without weakening the thesis.
- Do not recreate a famous product from memory; translate the brief’s nouns, verbs, era, and audience into a new system.

## Verification boundary and correction pass

1. “Polish,” “verify,” “check,” and “test” do not authorize launching a browser or server, probing for browser automation, taking screenshots, or creating verification artifacts. Do those only when the brief explicitly requests rendered/browser inspection, screenshots, end-to-end behavior, or a running server.
2. By default, inspect source and use only already-configured non-browser syntax, type, lint, test, or parse checks without installing dependencies or adding files. Report this as static verification; never claim the result was visually or browser verified.
3. Confirm from source that the first screen orders title, key content, and primary action; audit 360px, 768px, and 1440px rules for overflow, clipping, awkward line lengths, orphaned controls, and inaccessible navigation. If browser inspection is explicitly authorized, verify those widths and grayscale hierarchy there.
4. Trace tokens and declarations for almost-aligned edges, inconsistent gutters, mismatched radii, and one-off spacing. Check keyboard order, focus visibility, contrast, labels, reduced motion, and every state implied by visible controls.
5. Recheck all displayed facts, dates, relative times, “live” language, and data-source labels against their declared source and established reference clock.
6. Remove one redundant container and one decorative effect; continue while nothing meaningful is lost. Confirm the recurring device appears more than once and that changing only the logo could not make the result fit an unrelated product.
