export enum LogLevel {
  DEBUG = 'DEBUG',
  INFO = 'INFO',
  WARN = 'WARN',
  ERROR = 'ERROR',
}

export class Logger {
  private static format(level: LogLevel, message: string): string {
    return `[${new Date().toISOString()}] [${level}] ${message}`;
  }

  static debug(message: string): void {
    if (process.env.DEBUG) console.debug(this.format(LogLevel.DEBUG, message));
  }

  static info(message: string): void {
    console.log(this.format(LogLevel.INFO, message));
  }

  static warn(message: string): void {
    console.warn(this.format(LogLevel.WARN, message));
  }

  static error(message: string): void {
    console.error(this.format(LogLevel.ERROR, message));
  }
}
