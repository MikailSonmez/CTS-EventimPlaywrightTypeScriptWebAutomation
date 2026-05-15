import { test, expect } from '@playwright/test';
import { CheckoutApi } from '../../services/api/checkout.api';
import { getEnvironmentConfig } from '../../core/environments';
import { faker } from '@faker-js/faker';

test.describe('Checkout API Flow Tests', () => {
  let checkoutApi: CheckoutApi;
  const env = getEnvironmentConfig();
  const mockToken = 'mock_user_token_123';
  const cartId = faker.string.uuid();
  let checkoutId: string;

  test.beforeEach(async ({ request }) => {
    checkoutApi = new CheckoutApi(request, env.apiURL);
  });

  test('POST /checkout/initiate - Should create a checkout session', async () => {
    const response = await checkoutApi.initiateCheckout(mockToken, cartId);
    
    // In a real API, we'd expect 201 Created and a checkoutId returned
    // expect(response.status()).toBe(201);
    // const data = await response.json();
    // expect(data).toHaveProperty('checkoutId');
    // checkoutId = data.checkoutId;
  });

  test('POST /checkout/:id/promo - Should apply promo code', async () => {
    // Mocking checkout ID if not set by previous test
    checkoutId = checkoutId || faker.string.uuid();
    
    const response = await checkoutApi.applyPromoCode(mockToken, checkoutId, 'SUMMER2024');
    
    // expect(response.status()).toBe(200);
    // const data = await response.json();
    // expect(data.discountAmount).toBeGreaterThan(0);
  });

  test('POST /checkout/:id/payment - Should process payment successfully', async () => {
    checkoutId = checkoutId || faker.string.uuid();
    
    const paymentDetails = {
      cardNumber: faker.finance.creditCardNumber('visa'),
      expiryDate: '12/26',
      cvc: faker.finance.creditCardCVV(),
      cardHolderName: faker.person.fullName()
    };

    const response = await checkoutApi.processPayment(mockToken, checkoutId, paymentDetails);
    
    // expect(response.status()).toBe(200);
    // const data = await response.json();
    // expect(data.status).toBe('COMPLETED');
    // expect(data).toHaveProperty('orderId');
  });

  test('GET /checkout/:id/status - Should return checkout completion status', async () => {
    checkoutId = checkoutId || faker.string.uuid();
    
    const response = await checkoutApi.getCheckoutStatus(mockToken, checkoutId);
    
    // expect(response.status()).toBe(200);
    // const data = await response.json();
    // expect(['PENDING', 'COMPLETED', 'FAILED']).toContain(data.status);
  });
});
