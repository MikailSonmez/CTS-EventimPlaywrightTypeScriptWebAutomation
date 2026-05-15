import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';
import { Selectors } from '../../core/selectors';

test.describe('Smoke Sanity Checks', () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
  });

  test('Homepage loads correctly and hero section is visible', async () => {
    await homePage.navigate();
    expect(await homePage.isHeroVisible()).toBeTruthy();
  });

  test('Navigation menu is present', async ({ page }) => {
    await homePage.navigate();
    const navMenu = page.locator(Selectors.home.navMenu);
    expect(await navMenu.isVisible()).toBeTruthy();
  });

  test('Footer is present and has links', async ({ page }) => {
    await homePage.navigate();
    const footer = page.locator(Selectors.home.footer);
    expect(await footer.isVisible()).toBeTruthy();
  });

  test('Language and Currency selectors are present in Header', async ({ page }) => {
    await homePage.navigate();
    const langSelector = page.locator(Selectors.header.languageSelector);
    const currSelector = page.locator(Selectors.header.currencySelector);
    
    expect(await langSelector.isVisible()).toBeTruthy();
    expect(await currSelector.isVisible()).toBeTruthy();
  });
});
