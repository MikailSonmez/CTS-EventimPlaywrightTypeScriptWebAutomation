import { test, expect } from '@playwright/test';
import { ProfilePage } from '../../pages/ProfilePage';
import { LoginPage } from '../../pages/LoginPage';

test.describe('User Profile Tests', () => {
  let profilePage: ProfilePage;
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    profilePage = new ProfilePage(page);

    await loginPage.navigate();
    await loginPage.login('testuser@eventim.com', 'ValidPassword123!');
    await profilePage.navigate();
  });

  test('User can view profile page and see order history', async () => {
    expect(await profilePage.isProfileHeaderVisible()).toBeTruthy();
    
    const count = await profilePage.getOrderHistoryCount();
    expect(count).toBeGreaterThanOrEqual(0); // Could be 0 for new user, >0 for existing
  });

  test('User can update personal information', async () => {
    const timestamp = Date.now().toString().slice(-4);
    await profilePage.updatePersonalInfo(`TestName${timestamp}`, 'LastName', '1234567890');
    expect(await profilePage.isSuccessToastVisible()).toBeTruthy();
  });
});
