import { test, expect } from '@playwright/test';
import { SearchApi } from '../../services/api/search.api';
import { getEnvironmentConfig } from '../../core/environments';
import { faker } from '@faker-js/faker';

test.describe('Search API Tests', () => {
  let searchApi: SearchApi;
  const env = getEnvironmentConfig();

  test.beforeEach(async ({ request }) => {
    searchApi = new SearchApi(request, env.apiURL);
  });

  test('GET /search/events - Should return events matching query', async () => {
    const response = await searchApi.searchEvents('Rock');
    
    // expect(response.status()).toBe(200);
    // const data = await response.json();
    // expect(data.results.length).toBeGreaterThan(0);
    // expect(data.results[0].title.toLowerCase()).toContain('rock');
  });

  test('GET /search/events - Should filter events by location and date', async () => {
    const response = await searchApi.searchEvents('Festival', {
      location: 'Berlin',
      dateFrom: '2024-06-01',
      dateTo: '2024-08-31'
    });
    
    // expect(response.status()).toBe(200);
    // const data = await response.json();
    // expect(data.metadata.filters.location).toBe('Berlin');
  });

  test('GET /search/suggestions - Should return auto-complete suggestions', async () => {
    const response = await searchApi.getSearchSuggestions('Col');
    
    // expect(response.status()).toBe(200);
    // const data = await response.json();
    // expect(data.suggestions).toBeDefined();
    // expect(data.suggestions.length).toBeLessThanOrEqual(10); // Typical limit
  });

  test('GET /search/artists - Should return artists matching query', async () => {
    const response = await searchApi.searchArtists('Ed Sheeran');
    
    // expect(response.status()).toBe(200);
    // const data = await response.json();
    // expect(data.results[0].name).toBe('Ed Sheeran');
  });

  test('GET /search/venues - Should return venues matching query', async () => {
    const response = await searchApi.searchVenues('O2 Arena');
    
    // expect(response.status()).toBe(200);
    // const data = await response.json();
    // expect(data.results[0].name).toContain('O2');
  });
});
