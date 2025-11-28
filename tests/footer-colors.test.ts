import { test } from "node:test";
import assert from "node:assert/strict";
import { chromium, firefox, webkit, BrowserType } from "playwright";

async function gotoWithFallback(page: any) {
  try {
    await page.goto("http://localhost:3000/", { waitUntil: "domcontentloaded" });
  } catch {
    await page.goto("http://localhost:3001/", { waitUntil: "domcontentloaded" });
  }
}

function toRGB(hex: string) {
  const h = hex.replace("#", "");
  const r = parseInt(h.substring(0, 2), 16);
  const g = parseInt(h.substring(2, 4), 16);
  const b = parseInt(h.substring(4, 6), 16);
  return `rgb(${r}, ${g}, ${b})`;
}

function luminance(rgb: string) {
  const m = rgb.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
  if (!m) return 0;
  const [r, g, b] = [Number(m[1]), Number(m[2]), Number(m[3])].map((v) => {
    const c = v / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrastRatio(rgb1: string, rgb2: string) {
  const L1 = luminance(rgb1);
  const L2 = luminance(rgb2);
  const [lighter, darker] = L1 >= L2 ? [L1, L2] : [L2, L1];
  return (lighter + 0.05) / (darker + 0.05);
}

async function runColorChecks(browserType: BrowserType, name: string) {
  const browser = await browserType.launch();
  const page = await browser.newPage({ viewport: { width: 1024, height: 768 } });
  await gotoWithFallback(page);

  const footer = page.locator("footer.site-footer").first();
  await footer.waitFor({ state: "visible" });

  const bg = await footer.evaluate((el) => getComputedStyle(el).backgroundColor);
  assert.equal(bg, toRGB("#FFFFFF"), `${name}: footer background must be pure white`);

  const heading = page.locator("footer.site-footer h3").first();
  const headColor = await heading.evaluate((el) => getComputedStyle(el).color);
  assert.equal(headColor, toRGB("#000000"), `${name}: footer headings must be black`);

  const firstLink = page.locator("footer.site-footer a").first();
  const linkColor = await firstLink.evaluate((el) => getComputedStyle(el).color);
  assert.equal(linkColor, toRGB("#000000"), `${name}: footer link must be black (default)`);

  await firstLink.hover();
  const hoverColor = await firstLink.evaluate((el) => getComputedStyle(el).color);
  assert.equal(hoverColor, toRGB("#000000"), `${name}: footer link must remain black on hover`);

  await page.mouse.down();
  const activeColor = await firstLink.evaluate((el) => getComputedStyle(el).color);
  assert.equal(activeColor, toRGB("#000000"), `${name}: footer link must remain black on active`);
  await page.mouse.up();

  const svgRect = page.locator("footer.site-footer svg rect").first();
  const svgFill = await svgRect.evaluate((el: SVGRectElement) => getComputedStyle(el).fill);
  assert.equal(svgFill, toRGB("#1A1A1A"), `${name}: social icon fill must match footer icon color`);

  const ratio = contrastRatio(toRGB("#1A1A1A"), toRGB("#FFFFFF"));
  assert.ok(ratio >= 4.5, `${name}: contrast ratio must be >= 4.5:1, got ${ratio}`);

  const instaLink = page.locator('footer.site-footer a[aria-label="Instagram"]').first();
  const instaRect = page.locator('footer.site-footer a[aria-label="Instagram"] svg rect').first();
  const defaultFill = await instaRect.evaluate((el: SVGRectElement) => getComputedStyle(el).fill);
  assert.equal(defaultFill, toRGB("#1A1A1A"), `${name}: Instagram icon default fill`);
  await instaLink.hover();
  const hoverFill = await instaRect.evaluate((el: SVGRectElement) => getComputedStyle(el).fill);
  assert.equal(hoverFill, toRGB("#333333"), `${name}: Instagram icon hover fill`);
  const hoverRatio = contrastRatio(hoverFill, toRGB("#FFFFFF"));
  assert.ok(hoverRatio >= 4.5, `${name}: hover contrast ratio must be >= 4.5:1, got ${hoverRatio}`);
  const ibox = await instaLink.boundingBox();
  if (ibox) {
    await page.mouse.move(ibox.x + ibox.width / 2, ibox.y + ibox.height / 2);
    await page.mouse.down();
    const activeFill = await instaRect.evaluate((el: SVGRectElement) => getComputedStyle(el).fill);
    assert.equal(activeFill, toRGB("#000000"), `${name}: Instagram icon active fill`);
    await page.mouse.up();
  }

  await browser.close();
}

test("Footer colors: consistent black text on white (Chromium)", async () => {
  await runColorChecks(chromium, "Chromium");
});

test("Footer colors: consistent black text on white (Firefox)", async () => {
  await runColorChecks(firefox, "Firefox");
});

test("Footer colors: consistent black text on white (WebKit)", async () => {
  await runColorChecks(webkit, "WebKit");
});