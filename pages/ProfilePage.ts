import { Page } from '@playwright/test';
import { Selectors } from '../core/selectors';

export class ProfilePage {
  constructor(private page: Page) {}

  async navigate(): Promise<void> {
    await this.page.goto('/profile');
  }

  async isProfileHeaderVisible(): Promise<boolean> {
    return this.page.locator(Selectors.profile.profileHeader).isVisible();
  }

  async updatePersonalInfo(firstName: string, lastName: string, phone: string): Promise<void> {
    await this.page.fill(Selectors.profile.firstNameInput, firstName);
    await this.page.fill(Selectors.profile.lastNameInput, lastName);
    await this.page.fill(Selectors.profile.phoneInput, phone);
    await this.page.click(Selectors.profile.saveProfileBtn);
    await this.page.waitForLoadState('networkidle');
  }

  async isSuccessToastVisible(): Promise<boolean> {
    return this.page.locator(Selectors.profile.successToast).isVisible();
  }

  async getOrderHistoryCount(): Promise<number> {
    return this.page.locator(Selectors.profile.orderItem).count();
  }
}
