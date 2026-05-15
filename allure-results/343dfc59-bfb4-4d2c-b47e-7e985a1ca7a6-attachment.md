# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: e2e\auth.spec.ts >> Authentication Tests >> User cannot login with invalid credentials
- Location: tests\e2e\auth.spec.ts:17:7

# Error details

```
Error: page.goto: net::ERR_HTTP2_PROTOCOL_ERROR at https://www.eventim.de/login
Call log:
  - navigating to "https://www.eventim.de/login", waiting until "load"

```

# Test source

```ts
  1  | import { Page } from '@playwright/test';
  2  | import { Selectors } from '../core/selectors';
  3  | 
  4  | export class LoginPage {
  5  |   constructor(private page: Page) {}
  6  | 
  7  |   async navigate(): Promise<void> {
> 8  |     await this.page.goto('/login');
     |                     ^ Error: page.goto: net::ERR_HTTP2_PROTOCOL_ERROR at https://www.eventim.de/login
  9  |   }
  10 | 
  11 |   async login(email: string, password: string): Promise<void> {
  12 |     await this.page.fill(Selectors.auth.emailInput, email);
  13 |     await this.page.fill(Selectors.auth.passwordInput, password);
  14 |     await this.page.click(Selectors.auth.submitLogin);
  15 |     await this.page.waitForLoadState('networkidle');
  16 |   }
  17 | 
  18 |   async register(email: string, password: string): Promise<void> {
  19 |     await this.page.click(Selectors.auth.registerLink);
  20 |     await this.page.fill(Selectors.auth.registerEmail, email);
  21 |     await this.page.fill(Selectors.auth.registerPassword, password);
  22 |     await this.page.fill(Selectors.auth.registerConfirm, password);
  23 |     await this.page.click(Selectors.auth.submitRegister);
  24 |     await this.page.waitForLoadState('networkidle');
  25 |   }
  26 | 
  27 |   async getErrorMessage(): Promise<string | null> {
  28 |     const errorLocator = this.page.locator(Selectors.auth.errorMessage);
  29 |     if (await errorLocator.isVisible()) {
  30 |       return errorLocator.textContent();
  31 |     }
  32 |     return null;
  33 |   }
  34 | 
  35 |   async isUserLoggedIn(): Promise<boolean> {
  36 |     return this.page.locator(Selectors.auth.userMenu).isVisible();
  37 |   }
  38 | 
  39 |   async logout(): Promise<void> {
  40 |     await this.page.click(Selectors.auth.userMenu);
  41 |     await this.page.click(Selectors.auth.logoutButton);
  42 |   }
  43 | }
  44 | 
```