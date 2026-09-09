---
name: beautiful-frontend
description: This skill governs autonomous creation or visual revision of browser-rendered interfaces—marketing pages, product surfaces, dashboards, pricing, commerce, editorial pages, and clickable web prototypes—and should be loaded whenever the task involves web layout, typography, color, imagery, interaction, responsive behavior, or an addition to an existing visual site; it should not be loaded for backend-only work, non-visual refactors, isolated business logic, native applications, or documents that are not rendered as web interfaces.
---

# Beautiful Frontend

Work in four passes: establish truth, commit direction, implement, then audit the finished source. Do not ask for preferences; infer the strongest defensible choice from the brief and existing product.

## 1. Establish truth and constraints

- Separate supplied production facts/assets from fixture, mock, seed, sample, or unknown material before composing.
- Never invent customers, people, testimonials, quotes, logos, integrations, certifications, compliance claims, prices, ratings, adoption counts, performance gains, or attributed outcomes. Omit absent proof; do not camouflage it as placeholder content.
- Treat changeable externally owned facts—current/default model IDs, versions, API endpoints or limits, pricing, availability, laws, and compliance status—as unknown unless an authoritative project source supplies them or the owner’s primary source is freshly checked during the task. Model memory and an assumptions file are not evidence.
- If such a fact is requested but absent, attempt a primary-source lookup through any network path actually available, even without a configured search tool. Record the source and retrieval instant; reconcile conflicting sources rather than choosing the convenient value.
- If lookup is unavailable or inconclusive, never publish a remembered value: omit optional proof, and for required operational input render a visible “Verification required” state plus a project-owned variable or explicit configuration step. Report the blocker and never call the value current.
- Product mock-up values may illustrate behavior only inside a surface visibly marked “Sample,” “Demo,” or “Illustrative.” Never let invented values read as company or customer evidence.
- If data is named or stored as fixture/mock/sample/seed, place a persistent “Sample data” marker beside the page title or scope control; retain it on mobile and never hide it only in a tooltip. Label the source again where interpretation depends on it.
- Establish one reference instant and timezone before deriving today, weekdays, greetings, relative ages, overdue states, or schedules: use a supplied simulation clock, otherwise read the runtime clock. Format dates with locale-aware APIs; never type a date intended to stay current.
- When time affects an operational decision, show “As of” plus time and timezone beside the affected summary. Runtime-loaded records are not automatically “live.”
- Do not invent provenance for the work. Read the system clock immediately before writing requested generated/checked metadata; otherwise omit dates and verification claims.
- Preserve supplied copy, routes, form names, IDs, data attributes, analytics hooks, event behavior, and tokens unless the brief explicitly changes them.
- If the brief explicitly requires assumptions or blockers recorded, append them to an existing named project document. If none exists and the information materially affects the next implementer, create only `ASSUMPTIONS.md` with source state, impact, and next action—no fabricated date or audit diary. Otherwise use the handoff, not a new file.

## 2. Commit a direction before markup

1. Extract the artifact’s primary job, audience, content density, emotional register, and strongest supplied nouns/verbs. Rank the first-screen promise/task, its evidence, and its action.
2. Write a private one-sentence thesis: “**[two precise adjectives]** through **[type behavior]**, **[spatial behavior]**, and **[subject-derived motif]**, never **[category cliché]**.” Reject later choices that do not support it.
3. Translate three subject cues into visible rules, not decoration: e.g. archival → folio numbers/hairlines; urgent → compressed intervals/strong status ordering; hospitable → warm neutrals/generous reading rhythm.
4. Choose one composition model that serves the content: editorial field, dense instrument panel, framed object, chronological stream, catalog grid, or staged narrative. Do not default to centered hero plus equal cards.
5. Before CSS, choose the register on five axes: light/dark and warm/cool canvas, type category, sparse/dense rhythm, sharp/soft geometry, and image/data/material treatment. Tie every axis to the work being done; “premium,” “modern,” and the audience’s industry are not rationales.
6. Style the product function before borrowing the customer’s costume: restaurant payroll is an operations tool, not a menu; developer documentation is a reference surface, not a lifestyle editorial. Marketing and pricing inherit the product register rather than automatically becoming warm paper plus serif.
7. Sketch the content order at 360, 768, and 1440px before CSS. At each width decide what leads, reflows, scrolls, condenses, or disappears; preserve meaningful DOM order.
8. Select one signature device—crop, rule, numbering, typographic interruption, diagram grammar, texture, or overlap—and repeat it 2–4 times at different scales. Other ornament must communicate grouping, hierarchy, state, or subject.
9. For an existing product, inventory its actual type, spacing, radii, colors, icons, containers, and states first. Extend its grammar with the smallest intervention rather than restyling adjacent surfaces.

## 3. Build hierarchy, not a template

- Give exactly one promise, task, or metric first-read status above the fold, one element second-read status, and visibly recede the rest. Use one primary action per visual region, labeled verb + outcome.
- Headings must carry information. Replace “Welcome back” with useful state and unsupported slogans with concrete, brief-grounded outcomes. Use final-feeling copy without lorem ipsum, “Acme,” fake people, or speculative specifics.
- Reserve uppercase eyebrows for real categories or sequence; do not place one above every heading. Remove badges and microcopy that repeat adjacent text.
- Establish 2–3 recurring alignment lines across unrelated sections; break at most one for emphasis. Keep prose at 55–72ch and forms at 28–40rem.
- Define at most eight spacing steps (for example 4, 8, 12, 20, 32, 52, 84, 136px) as variables; avoid near-duplicate one-off gaps. Bound gutters to 16–24px mobile and 40–80px desktop.
- Give the 1440px composition a recognizable silhouette—narrow/wide split, edge crop, rail, controlled asymmetry, or deliberate dense field. Vary section rhythm instead of repeating equal-height bands.
- A card is justified only when its contents are independently actionable, selectable, movable, or genuinely grouped. If border, fill, radius, and shadow all express one group, remove at least two.
- In dashboards, pair each key number with unit, reference period/comparison, source state, and the decision or next action it supports. Align changing numbers by decimal or unit with tabular numerals.

## 4. Make typography render its intent

- Before selecting type, inspect existing font files, declarations, and loaded stylesheets. Existing product faces win when their files and required weights are present.
- Choose type architecture from the product’s work, not habit: editorial reading may pair an oldstyle serif display with a humanist sans; operational/data work should use a highly legible sans plus monospace for data; technical/industrial work may use a real condensed, slab, or engineered grotesk with a quiet body face; personal/mobile work may use one warm humanist or rounded face with strong scale/weight contrast.
- For a greenfield marketing, editorial, or consumer surface with no suitable font asset, attempt to acquire one thesis-specific open webfont through available network access. Save the real font files locally when practical; otherwise use its real hosted stylesheet. Confirm the response, family metadata, file URLs, styles, and every requested weight before declaring it.
- If font retrieval fails, use an honest generic stack (`system-ui`, `ui-serif`, or `ui-monospace`) and create identity through scale, weight, case, measure, and spacing. Never alias unavailable fonts with `local()`, and never make font acquisition a blocker.
- Do not reflexively reuse fashionable defaults, a serif/system pairing, or one familiar family across subject categories. “Marketing” is not a reason for a display serif; the family’s anatomy must express a thesis cue.
- Use at most two families and three weights. Pair contrasting roles, never two near-identical sans faces. Body text is 16–18px/1.45–1.7; labels are 12–14px only with adequate contrast and spacing; mobile body never drops below 16px.
- Use a ratio near 1.2 for dense tools, 1.25 for general UI, or 1.333 for editorial/marketing, breaking it only for the focal statement. Use bounded `clamp()` for display type and section space.
- Tighten tracking only as display size rises; track uppercase outward and body near normal. Author helpful wide-screen heading breaks, release them on narrow screens, and avoid single-word heading widows where practical.

## 5. Control color, surfaces, and imagery

- Define semantic tokens before components: canvas, surface, text, muted, line, action, accent, success, warning, danger, and focus. Maintain 4.5:1 normal-text contrast and 3:1 for large text and component boundaries; pair status color with text or symbol.
- Operational/data and developer/reference surfaces default to achromatic or cool canvases, crisp edges, compact rhythm, and sans/mono type; warm cream and display serif require contrary brand evidence. Warm paper suits explicit tactile, historical, culinary, or literary cues; playful/personal work may instead use a chromatic light field, colored neutrals, or intentional dark mode.
- If the canvas is a warm near-white, name the brief-grounded material cue and make at least two of type, geometry, density, or imagery unlike a boutique/editorial template. Otherwise choose neutral, cool, chromatic, or dark rather than reaching for cream by habit.
- Use one dominant field, one supporting color family, and one scarce accent under roughly 10% of the visible area unless exuberant color is the thesis. Tint neutrals toward the subject; reserve pure black/white for intentional hard contrast.
- A gradient must depict light, depth, progression, or supplied brand motion. No filler purple-blue glow, blurred orb, random mesh, gradient text, decorative grid, sparkle, or “AI constellation.”
- Choose one radius family: 0–4px precise/editorial, 6–12px approachable, larger only for pills or an explicit soft-object language. Nested radii share centers. Use at most three elevation levels; prefer line, tone, and overlap to repeated shadows.
- Reuse supplied imagery first and crop around its subject. With none, compose with type, data, CSS geometry, or one small inline SVG motif—not stock panels, fake browser chrome, or gray placeholders.
- Use one supplied icon family; otherwise draw only necessary inline SVGs with one viewBox/stroke/cap/join system. Never use emoji as product icons. Style charts with the interface palette and strokes; emphasize the insight, mute grids and secondary series.

## 6. Make behavior complete

- Use semantic landmarks and heading order. Use links for navigation and buttons for actions; label every input, group related controls, give images useful alt text or empty alt when decorative, and expose errors/status with text rather than color alone.
- Every visible control works: anchors reach targets, tabs change panels and selected state, menus open/close, toggles update, and forms provide relevant focus, invalid, disabled, loading, empty, error, and success behavior. Do not render a control that is only decorative.
- Touch targets are at least 44×44px. Hover-only information must also be reachable by focus, click, or inline disclosure. Add a visible `:focus-visible` indicator at least 2px thick with offset; never suppress focus without replacement.
- Motion communicates cause or spatial relation: controls 120–180ms, panels/reveals 240–450ms, entrance decelerates and exit accelerates. Animate transform/opacity, stagger no more than six items by 30–60ms, keep hover travel under 2px, and never scale text or whole cards.
- Under `prefers-reduced-motion`, remove travel, parallax, loops, and smooth scrolling. Avoid perpetual motion except real activity or one restrained ambient motif.
- At 360px remove decorative overlap before it clips, keep navigation genuinely usable, and stack summary before detail, controls before results, content before supporting art. At 768px do not preserve desktop columns by merely shrinking them.
- Tables retain comparison context through horizontal scroll, sticky headers, priority columns, or labeled rows; never squeeze all columns unreadably. Art may bleed; readable text may not.

## 7. Reject defaults, then audit

- No automatic bento grid, equal feature-card trio, logo cloud, giant quote mark, pill on every label, rounded/elevated surface everywhere, or background change every section. Use one only when subject, content behavior, or supplied brand language requires it.
- Center only short singular statements—not prose, forms, data, or multi-step tasks. Counterweight empty space with type, image, color, or a strong edge so it reads as composition.
- “Polish,” “verify,” “check,” and “test” do not authorize starting a server/browser, probing for automation, taking screenshots, installing dependencies, or creating verification artifacts. Do those only when the brief explicitly requests rendered/browser inspection, screenshots, end-to-end behavior, or a running server.
- By default run only already-configured non-browser syntax, type, lint, parse, or test checks. Call this static verification; never claim visual, browser, network-font, or interaction verification.
- Audit the finished source at 360, 768, and 1440px rules for overflow, clipping, line length, DOM/order mismatch, inaccessible navigation, and orphaned controls. Trace every visible action to behavior and every state implied by it.
- Verify each custom font declaration has a fetched file or responsive stylesheet and each used weight/style exists; delete dead `@font-face`, fictional family names, unavailable local aliases, and failed remote references. Ensure fallback metrics do not destroy wrapping or controls.
- Check keyboard order, labels, landmarks, focus visibility, contrast, target sizes, reduced motion, image dimensions/aspect ratios, and layout stability. Reject `transition: all`, focus removal, and motion that changes layout.
- Recheck all displayed claims, external facts, prices, versions, dates, relative times, “current” or “live” language, fixture labels, and source notes against declared data, fresh primary evidence, and the reference clock.
- Trace tokens for almost-aligned edges, inconsistent gutters, mismatched radii, one-off spacing, and accidental colors. Remove one redundant container and one decorative effect; continue while hierarchy and thesis survive.
- Confirm the signature appears more than once, the first screen makes title/key content/action order unmistakable, and changing only the logo could not make the design fit an unrelated product.
