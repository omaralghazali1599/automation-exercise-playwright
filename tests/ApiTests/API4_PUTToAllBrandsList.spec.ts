import { test, expect } from '@playwright/test';
import { MessageResponse } from '../../Models/APITypes';

test('API 4: PUT To All Brands List', async ({ request }) => {
const response = await request.put('/api/brandsList');

// HTTP status
expect(response.status()).toBe(200);

const body: MessageResponse = await response.json();
// console.log(JSON.stringify(body));

expect(body).toHaveProperty('responseCode');
expect(body).toHaveProperty('message')
  
// Response code in the body
expect(body.responseCode).toBe(405);

// Response Message: This request method is not supported.
expect(body.message).toBe('This request method is not supported.')

});

