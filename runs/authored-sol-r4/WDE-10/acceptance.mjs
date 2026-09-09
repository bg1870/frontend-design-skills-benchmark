import { chromium } from 'playwright';
import fs from 'node:fs';

const browser = await chromium.launch({ headless: true, executablePath: '/usr/bin/chromium' });
const cases = [
  { name: 'mobile', width: 360, height: 800 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'laptop', width: 1440, height: 1000 }
];
const results = [];
fs.mkdirSync('evidence', { recursive: true });
for (const test of cases) {
  const page = await browser.newPage({ viewport: { width: test.width, height: test.height } });
  const consoleErrors = [];
  page.on('console', msg => { if (msg.type() === 'error') consoleErrors.push(msg.text()); });
  await page.goto('http://127.0.0.1:4173', { waitUntil: 'networkidle' });
  await page.screenshot({ path: `evidence/${test.name}-${test.width}.png`, fullPage: true });
  const metrics = await page.evaluate(() => ({
    documentWidth: document.documentElement.scrollWidth,
    viewportWidth: document.documentElement.clientWidth,
    title: document.title,
    h1: document.querySelector('h1')?.textContent,
    labels: document.querySelectorAll('label').length
  }));
  results.push({ viewport: test, ...metrics, noHorizontalOverflow: metrics.documentWidth <= metrics.viewportWidth, consoleErrors });
  await page.close();
}
const page = await browser.newPage({ viewport: { width: 360, height: 800 } });
await page.goto('http://127.0.0.1:4173');
await page.click('.submit');
const validation = await page.locator('#first-name-error').textContent();
await page.fill('#first-name', 'Mara');
await page.fill('#last-name', 'Singh');
await page.fill('#clinic-name', 'Northside Physio');
await page.fill('#email', 'mara@example.com');
await page.fill('#password', 'strong-pass');
await page.check('#terms');
await page.click('#toggle-password');
const passwordVisible = await page.locator('#password').getAttribute('type');
await page.click('.submit');
const success = await page.locator('#form-status').textContent();
results.push({ interaction: { emptyFormValidation: validation, passwordVisible: passwordVisible === 'text', success } });
await browser.close();
fs.writeFileSync('evidence/results.json', JSON.stringify(results, null, 2));
console.log(JSON.stringify(results, null, 2));
