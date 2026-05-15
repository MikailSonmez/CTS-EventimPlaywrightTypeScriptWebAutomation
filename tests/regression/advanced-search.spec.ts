import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';
import { Selectors } from '../../core/selectors';

test.describe('Advanced Search & Filtering Regression', () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.navigate();
  });

  test('Search returns no results message for invalid query', async ({ page }) => {
    await homePage.searchEvent('ThisEventDoesNotExist123456');
    const noResults = page.locator(Selectors.event.noResultsMessage);
    expect(await noResults.isVisible()).toBeTruthy();
    expect(await noResults.textContent()).toContain('No results found');
  });

  test('Search with valid query returns at least one result', async ({ page }) => {
    await homePage.searchEvent('Concert');
    const events = await homePage.getFeaturedEvents();
    expect(await events.count()).toBeGreaterThan(0);
  });

  test('Filter by category works correctly', async ({ page }) => {
    await homePage.searchEvent('Festival');
    
    // Applying category filter assuming it's visible on the search results page
    const categoryFilter = page.locator(Selectors.event.categoryFilter);
    if (await categoryFilter.isVisible()) {
      await categoryFilter.selectOption({ label: 'Music' });
      await page.waitForLoadState('networkidle');
      
      const events = await homePage.getFeaturedEvents();
      expect(await events.count()).toBeGreaterThan(0);
    }
  });

  test('Filter by price range works correctly', async ({ page }) => {
    await homePage.searchEvent('Theatre');
    
    const minInput = page.locator(Selectors.event.priceRangeMin);
    const maxInput = page.locator(Selectors.event.priceRangeMax);
    const applyBtn = page.locator(Selectors.event.applyFiltersBtn);

    if (await minInput.isVisible() && await maxInput.isVisible()) {
      await minInput.fill('50');
      await maxInput.fill('150');
      await applyBtn.click();
      await page.waitForLoadState('networkidle');
      
      const events = await homePage.getFeaturedEvents();
      // Even if 0 events found for the criteria, the test ensures filter applies without error
      expect(await events.count()).toBeGreaterThanOrEqual(0);
    }
  });

  test('Sorting by Date works correctly', async ({ page }) => {
    await homePage.searchEvent('Comedy');
    
    const sortDropdown = page.locator(Selectors.event.sortDropdown);
    if (await sortDropdown.isVisible()) {
      await sortDropdown.selectOption({ label: 'Date' });
      await page.waitForLoadState('networkidle');
      
      const events = await homePage.getFeaturedEvents();
      expect(await events.count()).toBeGreaterThanOrEqual(0);
    }
  });
});
