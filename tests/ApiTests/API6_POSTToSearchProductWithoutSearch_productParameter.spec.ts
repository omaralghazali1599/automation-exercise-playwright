import { test, expect } from '@playwright/test';
import { MessageResponse } from '../../Models/APITypes';


test('API 6: POST To Search Product without search_product parameter',async ({ request }) =>  {
    const response = await request.post('api/searchProduct');
    
    expect(response.status()).toBe(200);

    const body: MessageResponse = await response.json();
    // console.log(JSON.stringify(body))

    expect(body).toHaveProperty('responseCode')
    expect(body).toHaveProperty('message')

    expect(body.responseCode).toBe(400);
    expect(body.message).toBe('Bad request, search_product parameter is missing in POST request.')
})