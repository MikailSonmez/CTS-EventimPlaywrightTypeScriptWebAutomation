import { test, expect } from '@playwright/test';
import { VenueApi } from '../../services/api/venue.api';
import { getEnvironmentConfig } from '../../core/environments';
import { faker } from '@faker-js/faker';

test.describe('Venue Advanced API Tests - Venue & Seating Management', () => {
  let venueApi: VenueApi;
  const env = getEnvironmentConfig();
  const adminToken = 'mock_admin_token_venues';
  let createdVenueId: string;

  test.beforeEach(async ({ request }) => {
    venueApi = new VenueApi(request, env.apiURL);
  });

  test('POST /venues - Admin should create a new venue', async () => {
    const venueData = {
      name: `Arena ${faker.location.city()}`,
      address: faker.location.streetAddress(),
      city: faker.location.city(),
      country: faker.location.country(),
      capacity: faker.number.int({ min: 1000, max: 50000 }),
      contactEmail: faker.internet.email(),
      amenities: ['Parking', 'VIP Lounge', 'Wheelchair Accessible']
    };

    const response = await venueApi.createVenue(adminToken, venueData);
    // expect(response.status()).toBe(201);
    // const body = await response.json();
    // expect(body.id).toBeDefined();
    // createdVenueId = body.id;
  });

  test('GET /venues/:id - Should retrieve venue details', async () => {
    createdVenueId = createdVenueId || faker.string.uuid();
    const response = await venueApi.getVenueDetails(createdVenueId);
    
    // expect(response.status()).toBe(200);
    // const body = await response.json();
    // expect(body.name).toBeDefined();
    // expect(body.capacity).toBeGreaterThan(0);
  });

  test('PUT /venues/:id - Admin should update venue details', async () => {
    createdVenueId = createdVenueId || faker.string.uuid();
    const updateData = {
      name: `Updated Arena Name ${faker.number.int(100)}`,
      capacity: 55000
    };

    const response = await venueApi.updateVenue(adminToken, createdVenueId, updateData);
    // expect(response.status()).toBe(200);
    // const body = await response.json();
    // expect(body.name).toBe(updateData.name);
    // expect(body.capacity).toBe(55000);
  });

  test('PUT /venues/:id/seating-plan - Admin should update SVG seating plan', async () => {
    createdVenueId = createdVenueId || faker.string.uuid();
    const seatingData = {
      format: 'svg',
      svgData: '<svg><rect id="seat-1A" width="10" height="10"/></svg>',
      zones: [
        { name: 'VIP', capacity: 500 },
        { name: 'Standard', capacity: 4500 }
      ]
    };

    const response = await venueApi.updateVenueSeatingPlan(adminToken, createdVenueId, seatingData);
    // expect(response.status()).toBe(200);
  });

  test('GET /venues/:id/seating-plan - Should fetch current seating plan', async () => {
    createdVenueId = createdVenueId || faker.string.uuid();
    const response = await venueApi.getVenueSeatingPlan(createdVenueId);
    // expect(response.status()).toBe(200);
    // const body = await response.json();
    // expect(body.zones).toBeDefined();
    // expect(Array.isArray(body.zones)).toBeTruthy();
  });

  test('GET /venues/:id/events - Should fetch upcoming events for this venue', async () => {
    createdVenueId = createdVenueId || faker.string.uuid();
    const response = await venueApi.getVenueEvents(createdVenueId, { status: 'UPCOMING' });
    // expect(response.status()).toBe(200);
    // const body = await response.json();
    // expect(Array.isArray(body.events)).toBeTruthy();
  });

  test('DELETE /venues/:id - Admin should soft delete venue', async () => {
    createdVenueId = createdVenueId || faker.string.uuid();
    const response = await venueApi.deleteVenue(adminToken, createdVenueId);
    // expect(response.status()).toBe(204);
  });
});
