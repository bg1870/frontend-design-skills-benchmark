#!/usr/bin/env bash
# Test-suite runner: 10 WDE scenarios x N skill configurations, pi CLI / gpt-5.6-sol / low.
# CFGS="cfg1 cfg2" ./run.sh              — all scenarios in SCENARIOS
# SCENARIOS="WDE-06 WDE-07" ./run.sh     — subset (WDE-06..10 are the extension set)
# ./run.sh <cfg> <scenario>              — one cell
set -u
ROOT=/home/basil/tmp/frontend
RUNS=$ROOT/runs
MODEL_ARGS="--provider openai-codex --model gpt-5.6-sol --thinking low"
COMMON="--no-extensions --no-context-files --no-skills"

ORCH=/home/basil/tmp/frontend/authoring/orchestration.txt
PAIR=/home/basil/tmp/frontend/skillsets/paired
AUTH=/home/basil/tmp/frontend/skillsets

extra_args() {
  case "$1" in
    paired-*) printf -- "--append-system-prompt %s " "$ORCH" ;;
  esac
}

skill_args() {
  case "$1" in
    paired-opus) echo "--skill $AUTH/authored-opus/beautiful-frontend/SKILL.md --skill $PAIR/frontend-design --skill $PAIR/web-design-guidelines" ;;
    paired-kimi) echo "--skill $AUTH/authored-kimi/beautiful-frontend/SKILL.md --skill $PAIR/frontend-design --skill $PAIR/web-design-guidelines" ;;
    paired-fable) echo "--skill $AUTH/authored-fable/beautiful-frontend/SKILL.md --skill $PAIR/frontend-design --skill $PAIR/web-design-guidelines" ;;
    paired-sol) echo "--skill $AUTH/authored/beautiful-frontend/SKILL.md --skill $PAIR/frontend-design --skill $PAIR/web-design-guidelines" ;;
    paired-solhigh) echo "--skill $AUTH/authored-solhigh/beautiful-frontend/SKILL.md --skill $PAIR/frontend-design --skill $PAIR/web-design-guidelines" ;;
    paired-astra) echo "--skill $AUTH/authored6/beautiful-frontend/SKILL.md --skill $PAIR/frontend-design --skill $PAIR/web-design-guidelines" ;;
    # revision round: each skill re-authored after being shown its own failures
    paired-kimi-r2) echo "--skill $AUTH/authored-kimi-r2/beautiful-frontend/SKILL.md --skill $PAIR/frontend-design --skill $PAIR/web-design-guidelines" ;;
    paired-opus-r2) echo "--skill $AUTH/authored-opus-r2/beautiful-frontend/SKILL.md --skill $PAIR/frontend-design --skill $PAIR/web-design-guidelines" ;;
    paired-solhigh-r2) echo "--skill $AUTH/authored-solhigh-r2/beautiful-frontend/SKILL.md --skill $PAIR/frontend-design --skill $PAIR/web-design-guidelines" ;;
    paired-sol-r2) echo "--skill $AUTH/authored-r2/beautiful-frontend/SKILL.md --skill $PAIR/frontend-design --skill $PAIR/web-design-guidelines" ;;
    # round 3: sol re-authored as a single self-contained skill, tested alone
    authored-sol-r3) echo "--skill $AUTH/authored-r3/beautiful-frontend/SKILL.md" ;;
    authored-astra-r3) echo "--skill $AUTH/authored6-r3/beautiful-frontend/SKILL.md" ;;
    authored-sol-r4) echo "--skill $AUTH/authored-r4/beautiful-frontend/SKILL.md" ;;
    authored-kimi-r3) echo "--skill $AUTH/authored-kimi-r3/beautiful-frontend/SKILL.md" ;;
    authored-kimi-r4) echo "--skill $AUTH/authored-kimi-r4/beautiful-frontend/SKILL.md" ;;
    # template experiment: authored from the original brief + astra's TEMPLATE.md
    authored-astra-tpl) echo "--skill $AUTH/authored6-tpl/beautiful-frontend/SKILL.md" ;;
    authored-sol-tpl) echo "--skill $AUTH/authored-tpl/beautiful-frontend/SKILL.md" ;;
    authored-kimi-tpl) echo "--skill $AUTH/authored-kimi-tpl/beautiful-frontend/SKILL.md" ;;
    # design-shaped template variant
    authored-astra-dtpl) echo "--skill $AUTH/authored6-dtpl/beautiful-frontend/SKILL.md" ;;
    authored-sol-dtpl) echo "--skill $AUTH/authored-dtpl/beautiful-frontend/SKILL.md" ;;
    authored-kimi-dtpl) echo "--skill $AUTH/authored-kimi-dtpl/beautiful-frontend/SKILL.md" ;;
    base)        echo "" ;;
    wde)         echo "--skill /home/basil/tmp/skills/wde-fixed/SKILL.md" ;;
    design-list) for d in $ROOT/skillsets/design-list/*/; do printf -- "--skill %s " "$d"; done ;;
    authored-opus) echo "--skill /home/basil/tmp/frontend/skillsets/authored-opus/beautiful-frontend/SKILL.md" ;;
    authored-fable) echo "--skill /home/basil/tmp/frontend/skillsets/authored-fable/beautiful-frontend/SKILL.md" ;;
    authored-kimi) echo "--skill /home/basil/tmp/frontend/skillsets/authored-kimi/beautiful-frontend/SKILL.md" ;;
    authored6)   echo "--skill /home/basil/tmp/frontend/skillsets/authored6/beautiful-frontend/SKILL.md" ;;
    authored)    echo "--skill /home/basil/tmp/frontend/skillsets/authored/beautiful-frontend/SKILL.md" ;;
    authored-solhigh) echo "--skill /home/basil/tmp/frontend/skillsets/authored-solhigh/beautiful-frontend/SKILL.md" ;;
    taste-solo)  echo "--skill /home/basil/tmp/frontend/skillsets/taste/taste-skill/skills/taste-skill" ;;
    taste)       echo "--skill /home/basil/tmp/frontend/skillsets/taste/taste-skill/skills" ;;
    discovered)  echo "--skill $ROOT/skillsets/discovered/.agents/skills/frontend-design --skill $ROOT/skillsets/discovered/.agents/skills/web-design-guidelines" ;;
  esac
}

run_one() {
  local cfg=$1 sc=$2
  local dir=$RUNS/$cfg/$sc
  rm -rf "$dir"; mkdir -p "$dir"
  case $sc in
    WDE-02) cp -r $ROOT/fixtures/wde02/fixtures "$dir"/ ;;
    WDE-05) cp -r $ROOT/fixtures/wde05/fixtures "$dir"/ ;;
    WDE-06) cp -r $ROOT/fixtures/wde06/fixtures "$dir"/ ;;
  esac
  local start=$(date +%s)
  ( cd "$dir" && timeout 2700 pi -p $MODEL_ARGS $COMMON $(skill_args "$cfg") $(extra_args "$cfg") \
      --session-dir "$dir/.session" --name "$cfg-$sc" \
      -- "$(cat $ROOT/prompts/$sc.txt)" ) > "$dir/stdout.txt" 2> "$dir/stderr.txt"
  echo "exit=$? seconds=$(( $(date +%s) - start ))" > "$dir/meta.txt"
  echo "[done] $cfg/$sc $(cat $dir/meta.txt)"
}

CFG=${1:-}
SC=${2:-}
if [ -n "$CFG" ] && [ -n "$SC" ]; then run_one "$CFG" "$SC"; exit 0; fi

for cfg in ${CFGS:-base wde design-list discovered}; do
  for sc in ${SCENARIOS:-WDE-01 WDE-02 WDE-03 WDE-04 WDE-05 WDE-06 WDE-07 WDE-08 WDE-09 WDE-10}; do
    run_one "$cfg" "$sc" &
    while [ "$(jobs -rp | wc -l)" -ge 8 ]; do wait -n; done
  done
done
wait
echo "ALL DONE"
