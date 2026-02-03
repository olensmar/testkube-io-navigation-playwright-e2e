import { test, expect } from '@playwright/test';

const TOP_NAV = {
  Docs: /\/docs\b/i,
  Pricing: /\/pricing\b/i,
  Blog: /\/blog\b/i,
};

test.describe('testkube.io navigation', () => {
  test('home page loads and has expected title', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Testkube/i);
  });

  for (const [label, urlRegex] of Object.entries(TOP_NAV)) {
    test(`top nav: ${label} link navigates correctly`, async ({ page }) => {
      await page.goto('/');

      const link = page.getByRole('link', { name: new RegExp(`^${label}$`, 'i') });
      await expect(link).toBeVisible();

      await Promise.all([
        page.waitForURL(urlRegex, { timeout: 20_000 }),
        link.click(),
      ]);

      await expect(page).toHaveURL(urlRegex);

      // Basic smoke assertion that the destination page rendered some content.
      await expect(page.locator('body')).toContainText(/Testkube|Docs|Pricing|Blog/i);
    });
  }

  test('logo click returns to home', async ({ page }) => {
    await page.goto('/docs');

    // Prefer an accessible "home" link; fall back to first header link.
    const logoLink = page
      .getByRole('link', { name: /testkube/i })
      .first();

    await expect(logoLink).toBeVisible();

    await Promise.all([
      page.waitForURL(/https:\/\/testkube\.io\/?$/i, { timeout: 20_000 }),
      logoLink.click(),
    ]);

    await expect(page).toHaveURL(/\/$/);
  });
});
