#!/usr/bin/env bash
# Round 3: sol at xhigh is shown what paired-sol-r2 shipped and asked for a SINGLE
# self-contained skill — the round-3 config loads it alone, with no companion skills
# and no orchestration note. Same brief constraints, same thinking level as before.
#   ./run.sh
set -u
REV=/home/basil/tmp/frontend/authoring/revision3
SETS=/home/basil/tmp/frontend/skillsets
OUT=authored-r3

dir=$SETS/$OUT/beautiful-frontend
rm -rf "$SETS/$OUT"; mkdir -p "$dir"
start=$(date +%s)
( cd "$dir" && timeout 3600 pi -p --provider openai-codex --model gpt-5.6-sol --thinking xhigh \
    --no-extensions --no-context-files --no-skills \
    --session-dir "$REV/session-sol" --name "revision3-sol" \
    -- "$(cat $REV/sol.txt)" ) > "$REV/sol.log" 2> "$REV/sol.err"
echo "[done] sol exit=$? seconds=$(( $(date +%s) - start )) lines=$(wc -l < "$dir/SKILL.md" 2>/dev/null || echo MISSING)"
