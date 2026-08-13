import { chromium } from "playwright";

const browser = await chromium.launch();
const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
await context.addInitScript(() => sessionStorage.setItem("sinc-splash-seen", "1"));
const page = await context.newPage();

await page.goto("http://localhost:3000", { waitUntil: "networkidle", timeout: 60000 });
await page.waitForTimeout(500);

const section = page.locator(".programs-dark-grid");
await section.waitFor({ timeout: 15000 });
await section.scrollIntoViewIfNeeded();
await page.waitForTimeout(600);

await page.screenshot({ path: "scripts/programs-headline-check.png" });

const result = await page.evaluate(() => {
  const selectors = [
    { name: "programs", sel: ".programs-dark-grid h2" },
    { name: "difference", sel: ".cross-grid + div h2, section .cross-grid ~ div h2" },
    { name: "cta", sel: "section.bg-foreground h2.editorial-display" },
  ];

  function measureHeadline(h) {
    if (!h) return null;
    const hStyle = getComputedStyle(h);
    const range = document.createRange();
    range.selectNodeContents(h);
    const lineRects = [...range.getClientRects()]
      .filter((rect) => rect.width > 0 && rect.height > 0)
      .map((rect, i) => ({
        line: i + 1,
        top: rect.top,
        bottom: rect.bottom,
        height: rect.height,
      }));

    let maxOverlapPx = 0;
    for (let i = 0; i < lineRects.length - 1; i++) {
      const gap = lineRects[i + 1].top - lineRects[i].bottom;
      if (gap < 0) maxOverlapPx = Math.max(maxOverlapPx, -gap);
    }

    return {
      headlineLineHeight: hStyle.lineHeight,
      lineCount: lineRects.length,
      maxOverlapPx,
      lineRects,
    };
  }

  const out = {};
  for (const { name, sel } of selectors) {
    const h = document.querySelector(sel);
    out[name] = measureHeadline(h);
  }

  out.difference = measureHeadline(
    [...document.querySelectorAll("h2.editorial-display")].find((el) =>
      el.textContent?.includes("campus")
    ) ?? null
  );

  return out;
});

console.log(JSON.stringify(result, null, 2));
await browser.close();
