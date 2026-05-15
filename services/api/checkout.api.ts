import { APIRequestContext, APIResponse } from '@playwright/test';
import { BaseApi } from './base.api';

export class CheckoutApi extends BaseApi {
  constructor(request: APIRequestContext, baseURL: string) {
    super(request, baseURL);
  }

  async initiateCheckout(token: string, cartId: string): Promise<APIResponse> {
    return this.post('/checkout/initiate', { cartId }, { 'Authorization': `Bearer ${token}` });
  }

  async processPayment(token: string, checkoutId: string, paymentDetails: any): Promise<APIResponse> {
    return this.post(`/checkout/${checkoutId}/payment`, paymentDetails, { 'Authorization': `Bearer ${token}` });
  }

  async getCheckoutStatus(token: string, checkoutId: string): Promise<APIResponse> {
    return this.get(`/checkout/${checkoutId}/status`, undefined, { 'Authorization': `Bearer ${token}` });
  }

  async applyPromoCode(token: string, checkoutId: string, promoCode: string): Promise<APIResponse> {
    return this.post(`/checkout/${checkoutId}/promo`, { code: promoCode }, { 'Authorization': `Bearer ${token}` });
  }
}
