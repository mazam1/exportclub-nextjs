import { chromium } from 'playwright';

const BASE_URL = process.env.BASE_URL || 'http://localhost:3001/';
const OUT_DIR = new URL('../screenshots/', import.meta.url);

async function ensureDir(fs, dirUrl) {
  const dirPath = new URL('.', dirUrl).pathname;
  try {
    await fs.promises.mkdir(dirPath, { recursive: true });
  } catch {}
}

async function run() {
  const fs = await import('node:fs');
  await ensureDir(fs, OUT_DIR);

  const browser = await chromium.launch();
  const context = await browser.newContext({ viewport: { width: 1366, height: 900 } });
  const page = await context.newPage();

  const capture = async (mode, filename) => {
    const url = `${BASE_URL}?sale_bg=${mode}`;
    await page.goto(url, { waitUntil: 'networkidle' });
    const section = page.locator('section.mens-sale-section');
    await section.waitFor({ state: 'visible' });
    await section.screenshot({ path: new URL(filename, OUT_DIR).pathname });
    console.log(`[screenshot] Saved ${filename}`);
  };

  await capture('before', 'sale-before.png');
  await capture('after', 'sale-after.png');

  await browser.close();
}

run().catch((err) => {
  console.error('[screenshot] Failed:', err);
  process.exit(1);
});