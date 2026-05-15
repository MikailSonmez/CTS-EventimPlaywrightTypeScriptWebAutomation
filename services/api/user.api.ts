import { APIRequestContext, APIResponse } from '@playwright/test';
import { BaseApi } from './base.api';

export class UserApi extends BaseApi {
  constructor(request: APIRequestContext, baseURL: string) {
    super(request, baseURL);
  }

  async getUserProfile(token: string): Promise<APIResponse> {
    return this.get('/user/profile', undefined, { 'Authorization': `Bearer ${token}` });
  }

  async updateUserProfile(token: string, data: any): Promise<APIResponse> {
    return this.put('/user/profile', data, { 'Authorization': `Bearer ${token}` });
  }

  async deleteUser(token: string): Promise<APIResponse> {
    return this.delete('/user/profile', { 'Authorization': `Bearer ${token}` });
  }

  async getUserOrders(token: string): Promise<APIResponse> {
    return this.get('/user/orders', undefined, { 'Authorization': `Bearer ${token}` });
  }
}
