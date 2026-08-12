// Screenshot pass for the 2026-08-10 redesign. Run from the project dir:
//   node scripts/shot-redesign.mjs http://localhost:55484 /path/to/outdir
import { chromium } from "playwright";

const base = process.argv[2] ?? "http://localhost:55484";
const outDir = process.argv[3] ?? "/tmp/redesign-shots";
const { mkdirSync } = await import("fs");
mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto(base, { waitUntil: "networkidle" });
await page.waitForTimeout(1500);

async function scrollTo(y) {
  await page.evaluate((yy) => {
    const lenis = window.__lenis;
    if (lenis) lenis.scrollTo(yy, { immediate: true });
    else window.scrollTo(0, yy);
  }, y);
  await page.waitForTimeout(900);
}

async function sectionTop(selector) {
  return page.evaluate((sel) => {
    const el = document.querySelector(sel);
    if (!el) return null;
    return el.getBoundingClientRect().top + window.scrollY;
  }, selector);
}

async function sectionHeight(selector) {
  return page.evaluate((sel) => {
    const el = document.querySelector(sel);
    return el ? el.getBoundingClientRect().height : 0;
  }, selector);
}

async function shoot(name, selector, offset = -70, extraFrac = null) {
  const top = await sectionTop(selector);
  if (top == null) {
    console.log(`MISSING: ${selector}`);
    return;
  }
  if (extraFrac != null) {
    const h = await sectionHeight(selector);
    const scrollLen = Math.max(h - 900, 0);
    await scrollTo(top + scrollLen * extraFrac);
  } else {
    await scrollTo(Math.max(top + offset, 0));
  }
  await page.screenshot({ path: `${outDir}/${name}.png` });
  console.log(`shot: ${name}`);
}

await shoot("01-services", "#services");
await shoot("02-industries-start", "#industries");
await shoot("02b-industries-stacked", "#industries", 0, 0.75);
await shoot("03-benefits", "#benefits");
await shoot("03b-benefits-bottom", "#benefits", 0, 0.9);
await shoot("04-projects", "#projects");
await shoot("06-statement-early", "#studio-statement", 0, 0.15);
await shoot("06b-statement-revealed", "#studio-statement", 0, 0.55);
await shoot("06c-statement-red", "#studio-statement", 0, 0.92);
await shoot("07-pricing", "#pricing");
await shoot("07b-pricing-cards", "#pricing", 0, 0.35);
await shoot("08-contact", "#contact");
await shoot("09-guarantee", ".guarantee-band-wrap", -350);
await shoot("10-globe", ".globe-band", -80);
await shoot("10-footer", ".cinematic-footer-wrapper", 0);

// Footer bottom (wordmark)
const docH = await page.evaluate(() => document.body.scrollHeight);
await scrollTo(docH);
await page.screenshot({ path: `${outDir}/10b-footer-wordmark.png` });
console.log("shot: 10b-footer-wordmark");

// Overflow check
const overflow = await page.evaluate(
  () => document.documentElement.scrollWidth - document.documentElement.clientWidth
);
console.log("horizontal overflow px:", overflow);

await browser.close();
