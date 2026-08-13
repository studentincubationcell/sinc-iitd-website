import { chromium } from "playwright";

const browser = await chromium.launch();
const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
await context.addInitScript(() => sessionStorage.setItem("sinc-splash-seen", "1"));
const page = await context.newPage();
await page.goto("http://localhost:3000", { waitUntil: "networkidle", timeout: 60000 });

const shots = [
  { file: "scripts/headline-programs.png", sel: ".programs-dark-grid h2" },
  { file: "scripts/headline-difference.png", text: "campus" },
  { file: "scripts/headline-cta.png", text: "something real" },
];

for (const shot of shots) {
  if (shot.sel) {
    await page.locator(shot.sel).scrollIntoViewIfNeeded();
  } else {
    await page.getByRole("heading", { name: new RegExp(shot.text, "i") }).scrollIntoViewIfNeeded();
  }
  await page.waitForTimeout(500);
  await page.screenshot({ path: shot.file });
  console.log("saved", shot.file);
}

await browser.close();
