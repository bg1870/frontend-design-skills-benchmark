---
name: beautiful-frontend
description: This skill guides the agent when creating or substantially redesigning any browser-rendered visual interface, including marketing pages, product screens, dashboards, pricing pages, prototypes, and new sections of existing sites. It should also be loaded when a frontend works but needs visual refinement; it should not be loaded for backend-only work, headless libraries, minor logic fixes with no visible effect, or tasks whose exact UI is already fully specified pixel for pixel.
---

# Beautiful Frontend

## Operating rule

Ship an authored interface, not a rearrangement of familiar templates. Every visible choice must come from the product's subject, audience, and content. Preserve the repository's framework, conventions, and working behavior; visual ambition is not permission to replace the stack or break features.

## Establish a direction before coding

1. Inspect the existing app, assets, fonts, tokens, and adjacent screens before changing markup. In an established product, extend its visual grammar unless the brief explicitly calls for a rebrand.
2. Extract the page's single job, primary audience, and emotional register from the brief. Resolve ambiguity yourself from context; do not wait for answers.
3. Write a private one-sentence art direction in the form: “`[experience]` expressed through `[visual language]`, with `[distinctive device]`.” If that sentence could describe a SaaS landing-page template, sharpen it.
4. Choose one structural metaphor rooted in the subject—such as ledger rows, gallery captions, field notes, instrument panels, packaging labels, or editorial folios—and echo it in two or three places. Do not mix metaphors.
5. Select one memorable visual device: an unusual crop, typographic lockup, diagram, data treatment, navigational rail, material texture, or compositional interruption. Build it from CSS, SVG, project assets, or actual content; never substitute decorative blobs.
6. Decide the hierarchy on paper first: one primary action, at most one secondary action per region, and a clear first/second/third reading order. Remove sections that repeat the same claim.

## Prevent the generated look

- Do not default to a centered hero, gradient headline, two buttons, three equal cards, icon circles, testimonial strip, and final CTA. Use any of these only when the content specifically earns it.
- Do not make every section a rounded container. A card exists only when its contents are independently selectable, movable, or actionable; otherwise use alignment, whitespace, or a rule.
- Do not put every sentence into a badge or pill. Reserve pills for statuses, filters, tags, or compact controls.
- Avoid purple-on-navy, cyan-purple gradients, glassmorphism, floating blurred orbs, and generic grid textures unless the product's world directly supports them.
- Avoid stock copy rhythms: “Transform your workflow,” “Powerful. Simple. Fast.,” fake company logos, suspiciously perfect metrics, and repeated feature prose. Write brief, domain-specific copy from the supplied facts.
- Never use emoji as interface icons. Use the project's icon family; if none exists, draw a small coherent SVG set with matching view boxes, 1.5–2px strokes, and line caps.
- Do not decorate every empty area. One quiet region increases the force of the detailed region.

## Build a visual system, not a theme dump

### Type

- Use available brand or project fonts first. If none exist, choose a purposeful system stack; do not add a font dependency merely to look designed.
- Use no more than two families and four active weights. Let contrast come from size, width, weight, case, and spacing—not all five at once.
- Body text: 16–18px and 1.45–1.7 line-height for reading surfaces; 14–16px and 1.35–1.55 for dense applications. Keep prose between 55ch and 75ch.
- Use `clamp()` for display type and major spacing. A marketing headline usually spans 36–72px; exceed that only when typography is the actual visual device.
- Tighten large display tracking slightly; never apply wide tracking to lowercase prose. Use uppercase only for short labels under roughly 20 characters.
- Do not center more than one consecutive text block. Left alignment is the default for material that must be scanned.

### Color and material

- Define semantic tokens before component styles: canvas, surface, text, muted text, rule, accent, accent contrast, success, warning, danger, focus.
- Build the palette from the subject or existing brand: one dominant neutral family, one accent, and semantic colors. Keep the accent to roughly 10% of the visible area so it retains meaning.
- Use tinted near-black and near-white rather than `#000` and `#fff` unless starkness is intentional. Borders must be quieter than secondary text.
- Gradients must communicate light, depth, heat, progression, or brand—not fill space. Limit the page to one gradient treatment.
- If using texture, make it nearly subliminal and attach it to a material idea; check that it does not reduce text contrast.
- Meet at least 4.5:1 for normal text and 3:1 for large text and essential controls. Never rely on hue alone for state.

### Geometry and spacing

- Establish a spacing base of 4px or 5px and use a short deliberate scale. Repeated relationships must share values; exceptional gaps must signal hierarchy.
- Use a consistent content frame, typically 1120–1280px for marketing and appropriate to data density for apps. Align unrelated sections to at least one shared edge.
- Use a real grid. Vary spans—such as 7/5, 8/4, or a narrow rail plus field—rather than filling every row with equal thirds.
- Give each section one dominant alignment. Break the grid once for emphasis, not repeatedly for novelty.
- Pick one radius family: square (0–4px), tailored (6–12px), or soft (14–24px). Use full pills only for pill-shaped controls; nesting must use smaller inner radii.
- Use shadows only to explain elevation. Prefer a faint border plus one broad low-opacity shadow over several conspicuous shadows.
- Separate major sections through rhythm, background shift, rule, or composition; do not alternate all four mechanically.

## Compose by artifact type

- Marketing/editorial: lead with a specific claim and a visual proof; alternate reading density; make the product, artifact, or evidence larger than decorative copy.
- Dashboard/application: prioritize scan paths, comparison, and states. Keep controls near the data they affect, align numbers tabularly, and reserve saturated color for exceptions or decisions.
- Pricing: make plan differences inspectable without memory. Align shared features, state billing terms beside prices, and distinguish the recommended plan with one signal—not scale, color, border, and badge together.
- Forms: keep labels visible, group by decision, put help beside the relevant field, preserve entered values on errors, and state what the submit action does.
- Existing-site extension: reuse its tokens and component anatomy, but match its density and content cadence too; importing colors while ignoring spacing still looks foreign.

## Interaction is part of the composition

- Implement default, hover, active, focus-visible, disabled, loading, empty, and error states wherever applicable; do not leave impossible demo controls.
- Click targets must be at least 44×44px on touch layouts. Focus indicators must be visible, at least 2px, and not clipped by overflow.
- Keep motion purposeful: 120–180ms for control feedback, 200–320ms for panels, and one entrance sequence at most. Animate opacity and transforms rather than layout properties.
- Stagger only small related groups, with 30–60ms between items. Respect `prefers-reduced-motion` by removing nonessential movement.
- Use sticky elements only when they preserve needed context or an action; verify they do not consume the short mobile viewport.

## Responsive behavior

- Design and inspect at roughly 360px, 768px, and 1440px; also check an in-between width where grids commonly fail.
- Mobile is a recomposition, not a scaled desktop: collapse secondary navigation, reorder proof near its claim, turn dense rows into labeled stacks, and keep the primary action reachable.
- Never hide information required to compare, decide, recover from error, or understand a chart. Hide decoration and duplicate context first.
- Avoid arbitrary fixed heights on text containers. Guard against long names, large values, wrapped labels, empty collections, and one-item collections.
- Images and diagrams need intentional crops per breakpoint; do not let the browser choose the focal point accidentally.

## Implementation discipline

- Use semantic HTML before adding ARIA. Preserve keyboard order when the visual order changes, and give icon-only controls accessible names.
- Centralize visual constants in existing tokens or a compact local token layer. Do not scatter near-duplicate colors, radii, and spacing values through components.
- Prefer layout primitives over positional nudges. Absolute positioning is for overlays and art direction, not basic alignment.
- Use actual data and project assets when present. If content is absent, create a small internally consistent domain dataset rather than `Lorem ipsum` or repeated placeholders.
- When a brief says today, now, or current, derive the displayed value from the system clock at runtime (for example, `new Date()` with no date argument); never disguise a hardcoded date with a formatter.
- Visibly label fixture, mock, or synthesized operational data as “Demo” or “Sample data.” For time-sensitive queues or statuses, also show an “As of” timestamp derived from the runtime clock; never imply fixtures are live.
- Keep components aligned to meaningful visual or behavioral units; do not abstract a one-off composition into a generic card system.

## Final visual audit

Before declaring completion, inspect the interface with artifacts and tools already available rather than trusting source code. Do not probe for, install, or launch a browser or server, and do not take screenshots, unless the user explicitly requests browser/rendered verification; “polish” or “verify” alone does not grant permission.

1. At first glance, can a viewer identify the page's purpose, primary action, and one distinctive idea? If not, fix hierarchy before details.
2. Squint at the page: there must be a dominant mass, supporting mass, and quiet area—not evenly distributed boxes.
3. Check every repeated rectangle. Remove wrappers that contribute neither grouping, interaction, nor hierarchy.
4. Check that headings do not all share one size, sections do not all share one layout, and accents do not appear on non-actions.
5. Tab through controls; test hover, focus, overflow, loading, empty, and error states; verify reduced motion and narrow screens.
6. Remove the weakest decorative effect. Refine one signature detail instead.
7. Run the project's existing checks and repair visual regressions without weakening the art direction.
