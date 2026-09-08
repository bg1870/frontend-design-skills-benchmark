const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');
const css = fs.readFileSync('styles.css', 'utf8');
const js = fs.readFileSync('script.js', 'utf8');
const checks = [
  ['document title', /<title>.+<\/title>/.test(html)],
  ['viewport', /name="viewport"/.test(html)],
  ['single h1', (html.match(/<h1/g) || []).length === 1],
  ['three plans', (html.match(/class="plan-card/g) || []).length === 3],
  ['billing controls', /data-period="monthly"/.test(html) && /data-period="annual"/.test(html)],
  ['mobile layout', /@media\(max-width:800px\)/.test(css)],
  ['focus skip link', /class="skip-link"/.test(html)],
  ['billing interaction', /aria-pressed/.test(js)],
];
let failed = false;
for (const [name, ok] of checks) { console.log(`${ok ? '✓' : '✗'} ${name}`); failed ||= !ok; }
process.exitCode = failed ? 1 : 0;
