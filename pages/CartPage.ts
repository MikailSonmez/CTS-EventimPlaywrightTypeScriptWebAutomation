import { Page } from '@playwright/test';
import { Selectors } from '../core/selectors';

export class CartPage {
  constructor(private page: Page) {}

  async navigate(): Promise<void> {
    await this.page.goto('/cart');
  }

  async getCartItemsCount(): Promise<number> {
    return this.page.locator(Selectors.cart.cartItem).count();
  }

  async removeItem(index: number = 0): Promise<void> {
    const removeBtns = this.page.locator(Selectors.cart.removeBtn);
    if (await removeBtns.count() > index) {
      await removeBtns.nth(index).click();
      await this.page.waitForLoadState('networkidle');
    }
  }

  async updateQuantity(index: number, quantity: string): Promise<void> {
    const qtyInputs = this.page.locator(Selectors.cart.quantityInput);
    if (await qtyInputs.count() > index) {
      await qtyInputs.nth(index).fill(quantity);
      await this.page.waitForLoadState('networkidle');
    }
  }

  async isEmptyMessageVisible(): Promise<boolean> {
    return this.page.locator(Selectors.cart.emptyCartMessage).isVisible();
  }

  async proceedToCheckout(): Promise<void> {
    await this.page.click(Selectors.cart.checkoutBtn);
    await this.page.waitForLoadState('networkidle');
  }
}
