---
name: beautiful-frontend
description: This skill guides the agent when creating or substantially redesigning a browser-rendered interface, including marketing pages, product screens, dashboards, pricing pages, prototypes, and visible extensions to existing sites. It should also be loaded when a working frontend needs visual refinement; it should not be loaded for backend-only work, headless libraries, invisible logic fixes, or interfaces already specified pixel for pixel.
---

# Beautiful Frontend

## Operating rule

Ship an authored interface, not a rearrangement of templates. Derive visible choices from the product, audience, and content. Preserve the repository's stack, conventions, contracts, analytics, tokens, and working behavior; visual ambition is not permission to replace or break them.

## Establish a direction before coding

1. Inspect existing screens, assets, fonts, tokens, data, and component anatomy. Extend an established visual grammar unless a rebrand is explicit.
2. Infer the page's single job, audience, and emotional register from available context; do not ask for more input.
3. Write a private direction: “`[experience]` through `[visual language]`, with `[distinctive device]`.” If it fits a generic SaaS template, sharpen it.
4. Choose one subject-rooted structural metaphor—ledger rows, gallery captions, field notes, instrument panels, packaging labels, editorial folios—and echo it two or three times. Do not mix metaphors.
5. Choose one memorable device: an unusual crop, typographic lockup, diagram, data treatment, rail, texture, or compositional interruption. Build it from CSS, SVG, project assets, or real content; never substitute decorative blobs.
6. Set a first/second/third reading order, one primary action, and at most one secondary action per region. Remove sections that repeat a claim.

## Factual integrity and data provenance

- Treat every visible assertion as a claim. Never invent customers, people, businesses, quotes, endorsements, logos, headcounts, usage or outcome metrics, awards, rankings, compliance or security claims, integrations, prices, plan limits, contractual terms, or uptime/SLA guarantees.
- If such proof or terms are absent, omit them; do not make the layout feel complete by fabricating evidence. Use product mechanisms, interface anatomy, or explicitly supplied facts as proof instead.
- Fictional operational records are allowed only when needed to demonstrate a prototype. Label the whole affected surface persistently as `Sample data`, `Demo`, or `Illustrative`; one page-level label is better than tagging every row. Never style sample values as company performance claims.
- Treat files named fixtures, mocks, seeds, examples, or demos as non-live even when loaded at runtime. Expose that status near the page title or summary, not in a hidden note.
- When pricing facts are missing, present an explicitly labeled `Illustrative plan structure` or a contact path; do not silently turn assumptions into purchasable terms.
- “Today,” “now,” age, elapsed time, and weekday/date pairs must derive from the runtime clock and one declared timezone policy. Use `Intl.DateTimeFormat`; never type a calendar date as a stand-in for today.
- For time-sensitive fixture data, use a supplied reference timestamp when available; otherwise use the runtime clock and display an `As of …` reference. Do not imply fixture recency or live updating.

## Prevent the generated look

- Do not default to a centered hero, gradient headline, two buttons, three equal cards, icon circles, testimonial strip, and final CTA. Use one only when content earns it.
- A card exists only when its contents are independently selectable, movable, or actionable. Otherwise group with alignment, whitespace, or a rule.
- Reserve pills for statuses, filters, tags, or compact controls; do not badge ordinary prose.
- Avoid purple-on-navy, cyan-purple gradients, glassmorphism, blurred orbs, and generic grid textures unless the product's world supports them.
- Avoid stock phrases such as “Transform your workflow” and “Powerful. Simple. Fast.” Write brief, domain-specific copy without adding unsupported facts.
- Never use emoji as icons. Use the project's icon family; if none exists, draw a coherent SVG set with matching view boxes, 1.5–2px strokes, and line caps.
- Leave one quiet region; do not decorate every empty area.

## Build a visual system

### Type

- Use project fonts first. Otherwise choose a purposeful system stack; do not add a font dependency merely for novelty.
- Use at most two families and four active weights. Create contrast with size, width, weight, case, and spacing, but not all five at once.
- Body text: 16–18px/1.45–1.7 for reading surfaces; 14–16px/1.35–1.55 for dense apps. Keep prose at 55–75ch.
- Use `clamp()` for display type and major spacing. Marketing headlines usually span 36–72px; exceed this only when type is the visual device.
- Tighten large display tracking slightly. Never widely track lowercase prose; uppercase only short labels under about 20 characters.
- Do not center more than one consecutive text block. Default to left alignment for scanned material.

### Color and material

- Define semantic tokens before component styles: canvas, surface, text, muted text, rule, accent, accent contrast, success, warning, danger, focus.
- Build from the subject or brand: one neutral family, one accent, and semantic colors. Keep accent near 10% of visible area so it retains meaning.
- Prefer tinted near-black and near-white over pure black and white unless starkness is intentional. Borders must be quieter than secondary text.
- A gradient must communicate light, depth, heat, progression, or brand. Limit the page to one gradient treatment.
- If texture expresses a material, keep it subliminal and preserve text contrast.
- Maintain 4.5:1 contrast for normal text and 3:1 for large text and essential controls. Never encode state by hue alone.

### Geometry and spacing

- Use a 4px or 5px base and a short spacing scale. Repeated relationships share values; exceptional gaps signal hierarchy.
- Use a consistent frame, typically 1120–1280px for marketing and density-appropriate for apps. Align unrelated sections to a shared edge.
- Use a real grid with varied spans—7/5, 8/4, or rail plus field—instead of equal thirds everywhere.
- Give each section one dominant alignment. Break the grid once for emphasis.
- Pick one radius family: square 0–4px, tailored 6–12px, or soft 14–24px. Full pills are only for pill controls; inner radii are smaller.
- Shadows explain elevation. Prefer a faint border plus one broad low-opacity shadow over stacked conspicuous shadows.
- Separate sections with rhythm, background shift, rule, or composition; do not alternate all four mechanically.

## Compose by artifact type

- Marketing/editorial: pair a specific supported claim with visual proof; alternate density; make product, artifact, or evidence larger than decoration.
- Dashboard/application: optimize scan paths and comparison. Keep controls by affected data, use tabular numbers, and reserve saturation for exceptions or decisions.
- Pricing: make differences inspectable without memory. Align shared features, place supplied billing terms beside prices, and mark a recommended plan with one signal—not scale, color, border, and badge together.
- Forms: keep labels visible, group by decision, place help beside its field, preserve values on errors, and state the submit action.
- Existing-site extension: reuse tokens, component anatomy, density, and content cadence. Change the smallest surface that fulfills the brief.

## Interaction and responsive behavior

- Implement only applicable states: default, hover, active, focus-visible, disabled, loading, empty, and error. Do not leave controls that cannot work in the prototype.
- Touch targets are at least 44×44px. Focus indicators are visible, at least 2px, and not clipped.
- Use 120–180ms for controls, 200–320ms for panels, and at most one entrance sequence. Animate opacity/transform, stagger related items 30–60ms, and remove nonessential motion under `prefers-reduced-motion`.
- Design at roughly 360px, 768px, 1440px, plus one in-between width. Mobile recomposes: collapse secondary navigation, move proof near claims, turn dense rows into labeled stacks, keep the primary action reachable.
- Never hide information needed to compare, decide, recover, or understand data. Hide decoration and duplicate context first.
- Avoid fixed heights on text containers. Handle long names, large values, wrapped labels, empty collections, and one-item collections. Set intentional image focal points per breakpoint.

## Implementation discipline

- Use semantic HTML before ARIA. Preserve keyboard order when visual order changes; name icon-only controls.
- Centralize constants in existing tokens or a compact local token layer. Do not scatter near-duplicate colors, radii, or spacing.
- Prefer layout primitives over positional nudges. Absolute positioning is for overlays and art direction, not basic alignment.
- Use supplied data and assets. If demonstration data is necessary, keep it small, coherent, visibly labeled, and free of external-world claims.
- Component boundaries follow meaningful visual or behavioral units; do not abstract a one-off composition into a generic card system.

## Verification boundary and final audit

- Do not install, locate, or launch a browser; start a server; drive headless UI; or create screenshots solely to polish or visually verify. Do so only when the user explicitly requests browser rendering/screenshots or the task's stated acceptance procedure requires it.
- Without that permission, inspect source and available static output, run only existing project checks relevant to changed code, and reason through 360/768/1440 layouts from CSS. Do not claim browser verification occurred.
- Audit hierarchy: purpose, primary action, and one distinctive idea must be apparent; the page needs a dominant mass, supporting mass, and quiet area rather than evenly distributed boxes.
- Remove wrappers without grouping, interaction, or hierarchy. Ensure headings and sections do not all share one size or layout, and accents do not mark non-actions.
- Check keyboard order, focus, overflow, reduced motion, applicable states, long content, data labels, date derivation, and unsupported claims in code.
- Remove the weakest decorative effect; refine the signature detail. Run existing checks and repair regressions without weakening the direction.
