#!/usr/bin/env bash
# Revision round: each author is shown its own benchmark failures and asked to revise
# its own SKILL.md. Same brief constraints, same thinking level as the original
# authoring pass. No skills, no extensions, no context files.
#   ./run.sh              — all four authors
#   ./run.sh kimi         — one
set -u
REV=/home/basil/tmp/.local/authoring/revision
SETS=/home/basil/tmp/.local/skillsets

# author | provider | model | thinking | output skillset dir
spec() {
  case "$1" in
    kimi)    echo "openrouter|moonshotai/kimi-k3|max|authored-kimi-r2" ;;
    # opus goes through the Claude Code CLI, as the original authoring pass did:
    # anthropic/claude-opus-5 on openrouter rejects pi's mid-conversation
    # reasoning-effort update with a 400.
    opus)    echo "claude-cli|opus|xhigh|authored-opus-r2" ;;
    solhigh) echo "openai-codex|gpt-5.6-sol|high|authored-solhigh-r2" ;;
    sol)     echo "openai-codex|gpt-5.6-sol|xhigh|authored-r2" ;;
  esac
}

run_one() {
  local a=$1 IFS='|'
  read -r prov model think out <<< "$(spec "$a")"
  local dir=$SETS/$out/beautiful-frontend
  rm -rf "$SETS/$out"; mkdir -p "$dir"
  local start=$(date +%s)
  if [ "$prov" = claude-cli ]; then
    # prompt goes in on stdin: --allowedTools is variadic and eats a positional prompt
    ( cd "$dir" && timeout 3600 claude -p --model "$model" --effort "$think" \
        --disable-slash-commands --setting-sources "" --strict-mcp-config \
        --no-session-persistence --allowedTools "Write,Read" \
        < "$REV/$a.txt" ) > "$REV/$a.log" 2> "$REV/$a.err"
  else
    ( cd "$dir" && timeout 3600 pi -p --provider "$prov" --model "$model" --thinking "$think" \
        --no-extensions --no-context-files --no-skills \
        --session-dir "$REV/session-$a" --name "revision-$a" \
        -- "$(cat $REV/$a.txt)" ) > "$REV/$a.log" 2> "$REV/$a.err"
  fi
  echo "[done] $a exit=$? seconds=$(( $(date +%s) - start )) lines=$(wc -l < "$dir/SKILL.md" 2>/dev/null || echo MISSING)"
}

for a in ${@:-kimi opus solhigh sol}; do run_one "$a" & done
wait
echo "REVISIONS DONE"
