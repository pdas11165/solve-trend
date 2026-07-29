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

test.describe("Careers", () => {
  test("careers is reachable from the footer but stays out of the nav", async ({
    page,
  }) => {
    // Deliberately unlisted in the main nav — the footer link and the hiring
    // strip are the only entry points.
    await expect(page.locator('.nav-pill a[href*="/careers"]')).toHaveCount(0);

    const footerLink = page.locator('footer a[href$="/careers"]').first();
    await expect(footerLink).toHaveCount(1);
  });

  test("the homepage hiring strip tracks whether any role is open", async ({
    page,
  }) => {
    const { IS_HIRING, OPEN_ROLES } = await import("../lib/careers");
    const strip = page.locator('section[aria-label="Open roles"]');

    if (!IS_HIRING) {
      await expect(strip).toHaveCount(0);
      return;
    }

    await expect(strip).toHaveCount(1);
    await expect(strip).toContainText(
      `${OPEN_ROLES.length} open ${OPEN_ROLES.length === 1 ? "role" : "roles"}`,
    );
    await expect(strip.locator('a[href$="/careers"]')).toHaveCount(1);
  });

  test("the careers page lists every open role", async ({ page }) => {
    const { OPEN_ROLES } = await import("../lib/careers");
    await page.goto("/careers");

    for (const role of OPEN_ROLES) {
      await expect(page.locator(`a[href$="/careers/${role.slug}"]`)).toHaveCount(1);
    }

    // Empty state and role list are mutually exclusive.
    await expect(page.locator("#open-roles h2")).toHaveText(
      OPEN_ROLES.length > 0 ? "Open roles" : "No open roles right now",
    );
  });

  test("a role page prefills its own title in the application form", async ({
    page,
  }) => {
    const { OPEN_ROLES } = await import("../lib/careers");
    test.skip(OPEN_ROLES.length === 0, "no open roles to check");

    const role = OPEN_ROLES[0];
    await page.goto(`/careers/${role.slug}`);
    await expect(page.locator("h1")).toHaveText(role.title);
    await expect(page.locator('#apply select[name="role"]')).toHaveValue(role.title);
  });

  test("the application form refuses to submit without a resume", async ({
    page,
  }) => {
    await page.goto("/careers");

    let posted = false;
    page.on("request", (request) => {
      if (request.url().includes("/api/careers/apply")) posted = true;
    });

    await page.fill('#apply input[name="name"]', "Test Candidate");
    await page.fill('#apply input[name="email"]', "test@example.com");
    await page.fill('#apply input[name="phone"]', "555-0100");
    await page.fill('#apply input[name="location"]', "Halifax, NS");
    await page.selectOption('#apply select[name="experience"]', { index: 1 });
    await page.click('#apply button[type="submit"]');

    await expect(page.locator("#apply form")).toContainText("Please attach your resume.");
    expect(posted, "no request should reach the API without a resume").toBe(false);
  });
});
