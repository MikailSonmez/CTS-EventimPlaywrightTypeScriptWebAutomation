import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';

test.describe('Authentication Tests', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigate();
  });

  test('User can login successfully with valid credentials', async ({ page }) => {
    await loginPage.login('testuser@eventim.com', 'ValidPassword123!');
    expect(await loginPage.isUserLoggedIn()).toBeTruthy();
  });

  test('User cannot login with invalid credentials', async () => {
    await loginPage.login('invalid@eventim.com', 'wrongpass');
    expect(await loginPage.isUserLoggedIn()).toBeFalsy();
    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toContain('Invalid email or password');
  });

  test('User can register a new account', async () => {
    const randomEmail = `user${Date.now()}@test.eventim.com`;
    await loginPage.register(randomEmail, 'SecurePassword123!');
    expect(await loginPage.isUserLoggedIn()).toBeTruthy();
  });

  test('User can logout successfully', async ({ page }) => {
    await loginPage.login('testuser@eventim.com', 'ValidPassword123!');
    expect(await loginPage.isUserLoggedIn()).toBeTruthy();
    
    await loginPage.logout();
    expect(await loginPage.isUserLoggedIn()).toBeFalsy();
  });
});
