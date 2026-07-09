import { test, expect, type Page } from "@playwright/test";

/** Instant-scroll helper: the site uses scroll-driven animation, so jump then settle. */
async function scrollTo(page: Page, y: number) {
  await page.evaluate((top) => window.scrollTo({ top, behavior: "instant" }), y);
  await page.waitForTimeout(400);
}

test.beforeEach(async ({ page }) => {
  await page.goto("/");
  await page.waitForLoadState("networkidle");
});

test.describe("Navigation (bug #1)", () => {
  test("nav stays visible while scrolling down the page", async ({ page }) => {
    const header = page.locator("header.nav-shell");
    await expect(header).toBeVisible();

    // Scroll deep into the page in a few steps, simulating downward reading.
    for (const y of [600, 1400, 2600, 4200]) {
      await scrollTo(page, y);
    }

    // The header must not carry the auto-hide class nor be translated off-screen.
    await expect(header).not.toHaveClass(/nav-shell--hidden/);
    const box = await header.boundingBox();
    expect(box).not.toBeNull();
    expect(box!.y).toBeGreaterThanOrEqual(-4);
  });
});

test.describe("FAQ accordion (bug #21)", () => {
  test("all items are closed by default and open only on click", async ({
    page,
  }) => {
    await page.locator("#faq").scrollIntoViewIfNeeded();
    await page.waitForTimeout(800); // allow reveal animations to settle

    const triggers = page.locator("#faq [data-state]").locator("visible=true");
    const openItems = page.locator('#faq [data-state="open"]');

    // Nothing may be open before the user interacts — including the last item.
    await expect(openItems).toHaveCount(0);

    // Clicking the first question opens exactly that one.
    const firstTrigger = page
      .locator("#faq button, #faq [role='button']")
      .filter({ hasText: /what services/i })
      .first();
    await firstTrigger.click();
    await expect(
      page.locator('#faq [data-state="open"]').first()
    ).toBeVisible();

    expect(await triggers.count()).toBeGreaterThan(0);
  });
});

test.describe("Brand wordmark (bug #23)", () => {
  test("footer giant background text reads SOLVE TREND", async ({ page }) => {
    const giant = page.locator(".footer-giant-bg-text");
    await expect(giant).toHaveText(/solve\s*trend/i, { useInnerText: true });
  });
});

test.describe("Hero rotating word (bug #4 regression guard)", () => {
  test("headline word cycles on its own without hover", async ({ page }) => {
    const word = page.locator(".hero-trend-inner");
    const first = await word.innerText();
    await expect
      .poll(async () => word.innerText(), { timeout: 4000 })
      .not.toBe(first);
  });
});

test.describe("Layout integrity", () => {
  test("page has no horizontal overflow", async ({ page }) => {
    // Sample a few scroll depths; overflow can appear in any section.
    for (const y of [0, 2000, 9000, 16000, 24000]) {
      await scrollTo(page, y);
      const overflow = await page.evaluate(() => {
        const de = document.documentElement;
        return de.scrollWidth - de.clientWidth;
      });
      expect(overflow, `horizontal overflow at scrollY=${y}`).toBeLessThanOrEqual(1);
    }
  });
});
