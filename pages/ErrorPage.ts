import { Page } from '@playwright/test';
import { Selectors } from '../core/selectors';

export class ErrorPage {
  constructor(private page: Page) {}

  async navigateTo404(): Promise<void> {
    await this.page.goto('/this-page-does-not-exist-12345');
  }

  async getErrorCode(): Promise<string | null> {
    const errorTitle = this.page.locator('h1.error-code, [data-testid="error-code"]');
    if (await errorTitle.isVisible()) {
      return errorTitle.textContent();
    }
    return null;
  }

  async getErrorMessage(): Promise<string | null> {
    const errorMessage = this.page.locator('p.error-message, [data-testid="error-message"]');
    if (await errorMessage.isVisible()) {
      return errorMessage.textContent();
    }
    return null;
  }

  async clickGoHomeButton(): Promise<void> {
    const goHomeBtn = this.page.locator('a.go-home, [data-testid="go-home-btn"]');
    if (await goHomeBtn.isVisible()) {
      await goHomeBtn.click();
    }
  }
}
