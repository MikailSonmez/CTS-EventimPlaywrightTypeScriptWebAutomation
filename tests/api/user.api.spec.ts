import { test, expect, request } from '@playwright/test';
import { AuthService } from '../../services/AuthService';
import { config } from '../../core/config';
import users from '../../fixtures/users.json';

test.describe('User Auth API', () => {
  test('POST /api/auth/login returns access token', async () => {
    const api = await request.newContext({ baseURL: config.apiBaseURL });
    const authService = new AuthService(api);

    const token = await authService.login(
      users.users[0].email,
      users.users[0].password
    );

    expect(token.accessToken).toBeTruthy();
    expect(token.expiresIn).toBeGreaterThan(0);
  });

  test('Login with wrong credentials returns 401', async () => {
    const api = await request.newContext({ baseURL: config.apiBaseURL });

    const response = await api.post(`${config.apiBaseURL}/api/auth/login`, {
      data: { email: 'wrong@test.de', password: 'wrongpassword' },
    });

    expect(response.status()).toBe(401);
  });
});
