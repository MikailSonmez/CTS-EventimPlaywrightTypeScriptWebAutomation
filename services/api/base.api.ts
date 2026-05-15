import { APIRequestContext, APIResponse } from '@playwright/test';

export class BaseApi {
  constructor(
    protected request: APIRequestContext,
    protected baseURL: string,
    protected defaultHeaders: Record<string, string> = { 'Content-Type': 'application/json' }
  ) {}

  protected async get(endpoint: string, params?: Record<string, string | number | boolean>, headers?: Record<string, string>): Promise<APIResponse> {
    return this.request.get(`${this.baseURL}${endpoint}`, {
      headers: { ...this.defaultHeaders, ...headers },
      params
    });
  }

  protected async post(endpoint: string, data: any, headers?: Record<string, string>): Promise<APIResponse> {
    return this.request.post(`${this.baseURL}${endpoint}`, {
      headers: { ...this.defaultHeaders, ...headers },
      data
    });
  }

  protected async put(endpoint: string, data: any, headers?: Record<string, string>): Promise<APIResponse> {
    return this.request.put(`${this.baseURL}${endpoint}`, {
      headers: { ...this.defaultHeaders, ...headers },
      data
    });
  }

  protected async delete(endpoint: string, headers?: Record<string, string>): Promise<APIResponse> {
    return this.request.delete(`${this.baseURL}${endpoint}`, {
      headers: { ...this.defaultHeaders, ...headers }
    });
  }
}
