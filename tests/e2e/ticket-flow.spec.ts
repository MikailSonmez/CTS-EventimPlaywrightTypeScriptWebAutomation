import { test, expect } from '../../core/baseTest';
import { HomePage } from '../../pages/HomePage';
import { EventPage } from '../../pages/EventPage';
import { CheckoutPage } from '../../pages/CheckoutPage';

test.describe('Ticket Checkout Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('User can view event details', async ({ page }) => {
    const home = new HomePage(page);
    const eventPage = new EventPage(page);

    await home.acceptCookiesIfVisible();
    await home.searchEvent('Coldplay');
    await eventPage.clickFirstEvent();

    const title = await eventPage.getEventTitle();
    expect(title.length).toBeGreaterThan(0);
  });

  test('Buy ticket button is visible on event page', async ({ page }) => {
    const home = new HomePage(page);
    const eventPage = new EventPage(page);

    await home.acceptCookiesIfVisible();
    await home.searchEvent('Coldplay');
    await eventPage.clickFirstEvent();

    await expect(page.locator('[data-testid="buy-ticket-btn"]')).toBeVisible();
  });

  test('Full ticket flow navigates to checkout', async ({ page }) => {
    const home = new HomePage(page);
    const eventPage = new EventPage(page);

    await home.acceptCookiesIfVisible();
    await home.searchEvent('Coldplay');
    await eventPage.clickFirstEvent();
    await eventPage.clickBuyTicket();

    await expect(page).toHaveURL(/checkout|tickets/);
  });
});
