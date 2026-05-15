import { APIRequestContext, APIResponse } from '@playwright/test';
import { BaseApi } from './base.api';

export class SearchApi extends BaseApi {
  constructor(request: APIRequestContext, baseURL: string) {
    super(request, baseURL);
  }

  async searchEvents(query: string, params?: Record<string, string | number>): Promise<APIResponse> {
    return this.get('/search/events', { q: query, ...params });
  }

  async searchArtists(query: string): Promise<APIResponse> {
    return this.get('/search/artists', { q: query });
  }

  async getSearchSuggestions(query: string): Promise<APIResponse> {
    return this.get('/search/suggestions', { q: query });
  }

  async searchVenues(query: string): Promise<APIResponse> {
    return this.get('/search/venues', { q: query });
  }
}
