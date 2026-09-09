---
name: beautiful-frontend
description: This skill should be loaded when an agent creates, redesigns, or visually extends a browser-rendered marketing, editorial, commerce, product, dashboard, or prototype surface and must make unresolved visual, responsive, and interaction decisions; it should not be loaded for backend work, nonvisual code changes, document-only output, or maintenance whose supplied design system fully determines every visible choice.
---

# Content-Led Browser Interface Design

## 1. Scope and precedence
Scope: Support browser interfaces whose content, task hierarchy, composition, typography, surfaces, assets, responsive behavior, or interaction presentation must be designed; improve those unresolved visual decisions without changing product scope, factual meaning, information architecture fixed by the brief, or an established host design system.
Apply this skill to browser-rendered work within that scope. Resolve visual conflicts in this order: content access and operable controls; explicit task requirements; established conventions in an existing surface; this skill's defaults.
In extensions, inherit the surrounding typography, spacing, colors, component behavior, and navigation unless the task explicitly changes them; apply this skill to unresolved choices.
Per artifact: identify whether the task creates, extends, or redesigns a surface, and identify the allowed change boundary from the supplied brief and material. Do not widen it to showcase the skill.

## 2. Perceptual priorities
Policy: First, make the main user outcome unmistakable: its identifying content and next action receive the earliest strong position, the clearest contrast, and more uninterrupted space than support. Second, make the surface specific to its subject: derive one recurring visual cue from the supplied content's imagery, physical qualities, workflow, or data structure and repeat it in no more than three roles such as composition, dividers, shape, or asset treatment. When these conflict, preserve task clarity and reduce the cue—not legibility, action contrast, or content—to avoid interchangeable card grids, equal-weight sections, and decoration unrelated to the subject.
Use this priority order to resolve discretionary choices in later sections; do not introduce unrelated visual motifs merely to make regions look different.
Per artifact: assign the priorities to actual content or controls. Choose concrete visual values that express them; do not copy an imagined reference page.

## 3. Content and attention
Policy: Select as dominant the content or control that completes or initiates the visitor's main outcome; give its shortest usable path the strongest type, contrast, or area, while ordering support as decision evidence first and optional detail later. Within one task region, permit one maximum-emphasis text element and one high-contrast action; when several actions are genuinely peer choices, render all peers equivalently rather than promoting one arbitrarily.
Per artifact: identify the visitor's main task, the information needed to complete it, and a ranked content order before arranging regions. Determine which items require reading, comparison, scanning, or action.
Use supplied content first. When content is missing, use plausible, explicitly illustrative material with realistic lengths and variation; do not invent endorsements, credentials, or factual performance claims.
Do not delete required content or shorten labels merely to fit a preferred composition. Omit sections that have no task or information to serve.

## 4. Composition and spatial rhythm
Policy: Establish one primary alignment axis and a small set of repeated column lines; align headings, copy, controls, and repeated roles to them, allowing an element to break the grid only when it carries the dominant outcome. Place the dominant region earlier in reading order and give it more continuous area than any single support region; use separate containers only for independently actionable, selectable, movable, or stateful units, and otherwise group with alignment, spacing, or a rule on the shared surface.
Rhythm: Keep gaps inside a group smaller than gaps between groups, and group gaps no more than half the transition to a new section. For sustained reading, use fewer columns, a stable measure, and visible paragraph separation; for repeated comparison, tighten row spacing while preserving aligned labels, values, and generous separation between distinct sets.
Per artifact: choose columns, widths, spacing values, and component structure from the content order and available space. Keep repeated roles aligned and spaced consistently.
Use proximity, alignment, and shared boundaries to communicate actual relationships; do not add wrappers, empty panels, or ornamental sections to fill space.

## 5. Typography and text behavior
Policy: Let one display role carry the strongest typographic character; distinguish it from body copy by at least two of size, weight, family, or spacing, then make section headings a quieter continuation of that hierarchy. Keep body text regular, labels compact but readable, and numeric data aligned with tabular figures when comparison matters. Use at most two type families, three weights, and one uppercase role; add a second family only when its proportions clearly contrast with the first while comparable x-height and stroke density keep them coherent.
Text behavior: Keep sustained body copy between 45 and 75 characters per line with line height between 1.45 and 1.7; use tighter leading only for large display text. Wrap titles, instructions, field labels, and actions. Truncate only repeated identifiers or values in dense data views, and provide the full value through expansion, an accessible description, or a non-hover-only detail view.
Per artifact: choose available fonts, role sizes, and measures; use actual long titles, labels, and representative values while determining layout.
Preserve selectable text, meaningful heading order, and readable content at twice the default text size. Never use tiny text, forced line breaks, or clipping to rescue a composition.

## 6. Color, surfaces, and visual assets
Surface policy: Build from one background field and clearly contrasting foregrounds; reserve the strongest chromatic or luminance contrast for the primary action, selection, or key data, while status colors keep fixed meanings and always include a label or symbol. Separate ordinary groups with whitespace or a single rule before adding a filled surface; use elevation only for overlays or elements that physically cross content, and use texture only outside reading and control areas. Keep corner treatment consistent among equal roles, and withhold borders, shadows, and accent fills from passive content that is already grouped by alignment.
Asset policy: Give imagery or illustration substantial space only when it identifies a product, person, place, process, atmosphere promised by the content, or evidence needed for a decision. Informational media may equal the dominant content; decorative media remains subordinate and never reduces text contrast. Use one coherent icon family, pair unfamiliar action icons with labels, and size icons as support rather than headings. If no suitable asset exists, create identity through type, layout, rules, or truthful data—not stock-like placeholders, fake product imagery, or decorative blobs.
Per artifact: choose exact role colors, surface values, assets, crops, and aspect ratios. Keep repeated semantic roles consistent; keep decorative color distinct from status and action signals.
Pair color-coded meaning with text or shape; keep text distinguishable from its actual background in every state. Put essential meaning in text even when media fails.
Choose crops around the subject or informational feature; preserve image proportions and icon consistency. Do not replace unavailable meaningful media with unrelated decoration.

## 7. Adaptation under pressure
Policy: When content crowds, first reduce only oversized decorative space, then reflow supporting columns below the main task, then move noncritical support later in reading order, and finally condense navigation into a clearly labeled trigger without removing destinations. Keep the page identity, main task, primary action, current status, and validation feedback visible. Prefer localized horizontal scrolling for tables, timelines, charts, and other two-dimensional comparisons whose relationships would be destroyed by stacking; reflow prose, forms, and independent units instead.
Per artifact: place layout transitions where content stops fitting or relationships become unclear; choose thresholds from that failure, not from a named device.
Preserve the main task and meaningful reading order across widths. Do not hide required actions or data to create a cleaner narrow view.
Contain unavoidable two-dimensional overflow within its own region and make access discoverable. Allow long content and enlarged text to grow without overlapping controls.

## 8. Interaction, states, and motion
Policy: Render the primary action with the region's highest action contrast, secondary actions with quieter fill or text treatment, and unavailable actions with reduced emphasis while retaining a readable label and nearby reason when non-obvious. Focus uses a visible outline independent of hover and distinct from selection; selection persists through fill, marker, or position plus text; pending states preserve the control's width and label context, show progress, and prevent duplicate activation; success and error use different symbols, wording, and color without erasing prior input.
Motion policy: Animate only a change of spatial relationship, disclosure, progress, or confirmed state so motion explains origin, destination, or outcome; keep direct-control feedback under 200ms and larger entrances or reflows under 400ms, with no content-blocking sequence. Under reduced motion, remove travel, parallax, and looping decoration, use an instant state change or opacity transition, and retain progress and outcome text.
Per artifact: map each visible control to an actual outcome and the states reachable in the requested scope. Include loading, empty, error, success, and disabled states wherever the behavior can produce them.
Give controls names, keyboard operation, and visible focus; do not make essential information available only on hover. Keep feedback near its cause and preserve entered data on recoverable errors.
Motion must not delay access to content or controls. Respect reduced-motion preferences. When a prototype simulates an outcome, make its scope clear rather than implying unavailable persistence or connectivity.

## 9. Implementation fidelity
Implement the requested scope in the supplied project conventions; reuse existing components and shared values before introducing equivalents.
Represent text and controls as browser content with appropriate semantics, not as a flattened picture. Express recurring visual decisions through shared values and reuse structure for repeated roles.
Reserve media space, supply font and asset fallbacks, and ensure essential content remains available when an enhancement fails. Do not introduce resources whose loading cost delays the main task without a task-specific need.
Per artifact: choose implementation details from the available environment and required behavior; add dependencies only for a concrete capability that the existing project cannot provide.

## 10. Completion gate
Rejection tests: (1) Reject a composition when three or more unrelated regions compete at the same area and contrast, or passive content is boxed like an action; pass by restoring one dominant region and regrouping passive content on the shared field. (2) Reject typography when title, heading, body, and label roles are not distinguishable by their prescribed relationships, or long text clips, truncates outside dense data, or escapes the reading measure; pass by repairing role contrast, wrapping, and measure. (3) Reject surfaces or media when shadows imply elevation on static sections, action and status accents are confusable, or an image occupies dominant space without subject or evidentiary value; pass by removing the unsupported treatment or reassigning it to its defined role.
Review the browser-rendered result at a wide and narrow width, with long content, enlarged text, missing media, and the applicable interaction states. Inspect the primary task using keyboard navigation.
Fix lost content, blocked actions, overlaps, clipping, unstable layout, and unreadable state distinctions first; then fix violations of the authored hierarchy and visual policies.
Stop when these failures and the authored rejection tests are resolved; do not invent more features or decoration as a finishing step.
If rendering or interaction cannot be inspected in the available environment, distinguish what was checked from what remains unverified; never claim a visual pass from source inspection alone.
