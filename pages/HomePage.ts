import { Page } from '@playwright/test';
import { Selectors } from '../core/selectors';

export class HomePage {
  constructor(private page: Page) {}

  async navigate(): Promise<void> {
    await this.page.goto('/');
    await this.acceptCookiesIfVisible();
  }

  async acceptCookiesIfVisible(): Promise<void> {
    const banner = this.page.locator(Selectors.home.cookieBanner);
    if (await banner.isVisible({ timeout: 3000 }).catch(() => false)) {
      await this.page.click(Selectors.home.acceptCookies);
    }
  }

  async searchEvent(eventName: string): Promise<void> {
    await this.page.fill(Selectors.home.searchInput, eventName);
    await this.page.click(Selectors.home.searchButton);
    await this.page.waitForLoadState('networkidle');
  }

  async getFeaturedEvents() {
    return this.page.locator(Selectors.event.eventCard);
  }

  async isHeroVisible(): Promise<boolean> {
    return this.page.locator(Selectors.home.heroSection).isVisible();
  }
}
