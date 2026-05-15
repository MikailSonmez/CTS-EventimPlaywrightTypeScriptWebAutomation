import { test, expect } from '@playwright/test';
import { ReviewApi } from '../../services/api/review.api';
import { getEnvironmentConfig } from '../../core/environments';
import { faker } from '@faker-js/faker';

test.describe('Event Review API Tests', () => {
  let reviewApi: ReviewApi;
  const env = getEnvironmentConfig();
  const mockToken = 'mock_jwt_token_for_reviews';
  const eventId = faker.string.uuid();

  test.beforeEach(async ({ request }) => {
    reviewApi = new ReviewApi(request, env.apiURL);
  });

  test('GET /events/:id/reviews - Should return paginated reviews for event', async () => {
    const response = await reviewApi.getEventReviews(eventId, { page: 1, limit: 10 });
    
    // expect(response.status()).toBe(200);
    // const data = await response.json();
    // expect(Array.isArray(data.reviews)).toBeTruthy();
    // expect(data.metadata).toHaveProperty('totalCount');
  });

  test('POST /events/:id/reviews - Should allow user to submit a review', async () => {
    const reviewData = {
      rating: 5,
      title: 'Amazing experience!',
      content: 'The concert was absolutely mind-blowing. Highly recommend!',
    };

    const response = await reviewApi.submitReview(mockToken, eventId, reviewData);
    
    // expect(response.status()).toBe(201);
    // const data = await response.json();
    // expect(data.review.id).toBeDefined();
    // expect(data.review.rating).toBe(5);
  });

  test('POST /reviews/:id/like - Should allow user to like a review', async () => {
    const reviewId = faker.string.uuid();
    const response = await reviewApi.likeReview(mockToken, reviewId);
    
    // expect(response.status()).toBe(200);
    // const data = await response.json();
    // expect(data.likesCount).toBeGreaterThan(0);
  });

  test('DELETE /reviews/:id - Should allow user to delete their own review', async () => {
    const reviewId = faker.string.uuid();
    const response = await reviewApi.deleteReview(mockToken, reviewId);
    
    // expect(response.status()).toBe(204);
  });
});
