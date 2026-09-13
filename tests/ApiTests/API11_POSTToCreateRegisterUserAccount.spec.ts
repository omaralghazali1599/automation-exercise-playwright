import { test, expect, request } from '@playwright/test'
import User from '../../Models/User';
import { MessageResponse } from '../../Models/APITypes';

test('API 11: POST To Create/Register User Account', async ({ request}) => {
    const user = User.random();

    const response = await request.post('/api/createAccount', {
        form: user.getCreateAccountForm()
    })

    expect(response.status()).toBe(200);

    const body: MessageResponse = await response.json()
    // console.log(JSON.stringify(body))

    expect(body).toHaveProperty('responseCode');
    expect(body).toHaveProperty('message');

    expect(body.responseCode).toBe(201);
    expect(body.message).toBe('User created!')

})
