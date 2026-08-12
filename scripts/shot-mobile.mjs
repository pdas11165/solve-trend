import { chromium } from "playwright";
const base = process.argv[2];
const outDir = process.argv[3];
const { mkdirSync } = await import("fs");
mkdirSync(outDir, { recursive: true });
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
await page.goto(base, { waitUntil: "networkidle" });
await page.waitForTimeout(1500);
async function scrollTo(y) {
  await page.evaluate((yy) => {
    if (window.__lenis) window.__lenis.scrollTo(yy, { immediate: true });
    else window.scrollTo(0, yy);
  }, y);
  await page.waitForTimeout(800);
}
async function shoot(name, selector, offset = -60, frac = null) {
  const top = await page.evaluate((sel) => {
    const el = document.querySelector(sel);
    return el ? el.getBoundingClientRect().top + window.scrollY : null;
  }, selector);
  if (top == null) { console.log(`MISSING: ${selector}`); return; }
  let y = Math.max(top + offset, 0);
  if (frac != null) {
    const h = await page.evaluate((sel) => document.querySelector(sel).getBoundingClientRect().height, selector);
    y = top + Math.max(h - 844, 0) * frac;
  }
  await scrollTo(y);
  await page.screenshot({ path: `${outDir}/${name}.png` });
  console.log(`shot: ${name}`);
}
await shoot("m01-hero", "body", 0);
await shoot("m02-services", "#services");
await shoot("m03-industries", "#industries", 0, 0.3);
await shoot("m04-benefits-1", "#benefits");
await shoot("m04b-benefits-2", "#benefits", 0, 0.55);
await shoot("m05-projects", "#projects");
await shoot("m06-statement", "#studio-statement", 0, 0.5);
await shoot("m07-pricing", "#pricing", 0, 0.15);
await shoot("m08-contact", "#contact");
await shoot("m08b-contact-form", "#contact", 0, 0.5);
await shoot("m09-guarantee", ".guarantee-band-wrap", -500);
await shoot("m10-globe", ".globe-band", -40);
const docH = await page.evaluate(() => document.body.scrollHeight);
await scrollTo(docH);
await page.screenshot({ path: `${outDir}/m11-footer.png` });
console.log("shot: m11-footer");
const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
console.log("mobile overflow px:", overflow);
await browser.close();
