import { test, expect } from '../../core/baseTest';
import { HomePage } from '../../pages/HomePage';
import users from '../../fixtures/users.json';
import events from '../../fixtures/events.json';

test.describe('Event Search Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  // 🔴 TDD: Red → Green → Refactor
  test('User can search for an event by name', async ({ page }) => {
    const home = new HomePage(page);
    await home.acceptCookiesIfVisible();
    await home.searchEvent('Coldplay');

    const results = page.locator('[data-testid="event-card"]');
    await expect(results.first()).toBeVisible();
  });

  test('Search returns relevant results', async ({ page }) => {
    const home = new HomePage(page);
    await home.searchEvent(events.events[0].name);

    const eventTitle = page.locator('[data-testid="event-title"]').first();
    await expect(eventTitle).toContainText(events.events[0].category);
  });

  test('Empty search shows no results message', async ({ page }) => {
    const home = new HomePage(page);
    await home.searchEvent('xyznonexistentevent12345');

    const noResults = page.locator('[data-testid="no-results"]');
    await expect(noResults).toBeVisible();
  });

  test('Homepage loads with hero section', async ({ page }) => {
    const home = new HomePage(page);
    await home.navigate();
    const isVisible = await home.isHeroVisible();
    expect(isVisible).toBeTruthy();
  });
});
