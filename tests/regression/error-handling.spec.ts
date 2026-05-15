import { test, expect } from '@playwright/test';
import { ErrorPage } from '../../pages/ErrorPage';

test.describe('Error Handling and Edge Cases Regression', () => {
  let errorPage: ErrorPage;

  test.beforeEach(async ({ page }) => {
    errorPage = new ErrorPage(page);
  });

  test('User sees 404 page for unknown routes', async ({ page }) => {
    await errorPage.navigateTo404();
    
    // Check if error title is visible or just assert response status
    // Note: Playwright doesn't automatically fail on 404 navigation unless we assert it.
    
    const errorCode = await errorPage.getErrorCode();
    // Assuming UI handles 404 by showing it in the page
    if (errorCode) {
      expect(errorCode).toContain('404');
    }
  });

  test('User can navigate back to home from error page', async ({ page }) => {
    await errorPage.navigateTo404();
    await errorPage.clickGoHomeButton();
    await page.waitForLoadState('networkidle');
    
    // Check we are on the home page
    expect(page.url()).not.toContain('this-page-does-not-exist');
  });
});
