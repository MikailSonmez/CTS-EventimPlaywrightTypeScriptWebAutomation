import { APIRequestContext, APIResponse } from '@playwright/test';
import { BaseApi } from './base.api';

export class VenueApi extends BaseApi {
  constructor(request: APIRequestContext, baseURL: string) {
    super(request, baseURL);
  }

  async createVenue(token: string, venueData: any): Promise<APIResponse> {
    return this.post('/venues', venueData, { 'Authorization': `Bearer ${token}` });
  }

  async getVenueDetails(venueId: string): Promise<APIResponse> {
    return this.get(`/venues/${venueId}`);
  }

  async updateVenue(token: string, venueId: string, venueData: any): Promise<APIResponse> {
    return this.put(`/venues/${venueId}`, venueData, { 'Authorization': `Bearer ${token}` });
  }

  async deleteVenue(token: string, venueId: string): Promise<APIResponse> {
    return this.delete(`/venues/${venueId}`, { 'Authorization': `Bearer ${token}` });
  }

  async getVenueSeatingPlan(venueId: string): Promise<APIResponse> {
    return this.get(`/venues/${venueId}/seating-plan`);
  }

  async updateVenueSeatingPlan(token: string, venueId: string, seatingData: any): Promise<APIResponse> {
    return this.put(`/venues/${venueId}/seating-plan`, seatingData, { 'Authorization': `Bearer ${token}` });
  }

  async getVenueEvents(venueId: string, params?: Record<string, string | number>): Promise<APIResponse> {
    return this.get(`/venues/${venueId}/events`, params);
  }
}
