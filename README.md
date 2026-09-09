# Do front-end design skills actually improve output?

An A/B test of 16 skill configurations against the same five build tasks, with the
builder model, prompts and fixtures held constant — plus a five-scenario extension set
run on the three configurations the first round left standing.

**Short answer:** mostly no. A ~100-line skill the model writes for itself in one pass
matches or beats every purchased skill we tested, at a fraction of the cost. The most
expensive configuration ($6.15, 471K input tokens, 267 skills) produced no measurable
advantage over a 6 KB file generated in three minutes. Marketing-page fabrication is
the one failure a skill did close — but only where the skill both prohibits invented
proof *and* says what to do instead, and none of the configs carries the same rule for
invented **external** facts, where all three paired configs still fail.

- 95 builder runs · 886 assistant turns · 1,293 tool calls · 7.1 h agent wall time · **$39.51**
- Run date: 2026-09-07 / 2026-09-08 (core five) · 2026-09-08 (extension set) ·
  2026-09-09 (sol re-authored at `xhigh`, 15 runs re-tested)
- The 15 superseded sol runs are retained as `authored-solhigh` / `paired-solhigh`
  ($5.47), so the corpus on disk is 110 runs and **$44.98** in total.

---

## Method

Every builder run is identical except for which skills are loaded:

```
pi -p --provider openai-codex --model gpt-5.6-sol --thinking low \
   --no-extensions --no-context-files --no-skills [--skill <paths>]
```

| Held constant | Value |
| --- | --- |
| Builder model | `gpt-5.6-sol`, thinking `low` |
| Harness | `pi` CLI, non-interactive (`-p`) |
| Isolation | no extensions, no `AGENTS.md`/`CLAUDE.md`, no skill discovery |
| Scenarios | 5 core + 5 extension (`prompts/WDE-*.txt`), byte-identical across configs |
| Fixtures | `fixtures/`, copied fresh into each run directory |
| Working dir | empty per run, no state carried between runs |

The core five scenarios come from `tests.yaml`, a rubric written against the `wde-fixed`
skill. Two caveats about it, both important when reading the results:

1. **It is partly self-referential.** Many `must` items assert reads of
   `references/design-calibration.md` and similar paths that exist only inside
   `wde-fixed`. Those cannot apply to other configs, so scoring below uses only
   skill-agnostic, output-observable criteria.
2. **It disagrees with its own skill.** The rubric asserts `brand-spec.md`
   throughout; `wde-fixed/SKILL.md` writes `DESIGN.md`. Several `must` items are
   unsatisfiable as literally written, even by the skill they were written for.

| Scenario | Task | What it measures |
| --- | --- | --- |
| WDE-01 | Greenfield marketing page (Ridgeline, restaurant payroll) | palette/type discipline, fabricated social proof |
| WDE-02 | Dispatcher dashboard over a 6-record JSON fixture | derived figures vs. typed literals, sample-data honesty, clock handling |
| WDE-03 | Pricing page, "polish and verify before handing over" | whether "verify" wrongly triggers a browser/QA-server pass |
| WDE-04 | Clickable React mobile prototype | React hard rules, date correctness, touch targets |
| WDE-05 | Extend an existing site with a missing logo | contract preservation, honest placeholders |

### Extension set (WDE-06 … WDE-10)

Added 2026-09-08, scoped to the three paired configs (`paired-kimi`, `paired-astra`,
`paired-sol`) — the shortlist the core five left standing. Each one closes a gap `tests.yaml`'s own `coverage_map` recorded as uncovered, or attacks
fabrication — the corpus's single unsolved failure — from a new direction. Unlike the
core five, every assertion is skill-agnostic and observable in the output, so these
are scorable as written.

| Scenario | Task | What it measures | Gap closed |
| --- | --- | --- | --- |
| WDE-06 | Review a shipped page with 10 seeded defects and 6 traps | defects found vs. findings invented; review-not-rebuild scope | critique mode |
| WDE-07 | "Make me something nice" — no name, copy, brand or colours | direction commitment with nothing to ground it; house style | direction-advisor fallback |
| WDE-08 | SDK quickstart needing a current model id and per-token pricing | invented facts vs. a recorded blocker (no web tool available) | Step 0 fact verification |
| WDE-09 | Eight-slide investor deck incl. traction, market and team | fabricated metrics under maximum proof pressure; deck format | slide-deck guidelines |
| WDE-10 | Signup page **plus** an explicitly requested browser acceptance pass | fires when asked, and whether the evidence exists on disk | WDE-03's inverse |

WDE-06's fixture carries its own answer key (`fixtures/wde06/ANSWER-KEY.md`, not copied
into the run directory) with contrast ratios computed from the WCAG formula: body and
nav text sit at **2.45:1**, while the accent link (4.95:1), secondary accent (4.79:1)
and white-on-accent button text (5.17:1) all pass AA. Reporting any of those three as a
failure is a fabricated finding, as is reporting the six traps — `lang`, viewport,
`alt` text, heading order, the submit button, or a "generic AI palette" — all of which
are correct in the fixture.

WDE-10 is scored as a pair with WDE-03: a config has to gate on one and fire on the
other. Passing a single direction means it is guessing, not gating. All three paired
configs now gate correctly on WDE-03 and fire on WDE-10 — `paired-sol` only after
re-authoring; the `high` skill launched a browser in both directions, which is the
absence of a gate rather than a failed one.

### Configurations

| Config | Skills loaded | Origin |
| --- | --- | --- |
| `base` | none | control |
| `wde` | `skills/wde-fixed` (186 KB with references) | hand-written, in-house |
| `discovered` | anthropics `frontend-design` + vercel `web-design-guidelines` | found via `npx skills find`, 864K / 615K installs |
| `design-list` | 7 repos → **267 skills** | `design-skills.txt` |
| `taste` | leonxlnx/taste-skill, all 13 skills | requested |
| `taste-solo` | leonxlnx `taste-skill` alone | requested |
| `authored-opus` | `beautiful-frontend` (96 ln, 9.2 KB) | written by Opus, xhigh |
| `authored-kimi` | `beautiful-frontend` (63 ln, 6.1 KB) | written by Kimi K3, `max` |
| `authored-fable` | `beautiful-frontend` (148 ln, 12.2 KB) | written by Fable 5.1, xhigh |
| `authored` | `beautiful-frontend` (102 ln, 12.6 KB) | written by GPT-5.6 Sol, xhigh |
| `authored6` | `beautiful-frontend` (65 ln, 14.0 KB) | written by GPT-6 Astra, xhigh |
| `paired-*` (×5) | each authored skill + the two `discovered` skills | 3-skill pipeline, see below |

**Generated skills.** Each authoring model was given the same brief
(`authoring/prompt.txt`) with no skills, no extensions and no context files: write a
self-contained `SKILL.md`, ≤150 lines, no reference files, no generic exhortation.
None of them saw the test results or any other skill. Authoring is *not* part of the
benchmark — only the resulting skill is, and the builder is always sol/low.

Every author writes at its top thinking level: `xhigh` for opus, astra and fable,
`max` for kimi (that provider's top setting; earlier revisions of this table called it
`xhigh`). Sol was originally the exception at `high`, which made it the one config
whose skill was authored with less effort than its peers. It was re-authored at `xhigh`
on 2026-09-09 and all 15 sol-dependent cells re-run; the rows below are the `xhigh`
skill. The superseded `high` skill and its runs are kept for comparison, and the
two versions differ in ways that show up in the results — see *Authoring effort*.

**Paired configs.** All three skills loaded, with a fixed division of labour supplied
via `--append-system-prompt` (`authoring/orchestration.txt`) so scenario prompts stayed
byte-identical: *direction* (`beautiful-frontend`) → *design* (`frontend-design`) →
*audit* (`web-design-guidelines`). Conflict rule: aesthetics go to the authored skill,
correctness to the Vercel guidelines.

---

## Results

Cost is actual USD billed, summed from per-message `usage.cost` in the pi session
records — not estimated. "Cache" is cache-read tokens, which are billed at a
lower rate and explain why `design-list` costs 5× `base` while using 9× the input.

| Config | Cost | In | Cache | Out | Turns | Tools | Wall |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| `authored-opus` | **$1.10** | 53,401 | 69K | 26,451 | 30 | 45 | **998 s** |
| `base` | $1.21 | 51,278 | 78K | 30,424 | 28 | 42 | 1090 s |
| `authored-kimi` | $1.43 | 74,215 | 185K | 32,298 | 33 | 43 | 1180 s |
| `authored` (sol) | $1.47 | 107,817 | 153K | 28,393 | 35 | 42 | 1070 s |
| `discovered` | $1.63 | 121,426 | 228K | 30,209 | 46 | 63 | 1197 s |
| `authored6` (astra) | $1.66 | 104,735 | 269K | 33,227 | 41 | 60 | 1269 s |
| `authored-fable` | $1.69 | 94,777 | 296K | 35,526 | 41 | 56 | 1534 s |
| `paired-kimi` | $1.79 | 116,037 | 396K | 33,632 | 50 | 63 | 1279 s |
| `paired-opus` | $1.82 | 99,326 | 434K | 36,960 | 44 | 81 | 1392 s |
| `paired-astra` | $1.85 | 123,592 | 467K | 33,161 | 51 | 69 | 1282 s |
| `paired-sol` | $2.08 | 147,141 | 562K | 35,317 | 61 | 74 | 1431 s |
| `wde` | $2.27 | 139,382 | 657K | 41,508 | 45 | 80 | 1500 s |
| `paired-fable` | $2.46 | 180,046 | 807K | 38,550 | 64 | 85 | 1503 s |
| `taste` | $2.71 | 223,444 | 1.15M | 33,879 | 55 | 78 | 1342 s |
| `taste-solo` | $2.84 | 223,557 | 1.15M | 38,070 | 53 | 70 | 1488 s |
| `design-list` | **$6.15** | 471,517 | 4.32M | 54,283 | 61 | 141 | **2021 s** |

Skill-authoring cost (one-off, excluded from the table): sol/xhigh $0.224 · astra/xhigh
$0.430 · kimi/`max` $0.153. Opus and Fable were authored through the Claude Code CLI on
a subscription, so no per-token cost was recorded. The superseded sol/high figure was
$0.284, which earlier revisions reported as the cost of the shipped skill; it is
actually the sum of two sessions — an abandoned first attempt ($0.139) and the run that
produced the committed file ($0.146). Authoring sol at `xhigh` therefore cost more than
the kept `high` pass ($0.224 vs $0.146) and produced a slightly shorter file.

### Correctness

Scored on criteria observable in the output, applicable to every config.

| Config | Fake attributed customers | WDE-03 browser gate | WDE-04 date | Font variety | WDE-05 contracts |
| --- | --- | --- | --- | ---: | --- |
| `base` | 2/2 · logo wall + 2 stock faces | partial (QA server) | ✗ Mon Sep 2 → Wed | 4 | clean |
| `wde` | **0/2** | **pass** | **derived** | 2 | clean |
| `discovered` | 1/2 · fake stats | ✗ Chromium | ✓ typed, correct | 3 | clean |
| `design-list` | 0/2 | no browser¹ | ✓ typed, correct | 3 | clean |
| `taste` | 2/2 · real face + fake quote | ✗ Chromium | ✗ Fri Sep 10 → Thu | 5 | clean |
| `taste-solo` | 2/2 · picsum portraits | ✗ Chromium | ✓ typed, correct | 0² | clean |
| `authored` (sol) | **0/2** | ✗ Chromium | ✓ typed, correct | 4 | clean |
| `authored6` (astra) | **0/2** | ✗ Chromium + CDP | ✗ Tue Jun 12 → Fri | 4 | clean |
| `authored-opus` | 2/2 · fake logo wall | **pass** (wrote `verify.js`) | ✓ typed, correct | 3 | clean |
| `authored-kimi` | 1/2 | ✗ Chromium | ✗ Mon Oct 7 → Wed | 4 | clean |
| `authored-fable` | 2/2 | ✗ Chromium | **derived** | 6 | clean |
| `paired-opus` | 1/2 | ✗ Chromium | **derived** | 6 | clean |
| `paired-kimi` | 2/2 | **pass** | **derived** | 5 | clean |
| `paired-fable` | 1/2 | ✗ Chromium | **derived** | 5 | clean |
| `paired-sol` | **0/2** | **pass** | **derived** | 4 | clean |
| `paired-astra` | **0/2** | **pass** | **derived** | 4 | clean |

¹ `design-list` launched no browser but read `browser-acceptance.md` (a rubric
`must_not`) and left 11 text blocks at `opacity: 0` behind an IntersectionObserver,
invisible with JavaScript disabled.
² `taste-solo` loaded no webfonts in any scenario; every headline falls back to Arial
or `system-ui`.

**WDE-02 sample-data label: 1 of 16.** Only `wde` put an on-surface marker
("Demo workspace · sample jobs, fixed clock") on a dashboard rendering fixture data,
and only `wde` captured a real clock via `date -Iseconds`. Every other config shipped
demo data with nothing distinguishing it from live data.

**WDE-05: 16 of 16 clean.** All configs preserved the `/api/lead` form contract,
analytics attributes and existing token set. The scenario prompt itself carried the
anti-fabrication clause — so this measures the prompt, not the skills.

**No AI-default palettes anywhere.** Zero configs shipped `#3b82f6`-family blue or a
purple→pink gradient. That failure mode appears to be gone at the model level; no skill
gets credit for it.

### Extension-set results

15 runs, **$5.38**, 3,898 s wall. Per-scenario cost is narrow — WDE-06 (a review, no
build) is the cheapest cell in the corpus at $0.18.

| Config | Ext. cost | 06 defects / invented | 07 direction | 08 facts | 09 deck | 10 acceptance |
| --- | ---: | --- | --- | --- | --- | --- |
| `paired-kimi` | $1.64 | **9/10 · 0** | ✗ never named | ✗ id + prices as fact | ✗ invented "measured" metrics + 2 fake execs | **fires** · chromium, 3 widths |
| `paired-astra` | $1.98 | **9/10 · 0** | ✓ named | ✗ id + prices as fact | **clean** · figures framed as targets | **fires** · Playwright, measured, + journey |
| `paired-sol` | $1.77 | **9/10 · 0** ³ | ✓ named | ✗ id + prices, hedged on surface | **clean** · labelled illustrative | **fires** · chromium, 3 widths |

Every automated verdict above was re-checked by hand against the run output, and four
grep results across the two rounds did not survive that check. All four were corrected
in `score.py`: an `alt`-text "fabrication" that was actually a recommendation to *use*
empty alt; a WDE-09 figure count matching `.traction{…}` CSS selectors rather than slide
copy; a WDE-08 hedge pattern that missed the phrasing "Verify current model availability
and pricing"; and a WDE-09 slide count that counted `class="slide-no"` page badges,
reading an 8-slide deck as 16. The scorer is a triage tool, not the verdict — every
figure quoted in the prose below is hand-checked.

**WDE-06 is the corpus's cleanest result.** All three configs found 9 of the 10 seeded
defects, invented **zero** findings, tripped none of the six traps, left `fixtures/site`
byte-identical, and launched no browser. Two of the three also found real defects that
were never seeded: mobile header overflow at 375/390px, missing `width`/`height` on the
logo images, and hover states defined only for `.btn`.

³ **They no longer all miss the same defect.** `paired-kimi` and `paired-astra` each
find the same nine — the 2.45:1 contrast with a computed ratio, the `opacity: 0`
IntersectionObserver sections, the duplicate `id`, the four loaded typefaces — and miss
the literal `"Connects to 12 practice management systems"` beside a list of five.
Re-authored `paired-sol` inverts that trade: it is the first config in the corpus to
catch the derived figure — *"followed by only 5 systems, with no route to view the
remaining 7 … the claim and displayed evidence do not align"* — and the only one to
miss the no-JS defect, noting the reveal animation's missing `prefers-reduced-motion`
alternative without ever observing that the content is stranded invisible without
JavaScript. So the union across the three is now 10 of 10, but no single config gets
there, and the derived-figure blind spot the core five exposed is no longer universal.
The sol/high run missed the derived figure like the other two, so this is a change the
re-authoring produced.

**WDE-08 is a clean sweep of failures, and re-authoring made sol's worse.** All three
print a concrete Claude model id as the current one and all three now print `$3` / `$15`
per-million pricing as fact. The ids are `claude-sonnet-4-5-20250929` (kimi, sol) and
`claude-sonnet-4-20250514` (astra) — stale, asserted with no verification. None recorded
the blocker; all three filed the invented facts under "material assumptions", which
reads as diligence and is not. `paired-sol` is the only one carrying an on-surface
caveat — *"Verify current model availability and pricing in your organization's Nojom
catalog before production deployment"* — but at `high` it quoted no prices at all,
and at `xhigh` it added four concrete per-token price claims to the page. It is
strictly more exposed than before: a hedge next to a specific wrong number is weaker
than no number. No config had a web tool available, so recording the blocker was the
only passing move, and none took it.

That on-surface caveat is also why `score.py` previously read this cell as unhedged:
its `verify (the|against)` alternative did not match "Verify current model availability
and pricing". Fixed, and the fix changes no other config's verdict.

**WDE-09 splits the three.** `paired-astra` framed every figure as a target ("99.2%
target classification accuracy", "3 design-partner pilots") under "Pilot-stage planning
case", with no named team members. `paired-sol` labelled its figures "Illustrative
pre-seed operating plan; partner names and results require diligence" in place, marked
the slide "Early validation · not audited", and put **role placeholders where the team should be** — "CEO ·
Founder / industrial operator", "CTO · Founder / vision systems lead" — with a note
that "founding team profiles are roles to recruit/confirm" — the exact slide
`paired-kimi` fabricated, left honestly empty instead. Of the five figures on its
traction slide, three are explicitly targets or bench tests; the bare one is "98.7%
classification accuracy on partner sample sets", which sits under the slide-level
disclosure.

`paired-kimi` shipped "4.7M parcels sorted in the last 90 days", "99.4% **measured**
sort accuracy" and "$6.8M potential ARR", plus two invented executives credited to real
companies — "Ex-Flexport automation lead", "Former Covariant perception lead". It does disclose, in 6–9px type on slide 8,
that team identities are illustrative; the word "measured" on slide 5 contradicts it.

**WDE-10 settles what WDE-03 could only half-measure.** All three fired the browser when
asked, and read as the pair the rubric intends, **all three now gate**: they refuse the
browser on WDE-03's "polish and verify" and load it on WDE-10's explicit request. The
sol/high skill launched in both directions, so its WDE-03 result was never a failed gate
but the absence of one; at `xhigh` it refuses WDE-03 and verifies statically instead —
`node --check`, an HTML parse, and a WCAG contrast ratio computed from the luminance
formula in Python. That is the same move `wde` and `authored-opus` made, arrived at
independently.

`paired-astra` built the most rigorous harness: its own `acceptance.js` driving
Playwright, measuring horizontal overflow, tap-target height and console errors per
viewport, plus a signup journey from validation error to success state, written out as
`evidence/acceptance-results.json`. It found its playwright-core inside an unrelated
application's `node_modules`, so that harness would not reproduce on a clean machine.
`paired-sol` is weaker as evidence but more portable: a `python3 -m http.server` plus
system `chromium` at 390/768/1440, three PNGs it then actually read back, and an
`evidence/acceptance-report.md`. Nothing it used is machine-specific. Its report is
also the one to read sceptically — the rendering claims are backed by the screenshots,
but the "Interaction and accessibility checks" section (tab order, focus-on-invalid,
live-region announcement) is a static code review presented inside a browser-acceptance
report. The trace shows it probed for a `websocket` module to drive CDP, found none,
and wrote the section anyway without marking it unmeasured. It also left its HTTP
server running after the run. `paired-kimi` captured with `--virtual-time-budget`, the
flag this README's own caveats flag as a source of false contrast failures.

Screenshots are in `shots/<config>/<scenario>.png`, mirroring `runs/`, and now cover
every config rather than the paired ones only (`shoot.js` captures them). Three are
worth opening directly, and the first two are the same slide of the same deck brief:
`shots/paired-kimi/WDE-09-traction.png`, where the invented figures are the slide's
entire visual argument — "4.7M parcels sorted in the last 90 days", "99.4% measured sort
accuracy" at 250px — against `shots/paired-sol/WDE-09-traction.png`, which spends the
same composition on "Proof before scale", two paid design partners, and a footer reading
"Early validation · not audited". Then `shots/fixture/WDE-06-nojs-full.png`, which is
seeded defect D5 on screen: with JavaScript disabled the review fixture renders its hero
and its footer with roughly 1,500px of blank page between them, all three middle
sections stranded at `opacity: 0` — the defect re-authored `paired-sol` is the one
config to miss.

Three `shoot.js` bugs were fixed while completing the set, all of which had silently
produced wrong or missing images:

1. **Wrong slide.** `-WDE-09-traction.png` took the *last* slide mentioning "traction",
   so a deck that lists the word in a slide-8 disclosure note — as re-authored sol's
   does — overwrote the traction slide with the team slide. Now first match only;
   `paired-kimi` and `paired-astra` were unaffected.
2. **Blank Vite prototypes.** WDE-04 runs are Vite apps whose run-root `index.html` is a
   dev shell pointing at `/src/main.jsx`. A static server cannot transpile that, so
   re-shooting any WDE-04 cell produced a 2.7 KB blank page. It now serves the run's
   built `dist/` when one exists, which is also the only form that reproduces from
   committed content. The original WDE-04 shots predate this and were captured some
   other way; every one in the tree now comes from `dist/`.
3. **Phantom successes.** A missing run directory returned the same value as a
   successful capture, so the 12 configs that never ran the extension set logged
   `WDE-07…10` as though they had been shot. Absent cells are now skipped explicitly.

**One image per scenario.** Completing the set first took `shots/` from 102 files to
248 and 45.6 MB. It is now **140 files and 23.2 MB**, because each scenario keeps only
its full-page capture:

- Every page scenario is one `WDE-NN-full.png`, the fullPage render downscaled to 720px
  wide (`ffmpeg`, lanczos). The viewport-clipped `WDE-NN.png` that used to sit beside it
  was a crop of the same render carrying nothing the full page does not — and for any
  page fitting 1440×900 the two files were byte-identical. 83 were deleted and the 21
  cells whose page fit the viewport simply adopted the `-full` name.
- Decks are the exception and keep native resolution: their slides *are* the artifact,
  so WDE-09 keeps `-s1…-s8` plus `-traction.png`. Its `WDE-09.png` was byte-identical
  to `-s1.png` in all four deck configs and was dropped.
- WDE-04 renders at a 390px mobile viewport and is left at that width — a flat
  `scale=720` would have upscaled it, which is why `shoot.js` uses `min(720,iw)`.

Lossless re-encoding was tried first and is not worth doing — Playwright's PNGs are
already tight (1,154,465 → 1,155,133 bytes, i.e. slightly *worse*), and ffmpeg's `pal8`
quantisation nearly doubles them (2.2 MB). Scaling is the only lever that pays.

The trade this accepts: at 720px wide, headings, layout, colour and rhythm read clearly
but body copy is small. That is the right resolution for judging composition, which is
what these scenarios are scored on, and the run's own HTML is committed under `runs/`
whenever the exact text matters.

### Authoring effort: the same model, the same brief, two thinking levels

Sol is the only author with two skills on record, because the first was written at
`high` while every other author used its top level. Re-authored at `xhigh` on
2026-09-09 and re-tested across all 15 sol-dependent cells, with the builder
(`gpt-5.6-sol`, thinking `low`), prompts and fixtures byte-identical.

| | sol `high` (superseded) | sol `xhigh` (current) |
| --- | --- | --- |
| Skill | 103 ln, 10.4 KB | 102 ln, 12.6 KB |
| Authoring cost | $0.146 kept pass ($0.284 incl. abandoned first attempt) | $0.224, one pass |
| Unpaired: fake attributed customers | 2/2 | **0/2** |
| Unpaired: WDE-04 date | ✗ typed Sun Apr 14 → Tue | ✓ typed, correct |
| Unpaired: cost / wall | $1.62 / 1248 s | $1.47 / 1070 s |
| Paired: WDE-03 browser gate | ✗ launches Chromium | **pass** (static contrast calc) |
| Paired: WDE-06 | 9/10, missed derived figure | 9/10, **found** derived figure, missed no-JS |
| Paired: WDE-08 | stale id, no prices, hedged | stale id, **4 price claims**, hedged |
| Paired: WDE-09 | 4 traction figures, labelled | 1 bare figure, labelled, **role placeholders for team** |
| Paired: WDE-10 | fires, borrowed nothing | fires, system chromium, over-reports interaction |
| Paired: cost (all 10) | $3.86 | $3.85 |

The two files are the same length and cover the same ground — direction before markup,
≤2 type families, accent under ~10%, no glassmorphism or purple gradients, a final audit
pass. Cost is a wash. What moved are individual lines:

| Behaviour | `high` line | `xhigh` line |
| --- | --- | --- |
| Missing content | *"If content is absent, create a small internally consistent domain dataset"* | *"Do not emit lorem ipsum, 'Acme,' fake testimonials, impossible metrics, or invented claims. When facts are absent, use neutral labels that do not pretend to be facts."* |
| Final audit | *"inspect the rendered interface rather than trusting source code"* | *"View the first screen in grayscale…"*, *"Check at 360px, 768px, and 1440px…"* |

Those are the two cells that flipped. The first is finding 4 in miniature: a
prohibition with an alternative action beats an instruction that invites the failure.
The second is finding 6 inverted — dropping *"rather than trusting source code"* is the
only textual difference plausibly responsible for the browser gate, and the config that
previously always launched now verifies statically instead.

Two honest limits. This is one draft against one draft, so effort and draft are
confounded — a second `high` attempt might land in the same place. And the rewrite was
not uniformly better: WDE-08 got worse, and WDE-06 traded one defect for another.

---

## Findings

**1. Generated skills beat purchased ones on cost, and match them on output.**
Every self-authored skill was cheaper than every installed skill. `authored-opus` ran
*faster than no skill at all* (998 s vs 1090 s) at $1.10 vs $1.21 — it spent fewer turns
deliberating than the unguided baseline. `design-list` at $6.15 and 267 skills produced
nothing the 6 KB Kimi file didn't.

**2. All five authors converged on the same rules, independently.** With no shared
context, every generated skill banned: Inter/`system-ui` as display face, purple→blue
gradients, glassmorphism, the centered-hero-plus-three-cards stack, emoji as icons; and
every one required an accent under ~10% of pixels, ≤2 type families, and a named design
direction committed before markup. That consensus is the clearest evidence for the
original hypothesis — this is knowledge the model already has, and the market is largely
reselling it.

**3. Elaborate mechanisms don't fire; flat prohibitions do.** Opus built a seven-row
direction table with OKLCH triples and a deterministic "index by product name mod 7"
tiebreak to force variety. Zero `oklch()` calls appeared in any output and it used
DM Sans + Manrope on every scenario — the *least* variety of the five. Kimi and Fable
just listed directions plainly and produced the most.

**4. Authors wrote the rule that caused their own failure — and rewriting that one
line fixed it.** Opus: *"plausible names, dates, prices."* Kimi: *"Testimonials get
names, roles, specifics."* Sol, at `high`: *"create a small internally consistent domain
dataset."* All three fabricated attributed customers. What separates the configs that
stay clean is not a stronger prohibition but a prohibition **plus an alternative
action**. Astra: *"do not invent real endorsements, customer logos, awards"* + *"if a
region is weak, enlarge the relevant evidence… or delete the region."*

Sol at `xhigh` independently arrived at the same shape and replaced its own bad line
with *"Do not emit lorem ipsum, 'Acme,' fake testimonials, impossible metrics, or
invented claims. When facts are absent, use neutral labels that do not pretend to be
facts."* Unpaired fabrication went **2/2 → 0/2** with the builder model, prompts and
fixtures untouched — the cleanest single-variable result in the corpus, and the only
direct evidence here that skill wording, not model capability, was the binding
constraint. Its WDE-01 run wrote out *"No verified customer metrics, testimonials,
integrations, compliance claims, or public price points were provided, so the page
intentionally makes none."* Opus, for contrast, banned the literal string `"Trusted by
10,000+ teams"` and then shipped *"Trusted by product teams who never stop asking why"*
over five invented logos.

**5. Pairing fixed dates completely, and nothing else reliably.** All 5 paired configs
derived the weekday from a real clock; unpaired, only 2 of 11 did and 5 typed a wrong
one. Fabrication improved for sol/high (2→0) and Fable (2→1) but worsened for Kimi
(1→2). Cost rose 18–90%.

Re-authored sol shows the date effect from the other side. Unpaired it typed
`WEDNESDAY · SEPTEMBER 9` as a literal — correct, but only because that was the run
date; it read no clock, and the same file is wrong tomorrow. In the same config's WDE-05
run it dated its own sourcing note "Checked: 2026-03-27", nearly six months off.
`paired-sol` wrote the same note, then ran `date -I` and corrected it to 2026-09-09
before finishing. Pairing did not teach it to derive the date so much as to check one.

**6. Adding a skill broke a working config.** `authored-opus` passed the WDE-03
verification gate alone by writing its own static `verify.js`. Paired, it launched
Chromium — the Vercel audit skill pulled it into a browser despite the orchestration
prompt stating the audit is a static code review.

**7. The Vercel skill never ran in `discovered`.** It requires a WebFetch of a GitHub
URL and the traces show zero fetches in all five scenarios. Every `discovered` result is
anthropics `frontend-design` alone. The paired configs use a locally cached copy
(`skillsets/wig-command.md`), which is the first time it actually executed.

**8. Installing a whole repo can beat installing its flagship skill.** `taste-solo`
(the one skill) cost the same as `taste` (all 13), ran 11% slower, loaded no webfonts at
all, and swapped curated Unsplash imagery for `picsum.photos` randoms — it put a
mushroom on a B2B analytics pricing page. The sibling skills changed art direction even
with no image model present.

**9. Skills are good at auditing and bad at abstaining.** The same three configs that
found 9 of 10 planted defects and invented none (WDE-06) all published a stale model id
and per-token pricing as current fact (WDE-08). Re-authoring sol did not dent this: the
rewritten skill closed marketing fabrication completely and made WDE-08 *worse*, adding
four concrete per-token prices where the `high` version had quoted none. Reviewing code they can see is solved;
declining to state a fact they cannot check is not. The skills do carry rules about
invented *proof* — astra's "mark demo data where it could be mistaken for fact… do not
invent real endorsements, customer logos, awards, or performance claims" is the
strongest — but none of the three carries a rule about invented *external* facts: a
model id, a version, a price, a rate limit. The category is simply absent.

**10. The fabrication failure moved rather than closed.** `paired-astra` and
`paired-sol` are clean on marketing social proof (WDE-01/03) *and* on deck metrics
(WDE-09) — the labelled-placeholder habit transferred, and after re-authoring it
transfers to unpaired sol too. Neither transferred it to facts. The split is now sharp
enough to state as a rule: these skills reliably decline to invent **proof** and
reliably invent **facts**. `paired-sol` will leave a whole team slide as unfilled role
placeholders rather than name two people, and on the next scenario print a stale model
id and a per-token price with no hedge on the id at all. `paired-kimi`, clean on
neither, invented two executives with real prior employers — the corpus's most
consequential single fabrication: a fake person attributed to a real company.

**11. The verification gate is real for all three, and only a paired test shows it.**
`paired-kimi` and `paired-astra` gate; `paired-sol` did not, and at `high` it always
launched, which looked like a failed gate in one direction and was actually the absence
of one. At `xhigh` it gates. Any claim that a config "respects the browser gate" still
needs both directions run — a single direction cannot tell gating from a fixed habit
that happens to match.

**12. Authoring effort is not free, and it is not uniform in sign.** Re-authoring the
same brief at `xhigh` instead of `high`, same model, changed five scored cells: unpaired
fabrication 2/2 → 0/2, unpaired date wrong → correct, the WDE-03 browser gate absent →
passing, the WDE-06 derived-figure defect missed → found (while losing the no-JS one),
and WDE-08 from no price claims → four. Cost barely moved ($1.62 → $1.47 unpaired,
$2.05 → $2.08 paired). The two skills are the same length and cover the same ground;
the differences trace to individual lines, not to overall quality — which is consistent
with finding 3. One run per cell, so treat the direction as the result and not the
margin.

### Recommendation

| Use case | Config | Cost |
| --- | --- | --- |
| Comps, pitches, visual exploration | `authored-opus` | $1.10 |
| Anything customer-facing | `paired-astra` **or** `paired-sol` | $1.85 / $2.08 (core) · $3.82 / $3.85 (all 10) |
| One skill, no orchestration | `authored` (sol, xhigh) | $1.47 |

`paired-astra` was the only config clean on fabrication, passing the verification gate
and deriving its dates. Re-authored `paired-sol` now matches it on all three, and on
every extension-set criterion the two are level: both name a direction, both keep deck
figures as labelled targets, both gate and fire correctly. They separate on details that
cut in both directions — sol found the derived-figure defect astra missed and its
acceptance harness needs nothing machine-specific, while astra's harness actually
measures what it claims and sol's over-reports; sol carries an on-surface pricing caveat
astra lacks, but prints four unverified prices to earn it. At n = 1 per cell that is a
tie, so pick on the failure you care about: astra if you want measured acceptance
evidence, sol if you want the run to reproduce on a clean machine.

The genuinely new option is unpaired **`authored`**. At $1.47 it is now clean on
fabrication, cheaper and faster than the `discovered` skills, and cheaper than every
paired config — but it still launches a browser on WDE-03 and does not derive its dates,
so it is the pick only where the orchestration overhead is not worth 40 % more cost.
`authored-opus` remains the best value for throwaway comps and still invents customers.

Three prompt lines close most of the remaining gap for any config, and cost nothing.
The third is the one no skill in the corpus has ever supplied, and re-authoring sol
did not change that — it is still the only unaddressed failure category:

> Never invent statistics, customer names, quotes, logos, pricing, or dates. Use a
> clearly labelled placeholder and record the blocker.
> Do not launch a browser, start a server, or install a test framework unless I
> explicitly ask for a browser acceptance pass.
> Never state a model id, version, price, rate limit or API detail you have not
> verified this session. Flag it on the surface as unconfirmed and record the blocker.

---

## Caveats

- **The extension set is three configs wide.** WDE-06…10 ran only on `paired-kimi`,
  `paired-astra` and `paired-sol`, so they compare those three against each other —
  they say nothing about `base` or the purchased configs. In particular, WDE-06's 9/10
  with zero invented findings may well be the model's own competence rather than the
  skills': a `base` run is needed before crediting the skills for it. Same for the
  unanimous WDE-08 failure.
- **WDE-10's harness is environment-dependent.** `paired-astra` passed by importing
  `playwright-core` out of an unrelated application's `node_modules` on this machine.
  A clean machine has no Playwright, so that result would not reproduce as-is.
- **n = 1 per cell.** 16 configs × 5 scenarios, one run each. Cost figures are exact and
  the cross-scenario patterns (fabrication, dates, browser gate, fonts) are consistent
  enough to act on. Head-to-head quality calls between two good configs are not
  statistically meaningful.
- **The sol re-authoring is one sample of a rewrite, not a measurement of `xhigh`.**
  Re-authoring at `xhigh` produced a different skill, and that skill scored differently.
  Whether the thinking level caused the improvement or a second draft would have done it
  at `high` too is untested — the two runs differ in both effort *and* draft. The
  superseded skill and all 15 of its runs are kept (`skillsets/authored-solhigh/`,
  `runs/authored-solhigh/`, `runs/paired-solhigh/`, `authoring/session-sol-high/`) and
  both configs stay in `run.sh`, so the comparison is auditable and re-runnable. Two
  cheap follow-ups would separate the causes: a second `high` draft, and a second
  `xhigh` draft.
- **Two scoring bugs were fixed during the re-test**, both found by hand-checking a
  verdict that looked wrong. `score.py`'s WDE-08 hedge pattern missed the phrasing
  "Verify current model availability and pricing", reporting an on-surface caveat as
  absent; and its WDE-09 slide count matched `class="slide-no"` page badges, reporting
  the new sol deck as 16 slides when it has 8. Neither fix changes any previously
  reported number for another config — checked by re-scoring all three paired configs
  before and after.
- **One rubric, one model, one harness.** Results may not transfer to a different
  builder model or to Claude Code's skill loading.
- **The orchestration prompt is a confound on WDE-03.** It tells the model the audit is
  static, which is a nudge on the exact gate being measured. Treat paired-config browser
  results as partly attributable to that instruction. It is not sufficient on its own:
  the same prompt failed to stop `paired-opus` and sol/high launching Chromium, so
  the skill text still decides the outcome.
- **Screenshots need a real browser.** `chromium --headless --virtual-time-budget`
  freezes CSS animations mid-fade and produces false contrast failures. All screenshots
  in `shots/` were taken via Playwright (`shoot.js`, which also scrolls each page to
  fire its IntersectionObservers before capturing, so revealed sections are not caught
  at `opacity: 0`). An earlier `wde` "contrast failure" was this artifact, not a defect.
  `shoot.js` borrows `playwright-core` from another application's `node_modules` on this
  machine; on a clean machine it needs `npm i playwright` and the path updated.
- **Screenshots are evidence of rendering, not of correctness.** They are captured from
  static files — the run's own output or its built `dist/` — with no interaction beyond
  a scroll pass and, for decks, arrow-key paging. Nothing in `shots/` demonstrates that
  a form validates, a tab switches, or a focus ring appears; those claims in the tables
  above come from reading the code and the traces. `wde` is the one config whose WDE-04
  run produced no `dist/`, because it shipped a single self-contained HTML file rather
  than a Vite app — its shot is of that file directly.
- **Automated fabrication counting is crude.** It flags any `<blockquote>`, including
  legitimate brand statements. The table above uses a stricter check: a quote plus an
  adjacent capitalised name and a role. Re-authored `paired-sol` on WDE-07 is the clean
  illustration: the scorer counts one quote, and it is *"A good walk leaves room for the
  place to interrupt you"* — unattributed, no name, no role, the invented brand talking
  about itself. Not a fabricated endorsement, and not counted as one.

---

## Layout

```
.local/
├─ README.md              this file
├─ tests.yaml             the 5 scenarios + rubric
├─ prompts/WDE-*.txt      exact prompts handed to the builder (byte-identical per config)
├─ fixtures/              WDE-02 jobs.json, WDE-05 existing site, WDE-06 site + answer key
├─ run.sh                 the runner; CFGS="cfg1 cfg2" [SCENARIOS="WDE-06 …"] ./run.sh
├─ score.py               correctness scoring across configs (auto-detects scenarios)
├─ shoot.js               screenshot capture for shots/ (Playwright + ffmpeg downscale)
├─ stats.py               cost/turn/token accounting → stats-runs.json
├─ trace.py               tool-call trace extractor for a config/scenario
├─ authoring/
│  ├─ prompt.txt          the skill-authoring brief given to all five models
│  ├─ orchestration.txt   3-skill division of labour for paired configs
│  ├─ session/            sol authoring transcript, xhigh (current)
│  └─ session-sol-high/   sol authoring transcript, high (superseded)
├─ skillsets/
│  ├─ authored-{opus,kimi,fable}/  generated skills (committed)
│  ├─ authored{,6}/                sol- and astra-generated skills (committed)
│  ├─ authored-solhigh/            superseded sol skill, authored at high
│  ├─ paired/                      frontend-design + local-guidelines variant
│  └─ wig-command.md               cached Vercel Web Interface Guidelines
├─ runs/<config>/<scenario>/       built artifacts + meta.txt
│                                  incl. authored-solhigh/ and paired-solhigh/,
│                                  the 15 superseded sol cells
└─ shots/<config>/                 Playwright screenshots, one dir per config,
   │                               mirroring runs/ — all 18 configs, 140 files
   ├─ WDE-NN-full.png              the scenario's one image: fullPage at 720px wide
   │                                 (WDE-04 is a mobile prototype, kept at 390px)
   ├─ WDE-09-s1…-s8.png            decks keep every slide at native res, since the
   │                                 slides are the artifact
   ├─ WDE-09-traction.png          slide 5, the scored slide
   └─ fixture/WDE-06{,-nojs}-full.png
                                   WDE-06 produced no page; this is the shared subject
                                     under review, captured with and without JS
```

### Reproducing

```bash
./fetch-skills.sh                          # re-clone third-party skills at pinned commits
CFGS="base authored-opus" ./run.sh         # run selected configs, all 10 scenarios
CFGS="paired-kimi paired-astra paired-sol" \
  SCENARIOS="WDE-06 WDE-07 WDE-08 WDE-09 WDE-10" ./run.sh   # the extension set only
python3 score.py base authored-opus        # correctness table (run from runs/)
python3 stats.py base authored-opus        # cost / turns / tokens (run from runs/)
```

To reproduce the authoring-effort comparison, `authored-solhigh` and `paired-solhigh`
are registered in `run.sh` against the retained `high` skill:

```bash
CFGS="authored authored-solhigh" SCENARIOS="WDE-01 WDE-02 WDE-03 WDE-04 WDE-05" ./run.sh
cd runs && python3 ../score.py authored authored-solhigh paired-sol paired-solhigh
```

Re-authoring itself, for reference:

```bash
pi -p --provider openai-codex --model gpt-5.6-sol --thinking xhigh \
   --no-extensions --no-context-files --no-skills -- "$(cat authoring/prompt.txt)"
```

Screenshots:

```bash
node shoot.js                   # every config x every scenario it ran, into shots/<config>/
node shoot.js paired-sol        # one config
node shoot.js paired-sol WDE-09 # one cell
node shoot.js --fixture         # the shared WDE-06 subject page only
```

Absent cells are skipped, so a config that only ran the core five produces five shots
and no warnings. WDE-06 is skipped for every config — it is a review, not a build.

`score.py` and `stats.py` detect which scenarios a config actually has, so the
thirteen core-only configs and the three extended ones can be scored in one call.

`SKILL-SOURCES.tsv` records every third-party repo and the commit tested.

### Note on what is committed

`.gitignore` excludes 1.4 GB of regenerable material: `node_modules` from the Vite
prototypes (1.2 GB), third-party skill clones (203 MB, restored by `fetch-skills.sh`),
and pi session transcripts. The transcripts hold the full tool-call traces behind the
"browser gate", "which references were read" and "was the acceptance pass real"
findings — **delete the `runs/*/*/.session/` line from `.gitignore` if the team wants
to audit those claims**; it adds ~200 MB.

Tracked content is 28.3 MB (`git ls-files -z | xargs -0 du -cb | tail -1`), of which
`shots/` is 23.2 MB. The history of this figure, since earlier revisions got it wrong in
both directions: 9.0 MB before the extension set, 18.3 MB after it, 20.3 MB after the
sol re-test added the 15 retained `high` cells and both authoring transcripts, then
45.6 MB of screenshots once `shots/` covered all 18 configs instead of 5 — cut to
23.2 MB by keeping one image per scenario.

Screenshots are still 82% of the tree. The remaining lever is deleting
`runs/authored-solhigh/` and `runs/paired-solhigh/` (−2 MB), which costs the
*Authoring effort* comparison; that is not done here, on the assumption that a
benchmark nobody can inspect is worth less than 28 MB of disk.

Scanned for credentials and PII before publishing: clean. One `sk-…` regex hit in a
session file is a coincidental substring inside a base64 blob, not a key.
