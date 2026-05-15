import { Page, Locator } from '@playwright/test';
import { Selectors } from '../core/selectors';

export class EventPage {
  constructor(private page: Page) {}

  async getEventCards(): Promise<Locator> {
    return this.page.locator(Selectors.event.eventCard);
  }

  async clickFirstEvent(): Promise<void> {
    await this.page.locator(Selectors.event.eventCard).first().click();
    await this.page.waitForLoadState('networkidle');
  }

  async getEventTitle(): Promise<string> {
    return this.page.locator(Selectors.event.eventTitle).innerText();
  }

  async getEventDate(): Promise<string> {
    return this.page.locator(Selectors.event.eventDate).innerText();
  }

  async getEventLocation(): Promise<string> {
    return this.page.locator(Selectors.event.eventLocation).innerText();
  }

  async getEventPrice(): Promise<string> {
    return this.page.locator(Selectors.event.eventPrice).innerText();
  }

  async clickBuyTicket(): Promise<void> {
    await this.page.click(Selectors.event.buyTicketButton);
    await this.page.waitForLoadState('networkidle');
  }

  async filterByCategory(category: string): Promise<void> {
    await this.page.selectOption(Selectors.event.categoryFilter, category);
    await this.page.waitForLoadState('networkidle');
  }

  async sortBy(option: string): Promise<void> {
    await this.page.selectOption(Selectors.event.sortDropdown, option);
    await this.page.waitForLoadState('networkidle');
  }

  async selectTicketCategory(category: string): Promise<void> {
    // Assuming there's a category selection dropdown or radio buttons for ticket type
    // This is a placeholder since we don't have a specific selector yet, we can reuse categoryFilter
    // or create a new selector. Let's assume we have a ticketType selector.
    const ticketSelector = this.page.locator(`[data-testid="ticket-category-${category.toLowerCase()}"]`);
    if (await ticketSelector.isVisible()) {
      await ticketSelector.click();
    }
  }
}
