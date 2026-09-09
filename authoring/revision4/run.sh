#!/usr/bin/env bash
# Round 4: sol is shown what its round-3 single skill shipped when loaded alone —
# the two regressions it introduced (no webfonts, one register for every artifact)
# and the stale fact it published without attempting a lookup. Feedback is scoped to
# the five core scenarios plus the SDK-quickstart cell; the other four extension
# scenarios are withheld so they stay held out.
#   ./run.sh              — sol
set -u
REV=/home/basil/tmp/frontend/authoring/revision4
SETS=/home/basil/tmp/frontend/skillsets

# author | provider | model | thinking | output skillset dir
spec() {
  case "$1" in
    sol)   echo "openai-codex|gpt-5.6-sol|xhigh|authored-r4" ;;
    kimi)  echo "openrouter|moonshotai/kimi-k3|max|authored-kimi-r4" ;;
  esac
}

run_one() {
  local a=$1 IFS='|'
  read -r prov model think out <<< "$(spec "$a")"
  local dir=$SETS/$out/beautiful-frontend
  rm -rf "$SETS/$out"; mkdir -p "$dir"
  local start=$(date +%s)
  ( cd "$dir" && timeout 3600 pi -p --provider "$prov" --model "$model" --thinking "$think" \
      --no-extensions --no-context-files --no-skills \
      --session-dir "$REV/session-$a" --name "revision4-$a" \
      -- "$(cat $REV/$a.txt)" ) > "$REV/$a.log" 2> "$REV/$a.err"
  echo "[done] $a exit=$? seconds=$(( $(date +%s) - start )) lines=$(wc -l < "$dir/SKILL.md" 2>/dev/null || echo MISSING)"
}

for a in ${@:-sol kimi}; do run_one "$a" & done
wait
echo "ROUND-4 AUTHORING DONE"
