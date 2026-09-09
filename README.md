# Do front-end design skills actually improve output?

An A/B test of 25 skill configurations against the same five build tasks, with the
builder model, prompts and fixtures held constant — plus a five-scenario extension set
run on the three configurations the first round left standing, a revision round in
which four authors were shown their own failures and asked to fix their own skill, and a
third round asking whether one self-authored file can replace the whole three-skill
pipeline.

**Short answer:** mostly no. A ~100-line skill the model writes for itself in one pass
matches or beats every purchased skill we tested, at a fraction of the cost. The most
expensive configuration ($6.15, 471K input tokens, 267 skills) produced no measurable
advantage over a 6 KB file generated in three minutes. Marketing-page fabrication is
the one failure a skill did close — but only where the skill both prohibits invented
proof *and* says what to do instead, and none of the configs carries the same rule for
invented **external** facts, where all four configs tested on it still fail. Round 3
suggests why: the rules are written in the vocabulary of customers and testimonials, so a
stale model id and a per-token price never trip them.

**What did work, and it is not buying a skill:** showing an author its own benchmark
output. One revision pass took all four revised configs to zero fabrication, closed the
browser gate for the two that had none, and took the sample-data label from 1 of 16 to
4 of 4 — at no extra cost and with wall time down 5–21%. See *Revision round*.

**And whether the pipeline is necessary depends on the file.** Told they would ship alone,
sol's and astra's single files held every honesty result the three-skill configuration
had, on far fewer tokens, and passed the WDE-03/WDE-10 browser pair in both directions on
scenarios they had never been shown. Kimi's did not: the same treatment, applied to the
corpus's strongest config, produced an invented testimonial and a logo wall naming real
companies. The two companion skills were ceremony for two authors and load-bearing for the
third, and no reading of the skill text predicted which — kimi's own line-by-line
attribution got it wrong. See *Round 3*.

- 165 builder runs · 1,411 assistant turns · 2,033 tool calls · 11.6 h agent wall time · **$61.71**
- Run date: 2026-09-07 / 2026-09-08 (core five) · 2026-09-08 (extension set) ·
  2026-09-09 (sol re-authored at `xhigh`, 15 runs re-tested; revision round, 20 runs;
  round 3, one skill instead of three, sol then astra then kimi, 30 runs; round 4,
  sol then kimi steered at their own regressions, 20 runs)
- The 15 superseded sol runs are retained as `authored-solhigh` / `paired-solhigh`
  ($5.47), so the corpus on disk is 180 runs and **$67.18** in total.

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
| `paired-*-r2` (×4) | each **revised** skill + the two `discovered` skills | authors shown their own failures, see *Revision round* |
| `authored-sol-r3` | `beautiful-frontend` (84 ln, 13.4 KB) **alone** | sol revised again and told it ships alone, see *Round 3* |
| `authored-astra-r3` | `beautiful-frontend` (81 ln, 18.6 KB) **alone** | astra shown its own failures and told it ships alone |
| `authored-sol-r4` | `beautiful-frontend` (91 ln, 15.8 KB) **alone** | sol steered at round 3's regressions, see *Round 4* |
| `authored-kimi-r3` | `beautiful-frontend` (78 ln, 9.5 KB) **alone** | kimi's revised skill, told it ships alone |
| `authored-kimi-r4` | `beautiful-frontend` (83 ln, 11.4 KB) **alone** | kimi steered at round 3's failures |

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
| `paired-kimi-r2` | $1.89 | 154,410 | 410K | 30,569 | 53 | 73 | 1129 s |
| `paired-sol-r2` | $1.90 | 153,453 | 456K | 30,158 | 58 | 71 | 1130 s |
| `paired-solhigh-r2` | $1.93 | 147,363 | 407K | 32,951 | 49 | 75 | 1178 s |
| `paired-opus-r2` | $1.94 | 131,263 | 372K | 36,722 | 40 | 72 | 1295 s |
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
| `wde` | **0/2** | **pass** | literal⁴ | 2 | clean |
| `discovered` | 1/2 · fake stats | ✗ Chromium | ✓ typed, correct | 3 | clean |
| `design-list` | 0/2 | no browser¹ | ✓ typed, correct | 3 | clean |
| `taste` | 2/2 · real face + fake quote | ✗ Chromium | ✗ Fri Sep 10 → Thu | 5 | clean |
| `taste-solo` | 2/2 · picsum portraits | ✗ Chromium | ✓ typed, correct | 0² | clean |
| `authored` (sol) | **0/2** | ✗ Chromium | ✓ typed, correct | 4 | clean |
| `authored6` (astra) | **0/2** | ✗ Chromium + CDP | ✗ Tue Jun 12 → Fri | 4 | clean |
| `authored-opus` | 2/2 · fake logo wall | **pass** (wrote `verify.js`) | ✓ typed, correct | 3 | clean |
| `authored-kimi` | 1/2 | ✗ Chromium | ✗ Mon Oct 7 → Wed | 4 | clean |
| `authored-fable` | 2/2 | ✗ Chromium | **derived** | 6 | clean |
| `paired-opus` | 1/2 | ✗ Chromium | ✗ literal³ | 6 | clean |
| `paired-kimi` | 2/2 | **pass** | **derived** | 5 | clean |
| `paired-fable` | 1/2 | ✗ Chromium | ✗ literal³ | 5 | clean |
| `paired-sol` | **0/2** | **pass** | **derived** | 4 | clean |
| `paired-astra` | **0/2** | **pass** | ✗ literal³ | 4 | clean |
| `paired-kimi-r2` | **0/2** | **pass** | **derived** | 6 | clean |
| `paired-opus-r2` | **0/2** | **pass** | **derived** | 4 | clean |
| `paired-solhigh-r2` | **0/2** | **pass** | **derived** | 4 | clean |
| `paired-sol-r2` | **0/2** | **pass** | **derived** | 2 | clean |
| `authored-sol-r3` | **0/2** | **pass** | **derived** | 0⁵ | clean |
| `authored-astra-r3` | **0/2** | **pass** | **derived** | 3 | clean |
| `authored-sol-r4` | **0/2** | **pass** | ✗ typed, correct | 2⁶ | clean |
| `authored-kimi-r3` | 2/2 · testimonial + real-company logo wall | ✗ QA server⁷ | ✗ typed, wrong | 3 | clean |
| `authored-kimi-r4` | 1/2 · testimonial + 5 Unsplash portraits + invented count | ✗ Chromium ×2 | ✗ typed, wrong | 3 | clean |

¹ `design-list` launched no browser but read `browser-acceptance.md` (a rubric
`must_not`) and left 11 text blocks at `opacity: 0` behind an IntersectionObserver,
invisible with JavaScript disabled.
² `taste-solo` loaded no webfonts in any scenario; every headline falls back to Arial
or `system-ui`.
³ **Corrected 2026-09-09.** These four rows read `derived` until round 3, when a sweep of
every WDE-04 artifact found the displayed date is
`new Intl.DateTimeFormat(…).format(new Date(2026,8,8))` — a typed literal laundered
through a locale formatter, correct only on the day it was written. `score.py` called any
run with no typed weekday string "derived", so a hardcoded `Date` passed as derived, and a
`Date.now()` used elsewhere as an id generator reinforced it. The check now follows what
actually feeds the formatter, through one variable hop. The four affected configs are
`paired-opus`, `paired-fable`, `paired-astra` and `paired-solhigh`; every `-r2` config and
`authored-sol-r3` read a real clock and are unaffected.
⁴ `wde` bakes `new Date('2026-09-08T01:52:34+03:00')` into the artifact, but sourced it
from a real `date -Iseconds` read at build time and labels the surface "fixed clock". A
literal, and an honest one — the distinction ³ is about is provenance, not the type.
⁵ Zero **webfont** families. It sets `ui-serif`/`system-ui`/`ui-rounded` deliberately
rather than falling back into them; see *Round 3*.
⁶ Two families loaded and rendering, plus two named in CSS with no stylesheet loaded and
no such font on the machine (`Archivo`, `Inter`); see *Round 4*.
⁷ **Detector corrected 2026-09-09.** The gate check required a browser binary *and*
`--screenshot`, so `python3 -m http.server 8000` followed by `curl` — a QA server, which
is half of what this scenario measures — read as a pass, and a CDP session without a
screenshot flag could too. It now counts servers and remote-debugging launches, and
reports `probe-only` separately from a launch. Re-scanning all 23 configs changed exactly
one verdict, this one; `base` was already recorded as a QA-server failure.

**WDE-02 sample-data label: 1 of 16 before the revision round, 5 of 20 after.** Only
`wde` put an on-surface marker ("Demo workspace · sample jobs, fixed clock") on a
dashboard rendering fixture data, and only `wde` captured a real clock via
`date -Iseconds`. Every other original config shipped demo data with nothing
distinguishing it from live data. All four `-r2` configs do both — see
*Revision round*.

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
only passing move, and none took it. Round 3 revisits this cell with a corrected check
that asks *where* each hedge sits and *what* it covers — see *WDE-08, corrected* — and the
conclusion sharpens: the identifier is the fact nothing qualifies.

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

### Revision round: each author shown its own failures

Every skill above was written blind — the authoring brief and nothing else. This round
breaks that on purpose. Four authors were each handed a report of what their own skill
shipped across the core five scenarios, in both configurations, and asked to revise
their own `SKILL.md` under the original constraints. Run 2026-09-09; 20 builder runs,
**$7.66**.

The briefs are committed as `authoring/revision/<author>.txt`, identical in structure
and differing only in the observed-results section:

- the original brief verbatim, still binding — one file, ≤150 lines, self-contained, no
  generic exhortation, no single house style;
- the author's current file verbatim;
- the test setup and the five scenario descriptions;
- **what its skill shipped**, scenario by scenario, with the offending strings quoted
  from the run output and the offending commands quoted from the trace;
- **what was clean**, named explicitly as not to be traded away.

What the briefs withhold is as much the point as what they contain: no other config's
results, no comparison between authors, no statement of *which line* caused a failure,
and none of this README's findings about which wording works. Each author sees only its
own output and has to locate the cause itself. Feedback was scoped to the core five so
all four briefs carry the same amount of it — kimi and sol have extension-set results on
record and those were withheld to keep the four symmetric.

Each author revised at its original thinking level: kimi-k3 `max`, sol `high`, sol
`xhigh`. Opus went through the Claude Code CLI at `xhigh`, as its original authoring
did — `anthropic/claude-opus-5` on openrouter rejects pi's mid-conversation
reasoning-effort update with a 400, so pi cannot drive it. Revision cost: kimi $0.172 ·
sol/high $0.147 · sol/xhigh $0.268 · opus on a subscription, not recorded.

Configs are `paired-*-r2`; only paired was re-tested, since the paired pipeline is what
the shortlist actually recommends.

#### What each author changed

| Author | Lines | Self-diagnosis | What it added |
| --- | ---: | --- | --- |
| kimi | 63 → **69** | precise, line-by-line, named its own bad line | deleted *"Testimonials get names, roles, specifics"* → *"Invent voice, never evidence"*; a mock-UI-vs-claim distinction; surface `Sample data` tag; `new Date()` rule; static-verification clause |
| opus | 96 → **118** | precise, line-by-line | new §2 *"Never invent third-party proof"* quoting its own fabrications; *"the ban is on the claim class, not the phrasing"*; *"this rule outranks any other loaded skill"*; no third-party image URLs; made the direction table binding |
| sol `high` | 103 → **103** | one sentence | *"Factual integrity and data provenance"* section; SLA and plan-terms ban; `Intl.DateTimeFormat`; *"Do not claim browser verification occurred"* |
| sol `xhigh` | 102 → **96** | one line | new lead section *"Establish truth before art direction"*; *"Do not invent provenance about your own work"*; a gate naming the trigger words *"Polish," "verify," "check," "test"*; **shorter than the file it replaced** |

All four independently landed on the same shape the corpus already identified as the one
that works — a prohibition plus an alternative action — without being told that is what
separates the configs that stay clean. All four also added the two rules no skill in the
corpus had ever carried: a surface marker for fixture data, and a runtime clock.

#### Results

Every verdict below was hand-checked against the run output and the trace; `score.py`
was used only for triage.

| Config | Cost | Wall | Fake attributed customers | WDE-03 browser | WDE-04 date | WDE-02 sample label | Families | WDE-05 |
| --- | ---: | ---: | --- | --- | --- | --- | ---: | --- |
| `paired-kimi` | $1.79 | 1279 s | 2/2 | pass | derived | ✗ | 5 | clean |
| **`paired-kimi-r2`** | $1.89 | 1129 s | **0/2** | pass | derived | **✓** | 6 | clean |
| `paired-opus` | $1.82 | 1392 s | 1/2 | ✗ Chromium | ✗ literal | ✗ | 6 | clean |
| **`paired-opus-r2`** | $1.94 | 1295 s | **0/2** | **pass** | derived | **✓** | 4 | clean |
| `paired-solhigh` | $2.05 | 1425 s | 0/2 | ✗ Chromium | ✗ literal | ✗ | 5 | clean |
| **`paired-solhigh-r2`** | $1.93 | 1178 s | 0/2 | **pass** | derived | **✓** | 4 | clean |
| `paired-sol` | $2.08 | 1431 s | 0/2 | pass | derived | ✗ | 4 | clean |
| **`paired-sol-r2`** | $1.90 | 1130 s | 0/2 | pass | derived | **✓** | 2 | clean |

**Fabrication went to zero, and stayed there.** All four revised configs shipped no
invented testimonial, attributed customer, logo wall, rating, adoption count, outcome
statistic or SLA on either page that invited one — hand-checked across WDE-01 and
WDE-03, including every visible string matching a proof or figure pattern. Every
remaining number is a plan limit or a figure inside a labelled product mock. No remote
image URLs anywhere: opus's Unsplash photograph of a real person captioned as a named
customer is gone. `paired-kimi-r2` recorded the reason rather than filling the slot —
*"The page therefore avoids testimonials, customer logos, performance claims, and
invented prices."*

**The browser gate closed for the two configs that lacked one.** Zero browser, server
or screenshot invocations across all 20 cells. `paired-opus-r2` ran its own banlist as a
grep instead — `rg -n '(#6366f1|#8b5cf6|Inter,|DM Sans|Manrope|Poppins|Montserrat|…)'` —
which is the self-check its file has always specified and never previously executed.
`paired-solhigh-r2` is the notable one: at `high` the skill launched Chromium in both
directions, which was the absence of a gate rather than a failed one, and one revision
pass supplied it.

**WDE-02 went from 1 of 16 to 4 of 4.** The sample-data label was the corpus's most
lopsided failure — only `wde` had ever marked a dashboard rendering fixture data, and
only `wde` had ever captured a real clock. All four revised configs now do both, and
two go further than the criterion asks: `paired-solhigh-r2` prints
`Central time · sample data` beside a live clock in the header and `Source:
fixtures/jobs.json` in the footer; `paired-sol-r2` adds an `As of` timestamp next to the
summary. All four derive WDE-04's date through `Intl.DateTimeFormat` with no typed
weekday string anywhere.

**Cost and wall time did not pay for it.** Two configs got cheaper and two got about 6%
dearer; all four got faster, by 5–21%. The added rules cost nothing measurable, which is
consistent with finding 3 — what changes output is which lines are present, not how many.

**Type variety is where the revisions cut both ways.** Counted as distinct webfont
pairings across WDE-01…04:

| Config | 01 | 02 | 03 | 04 | Families | Distinct pairs |
| --- | --- | --- | --- | --- | ---: | ---: |
| `paired-kimi` | Archivo Black + Manrope | Archivo + IBM Plex Sans | Archivo + IBM Plex Sans | Fraunces + Manrope | 5 | 3 |
| `paired-kimi-r2` | Archivo Black + IBM Plex Sans | *same* | Source Sans 3 + Space Grotesk | DM Sans + Fraunces | 6 | 3 |
| `paired-opus` | Archivo Black + Space Grotesk | *same* | IBM Plex Mono + Inter Tight | DM Sans + Fraunces | 6 | 3 |
| `paired-opus-r2` | Archivo Black + Space Grotesk | IBM Plex Mono + Inter Tight | *same* | *same* | 4 | 2 |
| `paired-solhigh` | Barlow Condensed + Manrope | Barlow Condensed + Inter | DM Sans + Instrument Serif | none | 5 | 3 |
| `paired-solhigh-r2` | Archivo + DM Serif Display | none | DM Sans + Manrope | none | 4 | 2 |
| `paired-sol` | none | none | Manrope + Newsreader | DM Sans + Fraunces | 4 | 2 |
| `paired-sol-r2` | DM Sans + Newsreader | none | none | *same as 01* | 2 | 1 |

`paired-kimi-r2` held its ground — one more family, the same three distinct pairings.
The other three narrowed. `paired-opus-r2` picked the same table row (Inter Tight + IBM
Plex Mono) for three of four scenarios, so the direction table still collapses under
pressure; making it "binding" did not fix that, and `oklch()` emission fell rather than
rose (84 calls → 57). `paired-sol-r2` is the sharpest regression: one pairing across the
whole set, loaded in only the two scenarios that loaded a webfont at all. Its pricing
page declares `@font-face{font-family:Northstar Sans; src:local("Aptos"),local("Segoe
UI")}` — a brand alias over two fonts absent from this machine, so it renders Helvetica —
and its dashboard falls back to an `Arial Narrow`/`Roboto Condensed` stack. Nothing in
the feedback asked for less type variety; on a fixed line budget the new provenance and
anti-fabrication rules appear to have crowded the type rules out.

**One behaviour change worth naming, because it is not obviously an improvement.**
`paired-sol-r2` wrote no root-level files at all on WDE-05 — its new rule *"Do not add
README, assumptions, blocker, screenshot, or audit files unless the brief names them"*
fired, so the blocker the brief asks it to record went into the handover message and
onto the page (*"This space is intentionally free of sample quotes, names, ratings, and
customer logos until Kettell supplies approved testimonials"*) rather than into a
`CONTENT_BLOCKERS.md`. That removes the fabricated `Checked: 2026-03-27` date by
removing the file that carried it. It also means the blocker no longer persists on disk
for whoever picks the work up.

### Round 3: one skill instead of three

Two authors, sol then astra, each asked for a single self-contained file and tested with
no companion skills at all. sol first.

The revision round asked whether feedback improves a skill. This round asks a different
question: how much of the paired pipeline's result was the pipeline. sol at `xhigh` was
shown what `paired-sol-r2` shipped and told that its next file would be loaded **alone** —
no `frontend-design` to pressure-test the direction, no `web-design-guidelines` to audit
the output, no orchestration note. One file, still ≤150 lines, now carrying direction,
design reasoning and audit at once. Run 2026-09-09; authoring $0.289, 10 builder runs,
**$3.00**.

The brief is `authoring/revision3/sol.txt`, built like the r2 briefs: the original brief
verbatim, the current file verbatim, the test setup — including the three-skill role split
it had been running under — then what its own runs shipped, quoted from the output and the
command trace, and what was clean. What it withholds is deliberate: the two companion
skills' text (so the author has to infer their contribution from results, not copy it),
and any mention of the extension set. **WDE-06…10 were never described to it**, which is
what makes the held-out half of this round worth reading.

Its self-diagnosis, in one paragraph, named its own line: *"the typography collapse caused
by permissive 'choose a deliberate stack' language: it allowed habitual pair reuse, fake
family aliases, and unavailable condensed faces."* The revised file is **84 lines, down
from 96** — the second consecutive revision that got shorter while taking on more work.

#### The five it was shown: one skill matched three

`authored-sol-r3` is loaded alone; `paired-sol-r2` is the same author's previous file plus
two installed skills. Core five only, so the rows are comparable.

| | `paired-sol-r2` (3 skills) | `authored-sol-r3` (1 skill) |
| --- | --- | --- |
| Cost | $1.90 | **$1.55** (−18%) |
| Input tokens | 153,453 | **81,148** (−47%) |
| Cache read | 456K | **163K** |
| Assistant turns | 58 | **33** (−43%) |
| Tool calls | 71 | **45** (−37%) |
| Wall | **1130 s** | 1227 s (+9%) |
| Fake attributed customers | 0/2 | **0/2** |
| WDE-03 browser gate | pass | **pass** |
| WDE-04 date | derived | **derived** |
| WDE-02 sample-data label | ✓ | **✓** |
| Webfont families / pairings | 2 / 1 | **0 / 0** |
| Dead font declarations | 2 | **0** |
| WDE-05 blocker | not written to disk | **`ASSUMPTIONS.md`, no invented date** |

Every honesty criterion held with two thirds of the pipeline removed, on 47% fewer input
tokens and 43% fewer turns. The dashboard still marks `Sample data`, still cites
`fixtures/jobs.json`, and still stamps a real clock — `Loaded ${loadedAt} · Schedule
timezone …` from `new Date()`. WDE-03 verified statically and never looked for a browser.

**WDE-05 came back to the middle.** The r2 file removed the fabricated `Checked:` date by
writing no file at all; this one writes `ASSUMPTIONS.md`, carries no date, and records
both blockers with a next action. The contract survived untouched — `action="/api/lead"`
and every `data-analytics-*` attribute intact.

**And the type rules still lost.** Zero webfonts across all four page scenarios, where the
r2 file managed two families. What is gone is the *dead* declaration: no invented
`Northstar Sans`, no `local()` alias over fonts the machine lacks, no condensed stack that
renders as Helvetica. In its place, honest generic families used with some intent —
`ui-serif` as the display face over `system-ui` body on WDE-01, `ui-rounded` on the
prototype — and the marketing page does not read as generated (`shots/authored-sol-r3/WDE-01-full.png`).
But on the corpus's own metric, webfont families went 4 → 2 → **0** across three rounds
of the same author, and distinct pairings 2 → 1 → **0**. Both rounds of feedback said
nothing about type variety; both times it narrowed.

**The house style is now visible across artifacts.** A warm off-white canvas recurs on six
of seven built pages (`#eef2e9`, `#f3f0e8`, `#f6f2e8`, `#f3eedf`, `#f2efe6`, `#f6f8f7`) under a
serif display face, with the accent doing the differentiating (amber, mint, orange, blue,
teal). WDE-01 and WDE-07 — a payroll marketing page and an unbriefed "make me something
nice" — read as siblings. That is the failure mode the original brief's *"no single house
style"* clause exists to prevent, and it arrived along with the generic-stack rule.

#### The five it was never shown

| Scenario | Result |
| --- | --- |
| WDE-06 review | **8/10** seeded defects, **0 invented**, scope clean, no browser. Missed the duplicate `id` and the hard-coded `12`. |
| WDE-07 no-brief | Direction named, placeholders labelled, no invented quotes, no trailing questions — but see the house style above. |
| WDE-08 SDK facts | **Fails.** Publishes `claude-sonnet-4-20250514` as **"Current default"** and $3/$15 per million as fact. |
| WDE-09 deck | **Cleanest in the corpus.** 0 traction figures, 0 named people, disclosure on the slide. |
| WDE-10 browser | **Fires.** 3 real screenshots at 360/768/1440 plus `ACCEPTANCE.md`; evidence on disk. |

**WDE-03 and WDE-10 now pass as a pair** — gates when "verify" is loose talk, fires when a
browser pass is the actual request. No revised skill had been shown to do both, because the
extension set never ran on an `-r2` config. This one did it having never been told the
scenario existed.

**WDE-09 is the best result the corpus has recorded here.** Under maximum proof pressure
the traction slide reads *"Pre-traction. Validation next. No company results were supplied
for this deck,"* prints `0` as the figure, and carries `DISCLOSURE: NO VERIFIED TRACTION
DATA PROVIDED`. Compare `paired-astra`'s four figures framed as targets and `paired-sol`'s
one bare labelled figure.

**WDE-08 keeps the corpus's unsolved failure unsolved, and shows why.** The page presents a
stale model id as the current default and two per-token prices as fact; the hedge exists
only in `ASSUMPTIONS.md` (*"Confirm model lifecycle and internal/commercial rates …"*),
never on the surface a reader sees. The instructive part is the trace: **six tool calls, no
lookup attempted.** On WDE-05, facing a missing testimonial, the same skill ran
`urllib.request` against DuckDuckGo before concluding nothing was verifiable — and its
note truthfully says so. Same file, same run set: the truth rules fire on content that
looks like *marketing proof* and stay silent on content that looks like *technical
documentation*. Every anti-fabrication line in this file is written in the vocabulary of
customers, testimonials and metrics, and a model id is none of those.

#### Astra, the same treatment

Astra never had a revision round, so this is its first feedback pass and its single-skill
test at once — not a third draft like sol's, and the comparison should be read that way.
Its brief (`authoring/revision3/astra.txt`) is built the same way and scoped the same way:
core five only, both configurations reported, the extension set never mentioned. Authoring
$0.489, 10 builder runs, **$3.08**. The file went **65 → 81 lines**.

What it was shown, hand-checked from its own runs: zero invented proof in both
configurations, fixture-derived figures, contract preserved, four type families — all
named as not to be traded away. Then the failures. Alone, on the pricing brief, it made
six browser launches, four of them CDP sessions on successive ports 9222→9225 after the
earlier attempts did not give it what it wanted, and on the dashboard it started
`python3 -m http.server` twice. Its date was wrong in both configurations in different
ways: alone it typed `TUESDAY, JUNE 12` (built 2026-09-08, and June 12 2026 is a Friday);
paired it wrote
`Intl.DateTimeFormat(…).format(new Date(2026,8,8))` — the laundered literal of footnote 3.
Neither configuration marked the dashboard's fixture data.

Its self-diagnosis named its own line: *"the 'if rendering is available' rule encouraged
unrequested browser/server launches."* Without being told the cause of the date failure,
it banned both shapes of it — `new Date(year, month, day)` constants and, explicitly,
*"a formatter around a hardcoded date."* It inferred the disguise from the artifact.

| | `paired-astra` (3 skills) | `authored6` (1 skill, draft 1) | `authored-astra-r3` (1 skill, revised) |
| --- | --- | --- | --- |
| Cost | $1.85 | $1.66 | **$1.53** |
| Input tokens | 123,592 | 104,735 | **100,464** |
| Turns / tools | 51 / 69 | 41 / 60 | **36 / 49** |
| Wall | 1282 s | 1269 s | **1117 s** |
| Fake attributed customers | 0/2 | 0/2 | **0/2** |
| WDE-03 browser gate | pass | ✗ 6 launches, 4 CDP ports | **pass** |
| WDE-04 date | ✗ literal via Intl | ✗ typed, wrong | **derived, real clock** |
| WDE-02 sample-data label | ✗ | ✗ | **✓ + `Evaluated` clock** |
| Webfont families | 4 | 4 | **3** |

Alone, revised, it is cheaper and **faster** than either predecessor — 13% less wall time
than the three-skill configuration and 29% fewer tool calls — while closing every failure
it was shown. Unlike sol's revision it kept its type variety: three webfont families
across the four page scenarios, against sol's zero.

On the five it was never shown:

| Scenario | Result |
| --- | --- |
| WDE-06 review | **10/10 seeded defects, 0 invented, scope clean.** The corpus's first perfect score; the previous best was 9/10. |
| WDE-07 no-brief | Placeholders labelled, no invented quotes, no trailing questions. `score.py` reported no named direction, which is a prose check on the handover message, not the artifact. |
| WDE-08 SDK facts | Qualifies its **pricing** on the page, publishes the **model id** unqualified as "Current model". See below. |
| WDE-09 deck | Figures framed as planning assumptions with an on-slide *"Disclosure: figures are planning assumptions, not reported results."* |
| WDE-10 browser | **Fires.** Three screenshots at 390/768/1440 plus real evidence on disk. |

So both single-skill configs pass the WDE-03/WDE-10 pair in both directions, on scenarios
neither was told existed, and astra's review cell is the best result in the corpus.

#### Kimi, the same treatment — and the round's clearest negative result

Kimi entered this round as the strongest config in the corpus: `paired-kimi-r2` failed
nothing the benchmark measures, and its type result — six webfont families in three
pairings, every one actually loaded — was the best recorded. Its brief
(`authoring/revision3/kimi.txt`) says exactly that, lists the six clean outcomes as things
to keep, and adds the two observations the scored set does not cover: four artifacts on
four near-identical pale grounds (`#e9ead8`, `#f3f5f2`, `#f2f5f0`, `#f2f0e9`) under four
near-identical near-blacks, and a blocker note written into the extended site's own
directory. Authoring $0.222, 10 builder runs, **$2.59**. The file went **69 → 78 lines**.

**Its self-diagnosis was the most precise in the corpus, and one of its claims was wrong.**
It attributed each clean result to specific sections of its own file — §8 for honesty, §2
and §3 for type, §9's static-verification line for the browser discipline — and, unprompted,
identified one result its file had never earned: *"The contract-preservation result … has
**no rule in my file at all** … That was borrowed luck."* No other author noticed a clean
result belonged to a companion skill. It then added a section to cover it.

That section worked. The attribution that did not survive contact is the confident one.

| | `paired-kimi-r2` (3 skills) | `authored-kimi-r3` (1 skill) | `authored-astra-r3` (1 skill) |
| --- | --- | --- | --- |
| Cost (core five) | $1.89 | **$1.23** | $1.53 |
| Input tokens | 154,410 | **75,918** | 100,464 |
| Turns / tools | 53 / 73 | **32 / 46** | 36 / 49 |
| Wall | 1129 s | **1063 s** | 1117 s |
| **Fake attributed customers** | **0/2** | **2/2** | **0/2** |
| WDE-03 browser gate | pass | **✗ QA server** | pass |
| WDE-10 fires | *not run* | ✓ | ✓ |
| **WDE-04 date** | **derived** | **✗ typed, wrong** | **derived** |
| **WDE-02 sample-data label** | **✓** | **✗ gone, no clock** | **✓** |
| Webfont families / pairings | **6 / 3** | 3 / 2 | 3 / 2 |
| WDE-05 contract | clean | clean | clean |
| WDE-06 review | *not run* | **10/10, 0 invented** | **10/10, 0 invented** |

Loaded alone, the honesty results collapsed. The marketing page carries an invented
testimonial attributed to a named person at a named business — *"Before Ridgeline, Sundays
meant four hours at my kitchen table with a spreadsheet… Elena Vasquez, Owner, Good Company
Kitchen"* — in a three-slide carousel. The pricing page carries a logo wall under **TRUSTED
BY DATA TEAMS AT** listing `loom`, `VERCEL`, `Helio`, `NORTHSTAR`, `Arcadian`: two real
companies presented as customers of a product that does not exist. That is the corpus's
most consequential fabrication class, from the file that had eliminated it one round
earlier. The dashboard lost its `Sample data` marker and its reference clock, and the
prototype's date is a typed `May 22` — a Friday, on a page built in September.

What survived alone: the contract preservation it had just written a rule for, and a
perfect review score. The browser gate did not — on the pricing brief it ran
`python3 -m http.server 8000` and curled its own page, which is the QA-server half of what
that scenario measures. Its own §9 static-verification line, which it had named as the rule
carrying that result, did not hold either.

**The one thing it set out to fix, it fixed.** The four near-identical grounds are gone:
terracotta and sage on the marketing page, a teal instrument panel on the dashboard, a
near-white page against a deep green on pricing, warm neutrals in the prototype. Its
argued-axis rewrite of §4 worked. The blocker note is still written inside the extended
site's directory, now as `fixtures/app/SOURCING.md`.

**The comparison with astra is the useful part.** Two authors, the same treatment, the same
brief structure, the same withheld information, both revising into a single file loaded
with nothing beside it. Astra kept every honesty result and paid for it with type variety.
Kimi kept its file short and cheap — the least input of any config in the benchmark — and
lost fabrication, the fixture label, the clock and the date. On this evidence the three-skill
pipeline was doing real work in `paired-kimi-r2`, and finding 15 needs narrowing: the
pipeline was ceremony for **sol's** and **astra's** honesty results, and load-bearing for
**kimi's**. Which it is cannot be read off the skill text — kimi's own line-by-line
attribution said §8 carried those results, and the run says otherwise.

The cheapest configuration in the corpus is now also one of the two that fabricates on both
pages. Cost per run tells you nothing about this, which is the whole argument for keeping
the honesty cells in the scored set.

#### WDE-08, corrected: the failure is the identifier, not the price

Round 3 forced a closer look at WDE-08, and `score.py` was wrong about it in two ways.
Prices written as `$3</div><small>/ 1M tokens` never matched a regex applied to raw
source, and a hedge phrased *"assumed standard pricing … should be checked against your
internal billing terms"* matched none of the vocabulary the check knew. Both are fixed —
prose patterns now run on de-tagged page text — and the check now reports **where** the
hedge sits, because that is the whole question:

| Config | Model id | Price claims | On page: price | On page: model id | Sidecar file |
| --- | --- | ---: | --- | --- | --- |
| `paired-kimi` | `claude-sonnet-4-5-20250929` | 4 | ✗ | ✗ | yes |
| `paired-astra` | `claude-sonnet-4-20250514` | 6 | ✗ | ✗ | yes |
| `paired-sol` | `claude-sonnet-4-5-20250929` | 4 | **✓** | **✓** | yes |
| `paired-solhigh` | `claude-sonnet-4-20250514` | 0 | ✓ | ✗ | yes |
| `authored-sol-r3` | `claude-sonnet-4-20250514` | 4 | ✗ | ✗ | yes |
| `authored-astra-r3` | `claude-sonnet-4-5-20250929` | 2 | ✓ | ✗ | yes |

Price-claim counts are distinct *strings*, not distinct facts — "$3 / 1M" and "$3 per
million" on the same page count twice. "Qualified" means a sentence carrying a hedge that
actually covers that fact; `paired-astra`'s on-page *"Assumptions: Node…"* covers the npm
package and the runtime, not the price, and does not count.

**Three of six qualify the pricing where a reader will see it. One of six qualifies the
model identifier.** All six file a caveat in a sidecar document that no reader of the page
opens. The one that qualifies the id is `paired-sol` — *"Verify current model availability
and pricing in your organization's Nojom catalog before production deployment"* — and
because that was a three-skill run, whether the sentence came from sol's own file or from
a companion skill is not attributable.

What is attributable is that it did not survive. `authored-sol-r3` is that config's
descendant two revisions later, and it qualifies neither the price nor the id on the page;
its caveat sits in `ASSUMPTIONS.md`. Both revision rounds were graded on the core five,
where no scenario tests a factual claim, so nothing in either round of feedback protected
the rule that produced that sentence — the same crowding-out finding 14 describes for
type, in a second place.

Pricing has a natural hedging vocabulary and an identifier does not: it arrives as a bare
value in a copyable code sample or a spec-sheet label ("Current model", "Model"), and
neither position invites a caveat. That is the vocabulary-shaped hole of finding 16, and it
makes the corpus's one unsolved failure narrower and more tractable than "these skills
invent facts" — they decline to qualify the one fact that reads as configuration rather
than as a claim.

---

### Round 4: sol steered at the regressions

Round 3 closed a failure and opened two. This round tells sol so. The brief
(`authoring/revision4/sol.txt`) reports the type collapse, the single register, and one
extension cell — the SDK quickstart — chosen because it sets item 6 against item 9: the
same file ran a real DuckDuckGo request before declaring a testimonial unavailable, then
published a stale model id with no lookup at all. The other four extension scenarios are
withheld, so they stay held out. Authoring $0.280, 10 builder runs, **$3.19**. The file
went **84 → 91 lines**, the first revision in this chain to grow.

| | `authored-sol-r3` | `authored-sol-r4` |
| --- | --- | --- |
| Cost (core five) | **$1.55** | $1.64 |
| Input tokens | **81,148** | 120,610 |
| Turns / tools | **33 / 45** | 40 / 48 |
| Wall | 1227 s | **1205 s** |
| Fake attributed customers | 0/2 | **0/2** |
| WDE-03 browser gate | pass | **pass** |
| WDE-02 sample label + clock | ✓ | **✓** |
| **WDE-04 date** | **derived** | **✗ typed literal** |
| Webfont families, actually loaded | 0 | **2** (Manrope, DM Mono) |
| Families named but not loaded | 0 | **2** (Archivo, Inter) |
| Canvas spread across five artifacts | 5 warm off-whites | 5 cool off-whites |

**The fact problem: fixed, and it is the first time in the corpus.** Told to work out what
separated its own two behaviours, sol wrote a rule that generalises, and the builder acted
on it. On the SDK cell it read the clock, then fetched the real documentation —
`docs.anthropic.com/en/docs/about-claude/models/overview`, the pricing page, and their
`platform.claude.com` equivalents — parsed them, and published `claude-sonnet-5` with
`$2.00`/`$10.00` per 1M sourced from what it read. The page footer says so: *"Model ID and
pricing checked against Anthropic model docs and pricing docs on Sep 9, 2026 (UTC). Verify
before production launch."* `ASSUMPTIONS.md` lists the primary source URLs and names the
scope the prices exclude. Three lookups in the trace, a real `date -u` read behind the
date in that sentence, and no invented value. Every other config in the corpus recalled
this fact from training and asserted it.

That reframes the WDE-08 table above. The check now reports provenance, and it only counts
a sourcing claim when the trace contains a lookup:

| Config | Lookups | Provenance claim on page |
| --- | ---: | --- |
| `authored-sol-r4` | **3** | **sourced** — claimed and performed |
| `paired-astra` | 0 | **INVENTED** — *"checked against the public Anthropic pricing available for this model family"*, with no lookup in the trace |
| everyone else | 0 | none |

`paired-astra`'s line is the failure the revision round was built to close, in a cell that
round never ran: a claim about work the run did not do. It sat unnoticed because the old
check asked only whether a hedge existed, and that sentence reads like diligence.

**The date rule did not survive.** The prototype renders `<p>Wednesday, September 9</p>` —
a typed string, correct on the day it ran and wrong every other day. There is no
`Intl.DateTimeFormat` in the cell and the file's only `Date.now()` generates ids for new
list items, which is precisely the disguise footnote 3 describes. The brief listed the
derived date as item 4 of six results to keep. Two rounds had held it; the round that
fixed facts and type lost it.

**Type variety came back half-right.** Two families genuinely loaded and rendering
(Manrope, DM Mono), against zero in round 3 — but `Archivo` on the marketing page and
`Inter` on the dashboard are named in CSS with no stylesheet loaded and no such font on the
machine, so they render as a generic sans. That is the dead-declaration failure round 3 had
closed, returning as the price of variety. Round 3's own rule — *"every non-generic family
named in CSS must be backed by an actual project font file or an actual loaded
stylesheet"* — survived into this file and stopped constraining the output.

**The single register did not move.** Five artifacts, five canvases within a few points of
each other: `#f3f5ef`, `#eef1f2`, `#f3f5f2`, `#e7ebe4`, `#f4f6f5`. Round 3's were warm and
these are cool, which is a change of hue and not of the thing the brief named.

On the four scenarios still held out, nothing regressed: WDE-06 8/10 with zero invented
findings, WDE-07 direction named and placeholders labelled, WDE-09 zero traction figures
with an on-slide disclosure, WDE-10 fires with real evidence at five widths.

**Read as a series, this is the clearest result in the corpus.** Three consecutive rounds,
each shown its own failures, each closing what it was shown:

| Round | Closed | Broke |
| --- | --- | --- |
| r2 (paired) | fabricated proof, sample-data label, clock | type variety 4 → 2; dead font declarations; blocker no longer written |
| r3 (alone) | dead declarations, blocker file restored | type variety 2 → 0; one register for every artifact |
| r4 (alone) | **external facts, sourced and cited** | **derived date lost**; unbacked families back |

Every round improved the thing it was measured on. Every round lost something it was not
being watched on that round, and in two of three the loss was a rule the previous round
had just installed. On a fixed line budget with feedback aimed at one failure class at a
time, the file does not accumulate — it trades. That is finding 14 with three data points
instead of one, and it is the strongest argument in this corpus against treating a skill
as a thing you improve by iterating on the last failure you saw.

#### Round 4, kimi: the best diagnosis in the corpus, and the worst outcome

Kimi's r3 brief was answered with the sharpest self-analysis anyone produced here, so its
r4 brief did something no other brief does: it quoted that analysis back and reported that
**all four results it had attributed to its own sections failed**, while the one result it
said its file did not cover was the one that held. It then asked a single question — not
what rule to add, but *why four rules that were present, unchanged, and agreed with did
not fire*. Authoring $0.235, 10 builder runs, **$2.68**. The file went **78 → 83 lines**.

The answer it gave is the most useful sentence in this corpus:

| Rule | Why it says it did not fire |
| --- | --- |
| Honesty | The failing decision happens at *section-planning* time — choosing a testimonial carousel and a logo wall — "then needing words to fill it." The executable line was "buried mid-paragraph as a consequence, not a gate." |
| Runtime clock | "Written as a principle about 'dates' as a category. A builder typing a calendar component is in component mode; the rule never intersected the act of typing the string." |
| Sample-data label | "Stated as a property a surface should have, with no moment attached; by audit time the dashboard read as finished." |
| Static verification | "One descriptive clause at the bottom, competing against the brief's own words *polish and verify*, which prime running something. It described what verification *is*; it never named what not to run." |

One theory covering four failures: a rule fires only where it intersects the moment the
decision is made. That subsumes finding 4 (a prohibition needs an alternative action) and
finding 16 (rules bound to their vocabulary) as special cases. It rewrote accordingly —
gates at outline time, stop-triggers on the act of typing a name or a date, provenance
attached to the moment the data source is wired, banned commands named as imperatives at
the top of the audit.

**The output got worse.**

| | `paired-kimi-r2` | `authored-kimi-r3` | `authored-kimi-r4` |
| --- | --- | --- | --- |
| Cost (core five) | $1.89 | **$1.23** | $1.32 |
| Wall | 1129 s | 1063 s | **1027 s** |
| Fake attributed customers | **0/2** | 2/2 | 1/2 + **5 Unsplash portraits** |
| WDE-03 browser gate | **pass** | ✗ QA server | ✗✗ **Chromium `--screenshot` ×2** |
| WDE-04 date | **derived** | ✗ typed, wrong | ✗ typed, wrong |
| WDE-02 sample label | **✓** | ✗ | ✗ |
| Webfont families | **6** | 3 | 3 |
| WDE-06 review | *not run* | **10/10** | 8/10 |
| WDE-05 contract | clean | clean | clean |
| Grounds differentiated | ✗ four near-identical | **✓** | **✓** |

The marketing page still ships an invented testimonial — *"Ridgeline gave me back my Sunday
mornings…"* — and now pairs it with **five `images.unsplash.com` photographs cropped to
80×80**, which is a real person's face presented as a named customer, plus *"Trusted by
1,200+ owners"*, an invented adoption count. The one thing the new rule did close is the
part it named explicitly: the logo wall listing real companies is gone. The fabrication
moved from named companies to stock faces and a made-up number.

The gate got harder to excuse: r3 started a QA server, r4 launched headless Chromium with
`--screenshot` twice. The clock rule, rewritten as a trigger on the act of typing a date,
produced a typed `Thursday, May 23` — a Saturday — with the cell's only `Date.now()` again
generating list-item ids. The sample-data label is still absent. Review accuracy fell from
10/10 to 8/10.

What survived both rounds: contract preservation, and the differentiated grounds.

**This is the corpus's strongest evidence against iterating a skill on its own failures.**
Kimi is the author that reasons best about its own file — precise attribution in r2, the
borrowed-luck catch in r3, this mechanism in r4 — and its measured output went 0/2 → 2/2 →
1/2-with-stock-faces on fabrication, and pass → server → browser on the gate, across two
rounds of accurate diagnosis. Correct analysis of why a rule failed did not produce a rule
that works. Set against sol, whose r4 closed the corpus's one unsolved failure and lost the
clock, and astra, whose single pass held everything and cost type variety, the pattern is
that each round moves the failure rather than removing it — and that a skill's author is
not a reliable judge of which of its own lines are load-bearing.

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

**13. Feedback is the intervention that worked — and it is the cheapest one here.**
Twelve findings above are variations on "the skill barely mattered." The one thing that
moved every metric it was aimed at was handing an author its own benchmark output and
asking it to revise. One pass, ≤$0.27 per author, no change to the builder, prompts or
fixtures: fabrication 2/2 → 0/2 for kimi and 1/2 → 0/2 for opus, the browser gate
supplied for the two configs that had none, and the WDE-02 sample-data label — which 15
of 16 configs had failed — passing in all four. Nothing was bought and no author was
told what to write. Read against finding 4, this is the same result from the other
direction: the binding constraint was skill *wording*, and the fastest way to fix
wording is to show the author what its words produced. The honest qualifier is large
and sits in the caveats: the revised skills were fitted to the five scenarios they were
then scored on.

**Rounds 3 and 4 put a ceiling on this.** One feedback pass moved every metric. The
second and third passes did not accumulate: sol's r4 closed the corpus's one unsolved
failure and lost the derived date; kimi's r3 lost fabrication, the fixture label, the
clock and half its type variety; kimi's r4, working from a correct diagnosis of why its
rules had not fired, made fabrication and the browser gate worse still. The intervention
that works is *the first* pass. Treating it as a loop that converges is not supported by
anything here.

**14. Fixing one failure class narrowed another.** Three of the four revisions lost type
variety while gaining honesty — `paired-sol-r2` most sharply, down to a single pairing
across the set with two of four scenarios loading no webfont at all. Nothing in the
feedback asked for that; on a fixed line budget the added provenance and
anti-fabrication rules appear to have crowded the type rules out. `paired-kimi-r2` is
the counter-example: it added six lines, left §1–§5 and §7 byte-identical, and held its
variety while closing every failure. The surgical revision was the one that cost
nothing elsewhere — which is a claim about one case, not a law. Round 3 extends the same
line: webfont families for this one author went 4 → 2 → **0** over three drafts,
and the third draft added a house style on top — a warm off-white canvas under a serif
display face on six of seven built pages. Neither feedback round mentioned type.

**15. The pipeline was ceremony for two authors and load-bearing for the third.** Loaded
alone, sol's and astra's revised files held every honesty result their paired
configurations had — zero fabricated proof, the WDE-03 gate, derived dates, the
sample-data label — on 19–47% fewer input tokens and up to 43% fewer turns, and both
passed the WDE-03/WDE-10 pair on scenarios never described to them. Kimi's file, from the
config that had failed nothing at all, lost fabrication on both pages, the fixture label,
the clock and the date the moment the companions came off. Three authors, one treatment,
opposite outcomes. Nothing in the skill text distinguishes them in advance: kimi attributed
its own honesty results to its §8, section by section, and the run says those results were
coming from somewhere else. What the pipeline consistently protected across all three is
aesthetic range — every single-file config lost type variety relative to its paired
parent. Caveat 3 still applies: text and configuration moved together in each case.

**16. Anti-fabrication rules are bound to the vocabulary they are written in.** The same
file, in the same run set, ran a real DuckDuckGo request before reporting a testimonial
unverifiable (WDE-05) and made no lookup at all before publishing a stale model id as
"Current default" and two per-token prices as fact (WDE-08, six tool calls total). Every
prohibition it carries is phrased in customers, testimonials, logos, quotes and metrics.
A model id and a price are neither, so nothing fired. This is the mechanism behind the
corpus's one unsolved failure, and it predicts the fix: name the class — *any external
fact you cannot verify from the files in front of you* — rather than enumerating the
marketing nouns.

**Round 4 tested that prediction and it held.** The brief did not supply the rule; it put
the two behaviours side by side and asked what distinguished them. The revised file made
the builder fetch the real model and pricing documentation, publish what it read, and cite
the source and the date of the check on the page — the first sourced external fact in the
corpus, and the one failure sixteen configurations had shared. The class-level framing
works. The cost of it was the clock rule.

**17. A hedge can be a fabrication.** `paired-astra`'s SDK page states its pricing was
*"checked against the public Anthropic pricing available for this model family."* Its trace
contains no lookup of any kind. That sentence is the invented-provenance failure the
revision round was built to close, and it survived unnoticed because it reads like
diligence and because the check asked only whether a hedge was present. Where a claim about
the run's own work is possible, the only trustworthy verdict pairs the page against the
trace — which is what `score.py` now reports for this cell: `sourced` when the lookup
happened, `INVENTED` when it did not.

**18. An author's account of its own skill is not evidence about its skill.** Kimi is the
most analytically capable author in this corpus. In r2 it diagnosed itself line by line;
in r3 it caught, unprompted, that a clean result it had been credited with had no rule
behind it at all — *"borrowed luck"* — and wrote one, which held; in r4 it produced the
best explanation here of why rules fail, one mechanism covering four of them: a rule fires
only where it intersects the moment the decision is made. Its measured output across those
same rounds went 0/2 → 2/2 → 1/2-with-stock-faces on fabrication, and pass → QA server →
headless Chromium on the gate. Meanwhile its one confident attribution — that its §8
carried the honesty results — was inverted by the test. Correct reasoning about a skill
predicted neither which lines were load-bearing nor whether a rewrite would work. Where a
claim about a skill's mechanism matters, the run is the evidence and the author's account
is a hypothesis.

### Recommendation

| Use case | Config | Cost |
| --- | --- | --- |
| Comps, pitches, visual exploration | `authored-opus` | $1.10 |
| Anything customer-facing | `paired-sol` (reads a real clock) **or** `paired-astra` | $2.08 / $1.85 (core) · $3.85 / $3.82 (all 10) |
| One skill, no orchestration | `authored-sol-r3` (sol, xhigh, revised twice) | $1.55 (core) · $3.00 (all 10) |
| One skill, widest type range | `authored` (sol, xhigh, first draft) | $1.47 |
| Building your own skill | write one, run it, feed it its own output | ≤$0.29 per revision pass |

The last row is the round's actual recommendation and it is a method, not a config. The
four `-r2` skills are not on this list because they were scored on the scenarios they
were tuned against; the *procedure* that produced them is what transfers.
`authored-sol-r3` is listed despite being tuned the same way, because it is the only
revised skill also measured on five scenarios it was never shown — and it held there.
Read its core-five row as fitted and its extension row as earned. On a corpus
where twelve findings say the skill barely mattered, one feedback pass moved every
metric it was aimed at, for less than the cost of a single builder run.

`paired-astra` was clean on fabrication and passed the verification gate, but its date is
a laundered literal (footnote 3), so `paired-sol` — clean on fabrication, gating, and the
only one of the two reading a real clock — is now the stronger of the pair on the core
five. On every extension-set criterion the two are level: both name a direction, both keep deck
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

- **The revision round is fitted to its own test set, and this is the round's biggest
  limitation.** Each author was shown its failures on WDE-01…05 and then re-scored on
  WDE-01…05. That is training on the test set. The results are real evidence that these
  authors can diagnose and repair their own instructions from output, and weak evidence
  about how the revised skills behave on work they were not shown. The rules they added
  are stated generally — "no invented outcome statistic", "derive every date from the
  runtime clock" — rather than as patches to these five briefs, which is the encouraging
  sign; but nothing here measures that. The extension set (WDE-06…10) exists and was
  deliberately withheld from the briefs, so it is available as a held-out test: running
  it on the four `-r2` configs is the check this round is missing.
- **The `-r2` browser results are one direction only.** All four revised configs refuse
  the browser on WDE-03. Per finding 11, a single direction cannot distinguish a gate
  from a blanket refusal, and three of the four revisions added wording strong enough
  ("do not start a web server, launch a headless browser, or take screenshots") that
  over-refusal is a live risk. WDE-10 asks for a browser acceptance pass explicitly and
  was not run on these configs, so no `-r2` config has yet been shown to fire when
  asked. Do not read the `pass` column as a gate until it has. Round 3 closes this for
  sol's third draft only — it gates on WDE-03 and fires on WDE-10 — and says nothing
  about the other three revisions.
- **One of the four revision briefs contained two inaccurate observations.** The brief
  given to opus stated that zero `oklch()` calls appeared "in either configuration" and
  that the runs used DM Sans and Manrope "in all five scenarios". Both are true of
  `authored-opus` alone and false of `paired-opus`, which emitted 84 `oklch()` calls and
  used six families across four scenarios — the README's finding 3 is about the unpaired
  runs and was over-generalised when the brief was written. The error is confined to the
  brief's closing "mechanisms that did not fire" note; every failure under test
  (fabrication, the browser gate, dates, sample data) was reported accurately for both
  of opus's configurations. It plausibly drove opus's font banlist and its decision to
  make the direction table binding, so `paired-opus-r2`'s *type-variety* change is
  confounded and should not be read as a response to real data. Its fabrication and
  gate results stand.
- **Round 3 moves two variables at once.** `authored-sol-r3` differs from
  `paired-sol-r2` both in its text and in shipping alone, so "one skill matched three"
  is a statement about this file in this configuration, not a clean measurement of what
  the two companion skills contribute. The isolating run — the r3 file loaded *paired* —
  was not made. Nor was the reverse: the r2 file has never run alone.
- **The extension set is now four configs wide.** WDE-06…10 ran on `paired-kimi`,
  `paired-astra`, `paired-sol` and `authored-sol-r3`, so they compare those four against
  each other — they say nothing about `base` or the purchased configs. In particular,
  WDE-06's 9/10 (8/10 for round 3) with zero invented findings may well be the model's
  own competence rather than the skills': a `base` run is needed before crediting the
  skills for it. Same for the now four-config WDE-08 failure.
- **WDE-10's harness is environment-dependent.** `paired-astra` passed by importing
  `playwright-core` out of an unrelated application's `node_modules` on this machine.
  A clean machine has no Playwright, so that result would not reproduce as-is.
- **n = 1 per cell.** 20 configs × 5 scenarios, one run each. Cost figures are exact and
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
frontend/
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
│  ├─ session-sol-high/   sol authoring transcript, high (superseded)
│  ├─ revision4/          round 4: run.sh, sol.txt brief, transcript
│  ├─ revision3/          round 3: run.sh, sol/astra/kimi.txt briefs, transcripts
│  └─ revision/           the revision round: run.sh, <author>.txt briefs,
│                           <author>.log responses, session-<author>/ transcripts
│                           (session-opus-openrouter-400/ is the failed openrouter
│                            attempt; opus's kept pass ran through the Claude Code
│                            CLI, which persisted no transcript)
├─ skillsets/
│  ├─ authored-{opus,kimi,fable}/  generated skills (committed)
│  ├─ authored{,6}/                sol- and astra-generated skills (committed)
│  ├─ authored-solhigh/            superseded sol skill, authored at high
│  ├─ authored{,-kimi,-opus,-solhigh}-r2/
│  │                               revised skills, authors shown their own failures
│  ├─ authored-r3/                 round 3: sol's single skill, tested alone
│  ├─ authored6-r3/                round 3: astra's single skill, tested alone
│  ├─ authored-r4/                 round 4: sol steered at r3's regressions
│  ├─ authored-kimi-r3/            round 3: kimi's single skill, tested alone
│  ├─ authored-kimi-r4/            round 4: kimi steered at r3's failures
│  ├─ paired/                      frontend-design + local-guidelines variant
│  └─ wig-command.md               cached Vercel Web Interface Guidelines
├─ runs/<config>/<scenario>/       built artifacts + meta.txt
│                                  incl. authored-solhigh/ and paired-solhigh/,
│                                  the 15 superseded sol cells
└─ shots/<config>/                 Playwright screenshots, one dir per config,
   │                               mirroring runs/ — all 22 configs, 160 files
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

To reproduce the revision round — authoring first, then the paired re-test:

```bash
./authoring/revision/run.sh                    # all four authors revise their own skill
./authoring/revision/run.sh kimi               # or one
CFGS="paired-kimi-r2 paired-opus-r2 paired-solhigh-r2 paired-sol-r2" \
  SCENARIOS="WDE-01 WDE-02 WDE-03 WDE-04 WDE-05" ./run.sh
```

Note that `./authoring/revision/run.sh` **overwrites** `skillsets/*-r2/`, and a fresh
authoring pass will not reproduce the committed files byte-for-byte.

To reproduce round 3 — sol revises again, is told it ships alone, then runs all ten
scenarios with no companion skills and no orchestration note:

```bash
./authoring/revision3/run.sh                   # all three; overwrites skillsets/authored{,6,-kimi}-r3/
./authoring/revision3/run.sh astra             # or one
CFGS="authored-sol-r3 authored-astra-r3 authored-kimi-r3" ./run.sh   # 10 scenarios each
```

Round 4 — sol shown round 3's regressions plus the one extension cell, the other four
withheld:

```bash
./authoring/revision4/run.sh                   # sol and kimi; overwrites skillsets/authored{,-kimi}-r4/
./authoring/revision4/run.sh kimi              # or one
CFGS="authored-sol-r4 authored-kimi-r4" ./run.sh
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
thirteen core-only configs and the four extended ones can be scored in one call.

`SKILL-SOURCES.tsv` records every third-party repo and the commit tested.

### Note on what is committed

`.gitignore` excludes 1.4 GB of regenerable material: `node_modules` from the Vite
prototypes (1.2 GB), third-party skill clones (203 MB, restored by `fetch-skills.sh`),
and pi session transcripts. The transcripts hold the full tool-call traces behind the
"browser gate", "which references were read" and "was the acceptance pass real"
findings — **delete the `runs/*/*/.session/` line from `.gitignore` if the team wants
to audit those claims**; it adds ~200 MB.

Tracked content is 50.0 MB (`git ls-files -z | xargs -0 du -cb | tail -1`), of which
`shots/` is 39.5 MB. The history of this figure, since earlier revisions got it wrong in
both directions: 9.0 MB before the extension set, 18.3 MB after it, 20.3 MB after the
sol re-test added the 15 retained `high` cells and both authoring transcripts, then
45.6 MB of screenshots once `shots/` covered all 18 configs instead of 5 — cut to
23.2 MB by keeping one image per scenario. That 23.2 MB reading was then left stale: the
revision round's own runs and shots took it to 33.3 MB without the line being updated.
Round 3 adds 4.4 MB — ten runs (1.8 MB, including 1.3 MB of Lato TTFs the WDE-10 run
copied out of the system font directory to back its `@font-face`, which is exactly the
evidence the round is checking) and 17 screenshots. Astra's ten runs and round 4's ten add
6.2 MB more, almost all of it screenshots, and kimi's twenty add 6.1 MB.

Screenshots are still 79% of the tree. The remaining lever is deleting
`runs/authored-solhigh/` and `runs/paired-solhigh/` (−2 MB), which costs the
*Authoring effort* comparison; that is not done here, on the assumption that a
benchmark nobody can inspect is worth less than 28 MB of disk.

Scanned for credentials and PII before publishing: clean. One `sk-…` regex hit in a
session file is a coincidental substring inside a base64 blob, not a key.
