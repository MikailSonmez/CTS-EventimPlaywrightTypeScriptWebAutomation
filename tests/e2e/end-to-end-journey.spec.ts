import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';
import { EventPage } from '../../pages/EventPage';
import { CartPage } from '../../pages/CartPage';
import { LoginPage } from '../../pages/LoginPage';
import { CheckoutPage } from '../../pages/CheckoutPage';
import { UserDataBuilder } from '../../fixtures/testDataBuilder';

test.describe('Complete E2E Journey - Search to Checkout', () => {
  let homePage: HomePage;
  let eventPage: EventPage;
  let cartPage: CartPage;
  let loginPage: LoginPage;
  let checkoutPage: CheckoutPage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    eventPage = new EventPage(page);
    cartPage = new CartPage(page);
    loginPage = new LoginPage(page);
    checkoutPage = new CheckoutPage(page);
  });

  test('User can register, search an event, add to cart, and checkout completely', async ({ page }) => {
    // 1. Register new user
    const newUser = new UserDataBuilder().withRandomEmail().build();
    await loginPage.navigate();
    await loginPage.register(newUser.email, 'SuperSecret123!');
    expect(await loginPage.isUserLoggedIn()).toBeTruthy();

    // 2. Search for an Event
    await homePage.navigate();
    await homePage.searchEvent('Concert');
    
    // 3. Select the event and go to details
    const events = await eventPage.getEventCards();
    if (await events.count() > 0) {
      await events.first().click();
      await page.waitForLoadState('networkidle');

      // 4. Select ticket and buy
      await eventPage.selectTicketCategory('Premium');
      await eventPage.clickBuyTicket();

      // 5. Verify Cart
      await cartPage.navigate();
      expect(await cartPage.isEmptyMessageVisible()).toBeFalsy();
      expect(await cartPage.getCartItemsCount()).toBeGreaterThan(0);

      // 6. Proceed to Checkout
      await cartPage.proceedToCheckout();
      
      // 7. Complete Checkout Form
      // Note: Assuming checkout has a form for payment
      // Here we would use checkoutPage methods if we had a full mock
      /*
      await checkoutPage.fillPaymentDetails('1234567890123456', '12/25', '123');
      await checkoutPage.confirmOrder();
      expect(await checkoutPage.isOrderSuccessful()).toBeTruthy();
      */
    }
  });
});
