import { test, expect } from '@playwright/test';
import { MessageResponse } from '../../Models/APITypes';
import VerifyLogin from '../../APIs/VerifyLogin';

test('API 7: POST To Verify Login with valid details', async ({ request }) => {
    const verifylogin = new VerifyLogin(request)
    const response = await verifylogin.postLoginWithValidCred()

    expect(response.status()).toBe(200);

    const body: MessageResponse = await response.json();
    // console.log(JSON.stringify(body));

    expect(body).toHaveProperty('responseCode');
    expect(body).toHaveProperty('message');

    expect(body.responseCode).toBe(200);
    expect(body.message).toBe('User exists!');

})