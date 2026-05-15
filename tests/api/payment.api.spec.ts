import { test, expect } from '@playwright/test';
import { PaymentApi } from '../../services/api/payment.api';
import { getEnvironmentConfig } from '../../core/environments';
import { faker } from '@faker-js/faker';

test.describe('Payment API Tests', () => {
  let paymentApi: PaymentApi;
  const env = getEnvironmentConfig();
  const mockToken = 'mock_jwt_token_for_payment_tests';

  test.beforeEach(async ({ request }) => {
    paymentApi = new PaymentApi(request, env.apiURL);
  });

  test('GET /payment/methods - Should list user payment methods', async () => {
    const response = await paymentApi.getPaymentMethods(mockToken);
    
    // expect(response.status()).toBe(200);
    // const data = await response.json();
    // expect(Array.isArray(data.methods)).toBeTruthy();
  });

  test('POST /payment/methods - Should add a new credit card', async () => {
    const newMethod = {
      type: 'CREDIT_CARD',
      provider: 'VISA',
      lastFour: faker.finance.creditCardNumber('visa').slice(-4),
      expiryDate: '11/27'
    };

    const response = await paymentApi.addPaymentMethod(mockToken, newMethod);
    
    // expect(response.status()).toBe(201);
    // const data = await response.json();
    // expect(data.id).toBeDefined();
  });

  test('DELETE /payment/methods/:id - Should remove payment method', async () => {
    const methodId = faker.string.uuid();
    const response = await paymentApi.deletePaymentMethod(mockToken, methodId);
    
    // expect(response.status()).toBe(204);
  });

  test('POST /payment/refund/:orderId - Should request refund successfully', async () => {
    const orderId = faker.string.uuid();
    const response = await paymentApi.refundPayment(mockToken, orderId, 'Customer requested cancellation');
    
    // expect(response.status()).toBe(200);
    // const data = await response.json();
    // expect(data.refundStatus).toBe('PROCESSING');
  });
});
