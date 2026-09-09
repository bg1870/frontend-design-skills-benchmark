#!/usr/bin/env bash
# Template experiment, stage 2: each author writes beautiful-frontend from the ORIGINAL
# authoring brief plus astra's TEMPLATE.md. Same authors, same thinking levels and same
# isolation as the first blind authoring pass — the template is the only added variable.
#   ./run2.sh              — all three
#   ./run2.sh kimi         — one
set -u
DIR=/home/basil/tmp/frontend/authoring/template2
SETS=/home/basil/tmp/frontend/skillsets
TPL=$DIR/out/TEMPLATE.md

# author | provider | model | thinking | output skillset dir
spec() {
  case "$1" in
    astra) echo "openai-codex|gpt-6-astra|xhigh|authored6-dtpl" ;;
    sol)   echo "openai-codex|gpt-5.6-sol|xhigh|authored-dtpl" ;;
    kimi)  echo "openrouter|moonshotai/kimi-k3|max|authored-kimi-dtpl" ;;
  esac
}

brief() {
  cat "$DIR/brief-head.txt"
  cat /home/basil/tmp/frontend/authoring/prompt.txt
  cat "$DIR/brief-mid.txt"
  cat "$TPL"
  cat "$DIR/brief-tail.txt"
}

run_one() {
  local a=$1 IFS='|'
  read -r prov model think out <<< "$(spec "$a")"
  local dir=$SETS/$out/beautiful-frontend
  rm -rf "$SETS/$out"; mkdir -p "$dir"
  brief > "$DIR/$a.txt"
  local start=$(date +%s)
  ( cd "$dir" && timeout 900 pi -p --provider "$prov" --model "$model" --thinking "$think" \
      --no-extensions --no-context-files --no-skills \
      --session-dir "$DIR/session-$a" --name "dtemplate-$a" \
      -- "$(cat $DIR/$a.txt)" ) > "$DIR/$a.log" 2> "$DIR/$a.err"
  echo "[done] $a exit=$? seconds=$(( $(date +%s) - start )) lines=$(wc -l < "$dir/SKILL.md" 2>/dev/null || echo MISSING)"
}

for a in ${@:-astra sol kimi}; do run_one "$a" & done
wait
echo "TEMPLATE AUTHORING DONE"
