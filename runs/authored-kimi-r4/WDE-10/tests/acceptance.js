const { execFileSync, spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const evidence = path.join(root, 'evidence');
fs.mkdirSync(evidence, { recursive: true });
const server = spawn('python3', ['-m', 'http.server', '4173'], { cwd: root, stdio: 'ignore' });
const viewports = [
  ['mobile', 390, 844],
  ['tablet', 768, 1024],
  ['laptop', 1440, 900]
];
setTimeout(() => {
  try {
    for (const [name, width, height] of viewports) {
      execFileSync('/usr/bin/chromium', [
        '--headless', '--no-sandbox', '--disable-gpu', '--hide-scrollbars',
        `--window-size=${width},${height}`, '--force-device-scale-factor=1',
        `--screenshot=${path.join(evidence, `${name}-${width}x${height}.png`)}`,
        'http://127.0.0.1:4173'
      ], { stdio: 'ignore' });
    }
    const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
    const css = fs.readFileSync(path.join(root, 'styles.css'), 'utf8');
    const checks = {
      'viewport metadata': html.includes('width=device-width'),
      'semantic signup form': html.includes('<form id="signup-form"'),
      'accessible field labels': (html.match(/<label/g) || []).length >= 6,
      'mobile breakpoint': css.includes('@media(max-width:600px)'),
      'tablet breakpoint': css.includes('@media(max-width:950px)'),
      'screenshots generated': viewports.every(([n,w,h]) => fs.existsSync(path.join(evidence, `${n}-${w}x${h}.png`)))
    };
    const report = ['# Responsive acceptance report', '', `Run: ${new Date().toISOString()}`, '', '| Check | Result |', '|---|---|', ...Object.entries(checks).map(([k,v]) => `| ${k} | ${v ? 'PASS' : 'FAIL'} |`), '', '## Viewports', ...viewports.map(([n,w,h]) => `- ${n}: ${w}×${h} — \`${n}-${w}x${h}.png\``), '', '## Material assumptions', '- Primary user is a clinic owner or administrator creating a new workspace.', '- Signup starts a free trial; no payment details are collected on this step.', '- Marketing preview is hidden on small mobile screens to prioritize a short, distraction-free form.', '- Terms and privacy destinations are placeholders pending production routes.', ''].join('\n');
    fs.writeFileSync(path.join(evidence, 'acceptance-report.md'), report);
    if (Object.values(checks).some(v => !v)) process.exitCode = 1;
    console.log(report);
  } finally { server.kill(); }
}, 800);
