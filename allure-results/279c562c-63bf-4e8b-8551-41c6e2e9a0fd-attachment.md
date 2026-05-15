# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: smoke\smoke.spec.ts >> Smoke Tests >> No console errors on homepage
- Location: tests\smoke\smoke.spec.ts:20:7

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
  3  | test.describe('Smoke Tests', () => {
  4  |   test('Homepage loads successfully', async ({ page }) => {
  5  |     const response = await page.goto('/');
  6  |     expect(response?.status()).toBeLessThan(400);
  7  |     await expect(page).toHaveTitle(/EVENTIM/i);
  8  |   });
  9  | 
  10 |   test('Search bar is present', async ({ page }) => {
  11 |     await page.goto('/');
  12 |     await expect(page.locator('[data-testid="search-input"]')).toBeVisible();
  13 |   });
  14 | 
  15 |   test('Header logo is visible', async ({ page }) => {
  16 |     await page.goto('/');
  17 |     await expect(page.locator('[data-testid="header-logo"]')).toBeVisible();
  18 |   });
  19 | 
  20 |   test('No console errors on homepage', async ({ page }) => {
  21 |     const errors: string[] = [];
  22 |     page.on('console', msg => {
  23 |       if (msg.type() === 'error') errors.push(msg.text());
  24 |     });
  25 | 
> 26 |     await page.goto('/');
     |                ^ Error: page.goto: net::ERR_HTTP2_PROTOCOL_ERROR at https://www.eventim.de/
  27 |     expect(errors.length).toBe(0);
  28 |   });
  29 | });
  30 | 
```