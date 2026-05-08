export const config = {
  baseURL: process.env.BASE_URL || 'https://www.eventim.de',
  apiBaseURL: process.env.API_BASE_URL || 'https://api.eventim.de',
  defaultTimeout: 30000,
  retryCount: Number(process.env.RETRY_COUNT) || 2,
  environments: {
    dev: 'https://dev.eventim.de',
    staging: 'https://staging.eventim.de',
    prod: 'https://www.eventim.de',
  },
  credentials: {
    testUser: {
      email: process.env.TEST_USER_EMAIL || 'testuser@eventim.de',
      password: process.env.TEST_USER_PASSWORD || 'TestPassword123!',
    },
  },
};
