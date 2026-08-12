import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const OUT_DIR = path.join(ROOT, "current desigh");
const BASE = "http://localhost:3000";

const VIEWPORT = { width: 1440, height: 900 };

const PAGES = [
  { file: "01-home-full", url: "/", fullPage: true },
  { file: "10-about-full", url: "/about", fullPage: true },
  { file: "11-programs-full", url: "/programs", fullPage: true },
  { file: "12-events-full", url: "/events", fullPage: true },
  {
    file: "13-event-detail-full",
    url: "/events/startup-101-workshop-2026",
    fullPage: true,
  },
  { file: "14-portfolio-full", url: "/portfolio", fullPage: true },
  { file: "15-portfolio-detail-full", url: "/portfolio/agrilink", fullPage: true },
  { file: "16-team-full", url: "/team", fullPage: true },
  { file: "17-contact-full", url: "/contact", fullPage: true },
  { file: "18-apply-full", url: "/apply", fullPage: true },
];

const HOME_SECTIONS = [
  { file: "02-home-hero", scrollY: 0 },
  { file: "03-home-difference", scrollY: 900 },
  { file: "04-home-programs", scrollY: 1800 },
  { file: "05-home-events", scrollY: 2700 },
  { file: "06-home-stats", scrollY: 3600 },
  { file: "07-home-journey", scrollY: 4500 },
  { file: "08-home-team", scrollY: 5400 },
  { file: "09-home-cta", scrollY: 6300 },
  { file: "19-home-header-scrolled", scrollY: 120 },
];

async function preparePage(page) {
  await page.addInitScript(() => {
    sessionStorage.setItem("sinc-splash-seen", "1");
  });
  await page.setViewportSize(VIEWPORT);
}

async function waitForStable(page) {
  await page.waitForLoadState("load", { timeout: 30000 }).catch(() => {});
  await page.waitForTimeout(1500);
}

async function capture(page, file, options = {}) {
  const target = path.join(OUT_DIR, `${file}.png`);
  await page.screenshot({ path: target, fullPage: options.fullPage ?? false });
  console.log(`saved ${file}.png`);
}

async function gotoPage(page, url) {
  await page.goto(`${BASE}${url}`, {
    waitUntil: "load",
    timeout: 60000,
  });
  await waitForStable(page);
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: VIEWPORT,
    deviceScaleFactor: 1,
  });
  const page = await context.newPage();
  await preparePage(page);

  for (const entry of PAGES) {
    try {
      await gotoPage(page, entry.url);
      await capture(page, entry.file, { fullPage: entry.fullPage });
    } catch (error) {
      console.error(`failed ${entry.file}: ${error.message}`);
    }
  }

  try {
    await gotoPage(page, "/");
  } catch (error) {
    console.error(`failed home sections setup: ${error.message}`);
  }

  const pageHeight = await page.evaluate(() => document.body.scrollHeight);
  const step = VIEWPORT.height;

  for (let i = 0; i < HOME_SECTIONS.length; i++) {
    const section = HOME_SECTIONS[i];
    const maxScroll = Math.max(0, pageHeight - VIEWPORT.height);
    const scrollY = Math.min(section.scrollY, maxScroll);
    await page.evaluate((y) => window.scrollTo(0, y), scrollY);
    await page.waitForTimeout(600);
    await capture(page, section.file);
  }

  await browser.close();
  console.log(`\nDone. Screenshots in: ${OUT_DIR}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
