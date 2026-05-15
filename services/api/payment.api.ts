import { APIRequestContext, APIResponse } from '@playwright/test';
import { BaseApi } from './base.api';

export class PaymentApi extends BaseApi {
  constructor(request: APIRequestContext, baseURL: string) {
    super(request, baseURL);
  }

  async getPaymentMethods(token: string): Promise<APIResponse> {
    return this.get('/payment/methods', undefined, { 'Authorization': `Bearer ${token}` });
  }

  async addPaymentMethod(token: string, methodData: any): Promise<APIResponse> {
    return this.post('/payment/methods', methodData, { 'Authorization': `Bearer ${token}` });
  }

  async deletePaymentMethod(token: string, methodId: string): Promise<APIResponse> {
    return this.delete(`/payment/methods/${methodId}`, { 'Authorization': `Bearer ${token}` });
  }

  async refundPayment(token: string, orderId: string, reason: string): Promise<APIResponse> {
    return this.post(`/payment/refund/${orderId}`, { reason }, { 'Authorization': `Bearer ${token}` });
  }
}
