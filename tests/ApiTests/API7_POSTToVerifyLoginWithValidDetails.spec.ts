import { test, expect, request } from "@playwright/test";
import User from "../../Models/User";
import { MessageResponse } from "../../Models/APITypes";

test('API 7: POST To Verify Login with valid details', async ({ request }) => {
    const user = User.notRandom();
    
    const response = await request.post('api/verifyLogin', {form: {
        email: user.getEmail(),
        password: user.getPassword()
    }});

    expect(response.status()).toBe(200);

    const body: MessageResponse = await response.json();
    // console.log(JSON.stringify(body));

    expect(body).toHaveProperty('responseCode');
    expect(body).toHaveProperty('message');

    expect(body.message).toBe('User exists!');

})