import { test as base } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { EventPage } from '../pages/EventPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { Logger } from '../utils/logger';
import { MetricsCollector } from '../utils/metricsCollector';

type PageFixtures = {
  homePage: HomePage;
  eventPage: EventPage;
  checkoutPage: CheckoutPage;
};

export const test = base.extend<PageFixtures>({
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  eventPage: async ({ page }, use) => {
    await use(new EventPage(page));
  },
  checkoutPage: async ({ page }, use) => {
    await use(new CheckoutPage(page));
  },
});

test.beforeEach(async ({ page }, testInfo) => {
  Logger.info(`Starting test: ${testInfo.title}`);
  testInfo.annotations.push({ type: 'startTime', description: new Date().toISOString() });
});

test.afterEach(async ({ page }, testInfo) => {
  const duration = testInfo.duration;
  MetricsCollector.logTestDuration(testInfo.title, duration);

  if (testInfo.status === 'failed') {
    Logger.error(`Test FAILED: ${testInfo.title}`);
  }

  if (testInfo.retry > 0) {
    MetricsCollector.logFlakyTest(testInfo.title);
  }
});

export { expect } from '@playwright/test';
