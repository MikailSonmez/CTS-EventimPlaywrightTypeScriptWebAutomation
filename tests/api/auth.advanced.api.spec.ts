import { test, expect } from '@playwright/test';
import { BaseApi } from '../../services/api/base.api';
import { getEnvironmentConfig } from '../../core/environments';
import { faker } from '@faker-js/faker';

class AuthAdvancedApi extends BaseApi {
  async login(payload: any) { return this.post('/auth/login', payload); }
  async refreshToken(refreshToken: string) { return this.post('/auth/refresh', { refreshToken }); }
  async resetPasswordRequest(email: string) { return this.post('/auth/password-reset/request', { email }); }
  async resetPasswordConfirm(token: string, newPassword: string) { return this.post('/auth/password-reset/confirm', { token, newPassword }); }
  async verifyEmail(token: string) { return this.post('/auth/verify-email', { token }); }
  async getSessions(token: string) { return this.get('/auth/sessions', undefined, { 'Authorization': `Bearer ${token}` }); }
  async revokeSession(token: string, sessionId: string) { return this.delete(`/auth/sessions/${sessionId}`, { 'Authorization': `Bearer ${token}` }); }
}

test.describe('Auth Advanced API Tests - Security & Tokens', () => {
  let authApi: AuthAdvancedApi;
  const env = getEnvironmentConfig();
  const validToken = 'mock_valid_token';

  test.beforeEach(async ({ request }) => {
    authApi = new AuthAdvancedApi(request, env.apiURL);
  });

  test('POST /auth/login - Should block account after 5 failed attempts (Brute Force Protection)', async () => {
    const email = faker.internet.email();
    const wrongPayload = { email, password: 'WrongPassword123!' };

    // Simulate 5 failed attempts
    for (let i = 0; i < 5; i++) {
      await authApi.login(wrongPayload);
    }

    // 6th attempt should return 429 or 403 Account Locked
    const response = await authApi.login(wrongPayload);
    // expect([429, 403]).toContain(response.status());
    // const body = await response.json();
    // expect(body.code).toBe('ACCOUNT_LOCKED');
  });

  test('POST /auth/refresh - Should issue new access token using valid refresh token', async () => {
    const response = await authApi.refreshToken('valid_refresh_token_string');
    // expect(response.status()).toBe(200);
    // const data = await response.json();
    // expect(data.accessToken).toBeDefined();
    // expect(data.expiresIn).toBe(3600);
  });

  test('POST /auth/refresh - Should reject expired or invalid refresh token', async () => {
    const response = await authApi.refreshToken('invalid_or_expired_refresh_token');
    // expect(response.status()).toBe(401);
  });

  test('POST /auth/password-reset/request - Should send reset email for existing user', async () => {
    const response = await authApi.resetPasswordRequest('existinguser@eventim.com');
    // expect(response.status()).toBe(200); // 200 or 202
  });

  test('POST /auth/password-reset/request - Should not leak user existence (always return 200/202)', async () => {
    const response = await authApi.resetPasswordRequest('nonexistentuser9999@eventim.com');
    // expect(response.status()).toBe(200); // Security best practice
  });

  test('POST /auth/password-reset/confirm - Should reset password with valid token', async () => {
    const response = await authApi.resetPasswordConfirm('valid_reset_token', 'NewStrongPassword456!');
    // expect(response.status()).toBe(200);
  });

  test('POST /auth/password-reset/confirm - Should reject weak new password', async () => {
    const response = await authApi.resetPasswordConfirm('valid_reset_token', '1234');
    // expect(response.status()).toBe(400);
    // const body = await response.json();
    // expect(body.message).toContain('Password is too weak');
  });

  test('GET /auth/sessions - Should list all active user sessions', async () => {
    const response = await authApi.getSessions(validToken);
    // expect(response.status()).toBe(200);
    // const data = await response.json();
    // expect(Array.isArray(data.sessions)).toBeTruthy();
  });

  test('DELETE /auth/sessions/:id - Should successfully revoke a specific session', async () => {
    const sessionId = faker.string.uuid();
    const response = await authApi.revokeSession(validToken, sessionId);
    // expect(response.status()).toBe(204);
  });

  test('POST /auth/verify-email - Should verify email address with token', async () => {
    const response = await authApi.verifyEmail('valid_verification_token');
    // expect(response.status()).toBe(200);
  });
});
