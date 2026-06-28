#!/usr/bin/env bash
# Contract: SKILL.md declares all five sensory channel modes plus the two control modes.
set -u
HERE="$(cd "$(dirname "$0")" && pwd)"
ROOT="$(cd "$HERE/.." && pwd)"
SKILL="$ROOT/SKILL.md"
fails=0

for mode in "DRAW" "COMPOSE" "ROLEPLAY" "MOVE" "JOKE" "BITESIZE-LEARN" "REWARD-CHECK"; do
  if grep -q "$mode" "$SKILL"; then echo "  ok: mode $mode present"; else echo "  FAIL: mode $mode missing from SKILL.md"; fails=$((fails+1)); fi
done

if [ "$fails" -eq 0 ]; then echo "mode-routing-contract: PASS"; exit 0; else echo "mode-routing-contract: $fails failure(s)"; exit 1; fi
