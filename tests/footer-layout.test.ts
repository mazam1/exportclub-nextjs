import { test } from "node:test";
import assert from "node:assert/strict";
import { chromium, firefox, webkit, BrowserType } from "playwright";

const viewports = [
  { width: 360, height: 640 },
  { width: 768, height: 1024 },
  { width: 1024, height: 768 },
  { width: 1440, height: 900 },
];

async function gotoWithFallback(page: any) {
  try {
    await page.goto("http://localhost:3000/", { waitUntil: "domcontentloaded" });
  } catch {
    await page.goto("http://localhost:3001/", { waitUntil: "domcontentloaded" });
  }
}

async function runFooterChecks(browserType: BrowserType, name: string) {
  for (const vp of viewports) {
    const browser = await browserType.launch();
    const page = await browser.newPage({ viewport: vp });
    await gotoWithFallback(page);

    const footer = page.locator("footer.site-footer").first();
    const logoImg = page.locator('footer.site-footer img[alt="exportclub logo"]');
    const heading = page.locator('#footer-brand');
    const handleText = page.locator('footer.site-footer :text("@exportclub.pk")');

    await Promise.all([
      footer.waitFor({ state: "visible" }),
      logoImg.waitFor({ state: "visible" }),
      heading.waitFor({ state: "visible" }),
      handleText.waitFor({ state: "visible" }),
    ]);

    const ibox = await logoImg.boundingBox();
    const hbox = await heading.boundingBox();
    assert.ok(ibox && hbox, "Logo and heading boxes should exist");

    const centerYDelta = Math.abs((ibox!.y + ibox!.height / 2) - (hbox!.y + hbox!.height / 2));
    assert.ok(centerYDelta <= 22, `${name} ${vp.width}x${vp.height}: logo and heading should align on a single row`);

    const aspectRatio = ibox!.width / ibox!.height;
    assert.ok(aspectRatio > 0.8 && aspectRatio < 1.25, `${name}: logo aspect ratio reasonable`);

    await browser.close();
  }
}

test("Footer layout: inline logo and heading (Chromium)", async () => {
  await runFooterChecks(chromium, "Chromium");
});

test("Footer layout: inline logo and heading (Firefox)", async () => {
  await runFooterChecks(firefox, "Firefox");
});

test("Footer layout: inline logo and heading (WebKit)", async () => {
  await runFooterChecks(webkit, "WebKit");
});