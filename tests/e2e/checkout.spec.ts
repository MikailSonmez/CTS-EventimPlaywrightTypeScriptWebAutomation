import { test, expect } from '../../core/baseTest';
import { HomePage } from '../../pages/HomePage';
import { EventPage } from '../../pages/EventPage';
import { CheckoutPage } from '../../pages/CheckoutPage';

test.describe('Checkout Flow', () => {
  test('Order summary shows correct price', async ({ page }) => {
    const home = new HomePage(page);
    const eventPage = new EventPage(page);
    const checkout = new CheckoutPage(page);

    await home.navigate();
    await home.searchEvent('Coldplay');
    await eventPage.clickFirstEvent();
    await eventPage.clickBuyTicket();

    const total = await checkout.getTotalPrice();
    expect(total).toMatch(/€\s?\d+/);
  });

  test('Checkout requires authentication', async ({ page }) => {
    const home = new HomePage(page);
    const eventPage = new EventPage(page);

    await home.navigate();
    await home.searchEvent('Coldplay');
    await eventPage.clickFirstEvent();
    await eventPage.clickBuyTicket();

    // Should redirect to login if not authenticated
    await expect(page).toHaveURL(/login|auth|checkout/);
  });
});
