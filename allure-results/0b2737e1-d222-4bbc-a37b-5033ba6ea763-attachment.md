# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: regression\regression.spec.ts >> Regression Suite >> Pagination works on search results
- Location: tests\regression\regression.spec.ts:19:7

# Error details

```
Error: page.goto: net::ERR_HTTP2_PROTOCOL_ERROR at https://www.eventim.de/
Call log:
  - navigating to "https://www.eventim.de/", waiting until "load"

```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test.describe('Regression Suite', () => {
  4  |   test('Event cards display price in EUR', async ({ page }) => {
  5  |     await page.goto('/');
  6  |     await page.fill('[data-testid="search-input"]', 'Concert');
  7  |     await page.click('[data-testid="search-button"]');
  8  |     await page.waitForLoadState('networkidle');
  9  | 
  10 |     const prices = page.locator('[data-testid="event-price"]');
  11 |     const count = await prices.count();
  12 | 
  13 |     for (let i = 0; i < Math.min(count, 5); i++) {
  14 |       const priceText = await prices.nth(i).innerText();
  15 |       expect(priceText).toMatch(/€/);
  16 |     }
  17 |   });
  18 | 
  19 |   test('Pagination works on search results', async ({ page }) => {
> 20 |     await page.goto('/');
     |                ^ Error: page.goto: net::ERR_HTTP2_PROTOCOL_ERROR at https://www.eventim.de/
  21 |     await page.fill('[data-testid="search-input"]', 'Musik');
  22 |     await page.click('[data-testid="search-button"]');
  23 |     await page.waitForLoadState('networkidle');
  24 | 
  25 |     const nextPage = page.locator('[data-testid="pagination-next"]');
  26 |     if (await nextPage.isVisible()) {
  27 |       await nextPage.click();
  28 |       await page.waitForLoadState('networkidle');
  29 |       await expect(page.locator('[data-testid="event-card"]').first()).toBeVisible();
  30 |     }
  31 |   });
  32 | 
  33 |   test('Category filter reduces results', async ({ page }) => {
  34 |     await page.goto('/');
  35 |     await page.fill('[data-testid="search-input"]', 'Event');
  36 |     await page.click('[data-testid="search-button"]');
  37 |     await page.waitForLoadState('networkidle');
  38 | 
  39 |     const allCount = await page.locator('[data-testid="event-card"]').count();
  40 | 
  41 |     await page.selectOption('[data-testid="category-filter"]', 'Concert');
  42 |     await page.waitForLoadState('networkidle');
  43 | 
  44 |     const filteredCount = await page.locator('[data-testid="event-card"]').count();
  45 |     expect(filteredCount).toBeLessThanOrEqual(allCount);
  46 |   });
  47 | });
  48 | 
```