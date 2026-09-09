// Screenshot capture for shots/ — Playwright, real chromium.
//
//   node shoot.js                                  # all configs x all scenarios present
//   node shoot.js paired-astra                     # one config
//   node shoot.js paired-astra WDE-09              # one cell
//   node shoot.js --fixture                        # the WDE-06 subject page only
//
// Layout mirrors runs/: one image per scenario at shots/<config>/<scenario>-full.png,
// the fullPage capture, downscaled to 720px wide. WDE-04 is a mobile prototype and
// renders at 390x844; everything else 1440x900. Decks are the exception — their slides
// are the artifact, so WDE-09 gets -s1…-sN plus -traction.png (slide 5, the scored one)
// at native resolution. The shared WDE-06 subject page lands in shots/fixture/.
// Chromium --headless --virtual-time-budget freezes CSS animations mid-fade and
// produces false contrast failures, which is why this goes through Playwright.
//
// Vite prototypes (WDE-04) are served from their built dist/ when one exists: the run
// root's index.html is a dev shell pointing at /src/main.jsx, which a static server
// cannot transpile, so serving the root yields a blank page.
//
// -full.png is downscaled to 720px wide via ffmpeg.
const { chromium } = require('/home/basil/.local/opt/devin/resources/app/node_modules/playwright-core');
const http = require('http'), fs = require('fs'), path = require('path');
const { execFileSync } = require('child_process');

// Full-page captures dominated the tree, so they are downscaled to half width after
// capture. Measured on the worst offender: 1.15 MB -> 0.55 MB, headings and structure
// still clear. Re-encoding losslessly saves nothing (Playwright's PNGs are already
// tight) and ffmpeg's pal8 conversion nearly doubles the size, so scaling is the only
// real lever.
const FULL_SCALE_W = 720;
function halveWidth(file) {
  try {
    const tmp = `${file}.tmp.png`;
    // min(): WDE-04 renders at a 390px mobile viewport, and a bare scale=720 would
    // upscale those captures instead of shrinking them.
    execFileSync('ffmpeg', ['-v', 'error', '-y', '-i', file,
      '-vf', `scale='min(${FULL_SCALE_W},iw)':-1:flags=lanczos`,
      '-compression_level', '100', tmp], { stdio: 'pipe' });
    fs.renameSync(tmp, file);
  } catch { /* no ffmpeg: keep the full-resolution capture rather than failing */ }
}

// playwright-core here is vendored by another app and expects a browser build that is
// not in the cache; point it at whichever real chromium this machine has.
const CHROMIUM = [
  `${process.env.HOME}/.cache/ms-playwright/chromium-1243/chrome-linux64/chrome`,
  '/usr/bin/chromium', '/usr/bin/chromium-browser', '/usr/bin/google-chrome',
].find(p => fs.existsSync(p));

const ROOT = '/home/basil/tmp/frontend';
const OUT = `${ROOT}/shots`;
const MOBILE = { width: 390, height: 844 };
const DESKTOP = { width: 1440, height: 900 };
const SCENARIOS = {
  'WDE-01': { vp: DESKTOP }, 'WDE-02': { vp: DESKTOP }, 'WDE-03': { vp: DESKTOP },
  'WDE-04': { vp: MOBILE },  'WDE-05': { vp: DESKTOP, entry: 'fixtures/app/index.html' },
  'WDE-06': { skip: 'review only — no page produced; see fixture-WDE-06*.png' },
  'WDE-07': { vp: DESKTOP }, 'WDE-08': { vp: DESKTOP },
  'WDE-09': { vp: DESKTOP, deck: true }, 'WDE-10': { vp: DESKTOP },
};
const MIME = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript',
  '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png',
  '.jpg': 'image/jpeg', '.webp': 'image/webp', '.woff2': 'font/woff2' };

function serve(dir) {
  return new Promise(res => {
    const s = http.createServer((rq, rp) => {
      let p = decodeURIComponent(new URL(rq.url, 'http://127.0.0.1').pathname);
      let f = path.join(dir, p === '/' ? '/index.html' : p);
      if (fs.existsSync(f) && fs.statSync(f).isDirectory()) f = path.join(f, 'index.html');
      if (!f.startsWith(dir) || !fs.existsSync(f)) { rp.writeHead(404); return rp.end('nf'); }
      rp.writeHead(200, { 'content-type': MIME[path.extname(f)] || 'application/octet-stream' });
      fs.createReadStream(f).pipe(rp);
    });
    s.listen(0, '127.0.0.1', () => res({ srv: s, port: s.address().port }));
  });
}

// Trigger IntersectionObserver reveals and let transitions finish, so a full-page shot
// does not capture sections stranded at opacity:0 or caught mid-fade.
async function settle(page) {
  await page.evaluate(async () => {
    const h = document.body.scrollHeight;
    for (let y = 0; y < h; y += 400) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 60)); }
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(900);
  await page.evaluate(() => document.fonts && document.fonts.ready);
  await page.waitForTimeout(300);
}

const ABSENT = Symbol('absent');

async function shoot(browser, cfg, sc, spec) {
  const runDir = `${ROOT}/runs/${cfg}/${sc}`;
  // ABSENT is distinct from success: most configs never ran the extension set, and
  // returning null for both made those cells log as though they had been captured.
  if (!fs.existsSync(runDir)) return ABSENT;
  // A built dist/ is self-contained and its /assets/... paths only resolve when dist
  // itself is the doc root. Prefer it over the Vite dev shell in the run root.
  const dir = (!spec.entry && fs.existsSync(`${runDir}/dist/index.html`))
    ? `${runDir}/dist` : runDir;
  const entry = spec.entry ||
    (fs.existsSync(`${dir}/index.html`) ? 'index.html'
      : (fs.readdirSync(dir).find(f => f.endsWith('.html')) || null));
  if (!entry) return `${cfg}/${sc}: no html`;
  fs.mkdirSync(`${OUT}/${cfg}`, { recursive: true });
  const { srv, port } = await serve(dir);
  const page = await browser.newPage({ viewport: spec.vp, deviceScaleFactor: 1 });
  const errs = [];
  page.on('pageerror', e => errs.push(e.message));
  try {
    await page.goto(`http://127.0.0.1:${port}/${entry}`, { waitUntil: 'networkidle', timeout: 30000 });
    await settle(page);
    if (spec.deck) {
      // A deck's slides ARE the artifact: each is 100vh with scroll-snap, so a fullPage
      // shot is byte-identical to slide 1. Capture every slide instead, and label the
      // traction slide, which is the one WDE-09 scores.
      const n = await page.evaluate(() => document.querySelectorAll('section').length);
      let tractionShot = false;
      for (let i = 1; i <= n; i++) {
        if (i > 1) { await page.keyboard.press('ArrowRight'); await page.waitForTimeout(240); }
        await page.waitForTimeout(360);
        await page.screenshot({ path: `${OUT}/${cfg}/${sc}-s${i}.png` });
        const { label, isTraction } = await page.evaluate(i => {
          const s = document.querySelectorAll('section')[i - 1];
          const h = s && s.querySelector('h1,h2,h3,.section-name,.kicker');
          const all = s ? (s.textContent || '') : '';
          return { label: (h ? h.textContent : all).trim().replace(/\s+/g, ' ').slice(0, 28),
                   isTraction: /traction/i.test(all) };
        }, i);
        // First match only: a later slide can mention "traction" in a disclosure note
        // (e.g. "traction ... are illustrative management targets"), which used to
        // overwrite this shot with the wrong slide.
        if (isTraction && !tractionShot) {
          await page.screenshot({ path: `${OUT}/${cfg}/${sc}-traction.png` });
          tractionShot = true;
        }
        process.stdout.write(`      s${i} ${label}\n`);
      }
    } else {
      // One image per scenario: the fullPage capture. The viewport-clipped shot it used
      // to sit beside was a crop of this same render, so it carried no information the
      // full page does not — and for a page that fits 1440x900 the two were byte-
      // identical. The viewport still governs layout; it just isn't saved separately.
      const full = `${OUT}/${cfg}/${sc}-full.png`;
      await page.screenshot({ path: full, fullPage: true });
      halveWidth(full);
    }
  } catch (e) { srv.close(); await page.close(); return `${cfg}/${sc}: ${e.message.split('\n')[0]}`; }
  await page.close(); srv.close();
  return errs.length ? `${cfg}/${sc}: pageerror ${errs[0].slice(0, 80)}` : null;
}

// The WDE-06 subject page is byte-identical across configs, so it is captured once —
// with JS (reveals fired) and with JS disabled, which is seeded defect D5 on screen.
async function fixture(browser) {
  const dir = `${ROOT}/fixtures/wde06/fixtures/site`;
  const { srv, port } = await serve(dir);
  fs.mkdirSync(`${OUT}/fixture`, { recursive: true });
  for (const [name, js] of [['fixture/WDE-06', true], ['fixture/WDE-06-nojs', false]]) {
    const ctx = await browser.newContext({ viewport: DESKTOP, javaScriptEnabled: js, deviceScaleFactor: 1 });
    const page = await ctx.newPage();
    await page.goto(`http://127.0.0.1:${port}/index.html`, { waitUntil: 'networkidle' });
    if (js) await settle(page); else await page.waitForTimeout(900);
    await page.screenshot({ path: `${OUT}/${name}-full.png`, fullPage: true });
    halveWidth(`${OUT}/${name}-full.png`);
    await ctx.close();
    process.stdout.write(`   ${name}.png (javaScriptEnabled=${js})\n`);
  }
  srv.close();
}

(async () => {
  const args = process.argv.slice(2);
  const only = args.filter(a => !a.startsWith('--'));
  if (!CHROMIUM) { console.error('no chromium found'); process.exit(1); }
  const browser = await chromium.launch({ headless: true, executablePath: CHROMIUM, args: ['--no-sandbox'] });
  const problems = [];
  if (args.includes('--fixture') || !only.length || only.includes('WDE-06')) await fixture(browser);
  if (!args.includes('--fixture')) {
    const cfgs = only.filter(a => !/^WDE-/.test(a));
    const scs = only.filter(a => /^WDE-/.test(a));
    // Default is every config with a runs/ directory, not just the paired ones.
    const allCfgs = fs.readdirSync(`${ROOT}/runs`)
      .filter(d => fs.statSync(`${ROOT}/runs/${d}`).isDirectory()).sort();
    for (const cfg of (cfgs.length ? cfgs : allCfgs)) {
      for (const [sc, spec] of Object.entries(SCENARIOS)) {
        if (spec.skip || (scs.length && !scs.includes(sc))) continue;
        const p = await shoot(browser, cfg, sc, spec);
        if (p === ABSENT) continue;
        if (p) problems.push(p);
        else if (!spec.deck) process.stdout.write(`   ${cfg}/${sc}-full.png\n`);
      }
    }
  }
  await browser.close();
  if (problems.length) { console.log('\nproblems:'); problems.forEach(p => console.log('  ' + p)); }
})();
