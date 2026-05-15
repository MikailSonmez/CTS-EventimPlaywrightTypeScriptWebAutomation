import { test, expect } from '@playwright/test';
import { CartPage } from '../../pages/CartPage';
import { HomePage } from '../../pages/HomePage';
import { EventPage } from '../../pages/EventPage';

test.describe('Cart and Shopping Bag Tests', () => {
  let cartPage: CartPage;
  let homePage: HomePage;
  let eventPage: EventPage;

  test.beforeEach(async ({ page }) => {
    cartPage = new CartPage(page);
    homePage = new HomePage(page);
    eventPage = new EventPage(page);
    
    // Some tests might need user to be logged in, or we just rely on guest checkout
  });

  test('Cart shows empty message initially', async ({ page }) => {
    await cartPage.navigate();
    expect(await cartPage.isEmptyMessageVisible()).toBeTruthy();
  });

  test('User can add item to cart and it appears', async ({ page }) => {
    // 1. Go to Home, search event
    await homePage.navigate();
    await homePage.searchEvent('Rock Concert');
    
    // 2. Go to first event and add to cart
    const events = await homePage.getFeaturedEvents();
    if (await events.count() > 0) {
      await events.first().click();
      await page.waitForLoadState('networkidle');
      
      // Select ticket category & buy
      await eventPage.selectTicketCategory('VIP');
      await eventPage.clickBuyTicket();

      // 3. Go to cart and verify it's not empty
      await cartPage.navigate();
      expect(await cartPage.isEmptyMessageVisible()).toBeFalsy();
      expect(await cartPage.getCartItemsCount()).toBeGreaterThan(0);
    }
  });

  test('User can remove item from cart', async ({ page }) => {
    // Need a setup where an item is already in cart, but simulating via adding first
    await homePage.navigate();
    await homePage.searchEvent('Jazz Night');
    const events = await homePage.getFeaturedEvents();
    if (await events.count() > 0) {
      await events.first().click();
      await page.waitForLoadState('networkidle');
      await eventPage.selectTicketCategory('Standard');
      await eventPage.clickBuyTicket();

      await cartPage.navigate();
      const countBefore = await cartPage.getCartItemsCount();
      
      if (countBefore > 0) {
        await cartPage.removeItem(0);
        const countAfter = await cartPage.getCartItemsCount();
        expect(countAfter).toBe(countBefore - 1);
      }
    }
  });
});
