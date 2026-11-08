#!/usr/bin/env node
/**
 * Capture a light and a dark screenshot of every story of one component.
 *
 * Usage:
 *   node capture-screenshots.mjs <story-id-prefix> <out-dir> [--url http://localhost:6006]
 *
 * <story-id-prefix> is the Storybook story id up to the double dash, for example
 * `components-data-display-avatar`. Storybook must already be running (`npm run storybook`).
 * Set CHROME_PATH to use an installed Chrome instead of Playwright's bundled Chromium
 * (cloud sessions set it already).
 *
 * Writes `<story>-light.png`, `<story>-dark.png` and `manifest.json` into <out-dir>.
 * The `DarkMode` story is skipped: dark is captured for every story instead.
 */
import { chromium } from '@playwright/test';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const argv = process.argv.slice(2);
let baseUrl = 'http://localhost:6006';
const positional = [];
for (let i = 0; i < argv.length; i++) {
  if (argv[i] === '--url') baseUrl = argv[++i];
  else positional.push(argv[i]);
}
const [prefix, outDir] = positional;
if (!prefix || !outDir) {
  console.error('Usage: node capture-screenshots.mjs <story-id-prefix> <out-dir> [--url <storybook-url>]');
  process.exit(2);
}

let entries;
try {
  entries = Object.values((await (await fetch(`${baseUrl}/index.json`)).json()).entries);
} catch (error) {
  console.error(`Could not read ${baseUrl}/index.json. Is Storybook running? (${error.message})`);
  process.exit(1);
}

const stories = entries.filter(
  (e) => e.type === 'story' && e.id.startsWith(`${prefix}--`) && !e.id.endsWith('--dark-mode'),
);
if (stories.length === 0) {
  const prefixes = [...new Set(entries.map((e) => e.id.split('--')[0]))].join('\n  ');
  console.error(`No stories found for prefix "${prefix}". Available prefixes:\n  ${prefixes}`);
  process.exit(1);
}

await mkdir(outDir, { recursive: true });
// Cloud sessions ship Chrome at $CHROME_PATH and cannot always download Playwright's own
// Chromium, so prefer it when set. Locally this falls through to Playwright's bundled browser.
const executablePath = process.env.CHROME_PATH || undefined;
let browser;
try {
  browser = await chromium.launch({ executablePath });
} catch (error) {
  console.error(
    `Could not launch a browser${executablePath ? ` from CHROME_PATH (${executablePath})` : ''}.\n` +
      'Set CHROME_PATH to a Chrome/Chromium binary, or run `npx playwright install chromium`.\n' +
      error.message,
  );
  process.exit(1);
}
// Light is pinned so the OS colour scheme never leaks into the captures.
const context = await browser.newContext({
  viewport: { width: 1000, height: 800 },
  deviceScaleFactor: 2,
  colorScheme: 'light',
});
const page = await context.newPage();

const manifest = [];
for (const story of stories) {
  const slug = story.id.slice(prefix.length + 2);
  const files = {};
  for (const theme of ['light', 'dark']) {
    await page.goto(`${baseUrl}/iframe.html?id=${story.id}&viewMode=story`);
    await page.locator('#storybook-root > *').first().waitFor();
    if (await page.evaluate(() => document.body.classList.contains('sb-show-errordisplay'))) {
      throw new Error(`Story "${story.id}" failed to render. Open it in Storybook to see the error.`);
    }
    // Same two switches the decorator in .storybook/preview.tsx sets, so the SDS tokens flip.
    await page.evaluate((t) => {
      document.documentElement.classList.toggle('dark', t === 'dark');
      document.documentElement.dataset.theme = t;
    }, theme);
    await page.evaluate(() =>
      Promise.all(Array.from(document.images, (img) => img.decode().catch(() => undefined))),
    );
    await page.evaluate(() => document.fonts.ready);
    const file = `${slug}-${theme}.png`;
    await page.locator('#storybook-root').screenshot({
      path: path.join(outDir, file),
      animations: 'disabled',
    });
    files[theme] = file;
  }
  manifest.push({ id: story.id, name: story.name, ...files });
  console.log(`captured ${story.name} (${slug})`);
}

await browser.close();
await writeFile(path.join(outDir, 'manifest.json'), JSON.stringify(manifest, null, 2));
console.log(`\n${manifest.length * 2} screenshots written to ${outDir}`);
