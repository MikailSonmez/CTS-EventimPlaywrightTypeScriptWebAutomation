# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: smoke\sanity.spec.ts >> Smoke Sanity Checks >> Footer is present and has links
- Location: tests\smoke\sanity.spec.ts:23:7

# Error details

```
Error: page.goto: net::ERR_HTTP2_PROTOCOL_ERROR at https://www.eventim.de/
Call log:
  - navigating to "https://www.eventim.de/", waiting until "load"

```

# Test source

```ts
  1  | import { Page } from '@playwright/test';
  2  | import { Selectors } from '../core/selectors';
  3  | 
  4  | export class HomePage {
  5  |   constructor(private page: Page) {}
  6  | 
  7  |   async navigate(): Promise<void> {
> 8  |     await this.page.goto('/');
     |                     ^ Error: page.goto: net::ERR_HTTP2_PROTOCOL_ERROR at https://www.eventim.de/
  9  |     await this.acceptCookiesIfVisible();
  10 |   }
  11 | 
  12 |   async acceptCookiesIfVisible(): Promise<void> {
  13 |     const banner = this.page.locator(Selectors.home.cookieBanner);
  14 |     if (await banner.isVisible({ timeout: 3000 }).catch(() => false)) {
  15 |       await this.page.click(Selectors.home.acceptCookies);
  16 |     }
  17 |   }
  18 | 
  19 |   async searchEvent(eventName: string): Promise<void> {
  20 |     await this.page.fill(Selectors.home.searchInput, eventName);
  21 |     await this.page.click(Selectors.home.searchButton);
  22 |     await this.page.waitForLoadState('networkidle');
  23 |   }
  24 | 
  25 |   async getFeaturedEvents() {
  26 |     return this.page.locator(Selectors.event.eventCard);
  27 |   }
  28 | 
  29 |   async isHeroVisible(): Promise<boolean> {
  30 |     return this.page.locator(Selectors.home.heroSection).isVisible();
  31 |   }
  32 | }
  33 | 
```