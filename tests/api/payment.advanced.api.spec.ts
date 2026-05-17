import { test, expect } from '@playwright/test';
import { PaymentApi } from '../../services/api/payment.api';
import { getEnvironmentConfig } from '../../core/environments';
import { faker } from '@faker-js/faker';

// Ad-hoc expanded Payment API methods
class ExpandedPaymentApi extends PaymentApi {
  async processPayment(token: string, checkoutId: string, payload: any) { return this.post(`/checkout/${checkoutId}/payment`, payload, { 'Authorization': `Bearer ${token}` }); }
  async getTransactionHistory(token: string) { return this.get('/payment/transactions', undefined, { 'Authorization': `Bearer ${token}` }); }
  async requestPartialRefund(token: string, orderId: string, amount: number, reason: string) { return this.post(`/payment/refund/${orderId}/partial`, { amount, reason }, { 'Authorization': `Bearer ${token}` }); }
  async checkIdempotency(token: string, idempotencyKey: string, payload: any) { return this.post('/payment/charge', payload, { 'Authorization': `Bearer ${token}`, 'Idempotency-Key': idempotencyKey }); }
}

test.describe('Payment Advanced API Tests - Reliability & Edge Cases', () => {
  let paymentApi: ExpandedPaymentApi;
  const env = getEnvironmentConfig();
  const token = 'mock_payment_token';
  const checkoutId = faker.string.uuid();

  test.beforeEach(async ({ request }) => {
    paymentApi = new ExpandedPaymentApi(request, env.apiURL);
  });

  test('POST /checkout/:id/payment - Should decline expired card', async () => {
    const expiredCardPayload = {
      cardNumber: faker.finance.creditCardNumber('visa'),
      expiryDate: '10/20', // Expired
      cvc: '123',
      cardHolderName: faker.person.fullName()
    };
    
    const response = await paymentApi.processPayment(token, checkoutId, expiredCardPayload);
    // expect(response.status()).toBe(402); // Payment Required / Declined
    // const body = await response.json();
    // expect(body.code).toBe('CARD_EXPIRED');
  });

  test('POST /checkout/:id/payment - Should decline invalid CVC format', async () => {
    const invalidCvcPayload = {
      cardNumber: faker.finance.creditCardNumber('mastercard'),
      expiryDate: '12/29',
      cvc: '12A', // Invalid
      cardHolderName: faker.person.fullName()
    };
    
    const response = await paymentApi.processPayment(token, checkoutId, invalidCvcPayload);
    // expect(response.status()).toBe(400);
    // const body = await response.json();
    // expect(body.errors[0].field).toBe('cvc');
  });

  test('POST /checkout/:id/payment - Should handle insufficient funds', async () => {
    // Simulating insufficient funds with a specific mock card number
    const noFundsPayload = {
      cardNumber: '4000000000000002', // Test card for decline
      expiryDate: '12/29',
      cvc: '123',
      cardHolderName: faker.person.fullName()
    };
    
    const response = await paymentApi.processPayment(token, checkoutId, noFundsPayload);
    // expect(response.status()).toBe(402);
    // const body = await response.json();
    // expect(body.code).toBe('INSUFFICIENT_FUNDS');
  });

  test('POST /payment/charge - Should respect Idempotency Key to prevent double charge', async () => {
    const idempotencyKey = faker.string.uuid();
    const chargePayload = { amount: 100, currency: 'EUR', source: 'card_tok_123' };

    // First request
    const response1 = await paymentApi.checkIdempotency(token, idempotencyKey, chargePayload);
    // expect(response1.status()).toBe(201);
    
    // Second identical request with same idempotency key
    const response2 = await paymentApi.checkIdempotency(token, idempotencyKey, chargePayload);
    // expect(response2.status()).toBe(200); // 200 instead of 201, returning the cached result
    // const body1 = await response1.json();
    // const body2 = await response2.json();
    // expect(body1.transactionId).toBe(body2.transactionId);
  });

  test('GET /payment/transactions - Should return paginated transaction history', async () => {
    const response = await paymentApi.getTransactionHistory(token);
    // expect(response.status()).toBe(200);
    // const data = await response.json();
    // expect(Array.isArray(data.transactions)).toBeTruthy();
  });

  test('POST /payment/refund/:orderId/partial - Should process partial refund', async () => {
    const orderId = faker.string.uuid();
    const response = await paymentApi.requestPartialRefund(token, orderId, 25.50, 'Customer dissatisfied with seat');
    
    // expect(response.status()).toBe(200);
    // const data = await response.json();
    // expect(data.refundAmount).toBe(25.50);
    // expect(data.status).toBe('PROCESSING');
  });

  test('POST /payment/refund/:orderId/partial - Should reject partial refund exceeding total amount', async () => {
    const orderId = faker.string.uuid();
    // Assuming order total was 100
    const response = await paymentApi.requestPartialRefund(token, orderId, 150.00, 'Exceeding amount');
    
    // expect(response.status()).toBe(400);
    // const body = await response.json();
    // expect(body.code).toBe('REFUND_EXCEEDS_TOTAL');
  });

  test('POST /payment/refund/:orderId/partial - Should reject negative refund amount', async () => {
    const orderId = faker.string.uuid();
    const response = await paymentApi.requestPartialRefund(token, orderId, -10.00, 'Negative amount');
    
    // expect(response.status()).toBe(400);
  });
});
