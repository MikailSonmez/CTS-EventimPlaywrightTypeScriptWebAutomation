import { APIRequestContext, APIResponse } from '@playwright/test';
import { BaseApi } from './base.api';

export class ReviewApi extends BaseApi {
  constructor(request: APIRequestContext, baseURL: string) {
    super(request, baseURL);
  }

  async getEventReviews(eventId: string, params?: Record<string, string | number>): Promise<APIResponse> {
    return this.get(`/events/${eventId}/reviews`, params);
  }

  async submitReview(token: string, eventId: string, reviewData: any): Promise<APIResponse> {
    return this.post(`/events/${eventId}/reviews`, reviewData, { 'Authorization': `Bearer ${token}` });
  }

  async likeReview(token: string, reviewId: string): Promise<APIResponse> {
    return this.post(`/reviews/${reviewId}/like`, {}, { 'Authorization': `Bearer ${token}` });
  }

  async deleteReview(token: string, reviewId: string): Promise<APIResponse> {
    return this.delete(`/reviews/${reviewId}`, { 'Authorization': `Bearer ${token}` });
  }
}
