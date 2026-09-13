import { test, expect } from '@playwright/test'
import User from '../../Models/User';
import { MessageResponse } from '../../Models/APITypes';

test('API 10: POST To Verify Login with invalid details', async ({ request }) => {
    const user = User.random();
    const response = await request.post('api/verifyLogin', {
        form: {
            email: user.getEmail(),
            password: user.getPassword()
        }
    })

    expect(response.status()).toBe(200);

    const body: MessageResponse = await response.json();
    // console.log(JSON.stringify(body))

    expect(body).toHaveProperty('responseCode');
    expect(body).toHaveProperty('message');

    expect(body.responseCode).toBe(404);
    expect(body.message).toBe('User not found!');

});
