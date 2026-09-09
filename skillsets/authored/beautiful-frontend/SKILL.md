---
name: beautiful-frontend
description: This skill guides the creation or visual revision of browser-rendered interfaces—marketing pages, product surfaces, dashboards, commerce, editorial pages, and interactive prototypes. It should be loaded whenever the task includes choosing or implementing layout, typography, color, imagery, motion, responsive behavior, or UI styling, including additions to an existing site; it should not be loaded for backend-only work, non-visual refactors, isolated business logic, native apps, or text documents with no rendered web interface.
---

# Beautiful Frontend

## Establish the art direction before coding

1. Extract the artifact's job, audience, content density, and emotional register from the brief. If unspecified, infer them from the product category and copy; never pause for clarification.
2. Write a one-sentence private thesis: “This should feel **[two specific adjectives]**, expressed through **[type behavior]**, **[spatial behavior]**, and **[one material or graphic motif]**, never **[opposing cliché]**.” Every visible choice must support it.
3. Map three cues from the brief to three visible decisions. Example: “archival” → folio numbers and hairlines; “fast” → compressed type and forward diagonals; “human” → warm paper neutral and irregular crops. Do not choose a motif unrelated to the subject.
4. Choose one composition model because it fits the content: editorial field, dense instrument panel, framed object, chronological stream, catalog grid, or staged narrative. Do not automatically use a centered hero followed by equal cards.
5. Choose one memorable device and repeat it 2–4 times at different scales: a crop shape, rule treatment, numbering system, typographic interruption, diagram language, texture, or spatial overlap. One system beats many decorations.
6. For an existing product, first inventory its type scale, spacing, radii, colors, icon style, container width, and interaction patterns. Extend those rules; introduce a new visual language only when the brief explicitly requests a redesign.

## Build hierarchy from content

- Put the single most important promise, task, or metric in the strongest position above the fold; one element gets first-read status, one gets second-read status, and the rest must visibly recede.
- Make headings communicate information, not atmosphere. Replace “Welcome back” with the useful state; replace ornamental marketing copy with the product's concrete outcome.
- Use final-feeling copy derived from the brief. Do not emit lorem ipsum, “Acme,” fake testimonials, impossible metrics, or invented claims. When facts are absent, use neutral labels that do not pretend to be facts.
- Give primary actions a verb plus outcome (“Create workspace,” “See pricing”), and keep only one primary action per visual region.
- Keep labels, metadata, and overlines short. Avoid uppercase eyebrow text above every heading; reserve it for an actual category or sequence.
- In dashboards, expose the decision behind the data: comparison period, unit, status, or next action. A large number without context is decoration.

## Compose, do not tile

- Establish 2–3 recurring alignment lines and make unrelated sections share them. Intentional misalignment may break one line for emphasis, never all of them.
- Use a spacing scale with no more than 8 steps (for example 4, 8, 12, 20, 32, 52, 84, 136px). Store it as tokens and stop introducing one-off gaps.
- Set the content measure from the artifact: prose 55–72ch; forms 28–40rem; dashboards may fill the viewport but keep each reading column scannable.
- Let at least one region have a distinct silhouette at 1440px: controlled asymmetry, a dominant narrow/wide split, an edge crop, a rail, or a deliberate dense field. Do not make every section the same centered rectangle.
- Use whitespace to separate ideas and proximity to connect them. If a border, background, and shadow all express the same grouping, remove at least two.
- Do not put every paragraph, statistic, or setting in a floating rounded card. Use cards only for independently actionable, movable, selectable, or clearly grouped objects.
- Vary rhythm by content importance: one expansive focal passage, compact supporting passages, and a decisive ending. Repeated equal-height sections read as generated.
- Allow deliberate imbalance, but counterweight it with type, image, color, or negative space so the page does not feel accidentally empty.

## Make typography carry the identity

- Use at most two font families and three weights. Prefer fonts already in the project; otherwise choose a deliberate system stack (serif, neo-grotesk, humanist, or monospace) that matches the thesis rather than importing a fashionable default.
- Pair by contrast of role, not novelty: expressive display with quiet body, or one family with sharply different width, weight, and size. Never use two similar sans-serifs.
- Use a restrained modular scale: about 1.2 for dense tools, 1.25 for general UI, and 1.333 for editorial/marketing. Break the scale only for the single focal statement.
- Body text: 16–18px, 1.45–1.7 line-height. UI labels: 12–14px only when contrast and spacing remain clear. Avoid body copy below 16px on small screens.
- Use `clamp()` for display sizes and section spacing; set a useful minimum, a fluid middle, and a maximum that prevents theatrical text from consuming the viewport.
- Tighten display tracking as size rises; keep body tracking near normal; add tracking to uppercase only. Do not apply negative tracking to small UI text.
- Author the hero's line breaks at wide sizes when a phrase benefits; release those breaks on narrow screens. Prevent single-word heading widows and one-word final paragraph lines where practical.
- Use tabular numerals for changing metrics, aligned prices, timers, and tables. Align numbers by decimal or unit instead of merely centering them.

## Control color, surface, and shape

- Define semantic color tokens before styling components: canvas, surface, text, muted text, line, primary action, accent, success, warning, danger, and focus.
- Give the palette a clear ratio: one dominant field, one supporting family, one scarce accent. Keep the accent under roughly 10% of the visible area unless exuberant color is the stated concept.
- Derive neutrals toward the brand temperature instead of defaulting to blue-gray. Warm concepts get brown/cream-biased neutrals; technical concepts may use cool or achromatic neutrals.
- Use pure black or white only when the direction calls for hard contrast; otherwise tint both ends so imagery, type, and surfaces belong to one world.
- Text contrast must be at least 4.5:1 for normal text and 3:1 for large text and component boundaries. Never encode status by hue alone.
- A gradient must explain light, depth, progression, or brand motion. Do not use a purple-blue glow as filler; prefer a flat field, measured tonal shift, or subject-derived palette.
- Choose one radius family: square/2–4px for precise or editorial work, 6–12px for approachable products, larger only for pills or a deliberate soft-object language. Nested radii should share centers.
- Use no more than three elevation levels. Prefer border, tonal separation, or overlap before shadow; when shadows exist, vary blur and alpha with height rather than using the same halo everywhere.
- Texture must be subtle at normal viewing size and tied to the thesis (paper grain, scan line, dot matrix, ruled grid). If it attracts attention before content, halve or remove it.

## Use imagery and icons as authored material

- Reuse supplied brand assets and content imagery before fabricating decoration. Respect each asset's intrinsic ratio; crop around its subject, not mechanically from center.
- With no imagery, create identity from typography, composition, data, CSS geometry, or a small inline SVG motif. Do not substitute generic stock-photo panels, floating blobs, or random abstract gradients.
- Make diagrams and charts use the same stroke weight, corner logic, labels, and palette as the interface. Highlight the insight; mute axes, gridlines, and nonessential series.
- Use one icon family already present. Otherwise draw only the few simple inline SVG icons needed with consistent viewBox, stroke width, caps, and joins; do not use emoji as product icons.
- Icons supplement labels unless the action is universally recognized in context. Tooltips cannot rescue an ambiguous primary action on touch devices.

## Make interaction feel intentional

- Every visible control must work in the prototype: links navigate or anchor, tabs switch, menus open and close, toggles change, and forms expose focus, invalid, disabled, and success behavior as relevant.
- Use motion to explain cause and spatial relation. Controls respond in 120–180ms; panels and page reveals take 240–450ms; use deceleration on entrance and acceleration on exit.
- Animate `transform` and `opacity` rather than layout properties. Stagger at most 6 related items by 30–60ms; do not make users wait for an animation cascade.
- Keep hover displacement under 2px and avoid scaling text or whole cards. Reserve perpetual animation for real activity or a single ambient motif.
- Provide a visible `:focus-visible` treatment with at least a 2px indicator and offset. Respect `prefers-reduced-motion` by removing travel, parallax, and nonessential looping.
- Touch targets must be at least 44×44px even when the visible icon is smaller. Hover-only information must also be available by focus, click, or inline disclosure.

## Design the responsive composition

- Treat 360px, 768px, and 1440px as three compositions, not a shrinking exercise. Decide at each width what remains primary, what reflows, what becomes scrollable, and what disappears.
- At narrow widths, preserve reading order in the DOM, remove decorative overlap before it causes clipping, and keep primary actions reachable without precision tapping.
- Collapse multi-column layouts according to meaning: summary before detail, controls before results, content before supporting art. Do not blindly follow desktop left-to-right order.
- Tables should retain headers and comparison context; use horizontal scrolling, priority columns, or labeled rows rather than squeezing every column unreadably.
- Keep page gutters fluid but bounded (roughly 16–24px mobile and 40–80px desktop). Full-bleed color or art may escape the container; readable text should not.
- Navigation must have a real small-screen state. Do not merely hide links; expose a compact menu, prioritized actions, or a task-specific substitute.

## Reject generated-looking defaults

- No default purple gradient, glass panel, giant blurred orb, decorative grid, sparkle icon, or “AI” constellation unless the subject specifically supplies that visual language.
- No automatic bento grid, trio of feature cards, pill on every label, oversized quote mark, gradient text, fake browser chrome, or logo cloud inserted just because it is familiar.
- Do not center all text. Centering is for short, singular statements; left-align prose, forms, data, and multi-step tasks.
- Do not make every corner rounded, every surface elevated, or every section a new background color. Preserve contrast by spending these devices only at hierarchy changes.
- Avoid ornamental microcopy and badges that repeat nearby information. Delete any element whose removal improves clarity without weakening the thesis.
- Do not recreate a well-known product's composition from memory. Translate the brief's nouns, verbs, era, and audience into a new system.

## Final correction pass

1. View the first screen in grayscale: if title, key content, and primary action do not read in that order, change scale, placement, or contrast—not decoration.
2. Check at 360px, 768px, and 1440px for overflow, accidental clipping, awkward line breaks, orphaned controls, overlong measures, and dead space.
3. Trace every edge and baseline: fix nearly aligned items, inconsistent gutters, mismatched radii, and one-off spacing values.
4. Test keyboard order, visible focus, color contrast, reduced motion, labels, and the states implied by the UI.
5. Remove one redundant container and one decorative effect. If the design loses nothing, continue removing until each remaining device has a job.
6. Verify that the memorable device appears more than once, the thesis is visible without explanation, and the result could not plausibly belong to an unrelated product with only the logo changed.
