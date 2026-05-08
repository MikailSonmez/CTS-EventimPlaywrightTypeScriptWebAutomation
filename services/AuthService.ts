import { APIRequestContext, APIResponse } from '@playwright/test';
import { config } from '../core/config';
import { Logger } from '../utils/logger';

export interface AuthToken {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export class AuthService {
  private token: AuthToken | null = null;

  constructor(private request: APIRequestContext) {}

  async login(email: string, password: string): Promise<AuthToken> {
    Logger.info(`Logging in as ${email}`);
    const response = await this.request.post(`${config.apiBaseURL}/api/auth/login`, {
      data: { email, password },
    });

    if (!response.ok()) {
      throw new Error(`Login failed: ${response.status()}`);
    }

    this.token = await response.json();
    return this.token!;
  }

  async logout(): Promise<APIResponse> {
    return this.request.post(`${config.apiBaseURL}/api/auth/logout`, {
      headers: { Authorization: `Bearer ${this.token?.accessToken}` },
    });
  }

  async refreshToken(): Promise<AuthToken> {
    const response = await this.request.post(`${config.apiBaseURL}/api/auth/refresh`, {
      data: { refreshToken: this.token?.refreshToken },
    });
    this.token = await response.json();
    return this.token!;
  }

  getAuthHeader(): Record<string, string> {
    if (!this.token) throw new Error('Not authenticated');
    return { Authorization: `Bearer ${this.token.accessToken}` };
  }
}
