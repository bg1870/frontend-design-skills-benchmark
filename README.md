# Do front-end design skills actually improve output?

An A/B test of 16 skill configurations against the same five build tasks, with the
builder model, prompts and fixtures held constant.

**Short answer:** mostly no. A ~100-line skill the model writes for itself in one pass
matches or beats every purchased skill we tested, at a fraction of the cost. The most
expensive configuration ($6.15, 471K input tokens, 267 skills) produced no measurable
advantage over a 6 KB file generated in three minutes. But no configuration — bought,
generated, or combined — reliably stopped the model inventing a fake customer
testimonial when a marketing brief left the proof section empty.

- 80 builder runs · 745 assistant turns · 1,119 tool calls · 6.0 h agent wall time · **$35.12**
- Run date: 2026-09-07 / 2026-09-08

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
| Scenarios | 5 (`prompts/WDE-0*.txt`), byte-identical across configs |
| Fixtures | `fixtures/`, copied fresh into each run directory |
| Working dir | empty per run, no state carried between runs |

The five scenarios come from `tests.yaml`, a rubric written against the `wde-fixed`
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
| `authored-kimi` | `beautiful-frontend` (63 ln, 6.1 KB) | written by Kimi K3, xhigh |
| `authored-fable` | `beautiful-frontend` (148 ln, 12.2 KB) | written by Fable 5.1, xhigh |
| `authored` | `beautiful-frontend` (103 ln, 10.4 KB) | written by GPT-5.6 Sol, high |
| `authored6` | `beautiful-frontend` (65 ln, 14.0 KB) | written by GPT-6 Astra, xhigh |
| `paired-*` (×5) | each authored skill + the two `discovered` skills | 3-skill pipeline, see below |

**Generated skills.** Each authoring model was given the same brief
(`authoring/prompt.txt`) with no skills, no extensions and no context files: write a
self-contained `SKILL.md`, ≤150 lines, no reference files, no generic exhortation.
None of them saw the test results or any other skill. Authoring is *not* part of the
benchmark — only the resulting skill is, and the builder is always sol/low.

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
| `authored` (sol) | $1.62 | 103,164 | 246K | 32,552 | 43 | 63 | 1248 s |
| `discovered` | $1.63 | 121,426 | 228K | 30,209 | 46 | 63 | 1197 s |
| `authored6` (astra) | $1.66 | 104,735 | 269K | 33,227 | 41 | 60 | 1269 s |
| `authored-fable` | $1.69 | 94,777 | 296K | 35,526 | 41 | 56 | 1534 s |
| `paired-kimi` | $1.79 | 116,037 | 396K | 33,632 | 50 | 63 | 1279 s |
| `paired-opus` | $1.82 | 99,326 | 434K | 36,960 | 44 | 81 | 1392 s |
| `paired-astra` | $1.85 | 123,592 | 467K | 33,161 | 51 | 69 | 1282 s |
| `paired-sol` | $2.05 | 133,228 | 581K | 36,555 | 60 | 80 | 1425 s |
| `wde` | $2.27 | 139,382 | 657K | 41,508 | 45 | 80 | 1500 s |
| `paired-fable` | $2.46 | 180,046 | 807K | 38,550 | 64 | 85 | 1503 s |
| `taste` | $2.71 | 223,444 | 1.15M | 33,879 | 55 | 78 | 1342 s |
| `taste-solo` | $2.84 | 223,557 | 1.15M | 38,070 | 53 | 70 | 1488 s |
| `design-list` | **$6.15** | 471,517 | 4.32M | 54,283 | 61 | 141 | **2021 s** |

Skill-authoring cost (one-off, excluded from the table): sol/high $0.284 · astra/xhigh
$0.430 · kimi/xhigh $0.153. Opus and Fable were authored through the Claude Code CLI on
a subscription, so no per-token cost was recorded.

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
| `authored` (sol) | 2/2 | ✗ Chromium | ✗ Sun Apr 14 → Tue | 5 | clean |
| `authored6` (astra) | **0/2** | ✗ Chromium + CDP | ✗ Tue Jun 12 → Fri | 4 | clean |
| `authored-opus` | 2/2 · fake logo wall | **pass** (wrote `verify.js`) | ✓ typed, correct | 3 | clean |
| `authored-kimi` | 1/2 | ✗ Chromium | ✗ Mon Oct 7 → Wed | 4 | clean |
| `authored-fable` | 2/2 | ✗ Chromium | **derived** | 6 | clean |
| `paired-opus` | 1/2 | ✗ Chromium | **derived** | 6 | clean |
| `paired-kimi` | 2/2 | **pass** | **derived** | 5 | clean |
| `paired-fable` | 1/2 | ✗ Chromium | **derived** | 5 | clean |
| `paired-sol` | **0/2** | ✗ Chromium | **derived** | 5 | clean |
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

**4. Three of five authors wrote the rule that caused their own failure.**
Opus: *"plausible names, dates, prices."* Kimi: *"Testimonials get names, roles,
specifics."* Sol: *"create a small internally consistent domain dataset."* All three
fabricated attributed customers. Astra's skill is the only one that both prohibited it
outright — *"do not invent real endorsements, customer logos, awards"* — **and supplied
an alternative action**: *"if a region is weak, enlarge the relevant evidence… or delete
the region."* It is the only unpaired generated config with zero fabrications. Opus even
banned the literal string `"Trusted by 10,000+ teams"` and then shipped *"Trusted by
product teams who never stop asking why"* over five invented logos.

**5. Pairing fixed dates completely, and nothing else reliably.** All 5 paired configs
derived the weekday from a real clock; unpaired, only 2 of 11 did and 5 typed a wrong
one. Fabrication improved for sol (2→0) and Fable (2→1) but worsened for Kimi (1→2).
Cost rose 18–90%.

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

### Recommendation

| Use case | Config | Cost |
| --- | --- | --- |
| Comps, pitches, visual exploration | `authored-opus` | $1.10 |
| Anything customer-facing | `paired-astra` | $1.85 |

`paired-astra` is the only config that is simultaneously clean on fabrication, passes
the verification gate, and derives its dates. `authored-opus` is the best value by a
wide margin but invents customers.

Two prompt lines close most of the remaining gap for any config, and cost nothing:

> Never invent statistics, customer names, quotes, logos, pricing, or dates. Use a
> clearly labelled placeholder and record the blocker.
> Do not launch a browser, start a server, or install a test framework unless I
> explicitly ask for a browser acceptance pass.

---

## Caveats

- **n = 1 per cell.** 16 configs × 5 scenarios, one run each. Cost figures are exact and
  the cross-scenario patterns (fabrication, dates, browser gate, fonts) are consistent
  enough to act on. Head-to-head quality calls between two good configs are not
  statistically meaningful.
- **One rubric, one model, one harness.** Results may not transfer to a different
  builder model or to Claude Code's skill loading.
- **The orchestration prompt is a confound on WDE-03.** It tells the model the audit is
  static, which is a nudge on the exact gate being measured. Treat paired-config browser
  results as partly attributable to that instruction.
- **Screenshots need a real browser.** `chromium --headless --virtual-time-budget`
  freezes CSS animations mid-fade and produces false contrast failures. All screenshots
  in `shots/pw-*.png` were taken via Playwright. An earlier `wde` "contrast failure" was
  this artifact, not a defect.
- **Automated fabrication counting is crude.** It flags any `<blockquote>`, including
  legitimate brand statements. The table above uses a stricter check: a quote plus an
  adjacent capitalised name and a role.

---

## Layout

```
.local/
├─ README.md              this file
├─ tests.yaml             the 5 scenarios + rubric
├─ prompts/WDE-0*.txt     exact prompts handed to the builder (byte-identical per config)
├─ fixtures/              WDE-02 jobs.json, WDE-05 existing site
├─ run.sh                 the runner; CFGS="cfg1 cfg2" ./run.sh
├─ score.py               correctness scoring across configs
├─ stats.py               cost/turn/token accounting → stats-runs.json
├─ trace.py               tool-call trace extractor for a config/scenario
├─ authoring/
│  ├─ prompt.txt          the skill-authoring brief given to all five models
│  └─ orchestration.txt   3-skill division of labour for paired configs
├─ skillsets/
│  ├─ authored-{opus,kimi,fable}/  generated skills (committed)
│  ├─ authored{,6}/                sol- and astra-generated skills (committed)
│  ├─ paired/                      frontend-design + local-guidelines variant
│  └─ wig-command.md               cached Vercel Web Interface Guidelines
├─ runs/<config>/<scenario>/       built artifacts + meta.txt
└─ shots/                          Playwright screenshots, pw-*.png
```

### Reproducing

```bash
./fetch-skills.sh                          # re-clone third-party skills at pinned commits
CFGS="base authored-opus" ./run.sh         # run selected configs
python3 score.py base authored-opus        # correctness table
python3 stats.py base authored-opus        # cost / turns / tokens
```

`SKILL-SOURCES.tsv` records every third-party repo and the commit tested.

### Note on what is committed

`.gitignore` excludes 1.5 GB of regenerable material: `node_modules` from the Vite
prototypes (1.2 GB), third-party skill clones (203 MB, restored by `fetch-skills.sh`),
and pi session transcripts. The transcripts hold the full tool-call traces behind the
"browser gate" and "which references were read" findings — **delete the
`runs/*/*/.session/` line from `.gitignore` if the team wants to audit those claims**;
it adds ~200 MB. Committed size is ~19 MB.

Scanned for credentials and PII before publishing: clean. One `sk-…` regex hit in a
session file is a coincidental substring inside a base64 blob, not a key.
