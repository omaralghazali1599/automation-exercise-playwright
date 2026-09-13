import { test, expect, request } from '@playwright/test'
import User from '../../Models/User';
import { MessageResponse, UserDetailResponse } from '../../Models/APITypes';

test('API 14: GET user account detail by email', async ({ request }) => {
    const user = User.random();
    const address = user.getAddress();

    // Register the account this test will read back, so it owns its own data
    const createResponse = await request.post('/api/createAccount', {
        form: user.getCreateAccountForm()
    })

    expect(createResponse.status()).toBe(200);

    const createBody: MessageResponse = await createResponse.json()
    // console.log(JSON.stringify(createBody))

    expect(createBody.responseCode).toBe(201);
    expect(createBody.message).toBe('User created!')

    // Reuse the same email to look the account up
    const response = await request.get('/api/getUserDetailByEmail', {
        params: { email: user.getEmail() }
    })

    expect(response.status()).toBe(200);

    const body: UserDetailResponse = await response.json()
    // console.log(JSON.stringify(body))

    expect(body).toHaveProperty('responseCode');
    expect(body).toHaveProperty('user');

    // Response code in the body
    expect(body.responseCode).toBe(200);

    // Shape of the user detail
    expect(body.user).toHaveProperty('id');
    expect(body.user).toHaveProperty('name');
    expect(body.user).toHaveProperty('email');
    expect(body.user).toHaveProperty('title');
    expect(body.user).toHaveProperty('birth_day');
    expect(body.user).toHaveProperty('birth_month');
    expect(body.user).toHaveProperty('birth_year');
    expect(body.user).toHaveProperty('first_name');
    expect(body.user).toHaveProperty('last_name');
    expect(body.user).toHaveProperty('company');
    expect(body.user).toHaveProperty('address1');
    expect(body.user).toHaveProperty('address2');
    expect(body.user).toHaveProperty('country');
    expect(body.user).toHaveProperty('state');
    expect(body.user).toHaveProperty('city');
    expect(body.user).toHaveProperty('zipcode');

    // The details returned are the ones the account was registered with
    expect(body.user.name).toBe(user.getFirstName());
    expect(body.user.email).toBe(user.getEmail());
    expect(body.user.first_name).toBe(address.firstName);
    expect(body.user.last_name).toBe(address.lastName);
    expect(body.user.company).toBe(address.company);
    expect(body.user.address1).toBe(address.address1);
    expect(body.user.country).toBe(address.country);
    expect(body.user.state).toBe(address.state);
    expect(body.user.city).toBe(address.city);
    expect(body.user.zipcode).toBe(address.zipcode);

})
