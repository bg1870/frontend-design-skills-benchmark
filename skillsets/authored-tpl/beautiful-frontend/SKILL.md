---
name: beautiful-frontend
description: This skill should be loaded when an agent must design or implement a browser-rendered visual interface, including a marketing page, product screen, dashboard, pricing page, interactive prototype, or visual extension to an existing website. It should not be loaded for backend-only work, native-app interfaces, email markup, prose-only design critique, minor invisible fixes, or tasks whose rendered appearance is not part of the deliverable.
---

# Deliberate Frontend Composition

## Scope
Apply when the task creates or materially changes a browser-rendered interface.
Outside this scope, do not impose this skill's workflow or visual defaults.

## Result contract
Return the requested runnable artifact in the repository's existing stack; do not substitute a design essay or static description for working UI.
Success requires a composition traceable to the product's actual subject, clear hierarchy at phone and desktop widths, purposeful states for interactive elements, and no template-default section or decoration that could survive an unrelated rebrand unchanged.
Treat explicit requirements, supplied content, accessibility, and existing product conventions as mandatory. Treat every visual choice below as a default that yields to those constraints.

## Decision rules
- R1. Before changing an existing project, inspect its components, tokens, routes, assets, and adjacent screens. Reuse established primitives and interaction language; introduce a new visual rule only when the requested page has a role the system cannot express.
- R2. For greenfield work, choose one brief-derived visual premise before styling: pair a domain cue with a compositional behavior, such as archival material with editorial indexing or live operations with instrument-panel density. Express it through layout, type, and one recurring detail; never use “clean modern,” glassmorphism, or a color name as the premise.
- R3. Build hierarchy from content importance. Identify one primary user action or reading path, give it the strongest contrast and position, and demote competing actions. Do not give adjacent actions identical visual weight unless they are genuinely equivalent choices.
- R4. Use brief-specific nouns, labels, and data. Replace lorem ipsum, “Feature 1,” anonymous testimonials, impossible metrics, and unsupported superlatives; when facts are absent, write concise neutral copy and omit claims that would require evidence.
- R5. Choose page structure from the content model, not from a habitual navbar–centered hero–three cards–CTA sequence. If every section in the draft is a centered heading over equal cards, rebuild at least the focal section around its real material: comparison, timeline, annotated object, workflow, dataset, inventory, or narrative sequence.
- R6. Create one dominant visual moment per viewport, then quieter supporting regions. Vary scale, alignment, density, or background at meaningful transitions; do not make every section equally loud or place every element in its own outlined container.
- R7. Keep a readable text system: body text 16–18px with 1.45–1.7 line-height and a 55–75 character measure; display text may use 0.9–1.15 line-height. Use at most two font families, use available project/local fonts before adding anything, and do not default to a fashionable sans-serif when an existing brand face or deliberate system stack is available.
- R8. Make type roles visibly distinct through size, weight, case, and spacing, but vary no more than two of those properties between adjacent hierarchy levels. Reserve all-caps and wide tracking for short labels, and use negative tracking only on text at least 32px.
- R9. Define a small color role set—canvas, primary text, muted text, surface/divider, accent, and semantic states—and reuse it. Reserve the accent for actions and decisive emphasis; do not scatter it across ornamental text, icons, borders, and backgrounds until nothing reads as primary.
- R10. Gradients, blur, noise, glow, and shadows require a content or depth function. If removing one does not reduce hierarchy, affordance, atmosphere required by the brief, or the chosen premise, remove it. Never place a gradient on headline text merely to signal importance.
- R11. Use cards only for units that are independently actionable, selectable, or reorderable. Group ordinary prose and sequential content with spacing, alignment, and dividers instead. Use one radius family, avoid nested rounded rectangles, and reserve pills for tags, status, filters, or compact controls—not section titles or decorative labels.
- R12. Use supplied imagery and brand assets when they carry meaning. If none exist, prefer a brief-derived typographic, data, CSS, or inline-SVG composition over generic stock imagery. Do not use emoji as interface icons; keep icon geometry consistent and pair unfamiliar icons with text labels.
- R13. Concentrate custom ornament in the dominant moment and one repeated micro-detail, such as a rule treatment, index marker, crop, cursor, or chart annotation. Keep navigation, forms, and dense utility areas restrained so the signature does not impair scanning.
- R14. Every visible control must have a real destination or implemented state change. Provide hover, active, disabled where applicable, and keyboard focus states; do not ship dead buttons, fake filters, or form controls that silently do nothing in a clickable prototype.
- R15. Use motion only to explain entry, state change, or spatial relationship. Keep control feedback around 120–220ms and larger transitions around 300–600ms, avoid perpetual motion behind reading content, and disable nonessential transforms and animation under `prefers-reduced-motion`.
- R16. Design responsive behavior rather than shrinking desktop. At roughly 360px, 768px, and 1440px, preserve the reading order, remove horizontal overflow, keep primary controls reachable, turn multicolumn regions into an intentional sequence, and transform wide navigation or tables instead of clipping them. Interactive targets must be at least 44×44px unless an established dense desktop system explicitly requires otherwise.
- R17. Use semantic landmarks and native controls; every input needs a programmatic label, every informative image useful alternative text, and every function must be operable by keyboard. Maintain at least 4.5:1 contrast for normal text and 3:1 for large text, controls, and focus indicators; never encode status by color alone.
- R18. Keep implementation decisions legible: centralize repeated color, spacing, type, radius, and motion values; derive nearby spacing from a small scale; and avoid one-off pixel nudges that compensate for a broken layout. Do not add a package when platform HTML, CSS, or the existing stack already solves the need.
- R19. If the draft could become a credible page for an unrelated company by changing only the logo, accent color, and nouns, it is still generic. Replace its dominant region with a composition whose structure exposes this product's specific object, decision, workflow, or evidence.

## Limits and fallbacks
- If brand direction is absent, derive R2's premise from the subject and audience, use one restrained accent with neutral supporting colors, and create distinction through composition and type rather than invented brand lore.
- If copy, data, or assets are incomplete, use only facts in the brief, conservative representative content needed to demonstrate behavior, and visibly identify sample data when it could be mistaken for a real claim. Never invent customers, awards, certifications, or performance results.
- If a supplied asset is unusable, omit it or replace it with a self-contained text/CSS/SVG treatment; do not leave broken URLs, empty image frames, or dependency instructions.
- If rules collide, preserve explicit requirements, content truth, core function, and R17 first; then preserve the existing system under R1; then preserve hierarchy and responsiveness. Relax ornament, motion, novelty, and numeric defaults in that order.

## Before returning
- Inspect the rendered result, or the computed layout when rendering is unavailable, at 360px, 768px, and 1440px. Repair overflow, accidental wrapping, stranded headings, unreadable measures, and focal content that falls below secondary content.
- Trace the primary path with keyboard alone. Repair missing focus, illogical tab order, hover-only disclosure, unlabelled controls, and any action that lacks a result.
- Audit every card, pill, shadow, gradient, blur, and animation against R10–R11. Remove any instance with no distinct semantic, depth, or interaction job.
- Temporarily ignore color and verify that size, spacing, placement, and type still reveal the primary action and reading order. If they do not, repair hierarchy without adding more color.
- Apply the R19 rebrand test to the dominant region. If it fails, restructure that region around brief-specific material rather than adding decorative effects.
- Return when the requested flows work, the three width regimes hold, content is truthful, and the visual premise is evident in structure plus at least one repeated detail. If a mandatory condition is infeasible, preserve function and truth and omit the conflicting decorative feature rather than claiming it works.

## Decision examples
- Normal case: A greenfield incident-response dashboard has no visual system. Choose a time-ordered event spine, severity-coded annotations with text labels, and a compact command region—not a grid of interchangeable glass cards—under R2, R5, R9, and R19.
- Boundary case: The same dashboard is added to a mature product whose supplied system uses cards for selectable incidents. Keep those established cards, but organize their contents around event chronology and clearly labelled severity—not a wholly new visual language—because R1 outranks greenfield defaults while R19 still requires domain-specific structure.
