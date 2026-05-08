export interface UserJourneyStep {
  action: 'navigate' | 'click' | 'fill' | 'assert' | 'wait';
  target?: string;
  value?: string;
  description: string;
}

export interface GeneratedTest {
  name: string;
  code: string;
}

/**
 * Converts a user journey definition into Playwright test code.
 * In production, this would integrate with an LLM or log analyzer.
 */
export function generateTestFromJourney(
  testName: string,
  steps: UserJourneyStep[]
): GeneratedTest {
  const lines: string[] = [
    `import { test, expect } from '../core/baseTest';`,
    ``,
    `test('${testName}', async ({ page }) => {`,
  ];

  for (const step of steps) {
    switch (step.action) {
      case 'navigate':
        lines.push(`  await page.goto('${step.value}'); // ${step.description}`);
        break;
      case 'click':
        lines.push(`  await page.click('${step.target}'); // ${step.description}`);
        break;
      case 'fill':
        lines.push(`  await page.fill('${step.target}', '${step.value}'); // ${step.description}`);
        break;
      case 'assert':
        lines.push(`  await expect(page.locator('${step.target}')).toBeVisible(); // ${step.description}`);
        break;
      case 'wait':
        lines.push(`  await page.waitForLoadState('networkidle'); // ${step.description}`);
        break;
    }
  }

  lines.push(`});`);

  return { name: testName, code: lines.join('\n') };
}

export function suggestMissingCoverage(existingTests: string[]): string[] {
  const criticalFlows = [
    'User can complete full ticket purchase',
    'User can cancel booking',
    'User can apply discount code',
    'User receives booking confirmation email',
    'Sold-out event shows correct status',
  ];

  return criticalFlows.filter(flow =>
    !existingTests.some(t => t.toLowerCase().includes(flow.toLowerCase().split(' ').slice(0, 3).join(' ')))
  );
}
