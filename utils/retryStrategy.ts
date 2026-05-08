import { Logger } from './logger';

export interface RetryOptions {
  retries: number;
  delayMs: number;
  onRetry?: (attempt: number, error: Error) => void;
}

export async function withRetry<T>(
  fn: () => Promise<T>,
  options: RetryOptions = { retries: 3, delayMs: 1000 }
): Promise<T> {
  let lastError: Error;

  for (let attempt = 1; attempt <= options.retries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error as Error;
      Logger.warn(`Attempt ${attempt}/${options.retries} failed: ${lastError.message}`);

      if (options.onRetry) options.onRetry(attempt, lastError);

      if (attempt < options.retries) {
        await new Promise(resolve => setTimeout(resolve, options.delayMs * attempt));
      }
    }
  }

  throw lastError!;
}
