import { test } from "node:test";
import assert from "node:assert/strict";
import { chromium, firefox, webkit, BrowserType } from "playwright";

const viewports = [
  { width: 360, height: 640 },
  { width: 768, height: 1024 },
  { width: 1024, height: 768 },
  { width: 1440, height: 900 },
];

  async function runChecks(browserType: BrowserType, name: string) {
  for (const vp of viewports) {
    const browser = await browserType.launch();
    const page = await browser.newPage({ viewport: vp });
    await page.goto("http://localhost:3000/", { waitUntil: "domcontentloaded" });

    const header = page.locator("header.sticky").first();
    const headerContainer = page.locator("header.sticky div.max-w-7xl").first();
    const logoLink = page.locator('header.sticky a[aria-label="ExportClub home"]');
    const hamburgerBtn = page.locator('header.sticky button[aria-haspopup="menu"]');
    const hamburgerSvg = page.locator('header.sticky button[aria-haspopup="menu"] svg');
    const logoImg = page.locator('header.sticky img[alt="ExportClub logo"]');

    await Promise.all([
      header.waitFor({ state: 'visible' }),
      headerContainer.waitFor({ state: 'visible' }),
      logoLink.waitFor({ state: 'visible' }),
      hamburgerBtn.waitFor({ state: 'visible' }),
      hamburgerSvg.waitFor({ state: 'attached' }),
      logoImg.waitFor({ state: 'visible' }),
    ]);

    const hHeaderBox = await header.boundingBox();
    const cbox = await headerContainer.boundingBox();
    const lbox = await logoLink.boundingBox();
    const hbox = await hamburgerBtn.boundingBox();
    const hsvgBox = await hamburgerSvg.boundingBox();
    const libox = await logoImg.boundingBox();
    console.log(`[${name} ${vp.width}x${vp.height}] header`, hHeaderBox);
    console.log(`[${name} ${vp.width}x${vp.height}] container`, cbox);
    console.log(`[${name} ${vp.width}x${vp.height}] logoLink`, lbox);
    console.log(`[${name} ${vp.width}x${vp.height}] hamburger`, hbox);

    assert.ok(hHeaderBox && cbox && lbox && hbox && hsvgBox && libox, "Header elements must be present");

    const containerCenter = cbox.x + cbox.width / 2;
    const logoCenter = lbox.x + lbox.width / 2;

    assert.ok(
      Math.abs(containerCenter - logoCenter) <= 2,
      `Logo is not horizontally centered in ${name} at ${vp.width}x${vp.height}`
    );

    assert.ok(
      Math.abs(hbox.x - 16) <= 3,
      `Hamburger X not at 16px in ${name} at ${vp.width}x${vp.height} (got ${hbox.x})`
    );
    assert.ok(
      Math.abs(hbox.y - 16) <= 3,
      `Hamburger Y not at 16px in ${name} at ${vp.width}x${vp.height} (got ${hbox.y})`
    );

    const computed = await hamburgerBtn.evaluate((el) => {
      const s = getComputedStyle(el as HTMLElement);
      return { position: s.position, top: s.top, left: s.left, zIndex: s.zIndex };
    });
    assert.equal(computed.position, "fixed", `Hamburger is not position:fixed in ${name}`);
    assert.equal(computed.top, "16px", `Hamburger top not 16px in ${name} (got ${computed.top})`);
    assert.equal(computed.left, "16px", `Hamburger left not 16px in ${name} (got ${computed.left})`);
    assert.equal(computed.zIndex, "60", `Hamburger z-index not 60 in ${name} (got ${computed.zIndex})`);

    // Height checks: header height ~77.5px, logo height ~56.5px, hamburger icon ~30px
    assert.ok(
      Math.abs(hHeaderBox.height - 77.5) <= 1.2,
      `Header height not ~77.5px in ${name} at ${vp.width}x${vp.height} (got ${hHeaderBox.height})`
    );
    assert.ok(
      Math.abs(libox.height - 56.5) <= 1.2,
      `Logo height not ~56.5px in ${name} at ${vp.width}x${vp.height} (got ${libox.height})`
    );
    assert.ok(
      Math.abs(hsvgBox.height - 30) <= 1.2,
      `Hamburger icon height not ~30px in ${name} at ${vp.width}x${vp.height} (got ${hsvgBox.height})`
    );

    // Top-right icons: presence, sizing, vertical center alignment, spacing, and right margin
    const searchLink = page.locator('header.sticky a[aria-label="Search"]').first();
    const wishlistLink = page.locator('header.sticky a[aria-label="Wishlist"]').first();
    const profileLink = page.locator('header.sticky a[aria-label="Profile"]').first();
    const cartLink = page.locator('header.sticky a[aria-label="View shopping cart"]').first();
    await Promise.all([
      searchLink.waitFor({ state: 'visible' }),
      wishlistLink.waitFor({ state: 'visible' }),
      profileLink.waitFor({ state: 'visible' }),
      cartLink.waitFor({ state: 'visible' }),
    ]);

    const boxes = await Promise.all([
      searchLink.boundingBox(),
      wishlistLink.boundingBox(),
      profileLink.boundingBox(),
      cartLink.boundingBox(),
    ]);
    assert.ok(boxes.every(Boolean), 'Icon links must have bounding boxes');

    const [sBox, wBox, pBox, cBox] = boxes as NonNullable<typeof boxes[0]>[];

    // Touch targets: 48x48
    for (const bb of [sBox, wBox, pBox, cBox]) {
      assert.ok(Math.abs(bb.width - 48) <= 1.5, `Icon target width not 48px in ${name} (got ${bb.width})`);
      assert.ok(Math.abs(bb.height - 48) <= 1.5, `Icon target height not 48px in ${name} (got ${bb.height})`);
    }

    // SVG size: 24x24
    const sSvg = page.locator('header.sticky a[aria-label="Search"] svg').first();
    const wSvg = page.locator('header.sticky a[aria-label="Wishlist"] svg').first();
    const pSvg = page.locator('header.sticky a[aria-label="Profile"] svg').first();
    const cSvg = page.locator('header.sticky a[aria-label="View shopping cart"] svg').first();
    const svgBoxes = await Promise.all([
      sSvg.boundingBox(), wSvg.boundingBox(), pSvg.boundingBox(), cSvg.boundingBox()
    ]);
    for (const bb of svgBoxes as NonNullable<typeof svgBoxes[0]>[]) {
      assert.ok(Math.abs(bb.width - 24) <= 1.5, `Icon SVG width not 24px in ${name} (got ${bb.width})`);
      assert.ok(Math.abs(bb.height - 24) <= 1.5, `Icon SVG height not 24px in ${name} (got ${bb.height})`);
    }

    // Vertical centering within header
    const headerMidY = (hHeaderBox!.y + hHeaderBox!.height / 2);
    for (const bb of [sBox, wBox, pBox, cBox]) {
      const mid = bb.y + bb.height / 2;
      assert.ok(Math.abs(mid - headerMidY) <= 2.5, `Icon not vertically centered in ${name} at ${vp.width}x${vp.height}`);
    }

    // Spacing between icons: ~12px
    const gaps = [
      wBox.x - (sBox.x + sBox.width),
      pBox.x - (wBox.x + wBox.width),
      cBox.x - (pBox.x + pBox.width),
    ];
    for (const gap of gaps) {
      assert.ok(Math.abs(gap - 12) <= 2, `Icon gap not ~12px in ${name} (got ${gap})`);
    }

    // Right margin from header edge: 16px (check cart icon right edge)
    const headerRight = hHeaderBox!.x + hHeaderBox!.width;
    const cartRight = cBox.x + cBox.width;
    assert.ok(Math.abs(headerRight - cartRight - 16) <= 3, `Right margin not 16px in ${name} (got ${headerRight - cartRight})`);

    await browser.close();
  }
}

test("Header layout: centered logo and top-left hamburger (Chromium)", async () => {
  await runChecks(chromium, "Chromium");
});

test("Header layout: centered logo and top-left hamburger (Firefox)", async () => {
  await runChecks(firefox, "Firefox");
});

test("Header layout: centered logo and top-left hamburger (WebKit)", async () => {
  await runChecks(webkit, "WebKit");
});