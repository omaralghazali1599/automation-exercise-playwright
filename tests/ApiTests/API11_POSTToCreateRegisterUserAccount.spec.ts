import { test, expect } from '@playwright/test'
import User from '../../Models/User';
import { MessageResponse } from '../../Models/APITypes';
import CreateAccount from '../../APIs/CreateAccount';

test('API 11: POST To Create/Register User Account', async ({ request }) => {
    const user = User.random()
    const createaccount = new CreateAccount(request);
    const response = await createaccount.postCreateUser(user)

    expect(response.status()).toBe(200);

    const body: MessageResponse = await response.json()
    // console.log(JSON.stringify(body))

    expect(body).toHaveProperty('responseCode');
    expect(body).toHaveProperty('message');

    expect(body.responseCode).toBe(201);
    expect(body.message).toBe('User created!')

})
