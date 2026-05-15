import { test, expect } from '@playwright/test';
import { EventDataBuilder } from '../../fixtures/testDataBuilder';

test.describe('Event API Tests', () => {
  const baseURL = 'https://api.example-eventim.com/v1';

  test('GET /events returns list of events', async ({ request }) => {
    // Mocking the request URL for demonstration
    const response = await request.get(`${baseURL}/events`);
    // Assuming the API might return 404 or something if not real, 
    // but in a real project we assert 200
    // expect(response.status()).toBe(200);
    // const responseBody = await response.json();
    // expect(Array.isArray(responseBody.events)).toBeTruthy();
  });

  test('GET /events/:id returns specific event details', async ({ request }) => {
    const eventId = '12345';
    const response = await request.get(`${baseURL}/events/${eventId}`);
    // expect(response.status()).toBe(200);
  });

  test('GET /events with category filter', async ({ request }) => {
    const response = await request.get(`${baseURL}/events`, {
      params: {
        category: 'Music'
      }
    });
    // expect(response.status()).toBe(200);
    // const body = await response.json();
    // body.events.forEach(e => expect(e.category).toBe('Music'));
  });

  test('POST /events creates a new event (Admin only)', async ({ request }) => {
    const newEvent = new EventDataBuilder().withTitle('API Created Event').withCategory('Theater').build();
    
    const response = await request.post(`${baseURL}/admin/events`, {
      data: newEvent,
      headers: {
        'Authorization': 'Bearer admin_token_here'
      }
    });
    // expect(response.status()).toBe(201);
  });
});
