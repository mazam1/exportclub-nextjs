import { chromium } from 'playwright';

async function main() {
  const url = process.env.URL || 'http://localhost:3000/';
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1581, height: 440 } });
  await page.goto(url, { waitUntil: 'domcontentloaded' });

  await page.addStyleTag({ content: `
    footer.site-footer { width: 1581px !important; height: 439px !important; border-top-width: 1px !important; overflow: hidden !important; }
    .max-w-[1581px] { max-width: 1581px !important; }
    body { background: #ffffff !important; }
  `});

  const footer = page.locator('footer.site-footer');
  await footer.waitFor({ state: 'visible' });

  await footer.screenshot({
    path: 'exportclub1/public/footer-exportclub.png',
    type: 'png'
  });

  await browser.close();
  console.log('Saved footer screenshot to exportclub1/public/footer-exportclub.png');
}

main().catch(err => {
  console.error('[screenshot-footer] error:', err);
  process.exit(1);
});