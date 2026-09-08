# DESIGN.md — PipeLine Dispatch

## 1. Subject & provenance
- Subject: a plumbing-company dispatcher queue rendered from `fixtures/jobs.json`.
- Subject colours: Copper Pipe (`#B84E28`) — physical copper and urgent action; Workwear Navy (`#203746`) — uniforms and trusted assignment state; Porcelain Enamel (`#F4F6F4`) — sanitary fixture surfaces.
- Shortlist: Tufte Data-Ink (information architecture: dense, directly labelled queue); Linear (modern tool: fast but too software-generic); Mailchimp Freddie (warm humanist: friendly but too casual for emergency dispatch).
- Chosen: Tufte Data-Ink, re-hued from warm paper to cool porcelain because an operational plumbing surface needs crisp sanitation rather than editorial warmth. Tight spacing, no radius, no shadows, direct labels, and marginal notes carry over.
- Assumptions: greenfield browser dashboard; laptop-first for a single dispatcher; local fixture data is sample data; fixture time zone is UTC−05:00 and is displayed as supplied; assignment and status edits are session-only because no API exists. Rejected: maps, technician capacity, travel estimates, and performance trends because source data cannot support them.

## 2. Visual theme
A clipped field ledger: porcelain ground, ink rules, copper only where action or urgency demands it. Editorial hierarchy meets a service-board rhythm.

Design Read:
- artifact: dashboard
- audience: plumbing dispatcher coordinating daily field work at 1m laptop distance
- visual-language: industrial data-ink ledger
- mode: greenfield
- visual-variance: 4 — stable table spine with an asymmetric day rail
- motion-intensity: 2 — state feedback only
- information-density: 8 — all job facts visible with progressive controls
- asset-dependence: 1 — data and typography carry the surface
- brand-fidelity: 2 — no supplied brand identity; restrained exploratory mark

## 3. Colour palette & roles
Primitives and roles:
- Porcelain 000 (`#FFFFFF`) — raised fields
- Porcelain 050 (`#F4F6F4`) — page ground
- Porcelain 100 (`#E9EDEB`) — hover fill
- Porcelain 200 (`#D4DBD7`) — dividers and borders
- Ink 500 (`#66716C`) — secondary text; 4.6:1 on Porcelain 050
- Ink 700 (`#394540`) — body text; 8.3:1 on Porcelain 050
- Ink 950 (`#13221C`) — headings; 14.8:1 on Porcelain 050
- Copper 100 (`#F4DED5`) — urgent tint
- Copper 700 (`#9B3D1F`) — primary action and open status; 5.4:1 on Porcelain 050
- Workwear 100 (`#DCE7EC`) — assigned tint
- Workwear 700 (`#294E62`) — assigned status; 7.7:1 on Porcelain 050
- Verified 100 (`#DCE9DF`) — done tint
- Verified 700 (`#356344`) — done status; 6.7:1 on Porcelain 050
Components use semantic aliases: ground, raised, hover, border, text-muted, text-body, text-strong, action, open, assigned, done.

## 4. Typography
- Display: `Georgia, "Times New Roman", serif`; 400/700, tracking −0.035em.
- Body: `Georgia, "Times New Roman", serif`; 400/700, normal tracking.
- Utility/mono: `"IBM Plex Mono", "Liberation Mono", monospace`; 400/600, tracking .04em. (Local fallbacks only; no network dependency.)
- Scale: 11 / 12 / 14 / 16 / 24 / 36px; compact dashboard body intentionally 14px.

## 5. Component behaviours
- Button: rule-bound, square; hover Porcelain 100, focus 2px Copper outline, active inset shift, disabled muted, loading text “Working…”.
- Card/row: border-only; hover Porcelain 100 and keyboard focus Copper outline; activation opens the detail dialog.
- Input: white field and ink rule; focus Copper outline. Disabled and error treatments are reserved for production validation because fixture filtering has no invalid input path.
- Empty: plain ruled panel with “No jobs match this view” and reset action. Error: copper note with retry. Loading: textual “Reading job ledger…” without fake skeleton counts.

## 6. Layout
- Full-width shell, max-width 1600px, 24px desktop gutters.
- Summary bar: five computed cells in one horizontal ledger.
- Main: 184px date rail + fluid queue, 24px gap; queue is a CSS grid/table with fixed semantic columns.
- Spacing ladder: 4 / 8 / 12 / 16 / 24 / 48px.
- Radius: 0 throughout. Shadow: none.
- Under 900px: day rail becomes horizontal and table columns condense. Under 640px: rows become labelled two-column records, the summary scrolls horizontally, and the toolbar stacks. Touch targets are at least 44px.

## 7. Motion
- State transition: 120ms linear for color and border only; no entrance animation.
- Triggers: hover, focus, filter/selection changes.
- `prefers-reduced-motion`: transitions removed.

## 8. Assets
- `fixtures/jobs.json` — present; sole job data source.
- Logo — pending; surface uses a labelled `[company logo pending]` placeholder, not a fabricated brand mark.
- Photography/maps — intentionally absent; unsupported and unnecessary for queue scope.

## 9. Anti-patterns
No rounded cards, shadows, gradients, decorative charts, emoji, invented KPI/trends, fake map, hidden status labels, giant marketing copy, or typed summary counts. Copper means action/open urgency only; state colours do not decorate.

## 10. Blockers & open questions
- Human blocker: company name/logo and production assignment API were not supplied. A logo placeholder is visible; edits remain session-only.
- No unresolved questions: defaults above are implemented.
- Captured clock: `2026-09-08T01:50:09+03:00` (command `date -Iseconds`). Fixture’s UTC−05:00 clock makes current dispatch date `2026-09-07`; date-relative summaries derive from this captured instant.
