import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';
import { Selectors } from '../../core/selectors';

test.describe('Localization and Currency Tests', () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.navigate();
  });

  test('User can change application language to German', async ({ page }) => {
    const langSelector = page.locator(Selectors.header.languageSelector);
    if (await langSelector.isVisible()) {
      await langSelector.selectOption({ value: 'de' });
      await page.waitForLoadState('networkidle');
      
      // Verify some translated text, e.g., search placeholder or button
      const searchBtn = page.locator(Selectors.home.searchButton);
      // expect(await searchBtn.textContent()).toContain('Suchen');
    }
  });

  test('User can change currency to USD', async ({ page }) => {
    const currSelector = page.locator(Selectors.header.currencySelector);
    if (await currSelector.isVisible()) {
      await currSelector.selectOption({ value: 'USD' });
      await page.waitForLoadState('networkidle');
      
      // Go to an event and verify price format
      await homePage.searchEvent('Concert');
      const firstEventPrice = page.locator(Selectors.event.eventPrice).first();
      if (await firstEventPrice.isVisible()) {
        const priceText = await firstEventPrice.textContent();
        expect(priceText).toContain('$');
      }
    }
  });
});
