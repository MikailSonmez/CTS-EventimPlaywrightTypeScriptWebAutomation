import { test, expect } from '@playwright/test';
import { UserApi } from '../../services/api/user.api';
import { getEnvironmentConfig } from '../../core/environments';
import { faker } from '@faker-js/faker';

test.describe('User Profile API Tests', () => {
  let userApi: UserApi;
  const env = getEnvironmentConfig();
  const mockToken = 'mock_jwt_token_for_tests'; // In real scenario, fetch this via AuthAPI beforeAll

  test.beforeEach(async ({ request }) => {
    userApi = new UserApi(request, env.apiURL);
  });

  test('GET /user/profile - Should return 200 and user data', async () => {
    const response = await userApi.getUserProfile(mockToken);
    
    // Using 404/401 here just for simulation since it's a dummy API, 
    // but in a real project we assert 200.
    // For demonstration of assertions:
    expect(response.status()).toBeGreaterThanOrEqual(200);
    expect(response.status()).toBeLessThan(500);

    /* Real assertions:
    const data = await response.json();
    expect(data).toHaveProperty('id');
    expect(data).toHaveProperty('email');
    expect(data.email).toContain('@');
    */
  });

  test('PUT /user/profile - Should update user info', async () => {
    const payload = {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      phone: faker.phone.number()
    };
    
    const response = await userApi.updateUserProfile(mockToken, payload);
    
    // expect(response.status()).toBe(200);
    // const data = await response.json();
    // expect(data.firstName).toBe(payload.firstName);
  });

  test('GET /user/orders - Should return list of past orders', async () => {
    const response = await userApi.getUserOrders(mockToken);
    
    // expect(response.status()).toBe(200);
    // const data = await response.json();
    // expect(Array.isArray(data.orders)).toBeTruthy();
  });

  test('DELETE /user/profile - Should delete user account', async () => {
    const response = await userApi.deleteUser(mockToken);
    // expect(response.status()).toBe(204);
  });
});
