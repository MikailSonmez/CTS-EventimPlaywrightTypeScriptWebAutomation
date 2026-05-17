import { APIRequestContext, APIResponse } from '@playwright/test';
import { BaseApi } from './base.api';

export class NotificationApi extends BaseApi {
  constructor(request: APIRequestContext, baseURL: string) {
    super(request, baseURL);
  }

  async getMyNotifications(token: string, params?: Record<string, string | number>): Promise<APIResponse> {
    return this.get('/notifications/me', params, { 'Authorization': `Bearer ${token}` });
  }

  async markAsRead(token: string, notificationId: string): Promise<APIResponse> {
    return this.put(`/notifications/${notificationId}/read`, {}, { 'Authorization': `Bearer ${token}` });
  }

  async markAllAsRead(token: string): Promise<APIResponse> {
    return this.put('/notifications/me/read-all', {}, { 'Authorization': `Bearer ${token}` });
  }

  async updateNotificationPreferences(token: string, preferences: any): Promise<APIResponse> {
    return this.put('/notifications/preferences', preferences, { 'Authorization': `Bearer ${token}` });
  }

  async deleteNotification(token: string, notificationId: string): Promise<APIResponse> {
    return this.delete(`/notifications/${notificationId}`, { 'Authorization': `Bearer ${token}` });
  }

  async registerDeviceToken(token: string, deviceData: any): Promise<APIResponse> {
    return this.post('/notifications/devices', deviceData, { 'Authorization': `Bearer ${token}` });
  }
}
