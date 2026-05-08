export interface TestResult {
  name: string;
  failures: number;
  passes: number;
  duration: number;
}

export function detectFlakiness(results: TestResult[]): TestResult[] {
  return results.filter(test => test.failures > 2 && test.passes > 0);
}

export function groupFailuresByPattern(results: TestResult[]): Map<string, TestResult[]> {
  const groups = new Map<string, TestResult[]>();

  for (const result of results) {
    const key = result.name.split(' ').slice(0, 3).join(' ');
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key)!.push(result);
  }

  return groups;
}

export function getFlakyReport(results: TestResult[]): object {
  const flaky = detectFlakiness(results);
  return {
    totalFlaky: flaky.length,
    flakyTests: flaky.map(t => ({
      name: t.name,
      failureRate: ((t.failures / (t.failures + t.passes)) * 100).toFixed(1) + '%',
    })),
    recommendation: flaky.length > 0 ? 'Investigate network conditions and selector stability' : 'All stable',
  };
}
