import { test, expect } from '@playwright/test'
import User from '../../Models/User';
import { MessageResponse } from '../../Models/APITypes';

test('API 13: PUT To Update User Account', async ({ request }) => {
    const user = User.random();

    // Register the account this test will update, so it owns its own data
    const createResponse = await request.post('/api/createAccount', {
        form: user.getCreateAccountForm()
    })

    expect(createResponse.status()).toBe(200);

    const createBody: MessageResponse = await createResponse.json()
    // console.log(JSON.stringify(createBody))
    // console.log(user.getEmail())

    expect(createBody.responseCode).toBe(201);
    expect(createBody.message).toBe('User created!')

    // A fresh set of details, pinned to the credentials that identify the account
    const updatedUser = User.random();
    const response = await request.put('/api/updateAccount', {
        form: {
            ...updatedUser.getCreateAccountForm(),
            email: user.getEmail(),
            password: user.getPassword()
        }
    })

    expect(response.status()).toBe(200);

    const body: MessageResponse = await response.json()
    // console.log(JSON.stringify(body))
    // console.log(updatedUser.getCreateAccountForm().email)

    expect(body).toHaveProperty('responseCode');
    expect(body).toHaveProperty('message');

    expect(body.responseCode).toBe(200);
    expect(body.message).toBe('User updated!')

    const details = await request.get('/api/getUserDetailByEmail', {
    params: { email: user.getEmail() },
    });
    const detailsBody = await details.json();
    expect(detailsBody.user.name).toBe(updatedUser.getFirstName());
    expect(detailsBody.user.email).toEqual(user.getEmail());
    // console.log(detailsBody.user.email)
})
