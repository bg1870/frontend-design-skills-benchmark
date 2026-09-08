# DESIGN.md — Daymark habit prototype

## 1. Subject & provenance
Daymark is a greenfield mobile habit tracker for people who want a calm daily ritual rather than a productivity scoreboard. Subject colours come from a lived morning routine: dawn apricot (`#F5A06B`) — first light and the completion accent; oat paper (`#FFF4E8`) — a warm journal page; eucalyptus ink (`#173B38`) — leaves and grounded focus.

Recipe shortlist: Headspace Meditation (Warm Humanist) would make daily check-ins gentle and forgiving; Notion pre-AI (Modern Tool) would make the list highly utilitarian but emotionally flat; Tufte Data-Ink (Information Architecture) would clarify streak evidence but over-formalize a wellness ritual. Headspace Meditation wins because habit formation benefits from warmth, low-pressure language, and tactile completion. Its structure is used while hues are re-derived from dawn/apricot/eucalyptus.

Assumptions: mobile-first iPhone-class viewport; sample habits are explicitly labeled; today, streak detail, and add-habit are the complete requested path; habit completion is local prototype state; adding a habit creates a real row for the session. Alternatives rejected: gamified points, social comparison, account onboarding, notifications setup, destructive habit management, and mascot illustration, because they are outside the smallest credible flow or would require real assets.

## 2. Visual theme
A quiet pocket field journal: large friendly type, warm paper, eucalyptus ink, and one apricot action colour. A vertical “day rail” and stamp-like completion controls make the list feel ownable without cardifying every row.

Design Read:
- artifact: clickable mobile prototype
- audience: adults building small repeatable routines
- visual-language: warm humanist field journal
- mode: greenfield
- visual-variance: 6 — familiar bottom navigation with one asymmetric day rail and oversized progress seal
- motion-intensity: 5 — completion bloom, sheet choreography, and screen crossfade only
- information-density: 6 — today is scannable; streak evidence is progressively disclosed
- asset-dependence: 1 — typography and interface structure carry the experience; no identity-critical imagery
- brand-fidelity: 2 — exploratory identity with internally strict token use

Narrative roles: Today is the task hub at 10cm viewing distance, warm/optimistic, with five rows fitting without scroll pressure. Streak detail is evidence and reflection, warm/grounded, with calendar and milestone content fitting one screen. Add Habit is a focused transition surface, brighter and tactile, with one short form above the fold.

## 3. Colour palette & roles
Neutral ramp (eucalyptus-hued): Paper White (`#FFFCF8`) — raised surface; Oat Ground (`#FFF4E8`) — app ground; Mist Border (`#E4DDD2`) — dividers; Sage Muted (`#8A9994`) — secondary text; Deep Eucalyptus (`#173B38`) — primary text and dark controls.

Accent ramp (apricot): Apricot Wash (`#FDE1CF`) — selected wash; Dawn Apricot (`#F5A06B`) — completion/action; Burnt Apricot (`#C76035`) — accent text and focus detail.

Status ramp: Moss Wash (`#DCE8D2`) — positive history cells; Moss Ink (`#365C3A`) — positive text. Error is represented with Burnt Apricot text and an explicit message rather than introducing another hue.

Semantic roles: canvas → Oat Ground; surface → Paper White; text → Deep Eucalyptus; muted → Sage Muted; border → Mist Border; primary action → Deep Eucalyptus; completion → Dawn Apricot; selected → Apricot Wash; success → Moss Ink/Moss Wash.

Measured contrast pairs: Deep Eucalyptus on Oat Ground ≈ 11:1; Deep Eucalyptus on Paper White ≈ 12:1; Paper White on Deep Eucalyptus ≈ 12:1; Burnt Apricot on Paper White ≈ 4.6:1. Dawn Apricot is never used for small text.

## 4. Typography
Display and body: `"Plus Jakarta Sans", "Avenir Next", sans-serif`; display 700–800, body 400–600; headings tracking `-0.04em`, labels `0.01em`. Hero 42px/0.98; section 24px/1.1; body 16px/1.5; meta 12–14px. Mono/numerals: `"DM Mono", "IBM Plex Mono", monospace`, weight 500, tracking `-0.02em`. No banned face appears anywhere in either stack.

## 5. Component behaviours
Buttons: primary is deep eucalyptus/paper text; secondary is transparent/ink; icon controls are circular. Hover lifts 1px; focus gets a 3px Apricot Wash ring plus Burnt Apricot outline; active compresses to 0.98; disabled is 42% opacity; loading shows “Saving…” and disables repeats.

Habit rows: default uses alignment and a divider, not a floating card; hover gains Paper White wash; focus-visible outlines the row action; active completion fills the stamp and strikes the title; disabled lowers opacity; loading is not applicable to local toggles; empty state explains how to add the first habit; error state is inline, explicit, and recoverable.

Inputs: default Paper White with Mist Border; hover darkens border; focus uses Burnt Apricot border/ring; active retains focus; disabled uses Oat Ground and muted text; loading disables the submit button; empty required submission displays “Give your habit a name”; error uses Burnt Apricot text.

Sheet: backdrop click and close button dismiss; Escape dismisses; submit validates then adds. Drag gestures are deliberately omitted in this clickable prototype.

## 6. Layout
Browser canvas centers one 390×844 phone frame; below 460px the frame becomes edge-to-edge at 100vw × 100dvh with no decorative chassis. Phone content uses a 24px horizontal inset, 8px baseline ladder, and a fixed 76px bottom navigation. Spacing ladder: 8 / 16 / 24 / 40 / 64 / 96. Today rows use a 56px completion rail plus a flexible content column. Maximum content width is 390px. Sheet uses 24px gutters and collapses from bottom with safe-area padding. Touch targets are at least 44px.

## 7. Motion
Primary easing: `cubic-bezier(.22,.8,.3,1)`; quick feedback 180ms; screen change 320ms; sheet 420ms; completion bloom 520ms; subtle breathing highlight 3200ms. Motion communicates action completion, navigation continuity, and sheet causality. Under `prefers-reduced-motion`, all transitions and animations resolve effectively instantly and no content depends on motion.

## 8. Assets
No logo, photography, or product imagery is required. Icons are simple inline interface glyphs drawn in code and carry accessible labels where interactive. Google Fonts CSS is the only external visual resource: Plus Jakarta Sans and DM Mono, present via stylesheet URL in `index.html`.

## 9. Anti-patterns
No gradient mesh; no purple; no fabricated social proof or performance metrics; no emoji icons; no rounded card around every row; no mascot counterfeit; no streak-shame language; no literal derived totals; no tiny uppercase eyebrow repeated across sections; no cool navy; no springy or spectacle motion; no multiple filled actions per view.

## 10. Blockers & open questions
Blockers: none. This is a fictional greenfield concept and needs no supplied identity asset. Material assumptions are resolved in §1 rather than left open.

Captured clock: `2026-09-08T01:52:34+03:00`. Sample weekday/date labels and history are derived at render time from this fixed clock. The UI labels itself “Prototype · sample routine”.
