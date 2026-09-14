import { test, expect } from '@playwright/test'
import User from '../../Models/User';
import { MessageResponse } from '../../Models/APITypes';
import CreateAccount from '../../APIs/CreateAccount';
import DeleteAccount from '../../APIs/DeleteAccount';
import UserDetail from '../../APIs/UserDetail';

test('API 12: DELETE To Delete User Account', async ({ request }) => {
    const user = User.random()
    const createaccount = new CreateAccount(request);
    const createResponse = await createaccount.postCreateUser(user)

    expect(createResponse.status()).toBe(200);

    const createBody: MessageResponse = await createResponse.json()
    // console.log(JSON.stringify(createBody))

    expect(createBody.responseCode).toBe(201);
    expect(createBody.message).toBe('User created!')

    // Reuse the same credentials to delete it
    const deleteaccount = new DeleteAccount(request)
    const deleteResponse = await deleteaccount.deleteUser(user)

    expect(deleteResponse.status()).toBe(200);

    const body: MessageResponse = await deleteResponse.json()
    // console.log(JSON.stringify(body))

    expect(body).toHaveProperty('responseCode');
    expect(body).toHaveProperty('message');

    expect(body.responseCode).toBe(200);
    expect(body.message).toBe('Account deleted!')

    // The account is really gone: looking it up by the same email no longer finds it
    const getdeletedaccount = new UserDetail(request)
    const detailsResponse = await getdeletedaccount.getUserDetailsByEmail(user.getEmail())

    expect(detailsResponse.status()).toBe(200);

    const getBody: MessageResponse = await detailsResponse.json()
    // console.log(JSON.stringify(getBody))

    expect(getBody).toHaveProperty('responseCode');
    expect(getBody).toHaveProperty('message');

    expect(getBody.responseCode).toBe(404);
    expect(getBody.message).toBe('Account not found with this email, try another email!')

})