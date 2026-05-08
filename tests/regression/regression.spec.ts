import { test, expect } from '@playwright/test';

test.describe('Regression Suite', () => {
  test('Event cards display price in EUR', async ({ page }) => {
    await page.goto('/');
    await page.fill('[data-testid="search-input"]', 'Concert');
    await page.click('[data-testid="search-button"]');
    await page.waitForLoadState('networkidle');

    const prices = page.locator('[data-testid="event-price"]');
    const count = await prices.count();

    for (let i = 0; i < Math.min(count, 5); i++) {
      const priceText = await prices.nth(i).innerText();
      expect(priceText).toMatch(/€/);
    }
  });

  test('Pagination works on search results', async ({ page }) => {
    await page.goto('/');
    await page.fill('[data-testid="search-input"]', 'Musik');
    await page.click('[data-testid="search-button"]');
    await page.waitForLoadState('networkidle');

    const nextPage = page.locator('[data-testid="pagination-next"]');
    if (await nextPage.isVisible()) {
      await nextPage.click();
      await page.waitForLoadState('networkidle');
      await expect(page.locator('[data-testid="event-card"]').first()).toBeVisible();
    }
  });

  test('Category filter reduces results', async ({ page }) => {
    await page.goto('/');
    await page.fill('[data-testid="search-input"]', 'Event');
    await page.click('[data-testid="search-button"]');
    await page.waitForLoadState('networkidle');

    const allCount = await page.locator('[data-testid="event-card"]').count();

    await page.selectOption('[data-testid="category-filter"]', 'Concert');
    await page.waitForLoadState('networkidle');

    const filteredCount = await page.locator('[data-testid="event-card"]').count();
    expect(filteredCount).toBeLessThanOrEqual(allCount);
  });
});
