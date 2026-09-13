import { test, expect, request } from '@playwright/test'
import User from '../../Models/User';
import { MessageResponse } from '../../Models/APITypes';

test('API 12: DELETE To Delete User Account', async ({ request }) => {
    const user = User.random();

    // Register the account this test will delete, so it owns its own data
    const createResponse = await request.post('/api/createAccount', {   
        form: user.getCreateAccountForm()
    })

    expect(createResponse.status()).toBe(200);

    const createBody: MessageResponse = await createResponse.json()
    // console.log(JSON.stringify(createBody))

    expect(createBody.responseCode).toBe(201);
    expect(createBody.message).toBe('User created!')

    // Reuse the same credentials to delete it
    const response = await request.delete('/api/deleteAccount', {
        form: {
            email: user.getEmail(),
            password: user.getPassword()
        }
    })

    expect(response.status()).toBe(200);

    const body: MessageResponse = await response.json()
    // console.log(JSON.stringify(body))

    expect(body).toHaveProperty('responseCode');
    expect(body).toHaveProperty('message');

    expect(body.responseCode).toBe(200);
    expect(body.message).toBe('Account deleted!')

    // The account is really gone: looking it up by the same email no longer finds it
    const getResponse = await request.get('/api/getUserDetailByEmail', {
        params: { email: user.getEmail() }
    })

    expect(getResponse.status()).toBe(200);

    const getBody: MessageResponse = await getResponse.json()
    // console.log(JSON.stringify(getBody))

    expect(getBody).toHaveProperty('responseCode');
    expect(getBody).toHaveProperty('message');

    expect(getBody.responseCode).toBe(404);
    expect(getBody.message).toBe('Account not found with this email, try another email!')

})
