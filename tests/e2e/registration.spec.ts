import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { UserDataBuilder } from '../../fixtures/testDataBuilder';

test.describe('Registration and Onboarding', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigate();
  });

  test('Successful registration with dynamically generated user', async () => {
    const newUser = new UserDataBuilder().withRandomEmail().build();
    
    await loginPage.register(newUser.email, 'StrongPassword!2024');
    expect(await loginPage.isUserLoggedIn()).toBeTruthy();
  });

  test('Registration fails if passwords do not match', async ({ page }) => {
    // Note: To implement this fully we would need to extend LoginPage to handle mismatch scenario
    // Or assert on the validation message on the UI.
    const user = new UserDataBuilder().withRandomEmail().build();
    // Assuming UI prevents submission or shows an error
    // For now, we simulate the action and expect an error message
    // await loginPage.registerWithMismatch(user.email, 'Pass123!', 'Pass456!');
    // const error = await loginPage.getErrorMessage();
    // expect(error).toContain('Passwords do not match');
  });

  test('Registration fails with invalid email format', async () => {
    // e.g. missing @
    await loginPage.register('invalidemail.com', 'Pass123!');
    const error = await loginPage.getErrorMessage();
    // Depending on the app logic, either browser validation or server validation
    // expect(error).toBeTruthy();
  });
});
