#!/usr/bin/env bash
# Template experiment, stage 1: astra writes a domain-agnostic skill-authoring template
# from its own knowledge, with no skills, extensions, context files or web access.
#   ./run.sh
set -u
DIR=/home/basil/tmp/frontend/authoring/template
OUT=$DIR/out
rm -rf "$OUT"; mkdir -p "$OUT"
start=$(date +%s)
( cd "$OUT" && timeout 900 pi -p --provider openai-codex --model gpt-6-astra --thinking xhigh \
    --no-extensions --no-context-files --no-skills \
    --session-dir "$DIR/session-template" --name "template-astra" \
    -- "$(cat $DIR/template-prompt.txt)" ) > "$DIR/template.log" 2> "$DIR/template.err"
echo "[done] template exit=$? seconds=$(( $(date +%s) - start )) lines=$(wc -l < "$OUT/TEMPLATE.md" 2>/dev/null || echo MISSING)"
