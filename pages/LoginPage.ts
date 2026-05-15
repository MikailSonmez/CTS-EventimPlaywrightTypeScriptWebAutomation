import { Page } from '@playwright/test';
import { Selectors } from '../core/selectors';

export class LoginPage {
  constructor(private page: Page) {}

  async navigate(): Promise<void> {
    await this.page.goto('/login');
  }

  async login(email: string, password: string): Promise<void> {
    await this.page.fill(Selectors.auth.emailInput, email);
    await this.page.fill(Selectors.auth.passwordInput, password);
    await this.page.click(Selectors.auth.submitLogin);
    await this.page.waitForLoadState('networkidle');
  }

  async register(email: string, password: string): Promise<void> {
    await this.page.click(Selectors.auth.registerLink);
    await this.page.fill(Selectors.auth.registerEmail, email);
    await this.page.fill(Selectors.auth.registerPassword, password);
    await this.page.fill(Selectors.auth.registerConfirm, password);
    await this.page.click(Selectors.auth.submitRegister);
    await this.page.waitForLoadState('networkidle');
  }

  async getErrorMessage(): Promise<string | null> {
    const errorLocator = this.page.locator(Selectors.auth.errorMessage);
    if (await errorLocator.isVisible()) {
      return errorLocator.textContent();
    }
    return null;
  }

  async isUserLoggedIn(): Promise<boolean> {
    return this.page.locator(Selectors.auth.userMenu).isVisible();
  }

  async logout(): Promise<void> {
    await this.page.click(Selectors.auth.userMenu);
    await this.page.click(Selectors.auth.logoutButton);
  }
}
