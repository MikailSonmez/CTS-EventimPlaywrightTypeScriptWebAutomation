# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: e2e\event-search.spec.ts >> Event Search Flow >> Homepage loads with hero section
- Location: tests\e2e\event-search.spec.ts:37:7

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
  3  | import users from '../../fixtures/users.json';
  4  | import events from '../../fixtures/events.json';
  5  | 
  6  | test.describe('Event Search Flow', () => {
  7  |   test.beforeEach(async ({ page }) => {
> 8  |     await page.goto('/');
     |                ^ Error: page.goto: net::ERR_HTTP2_PROTOCOL_ERROR at https://www.eventim.de/
  9  |   });
  10 | 
  11 |   // 🔴 TDD: Red → Green → Refactor
  12 |   test('User can search for an event by name', async ({ page }) => {
  13 |     const home = new HomePage(page);
  14 |     await home.acceptCookiesIfVisible();
  15 |     await home.searchEvent('Coldplay');
  16 | 
  17 |     const results = page.locator('[data-testid="event-card"]');
  18 |     await expect(results.first()).toBeVisible();
  19 |   });
  20 | 
  21 |   test('Search returns relevant results', async ({ page }) => {
  22 |     const home = new HomePage(page);
  23 |     await home.searchEvent(events.events[0].name);
  24 | 
  25 |     const eventTitle = page.locator('[data-testid="event-title"]').first();
  26 |     await expect(eventTitle).toContainText(events.events[0].category);
  27 |   });
  28 | 
  29 |   test('Empty search shows no results message', async ({ page }) => {
  30 |     const home = new HomePage(page);
  31 |     await home.searchEvent('xyznonexistentevent12345');
  32 | 
  33 |     const noResults = page.locator('[data-testid="no-results"]');
  34 |     await expect(noResults).toBeVisible();
  35 |   });
  36 | 
  37 |   test('Homepage loads with hero section', async ({ page }) => {
  38 |     const home = new HomePage(page);
  39 |     await home.navigate();
  40 |     const isVisible = await home.isHeroVisible();
  41 |     expect(isVisible).toBeTruthy();
  42 |   });
  43 | });
  44 | 
```