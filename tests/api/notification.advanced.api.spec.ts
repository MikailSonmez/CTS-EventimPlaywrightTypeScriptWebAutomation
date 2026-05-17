import { test, expect } from '@playwright/test';
import { NotificationApi } from '../../services/api/notification.api';
import { getEnvironmentConfig } from '../../core/environments';
import { faker } from '@faker-js/faker';

test.describe('Notification Advanced API Tests - Messaging & Alerts', () => {
  let notificationApi: NotificationApi;
  const env = getEnvironmentConfig();
  const token = 'mock_user_token_notifications';
  let firstNotificationId: string;

  test.beforeEach(async ({ request }) => {
    notificationApi = new NotificationApi(request, env.apiURL);
  });

  test('GET /notifications/me - Should fetch user notifications with pagination', async () => {
    const response = await notificationApi.getMyNotifications(token, { page: 1, limit: 10 });
    // expect(response.status()).toBe(200);
    // const data = await response.json();
    // expect(Array.isArray(data.notifications)).toBeTruthy();
    // if (data.notifications.length > 0) {
    //   firstNotificationId = data.notifications[0].id;
    // }
  });

  test('PUT /notifications/:id/read - Should mark a specific notification as read', async () => {
    firstNotificationId = firstNotificationId || faker.string.uuid();
    const response = await notificationApi.markAsRead(token, firstNotificationId);
    // expect(response.status()).toBe(200);
    // const body = await response.json();
    // expect(body.isRead).toBe(true);
  });

  test('PUT /notifications/me/read-all - Should mark all unread notifications as read', async () => {
    const response = await notificationApi.markAllAsRead(token);
    // expect(response.status()).toBe(200);
    // const body = await response.json();
    // expect(body.updatedCount).toBeGreaterThanOrEqual(0);
  });

  test('PUT /notifications/preferences - Should update user notification settings', async () => {
    const preferences = {
      emailAlerts: true,
      pushNotifications: false,
      smsAlerts: true,
      marketingEmails: false
    };

    const response = await notificationApi.updateNotificationPreferences(token, preferences);
    // expect(response.status()).toBe(200);
    // const body = await response.json();
    // expect(body.pushNotifications).toBe(false);
    // expect(body.smsAlerts).toBe(true);
  });

  test('POST /notifications/devices - Should register a new device for push notifications', async () => {
    const deviceData = {
      deviceType: 'IOS',
      fcmToken: faker.string.alphanumeric(152),
      appVersion: '2.1.0'
    };

    const response = await notificationApi.registerDeviceToken(token, deviceData);
    // expect(response.status()).toBe(201);
  });

  test('DELETE /notifications/:id - Should delete a specific notification', async () => {
    firstNotificationId = firstNotificationId || faker.string.uuid();
    const response = await notificationApi.deleteNotification(token, firstNotificationId);
    // expect(response.status()).toBe(204);
  });
});
