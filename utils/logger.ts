import fs from 'fs';
import path from 'path';

export enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3,
  FATAL = 4
}

export interface LogContext {
  testId?: string;
  userId?: string;
  browser?: string;
  [key: string]: any;
}

export class Logger {
  private static currentLevel: LogLevel = LogLevel.INFO;
  private static logFilePath: string = path.join(process.cwd(), 'reports', 'test-execution.log');
  
  // ANSI Color codes
  private static colors = {
    reset: '\x1b[0m',
    debug: '\x1b[36m', // Cyan
    info: '\x1b[32m',  // Green
    warn: '\x1b[33m',  // Yellow
    error: '\x1b[31m', // Red
    fatal: '\x1b[41m\x1b[37m' // White on Red
  };

  public static initialize(level: LogLevel = LogLevel.INFO) {
    this.currentLevel = level;
    // Create log directory if it doesn't exist
    const dir = path.dirname(this.logFilePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    // Clear old log file on start
    if (fs.existsSync(this.logFilePath)) {
      fs.unlinkSync(this.logFilePath);
    }
  }

  private static getLevelString(level: LogLevel): string {
    return LogLevel[level];
  }

  private static getColor(level: LogLevel): string {
    switch (level) {
      case LogLevel.DEBUG: return this.colors.debug;
      case LogLevel.INFO: return this.colors.info;
      case LogLevel.WARN: return this.colors.warn;
      case LogLevel.ERROR: return this.colors.error;
      case LogLevel.FATAL: return this.colors.fatal;
      default: return this.colors.reset;
    }
  }

  private static formatConsole(level: LogLevel, message: string, context?: LogContext): string {
    const timestamp = new Date().toISOString();
    const levelStr = this.getLevelString(level).padEnd(5, ' ');
    const color = this.getColor(level);
    const ctxStr = context ? ` \x1b[90m${JSON.stringify(context)}\x1b[0m` : '';
    return `${color}[${timestamp}] [${levelStr}] ${message}${ctxStr}${this.colors.reset}`;
  }

  private static formatJSON(level: LogLevel, message: string, context?: LogContext): string {
    return JSON.stringify({
      timestamp: new Date().toISOString(),
      level: this.getLevelString(level),
      message,
      context
    });
  }

  private static log(level: LogLevel, message: string, context?: LogContext) {
    if (level < this.currentLevel) return;

    const consoleMsg = this.formatConsole(level, message, context);
    const fileMsg = this.formatJSON(level, message, context) + '\n';

    // Output to console
    if (level >= LogLevel.ERROR) {
      console.error(consoleMsg);
    } else if (level === LogLevel.WARN) {
      console.warn(consoleMsg);
    } else {
      console.log(consoleMsg);
    }

    // Output to file safely
    try {
      fs.appendFileSync(this.logFilePath, fileMsg);
    } catch (e) {
      console.error(`Failed to write to log file: ${e}`);
    }
  }

  static debug(message: string, context?: LogContext): void {
    this.log(LogLevel.DEBUG, message, context);
  }

  static info(message: string, context?: LogContext): void {
    this.log(LogLevel.INFO, message, context);
  }

  static warn(message: string, context?: LogContext): void {
    this.log(LogLevel.WARN, message, context);
  }

  static error(message: string, context?: LogContext): void {
    this.log(LogLevel.ERROR, message, context);
  }

  static fatal(message: string, context?: LogContext): void {
    this.log(LogLevel.FATAL, message, context);
    // In some systems, fatal might trigger an exit or alert
  }
}

