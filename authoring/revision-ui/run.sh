#!/usr/bin/env bash
# UI-preserving revision: sol at high is told its visual result is the one to keep and
# asked to fix only its three behavioural defects — browser gate, laundered date, and
# undisclosed fixture data. Tested in the same three-skill configuration it was measured
# in, so the comparison is against paired-solhigh directly.
#   ./run.sh
set -u
DIR=/home/basil/tmp/frontend/authoring/revision-ui
SETS=/home/basil/tmp/frontend/skillsets
dir=$SETS/authored-solhigh-ui/beautiful-frontend
rm -rf "$SETS/authored-solhigh-ui"; mkdir -p "$dir"
start=$(date +%s)
for attempt in 1 2 3; do
  rm -rf "$DIR/session-solhigh"; mkdir -p "$DIR/session-solhigh"
  ( cd "$dir" && timeout 480 pi -p --provider openai-codex --model gpt-5.6-sol --thinking high \
      --no-extensions --no-context-files --no-skills \
      --session-dir "$DIR/session-solhigh" --name "revision-ui-solhigh" \
      -- "$(cat $DIR/solhigh.txt)" ) > "$DIR/solhigh.log" 2> "$DIR/solhigh.err"
  code=$?
  if [ -s "$dir/SKILL.md" ]; then
    echo "[done] solhigh-ui attempt=$attempt exit=$code seconds=$(( $(date +%s) - start )) lines=$(wc -l < "$dir/SKILL.md")"
    exit 0
  fi
  echo "[stalled] attempt=$attempt exit=$code — retrying"
done
echo "[failed] produced nothing after 3 attempts"; exit 1
