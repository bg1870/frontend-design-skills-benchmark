# Style lock — Northline dispatch

Established: 2026-09-07. Source: generated premium palette, adapted for an operational dashboard.

## Palette
- Background: #f7faff
- Surface: #ebf0f8
- Primary: #336ecc
- Accent: #c34751
- Text primary: #161b23 — 16.52:1 versus background
- Text muted: #536171
- Border: #dbe0e8
- Button label: #ffffff — 4.95:1 versus primary
- Dark mode: not needed; single mode only

## Color contract
- Text safe: text on white, background, surface, and border; white on primary or accent.
- UI safe: primary and accent against surface or border.
- Decorative only: border against background or surface.

## Typography
- Family: Geist. Geist Mono only for IDs and numeric data.
- Scale: Tailwind compatible steps from 12px to 36px; 16px base.

## Shape language
- Radius: 4px small, 8px controls, 12px panels.
- Shadows: restrained elevation only for the summary instrument, dialog, and toast.
- Borders: full 1px hairlines on cards and controls.

## Density and spacing
- Base unit: 4px; active tokens 4, 8, 12, 16, 24, 32, 40, and 48px.
- Dense cards: 12 to 16px. Summary and queue panels: 24px.
- Overall density: information heavy with 72px queue rows.
- Separation: surface and hairline containment inside one app screen.

## Reference intelligence
- Reference board: `.tastemaker/reference-board.md`, inferred and not viewed.
- Design read: dispatcher dashboard for field service operations, mode Operate.
- Dials: variance 4, motion 3, density 8, art direction 6.
- Foundation: custom static HTML with no framework dependencies.
- Direction: a clear dispatch instrument, not a decorative admin template.

## Navigation chrome
- Topbar uses background with a bottom hairline; no sidebar because this brief contains one primary screen.
- Queue controls are contextual rather than global navigation.
- Shell density: compact 44px controls and 72px rows.

## Taste memory
- Profile priors: none.
- Decision log: `.tastemaker/decisions.log`.
- Pending review: summary instrument and queue density.
- Profile promotion: none.

## Mood descriptors
Operational, calm, accountable.

## Assets
- Anchor: `assets/mark.svg`.
- Icons: local Phosphor SVGs with consistent regular stroke.
- No photography or illustration; neither carries useful scheduling information here.

## Motion
- Feel: quick and restrained.
- Curve: cubic-bezier(0.32, 0.72, 0, 1).
- Durations: press 120ms, popover 180ms, panel 240ms.
- Entrance: 240ms, 12px rise on initial data load only.
- Reduced motion: no spatial movement, state feedback remains.

## Do not
- No decorative charts, no gradients, no pill shaped controls, no excessive animation, and no status color without a text label.
