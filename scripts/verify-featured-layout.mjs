import { chromium, firefox, webkit } from 'playwright';

const URL = process.env.URL || 'http://localhost:3001/';

const browsers = [
  { name: 'Chrome', type: chromium },
];

const almostEqual = (a, b, tol = 1.5) => Math.abs(a - b) <= tol;

async function runFor(browserInfo) {
  const browser = await browserInfo.type.launch();
  const page = await browser.newPage();
  const viewports = [
    { label: 'xl', width: 1420, height: 900 },
    { label: 'lg', width: 1200, height: 900 },
    { label: 'md', width: 1024, height: 900 },
    { label: 'sm', width: 768, height: 900 },
  ];
  for (const vp of viewports) {
    await page.setViewportSize({ width: vp.width, height: vp.height });
    await page.goto(URL, { waitUntil: 'domcontentloaded' });

    const section = page.locator('section.best-sellers-section').filter({ hasText: 'Featured Product' }).first();
    await section.waitFor({ state: 'visible' });

    const grid = section.locator('div').filter({ has: page.locator('article.group') }).first();
    const articles = grid.locator('article.group');
    const count = await articles.count();
    const boxes = [];
    for (let i = 0; i < Math.min(4, count); i++) {
      const bb = await articles
        .nth(i)
        .locator('div.relative')
        .first()
        .boundingBox();
      boxes.push(bb);
    }
    const dimsOk = boxes.every((bb) => almostEqual(bb.width, bb.height, 2));
    const rows = [];
    for (const bb of boxes) {
      const y = Math.round(bb.y);
      const row = rows.find((r) => Math.abs(r.y - y) <= 2);
      if (row) row.items.push(bb);
      else rows.push({ y, items: [bb] });
    }
    const gapOk = rows.every((row) => {
      const gs = [];
      for (let i = 0; i < row.items.length - 1; i++) {
        gs.push(row.items[i + 1].x - (row.items[i].x + row.items[i].width));
      }
      return gs.every((g) => almostEqual(g, 20, 2));
    });
    const alignOk = rows.every((row) => row.items.every((bb) => almostEqual(bb.y, row.y, 2)));
    console.log(`[${browserInfo.name} ${vp.label}] Items: ${count}, Square: ${dimsOk}, Gap≈20px: ${gapOk}, Top-aligned: ${alignOk}`);
  }
  await browser.close();
}

(async () => {
  for (const b of browsers) {
    try {
      await runFor(b);
    } catch (e) {
      console.log(`[${b.name}] Error: ${e && e.message ? e.message : e}`);
    }
  }
})();