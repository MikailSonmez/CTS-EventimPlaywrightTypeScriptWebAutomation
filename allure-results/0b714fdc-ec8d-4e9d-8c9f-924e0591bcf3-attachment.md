# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: api\cart.api.spec.ts >> Cart API Tests >> PUT /cart/items/:id updates item quantity
- Location: tests\api\cart.api.spec.ts:37:7

# Error details

```
Error: apiRequestContext.put: getaddrinfo ENOTFOUND api.example-eventim.com
Call log:
  - → PUT https://api.example-eventim.com/v1/cart/items/item_123
    - user-agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:148.0.2) Gecko/20100101 Firefox/148.0.2
    - accept: */*
    - accept-encoding: gzip,deflate,br
    - Authorization: Bearer test_user_token
    - Content-Type: application/json
    - content-length: 14

```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test.describe('Cart API Tests', () => {
  4  |   const baseURL = 'https://api.example-eventim.com/v1';
  5  | 
  6  |   // We use a mock session token or auth token for cart operations
  7  |   const headers = {
  8  |     'Authorization': 'Bearer test_user_token',
  9  |     'Content-Type': 'application/json'
  10 |   };
  11 | 
  12 |   test('GET /cart returns current user cart', async ({ request }) => {
  13 |     const response = await request.get(`${baseURL}/cart`, { headers });
  14 |     // expect(response.status()).toBe(200);
  15 |     // const body = await response.json();
  16 |     // expect(body).toHaveProperty('items');
  17 |   });
  18 | 
  19 |   test('POST /cart/items adds an item to the cart', async ({ request }) => {
  20 |     const response = await request.post(`${baseURL}/cart/items`, {
  21 |       headers,
  22 |       data: {
  23 |         eventId: '101',
  24 |         quantity: 2,
  25 |         ticketCategory: 'Standard'
  26 |       }
  27 |     });
  28 |     // expect(response.status()).toBe(201); // or 200 depending on API design
  29 |   });
  30 | 
  31 |   test('DELETE /cart/items/:id removes an item from the cart', async ({ request }) => {
  32 |     const itemId = 'item_123';
  33 |     const response = await request.delete(`${baseURL}/cart/items/${itemId}`, { headers });
  34 |     // expect(response.status()).toBe(204); // No content on successful delete usually
  35 |   });
  36 | 
  37 |   test('PUT /cart/items/:id updates item quantity', async ({ request }) => {
  38 |     const itemId = 'item_123';
> 39 |     const response = await request.put(`${baseURL}/cart/items/${itemId}`, {
     |                                    ^ Error: apiRequestContext.put: getaddrinfo ENOTFOUND api.example-eventim.com
  40 |       headers,
  41 |       data: {
  42 |         quantity: 4
  43 |       }
  44 |     });
  45 |     // expect(response.status()).toBe(200);
  46 |   });
  47 | });
  48 | 
```