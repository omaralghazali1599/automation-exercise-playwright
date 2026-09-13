import { test, expect} from '@playwright/test'
import User from "../../Models/User";
import { MessageResponse } from '../../Models/APITypes';


test('API 8: POST To Verify Login without email parameter', async ({ request }) => {
    const user = User.notRandom()
    const response = await request.post('/api/verifyLogin', {form: { password: user.getPassword()}})

    expect(response.status()).toBe(200);

    const body: MessageResponse = await response.json();
    // console.log(JSON.stringify(body));

    expect(body).toHaveProperty('responseCode');
    expect(body).toHaveProperty('message');

    expect(body.responseCode).toBe(400);
    expect(body.message).toBe("Bad request, email or password parameter is missing in POST request.")
})