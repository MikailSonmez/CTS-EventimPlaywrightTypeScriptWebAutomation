import { Page } from '@playwright/test';
import { Selectors } from '../core/selectors';

export class Header {
  constructor(private page: Page) {}

  async isLogoVisible(): Promise<boolean> {
    return this.page.locator(Selectors.header.logo).isVisible();
  }

  async getCartCount(): Promise<string> {
    return this.page.locator(Selectors.header.cartCount).innerText();
  }

  async clickCart(): Promise<void> {
    await this.page.click(Selectors.header.cartIcon);
  }

  async clickLogin(): Promise<void> {
    await this.page.click(Selectors.auth.loginButton);
  }
}
