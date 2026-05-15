# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: api\search.api.spec.ts >> Search API Tests >> GET /search/suggestions - Should return auto-complete suggestions
- Location: tests\api\search.api.spec.ts:35:7

# Error details

```
Error: apiRequestContext.get: getaddrinfo ENOTFOUND api-stg.example-eventim.com
Call log:
  - → GET https://api-stg.example-eventim.com/v1/search/suggestions?q=Col
    - user-agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/147.0.7727.15 Safari/537.36
    - accept: */*
    - accept-encoding: gzip,deflate,br
    - Content-Type: application/json

```

# Test source

```ts
  1  | import { APIRequestContext, APIResponse } from '@playwright/test';
  2  | 
  3  | export class BaseApi {
  4  |   constructor(
  5  |     protected request: APIRequestContext,
  6  |     protected baseURL: string,
  7  |     protected defaultHeaders: Record<string, string> = { 'Content-Type': 'application/json' }
  8  |   ) {}
  9  | 
  10 |   protected async get(endpoint: string, params?: Record<string, string | number | boolean>, headers?: Record<string, string>): Promise<APIResponse> {
> 11 |     return this.request.get(`${this.baseURL}${endpoint}`, {
     |                         ^ Error: apiRequestContext.get: getaddrinfo ENOTFOUND api-stg.example-eventim.com
  12 |       headers: { ...this.defaultHeaders, ...headers },
  13 |       params
  14 |     });
  15 |   }
  16 | 
  17 |   protected async post(endpoint: string, data: any, headers?: Record<string, string>): Promise<APIResponse> {
  18 |     return this.request.post(`${this.baseURL}${endpoint}`, {
  19 |       headers: { ...this.defaultHeaders, ...headers },
  20 |       data
  21 |     });
  22 |   }
  23 | 
  24 |   protected async put(endpoint: string, data: any, headers?: Record<string, string>): Promise<APIResponse> {
  25 |     return this.request.put(`${this.baseURL}${endpoint}`, {
  26 |       headers: { ...this.defaultHeaders, ...headers },
  27 |       data
  28 |     });
  29 |   }
  30 | 
  31 |   protected async delete(endpoint: string, headers?: Record<string, string>): Promise<APIResponse> {
  32 |     return this.request.delete(`${this.baseURL}${endpoint}`, {
  33 |       headers: { ...this.defaultHeaders, ...headers }
  34 |     });
  35 |   }
  36 | }
  37 | 
```