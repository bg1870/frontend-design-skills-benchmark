#!/usr/bin/env bash
# Round 3: each author is shown what its own skill shipped and asked for a SINGLE
# self-contained skill — the round-3 configs load it alone, with no companion skills
# and no orchestration note. Same brief constraints, same thinking level as the
# original authoring pass.
#   ./run.sh              — both authors
#   ./run.sh sol          — one
set -u
REV=/home/basil/tmp/frontend/authoring/revision3
SETS=/home/basil/tmp/frontend/skillsets

# author | provider | model | thinking | output skillset dir
spec() {
  case "$1" in
    sol)   echo "openai-codex|gpt-5.6-sol|xhigh|authored-r3" ;;
    astra) echo "openai-codex|gpt-6-astra|xhigh|authored6-r3" ;;
    kimi)  echo "openrouter|moonshotai/kimi-k3|max|authored-kimi-r3" ;;
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
      --session-dir "$REV/session-$a" --name "revision3-$a" \
      -- "$(cat $REV/$a.txt)" ) > "$REV/$a.log" 2> "$REV/$a.err"
  echo "[done] $a exit=$? seconds=$(( $(date +%s) - start )) lines=$(wc -l < "$dir/SKILL.md" 2>/dev/null || echo MISSING)"
}

for a in ${@:-sol astra kimi}; do run_one "$a" & done
wait
echo "ROUND-3 AUTHORING DONE"
