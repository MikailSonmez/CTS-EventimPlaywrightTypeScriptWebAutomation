import { test, expect } from '@playwright/test';

test.describe('Smoke Tests', () => {
  test('Homepage loads successfully', async ({ page }) => {
    const response = await page.goto('/');
    expect(response?.status()).toBeLessThan(400);
    await expect(page).toHaveTitle(/EVENTIM/i);
  });

  test('Search bar is present', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('[data-testid="search-input"]')).toBeVisible();
  });

  test('Header logo is visible', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('[data-testid="header-logo"]')).toBeVisible();
  });

  test('No console errors on homepage', async ({ page }) => {
    const errors: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'error') errors.push(msg.text());
    });

    await page.goto('/');
    expect(errors.length).toBe(0);
  });
});
