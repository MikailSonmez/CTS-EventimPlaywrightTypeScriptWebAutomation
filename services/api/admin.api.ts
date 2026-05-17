import { APIRequestContext, APIResponse } from '@playwright/test';
import { BaseApi } from './base.api';

export class AdminApi extends BaseApi {
  constructor(request: APIRequestContext, baseURL: string) {
    super(request, baseURL);
  }

  async getAllUsers(adminToken: string, params?: Record<string, string | number>): Promise<APIResponse> {
    return this.get('/admin/users', params, { 'Authorization': `Bearer ${adminToken}` });
  }

  async blockUser(adminToken: string, userId: string, reason: string): Promise<APIResponse> {
    return this.post(`/admin/users/${userId}/block`, { reason }, { 'Authorization': `Bearer ${adminToken}` });
  }

  async unblockUser(adminToken: string, userId: string): Promise<APIResponse> {
    return this.post(`/admin/users/${userId}/unblock`, {}, { 'Authorization': `Bearer ${adminToken}` });
  }

  async assignRole(adminToken: string, userId: string, role: string): Promise<APIResponse> {
    return this.put(`/admin/users/${userId}/role`, { role }, { 'Authorization': `Bearer ${adminToken}` });
  }

  async getSystemLogs(adminToken: string, params?: Record<string, string | number>): Promise<APIResponse> {
    return this.get('/admin/logs', params, { 'Authorization': `Bearer ${adminToken}` });
  }

  async getGlobalMetrics(adminToken: string): Promise<APIResponse> {
    return this.get('/admin/metrics/global', undefined, { 'Authorization': `Bearer ${adminToken}` });
  }
}
