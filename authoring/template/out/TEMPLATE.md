# Agent skill authoring template

## Author guidance — do not copy into the skill
Use the task brief to fill the copyable body below. The finished skill is instructions for the task-performing model, not an essay about the task.
Everything outside the fenced body is author guidance. Inside it, headings and sentence frames are scaffolding to copy; replace every `{{...}}` with task-specific text.
Repeat rule and check lines as needed. Do not reproduce placeholders, the fence, author notes, or this preflight in the finished skill.

### Choose the behaviour to change
- Identify one plausible but undesirable output for the task. Specify the replacement choice and the condition that should cause it.
- Make that distinction the skill's centre. Include rules only if they enforce it, prevent a consequential failure, or resolve a necessary ambiguity.
- Include at least one rule governing substance: what to select, omit, transform, reject, or qualify. Formatting alone is not a substitute unless formatting is the task.
- Separate requirements from defaults. When the brief leaves a choice open, supply a bounded default without calling it a user requirement.
- When desirable properties compete, name which wins and when. “Balance both” leaves the original decision unchanged.

### Write rules that constrain choices
- Give each rule a recognisable condition, a prescribed action, and an observable consequence. For an unconditional rule, say “Always” rather than inventing a trigger.
- Use conditions the model can determine from the task, supplied inputs, or its draft. Do not rely on hidden preferences or unavailable facts.
- Name an otherwise plausible choice each rule excludes. If you cannot, rewrite or remove the rule.
- Define terms that decide acceptance. Replace “adequate,” “appropriate,” or “high quality” with properties the model can inspect.
- Weak: “Handle uncertainty carefully.” This supplies no test or required change.
- Strong: “If a required input is absent, do not invent it; omit conclusions that depend on it and identify the missing input.” This supplies a trigger, prohibition, and output consequence.
- That example illustrates rule construction; do not copy its fallback unless it fits the task's deliverable.
- A number is useful only when crossing it changes a justified decision. Do not invent quotas or length limits to make vague advice look precise.
- Prescribe a work step only when skipping it creates a named failure. State its effect on the deliverable; do not require narration of private reasoning.
- Pair prohibitions with usable alternatives. If compliance is impossible, define a bounded failure result rather than an endless repair loop.
- Resolve uncertainty without human questions: choose a stated default, narrow the result, mark a dependency, or return a defined inability state.
- Put explanations of why a rule exists into the skill only when they help resolve an ambiguous case; otherwise keep the rule alone.

### Leave out material that does not steer the task
- Omit role flattery, credentials, motivational prose, and claims of expertise; replace them with the decisions that expertise would change.
- Omit generic virtues and repeated task descriptions unless they add an acceptance test or resolve a choice.
- Omit irrelevant branches, exhaustive catalogues, and background tutorials. Keep only distinctions needed to apply the rules correctly.
- Do not introduce external references, unavailable resources, or an assumed prior conversation. Define needed terms and procedures in the file.
- Do not claim the skill overrides other governing instructions. Keep local rule precedence distinct from instruction authority.
- Avoid repeating requirements across sections; reference rule IDs instead. Repetition creates competing versions when the skill is edited.
- Do not force explanatory prose around a deliverable that cannot contain it. Specify an allowed in-format uncertainty or failure representation.

## Copyable skill body
The headings below organise instructions; they are not headings the task output must contain.
Write direct commands in the filled slots, not advice to a future skill author.

```markdown
# {{Short name identifying the behaviour this skill changes}}

## Scope
Apply when {{recognisable task or input conditions}}.
Outside this scope, do not impose this skill's workflow or output format.

## Result contract
Return {{deliverable and required form, including what must be present and absent}}.
Success requires {{observable substantive properties, not praise or intentions}}.
Treat {{named constraints}} as mandatory; use {{named preferences}} only where compatible.

## Decision rules
- R1. When {{condition, or “always”}}, {{action}}. The result must {{observable consequence}}.
- R2. When {{a competing goal or tempting alternative arises}}, prefer {{choice}} over {{alternative}} because {{task-relevant deciding criterion}}.
{{Add only necessary rules, continuing the IDs; remove this slot if none are needed.}}

## Limits and fallbacks
- If {{a required input is missing or unreliable}}, {{bounded fallback and its representation under the result contract}}.
- If {{requirements cannot all be satisfied}}, preserve {{highest-priority requirement}}, relax {{specified default only}}, and {{allowed failure result if still infeasible}}.
- Resolve overlapping rules by {{explicit precedence or a condition that makes their scopes disjoint}}.

## Before returning
- Check {{a concrete predicate over the candidate result}}. If it fails, {{specific repair that preserves the higher-priority rules}}.
{{Repeat checks only for distinct consequential failures; remove this slot if none are needed.}}
- Return when {{completion conditions}}. If a mandatory condition cannot be met, use {{the fallback defined above}} rather than claiming success.

## Decision examples
- Normal case: {{minimal input or situation}}. Choose {{short compliant result fragment}}, not {{plausible rejected fragment}}, under {{rule ID and decisive condition}}.
- Boundary case: {{same situation with only the decisive condition changed}}. Choose {{the now-correct fragment}}, not {{the formerly correct choice}}, under {{rule ID or scope boundary}}.
```

## Draft-only preflight — act on this, do not copy it
Use only the filled draft for these checks. If a decision needs an unwritten convention or a remembered fact, add the necessary definition or narrow the rule.
1. **Choice test:** For each rule, identify its trigger, action, visible effect, and excluded alternative. Rewrite any rule for which one is missing.
2. **Central failure test:** Construct an output exhibiting the skill's targeted failure. Identify the exact rule that rejects it; if all rules permit it, strengthen the rules rather than adding praise for the goal.
3. **Case walkthrough:** Derive both example decisions from the rules without using the examples as authority. If either requires an exception absent from the rules, repair the rules or the example.
4. **Boundary test:** Verify that the changed fact in the example pair actually changes which choice is permitted or preferred. If both decisions remain equally valid, sharpen the condition or deciding criterion.
5. **Collision test:** Try to activate two rules that prescribe incompatible actions. Resolve the case using written precedence; if you cannot, add precedence or separate their scopes.
6. **Missing-input test:** Remove one input the draft requires. Derive a permitted result without inventing facts, asking anyone, or violating the output format. Add a fallback if none exists.
7. **Delivery test:** Sketch the smallest compliant result for a case. Check every required component, prohibition, and completion condition against it; repair impossible or contradictory demands.
8. **Deletion test:** For each line, name the decision, boundary, or failure it controls. Cut lines with no such function; merge duplicates without losing conditions.
9. **Copy check:** Remove unfilled slots, author-facing instructions, and unsupported claims of tested effectiveness. Ensure every referenced rule and fallback exists in the finished file.
These checks expose specification defects; do not describe them as evidence that a model has been tested or that performance improved.
