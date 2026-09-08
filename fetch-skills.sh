#!/usr/bin/env bash
# Re-create the third-party skill sets excluded from git.
set -eu
cd "$(dirname "$0")"
mkdir -p skillsets/design-list skillsets/taste skillsets/discovered
while IFS=$'\t' read -r cfg repo commit; do
  [ "$cfg" = "config" ] && continue
  case "$repo" in https://*) ;; *) continue ;; esac
  name=$(basename "$repo"); owner=$(basename "$(dirname "$repo")")
  [ "$name" = "skills" ] && name="${owner}-skills"
  dir="skillsets/$cfg/$name"
  [ -d "$dir" ] || git clone -q "$repo" "$dir"
  git -C "$dir" checkout -q "$commit"
done < SKILL-SOURCES.tsv
( cd skillsets/discovered && npx -y skills add anthropics/skills@frontend-design -y \
  && npx -y skills add vercel-labs/agent-skills@web-design-guidelines -y )
curl -sSfo skillsets/wig-command.md \
  https://raw.githubusercontent.com/vercel-labs/web-interface-guidelines/main/command.md
echo "done"
