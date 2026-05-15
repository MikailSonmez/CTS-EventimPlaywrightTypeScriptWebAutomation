# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: e2e\ticket-flow.spec.ts >> Ticket Checkout Flow >> Full ticket flow navigates to checkout
- Location: tests\e2e\ticket-flow.spec.ts:34:7

# Error details

```
Error: page.goto: net::ERR_HTTP2_PROTOCOL_ERROR at https://www.eventim.de/
Call log:
  - navigating to "https://www.eventim.de/", waiting until "load"

```

# Test source

```ts
  1  | import { test, expect } from '../../core/baseTest';
  2  | import { HomePage } from '../../pages/HomePage';
  3  | import { EventPage } from '../../pages/EventPage';
  4  | import { CheckoutPage } from '../../pages/CheckoutPage';
  5  | 
  6  | test.describe('Ticket Checkout Flow', () => {
  7  |   test.beforeEach(async ({ page }) => {
> 8  |     await page.goto('/');
     |                ^ Error: page.goto: net::ERR_HTTP2_PROTOCOL_ERROR at https://www.eventim.de/
  9  |   });
  10 | 
  11 |   test('User can view event details', async ({ page }) => {
  12 |     const home = new HomePage(page);
  13 |     const eventPage = new EventPage(page);
  14 | 
  15 |     await home.acceptCookiesIfVisible();
  16 |     await home.searchEvent('Coldplay');
  17 |     await eventPage.clickFirstEvent();
  18 | 
  19 |     const title = await eventPage.getEventTitle();
  20 |     expect(title.length).toBeGreaterThan(0);
  21 |   });
  22 | 
  23 |   test('Buy ticket button is visible on event page', async ({ page }) => {
  24 |     const home = new HomePage(page);
  25 |     const eventPage = new EventPage(page);
  26 | 
  27 |     await home.acceptCookiesIfVisible();
  28 |     await home.searchEvent('Coldplay');
  29 |     await eventPage.clickFirstEvent();
  30 | 
  31 |     await expect(page.locator('[data-testid="buy-ticket-btn"]')).toBeVisible();
  32 |   });
  33 | 
  34 |   test('Full ticket flow navigates to checkout', async ({ page }) => {
  35 |     const home = new HomePage(page);
  36 |     const eventPage = new EventPage(page);
  37 | 
  38 |     await home.acceptCookiesIfVisible();
  39 |     await home.searchEvent('Coldplay');
  40 |     await eventPage.clickFirstEvent();
  41 |     await eventPage.clickBuyTicket();
  42 | 
  43 |     await expect(page).toHaveURL(/checkout|tickets/);
  44 |   });
  45 | });
  46 | 
```