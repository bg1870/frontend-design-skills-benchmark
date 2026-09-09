#!/usr/bin/env bash
set -euo pipefail
mkdir -p artifacts
node --check app.js
for f in styles.css app.js; do grep -q "$f" index.html || { echo "Missing reference: $f"; exit 1; }; done
grep -q '<h1' index.html && grep -q '<main' index.html && grep -q 'aria-label' index.html
chromium --headless --no-sandbox --disable-gpu --hide-scrollbars --run-all-compositor-stages-before-draw --virtual-time-budget=1500 --window-size=1440,1100 --screenshot=artifacts/pricing-wide.png "file://$(pwd)/index.html" >/dev/null 2>&1
chromium --headless --no-sandbox --disable-gpu --hide-scrollbars --run-all-compositor-stages-before-draw --virtual-time-budget=1500 --window-size=390,844 --screenshot=artifacts/pricing-narrow.png "file://$(pwd)/index.html" >/dev/null 2>&1
printf 'Verification passed.\n'
