import { Page } from '@playwright/test';
import { Selectors } from '../core/selectors';

export class CheckoutPage {
  constructor(private page: Page) {}

  async selectSeat(seatId: string): Promise<void> {
    await this.page.click(`[data-seat-id="${seatId}"]`);
  }

  async getOrderSummary(): Promise<string> {
    return this.page.locator(Selectors.checkout.orderSummary).innerText();
  }

  async getTotalPrice(): Promise<string> {
    return this.page.locator(Selectors.checkout.totalPrice).innerText();
  }

  async proceedToPayment(): Promise<void> {
    await this.page.click(Selectors.checkout.proceedButton);
    await this.page.waitForLoadState('networkidle');
  }

  async fillPaymentDetails(card: { number: string; expiry: string; cvc: string }): Promise<void> {
    await this.page.fill(Selectors.checkout.cardNumber, card.number);
    await this.page.fill(Selectors.checkout.cardExpiry, card.expiry);
    await this.page.fill(Selectors.checkout.cardCvc, card.cvc);
  }

  async confirmOrder(): Promise<void> {
    await this.page.click(Selectors.checkout.confirmButton);
    await this.page.waitForLoadState('networkidle');
  }

  async isBookingSuccessful(): Promise<boolean> {
    return this.page.locator(Selectors.checkout.successMessage).isVisible();
  }
}
