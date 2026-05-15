import { request, APIRequestContext } from '@playwright/test';

export class AuthApiService {
  private baseURL: string;

  constructor(baseURL: string = 'https://api.example-eventim.com/v1') {
    this.baseURL = baseURL;
  }

  async login(email: string, password: string): Promise<{ token: string, user: any }> {
    const apiContext = await request.newContext();
    const response = await apiContext.post(`${this.baseURL}/auth/login`, {
      data: { email, password }
    });
    
    if (response.ok()) {
      return await response.json();
    }
    throw new Error(`Login failed: ${response.status()}`);
  }

  async register(userData: any): Promise<any> {
    const apiContext = await request.newContext();
    const response = await apiContext.post(`${this.baseURL}/auth/register`, {
      data: userData
    });
    
    if (response.ok()) {
      return await response.json();
    }
    throw new Error(`Registration failed: ${response.status()}`);
  }

  async logout(token: string): Promise<boolean> {
    const apiContext = await request.newContext();
    const response = await apiContext.post(`${this.baseURL}/auth/logout`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    return response.ok();
  }
}
