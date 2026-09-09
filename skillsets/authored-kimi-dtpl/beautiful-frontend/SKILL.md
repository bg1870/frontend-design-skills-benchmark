---
name: beautiful-frontend
description: Load when the agent will produce browser-rendered visual work — marketing or product pages, pricing pages, dashboards, clickable prototypes, or new sections of an existing site — and the rendered appearance is part of the deliverable. Skip it for non-visual work (APIs, scripts, data processing, tests), for tasks where an existing design system's tokens and components already fix every visual decision, and for briefs that supply a complete visual specification, since the body would add no constraint there.
---

# Beautiful Front-End — Composed, Not Assembled

## 1. Scope and precedence
Scope: marketing, product, and pricing pages; dashboards and data-heavy tools; clickable prototypes; and new sections of existing sites, delivered as HTML/CSS/JS rendered in a browser. It targets the failure mode where output looks assembled from defaults — centered hero, uniform card grid, gradient accent, unexamined font stack — rather than composed from the content. It does not govern email, print, native applications, or restyling beyond the task's change boundary.
Apply this skill to browser-rendered work within that scope. Resolve visual conflicts in this order: content access and operable controls; explicit task requirements; established conventions in an existing surface; this skill's defaults.
In extensions, inherit the surrounding typography, spacing, colors, component behavior, and navigation unless the task explicitly changes them; apply this skill to unresolved choices.
Per artifact: identify whether the task creates, extends, or redesigns a surface, and identify the allowed change boundary from the supplied brief and material. Do not widen it to showcase the skill.

## 2. Perceptual priorities
Policy: Rank (1) focal dominance above (2) tonal quiet. (1) Each region has exactly one element of highest visual weight — the primary message or action — carried by the largest type, the strongest contrast, or the sole accent color; no second element may match it unless it serves the same task. (2) Everything else in that region holds to one surface and one text-color pairing with at most hairline separation, so the focal element wins at a glance.
When decoration — gradient headlines, pill badges, icon chips, shadowed cards — rivals the focal element in size, contrast, or saturation, remove the decoration first; it may survive only where it stays clearly subordinate on all three measures.
Use this priority order to resolve discretionary choices in later sections; do not introduce unrelated visual motifs merely to make regions look different.
Per artifact: assign the priorities to actual content or controls. Choose concrete visual values that express them; do not copy an imagined reference page.

## 3. Content and attention
Policy: Choose the dominant element by asking which one message or control the visitor needs in the first seconds; that element receives the section-2 focal treatment, and everything else is ordered by how directly it enables that message or action. Supporting material is rendered smaller, lighter, and quieter — it never gets its own accent. Limit: one strong emphasis per viewport-height region; a second is allowed only for a peer action of the same task, a third never.
Per artifact: identify the visitor's main task, the information needed to complete it, and a ranked content order before arranging regions. Determine which items require reading, comparison, scanning, or action.
Use supplied content first. When content is missing, use plausible, explicitly illustrative material with realistic lengths and variation; do not invent endorsements, credentials, or factual performance claims.
Do not delete required content or shorten labels merely to fit a preferred composition. Omit sections that have no task or information to serve.

## 4. Composition and spatial rhythm
Policy: Build every screen on one alignment axis — a left-aligned column structure where text shares one start position, or a deliberate asymmetric split near 1:2 or 2:3. Full-width centering is permitted only for single-message regions (a lone statement, an empty state, a confirmation); centering entire pages is the default to avoid. The dominant region takes at least half again the area of any supporting region, or a grid-breaking position (offset, bleed); equal side-by-side areas declare equal importance and are wrong when importance differs. Regions share one surface when they form one logical group; a separate container is earned only by a change of task or data source. No nested boxes, no cards inside cards.
Rhythm: three spacing tiers with perceptible steps — within-group gaps small, between-group gaps at least twice that, section breaks at least four times that; uniform spacing everywhere is a rejection signal. Sustained reading gets narrower columns and generous line spacing; repeated comparison (pricing, spec rows, metrics) gets tight, uniform row spacing so the values being compared align on one axis.
Per artifact: choose columns, widths, spacing values, and component structure from the content order and available space. Keep repeated roles aligned and spaced consistently.
Use proximity, alignment, and shared boundaries to communicate actual relationships; do not add wrappers, empty panels, or ornamental sections to fill space.

## 5. Typography and text behavior
Policy: Separate the five text roles on at most three axes — size, weight, and letterspacing/case; keep text color near-uniform so the accent hue retains its meaning of action. Display and headings differ from body by size (display at least twice body size); labels differ at small size through weight or letterspacing, never through a third color; data and numerals stay at body size and use tabular figures wherever columns compare values. Use at most two typefaces and three weights; a second face must contrast structurally (serif against grotesque, or mono for data against sans for prose) and must own a distinct role. Choose faces from content type, not habit: long-form or editorial content takes a serif or humanist face, data-dense or tool-like content takes a compact grotesque; state the choice in one line as a consequence of the content, and set fallbacks with similar x-height.
Text behavior: body measure 45–75 characters, body line-height 1.4–1.7, headings 1.05–1.3. All headings, labels, and values wrap by default; truncate only single-line data cells, and only when the full value stays reachable via title attribute, expansion, or detail view.
Per artifact: choose available fonts, role sizes, and measures; use actual long titles, labels, and representative values while determining layout.
Preserve selectable text, meaningful heading order, and readable content at twice the default text size. Never use tiny text, forced line breaks, or clipping to rescue a composition.

## 6. Color, surfaces, and visual assets
Surface policy: assign four roles before styling — background, foreground, one accent, status — and hold the page to one neutral family plus one accent hue; a second hue is allowed only for status and may never appear in decoration. The accent marks interactive elements and the single focal element; passive surfaces never take accent fills or accent-colored headings. Separate regions by luminance steps (a slightly raised or recessed background), not by reflexive borders and shadows: 1px borders only where luminance cannot change (inputs on white, dense tables); shadows only on elements floating above content (menus, dialogs, toasts). Choose one corner-radius value per artifact and apply it to every component; mixed radii require a per-component reason.
Asset policy: imagery earns its area only when it depicts the actual product, place, data, or person the adjacent text refers to; otherwise the space goes to typography, and one well-cropped strong image outranks several weak ones. Icons support text and never replace it on primary actions; one icon family, one stroke weight, optically aligned to the text line. When media and content compete, content wins — crop or shrink the media, never the text. When a suitable asset is unavailable, compose the region typographically on a quiet surface; gradient meshes, abstract blobs, and stock illustration are forbidden as stand-ins for missing meaningful media.
Per artifact: choose exact role colors, surface values, assets, crops, and aspect ratios. Keep repeated semantic roles consistent; keep decorative color distinct from status and action signals.
Pair color-coded meaning with text or shape; keep text distinguishable from its actual background in every state. Put essential meaning in text even when media fails.
Choose crops around the subject or informational feature; preserve image proportions and icon consistency. Do not replace unavailable meaningful media with unrelated decoration.

## 7. Adaptation under pressure
Policy: answer crowding in this order — (1) shrink section and between-group spacing toward the within-group gap, never below it; (2) reduce columns, collapsing asymmetric splits to a single column with the dominant region first and card grids one column at a time; (3) move supporting material behind disclosure (accordion, tabs, details) — the focal message and primary action are never disclosed away; (4) collapse navigation into one menu control only after steps 1–3. The main task's control stays visible without scrolling at the narrowest expected width. Prefer a localized scroll region over reflow only for inherently two-dimensional content (wide tables, code, charts); give it a visible affordance such as an edge fade or persistent scrollbar.
Per artifact: place layout transitions where content stops fitting or relationships become unclear; choose thresholds from that failure, not from a named device.
Preserve the main task and meaningful reading order across widths. Do not hide required actions or data to create a cleaner narrow view.
Contain unavoidable two-dimensional overflow within its own region and make access discoverable. Allow long content and enlarged text to grow without overlapping controls.

## 8. Interaction, states, and motion
Policy: one primary action style per view — filled accent, highest contrast in its region; secondary actions are outline or text styles only, and a second filled style is forbidden; unavailable actions stay rendered with reduced contrast and no hover response, carrying an adjacent reason (inline note or tooltip), and are never hidden. Every interactive element shows a visible focus indicator in the accent hue. Selection, pending (indicator replaces or joins the label while the control keeps its size so layout does not jump), and outcome (success or error text adjacent to the control that caused it) are distinct visual treatments, each reachable by keyboard alone.
Motion policy: animate only changes of state or place — an element entering, leaving, or moving, or a value updating — where the motion shows cause or destination. Durations stay within 150–300ms, ease-out for entrances, ease-in for exits; no ambient loops, parallax, or scroll-jacking. Under prefers-reduced-motion, swap movement for instant changes or opacity-only fades. A policy of state fades only, with no other motion, is complete and acceptable.
Per artifact: map each visible control to an actual outcome and the states reachable in the requested scope. Include loading, empty, error, success, and disabled states wherever the behavior can produce them.
Give controls names, keyboard operation, and visible focus; do not make essential information available only on hover. Keep feedback near its cause and preserve entered data on recoverable errors.
Motion must not delay access to content or controls. Respect reduced-motion preferences. When a prototype simulates an outcome, make its scope clear rather than implying unavailable persistence or connectivity.

## 9. Implementation fidelity
Implement the requested scope in the supplied project conventions; reuse existing components and shared values before introducing equivalents.
Represent text and controls as browser content with appropriate semantics, not as a flattened picture. Express recurring visual decisions through shared values and reuse structure for repeated roles.
Reserve media space, supply font and asset fallbacks, and ensure essential content remains available when an enhancement fails. Do not introduce resources whose loading cost delays the main task without a task-specific need.
Per artifact: choose implementation details from the available environment and required behavior; add dependencies only for a concrete capability that the existing project cannot provide.

## 10. Completion gate
Rejection tests:
- Composition: if every region spans the same width on the same axis, or if removing the largest element leaves no clear second focus, the screen is stacked, not composed — enforce the section-4 area difference and single alignment axis before accepting.
- Text hierarchy: if text roles differ only by size, or only by color, or if any heading clips, overlaps, or breaks mid-phrase at a tested width, rebuild the roles on the section-5 axes and wrapping rules.
- Surfaces and media: if a passive region carries the accent hue, if a non-floating element casts a shadow, or if missing imagery was replaced with decorative abstraction, return those elements to the section-6 roles and the typographic fallback.
Review the browser-rendered result at a wide and narrow width, with long content, enlarged text, missing media, and the applicable interaction states. Inspect the primary task using keyboard navigation.
Fix lost content, blocked actions, overlaps, clipping, unstable layout, and unreadable state distinctions first; then fix violations of the authored hierarchy and visual policies.
Stop when these failures and the authored rejection tests are resolved; do not invent more features or decoration as a finishing step.
If rendering or interaction cannot be inspected in the available environment, distinguish what was checked from what remains unverified; never claim a visual pass from source inspection alone.
