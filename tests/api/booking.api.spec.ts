import { test, expect, request } from '@playwright/test';
import { BookingService } from '../../services/BookingService';
import { config } from '../../core/config';
import events from '../../fixtures/events.json';
import users from '../../fixtures/users.json';

test.describe('Booking API', () => {
  test('POST /api/bookings creates a valid reservation', async () => {
    const api = await request.newContext({ baseURL: config.apiBaseURL });
    const bookingService = new BookingService(api);

    const response = await bookingService.createBooking(
      events.events[0].id,
      users.users[0].id
    );

    expect(response.ok()).toBeTruthy();
    const body = await response.json();
    expect(body).toHaveProperty('bookingId');
    expect(body).toHaveProperty('status', 'confirmed');
  });

  test('GET /api/bookings/:id returns booking details', async () => {
    const api = await request.newContext({ baseURL: config.apiBaseURL });
    const bookingService = new BookingService(api);

    const createRes = await bookingService.createBooking(events.events[0].id, users.users[0].id);
    const { bookingId } = await createRes.json();

    const getRes = await bookingService.getBooking(bookingId);
    expect(getRes.ok()).toBeTruthy();

    const body = await getRes.json();
    expect(body.bookingId).toBe(bookingId);
  });

  test('DELETE /api/bookings/:id cancels booking', async () => {
    const api = await request.newContext({ baseURL: config.apiBaseURL });
    const bookingService = new BookingService(api);

    const createRes = await bookingService.createBooking(events.events[0].id, users.users[0].id);
    const { bookingId } = await createRes.json();

    const cancelRes = await bookingService.cancelBooking(bookingId);
    expect(cancelRes.ok()).toBeTruthy();
  });
});
