import { APIRequestContext, APIResponse } from '@playwright/test';
import { config } from '../core/config';
import { Logger } from '../utils/logger';

export class BookingService {
  constructor(private request: APIRequestContext) {}

  async createBooking(eventId: string, userId: string): Promise<APIResponse> {
    Logger.info(`Creating booking for eventId=${eventId}, userId=${userId}`);
    return this.request.post(`${config.apiBaseURL}/api/bookings`, {
      data: { eventId, userId },
      headers: { 'Content-Type': 'application/json' },
    });
  }

  async getBooking(bookingId: string): Promise<APIResponse> {
    return this.request.get(`${config.apiBaseURL}/api/bookings/${bookingId}`);
  }

  async cancelBooking(bookingId: string): Promise<APIResponse> {
    Logger.info(`Cancelling booking ${bookingId}`);
    return this.request.delete(`${config.apiBaseURL}/api/bookings/${bookingId}`);
  }

  async listUserBookings(userId: string): Promise<APIResponse> {
    return this.request.get(`${config.apiBaseURL}/api/users/${userId}/bookings`);
  }
}
