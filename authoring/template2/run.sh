#!/usr/bin/env bash
# Template experiment, stage 1: astra writes a domain-agnostic skill-authoring template
# from its own knowledge, with no skills, extensions, context files or web access.
#   ./run.sh
set -u
DIR=/home/basil/tmp/frontend/authoring/template2
OUT=$DIR/out
# xhigh stalled on this prompt in 3 of 3 attempts (zero CPU, nothing generated), so the
# level is a parameter: THINK=high ./run.sh
THINK=${THINK:-xhigh}
rm -rf "$OUT"; mkdir -p "$OUT"
# astra at xhigh stalls intermittently on a long prompt: the process blocks on I/O with
# zero CPU and writes nothing, so a single long timeout just wastes wall time. Bound each
# attempt and retry; a stall costs 7 minutes instead of an hour.
start=$(date +%s)
for attempt in 1 2 3; do
  rm -rf "$DIR/session-template"; mkdir -p "$DIR/session-template"
  ( cd "$OUT" && timeout 480 pi -p --provider openai-codex --model gpt-6-astra --thinking "$THINK" \
      --no-extensions --no-context-files --no-skills \
      --session-dir "$DIR/session-template" --name "template-astra-$THINK" \
      -- "$(cat $DIR/template-prompt.txt)" ) > "$DIR/template.log" 2> "$DIR/template.err"
  code=$?
  if [ -s "$OUT/TEMPLATE.md" ]; then
    echo "[done] template attempt=$attempt exit=$code seconds=$(( $(date +%s) - start )) lines=$(wc -l < "$OUT/TEMPLATE.md")"
    exit 0
  fi
  echo "[stalled] attempt=$attempt exit=$code — retrying"
done
echo "[failed] template produced nothing after 3 attempts"; exit 1
