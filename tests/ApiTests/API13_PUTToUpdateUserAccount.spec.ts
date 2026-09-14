import { test, expect } from '@playwright/test'
import User from '../../Models/User';
import { MessageResponse, UserDetailResponse } from '../../Models/APITypes';
import CreateAccount from '../../APIs/CreateAccount';
import UpdateAccount from '../../APIs/UpdateAccount';
import UserDetail from '../../APIs/UserDetail';

test('API 13: PUT To Update User Account', async ({ request }) => {
    const user = User.random();

    // Register the account this test will update, so it owns its own data
    const createaccount = new CreateAccount(request);
    const createResponse = await createaccount.postCreateUser(user)

    expect(createResponse.status()).toBe(200);

    const createBody: MessageResponse = await createResponse.json()
    // console.log(JSON.stringify(createBody))
    // console.log(user.getEmail())
    // console.log(user.getFirstName())

    expect(createBody.responseCode).toBe(201);
    expect(createBody.message).toBe('User created!')

    // A fresh set of details, pinned to the credentials that identify the account
    const updatedUser = User.random();
    const updateaccount = new UpdateAccount(request)
    const response = await updateaccount.putUpdateUser(user, updatedUser)

    expect(response.status()).toBe(200);

    const body: MessageResponse = await response.json()
    // console.log(JSON.stringify(body))
    // console.log(updatedUser.getCreateAccountForm().email)
    // console.log(updatedUser.getCreateAccountForm().name)

    expect(body).toHaveProperty('responseCode');
    expect(body).toHaveProperty('message');

    expect(body.responseCode).toBe(200);
    expect(body.message).toBe('User updated!')

    const getuserdetail = new UserDetail(request)
    const details = await getuserdetail.getUserDetailsByEmail(user.getEmail())

    expect(details.status()).toBe(200);

    const detailsBody: UserDetailResponse = await details.json();
    expect(detailsBody.user.name).toBe(updatedUser.getFirstName());
    expect(detailsBody.user.email).toEqual(user.getEmail());
    // console.log(detailsBody.user.email)
    // console.log(detailsBody.user.first_name)

})
