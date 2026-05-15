# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: e2e\cart.spec.ts >> Cart and Shopping Bag Tests >> Cart shows empty message initially
- Location: tests\e2e\cart.spec.ts:19:7

# Error details

```
Error: page.goto: net::ERR_HTTP2_PROTOCOL_ERROR at https://www.eventim.de/cart
Call log:
  - navigating to "https://www.eventim.de/cart", waiting until "load"

```

# Test source

```ts
  1  | import { Page } from '@playwright/test';
  2  | import { Selectors } from '../core/selectors';
  3  | 
  4  | export class CartPage {
  5  |   constructor(private page: Page) {}
  6  | 
  7  |   async navigate(): Promise<void> {
> 8  |     await this.page.goto('/cart');
     |                     ^ Error: page.goto: net::ERR_HTTP2_PROTOCOL_ERROR at https://www.eventim.de/cart
  9  |   }
  10 | 
  11 |   async getCartItemsCount(): Promise<number> {
  12 |     return this.page.locator(Selectors.cart.cartItem).count();
  13 |   }
  14 | 
  15 |   async removeItem(index: number = 0): Promise<void> {
  16 |     const removeBtns = this.page.locator(Selectors.cart.removeBtn);
  17 |     if (await removeBtns.count() > index) {
  18 |       await removeBtns.nth(index).click();
  19 |       await this.page.waitForLoadState('networkidle');
  20 |     }
  21 |   }
  22 | 
  23 |   async updateQuantity(index: number, quantity: string): Promise<void> {
  24 |     const qtyInputs = this.page.locator(Selectors.cart.quantityInput);
  25 |     if (await qtyInputs.count() > index) {
  26 |       await qtyInputs.nth(index).fill(quantity);
  27 |       await this.page.waitForLoadState('networkidle');
  28 |     }
  29 |   }
  30 | 
  31 |   async isEmptyMessageVisible(): Promise<boolean> {
  32 |     return this.page.locator(Selectors.cart.emptyCartMessage).isVisible();
  33 |   }
  34 | 
  35 |   async proceedToCheckout(): Promise<void> {
  36 |     await this.page.click(Selectors.cart.checkoutBtn);
  37 |     await this.page.waitForLoadState('networkidle');
  38 |   }
  39 | }
  40 | 
```