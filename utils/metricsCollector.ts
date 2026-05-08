export class MetricsCollector {
  private static metrics: Array<{ name: string; duration: number; status: string }> = [];

  static logTestDuration(testName: string, duration: number): void {
    console.log(`[METRIC] ${testName} took ${duration}ms`);
    this.metrics.push({ name: testName, duration, status: 'measured' });
  }

  static logFlakyTest(testName: string): void {
    console.warn(`[FLAKY] ${testName}`);
    this.metrics.push({ name: testName, duration: 0, status: 'flaky' });
  }

  static getSummary(): object {
    return {
      totalTests: this.metrics.length,
      avgDuration: this.metrics.reduce((a, b) => a + b.duration, 0) / this.metrics.length || 0,
      flakyTests: this.metrics.filter(m => m.status === 'flaky').map(m => m.name),
    };
  }
}
