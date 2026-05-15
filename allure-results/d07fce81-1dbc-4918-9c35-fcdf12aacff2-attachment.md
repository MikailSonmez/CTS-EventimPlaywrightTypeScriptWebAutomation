# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: api\booking.api.spec.ts >> Booking API >> GET /api/bookings/:id returns booking details
- Location: tests\api\booking.api.spec.ts:23:7

# Error details

```
TimeoutError: apiRequestContext.post: Timeout 10000ms exceeded.
Call log:
  - → POST https://api.eventim.de/api/bookings
    - user-agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/147.0.7727.15 Safari/537.36
    - accept: */*
    - accept-encoding: gzip,deflate,br
    - Content-Type: application/json
    - content-length: 41

```

# Test source

```ts
  1  | import { APIRequestContext, APIResponse } from '@playwright/test';
  2  | import { config } from '../core/config';
  3  | import { Logger } from '../utils/logger';
  4  | 
  5  | export class BookingService {
  6  |   constructor(private request: APIRequestContext) {}
  7  | 
  8  |   async createBooking(eventId: string, userId: string): Promise<APIResponse> {
  9  |     Logger.info(`Creating booking for eventId=${eventId}, userId=${userId}`);
> 10 |     return this.request.post(`${config.apiBaseURL}/api/bookings`, {
     |                         ^ TimeoutError: apiRequestContext.post: Timeout 10000ms exceeded.
  11 |       data: { eventId, userId },
  12 |       headers: { 'Content-Type': 'application/json' },
  13 |     });
  14 |   }
  15 | 
  16 |   async getBooking(bookingId: string): Promise<APIResponse> {
  17 |     return this.request.get(`${config.apiBaseURL}/api/bookings/${bookingId}`);
  18 |   }
  19 | 
  20 |   async cancelBooking(bookingId: string): Promise<APIResponse> {
  21 |     Logger.info(`Cancelling booking ${bookingId}`);
  22 |     return this.request.delete(`${config.apiBaseURL}/api/bookings/${bookingId}`);
  23 |   }
  24 | 
  25 |   async listUserBookings(userId: string): Promise<APIResponse> {
  26 |     return this.request.get(`${config.apiBaseURL}/api/users/${userId}/bookings`);
  27 |   }
  28 | }
  29 | 
```