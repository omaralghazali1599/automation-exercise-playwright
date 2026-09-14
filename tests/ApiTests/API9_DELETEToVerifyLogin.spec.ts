import { test, expect } from '@playwright/test'
import { MessageResponse } from '../../Models/APITypes'
import VerifyLogin from '../../APIs/VerifyLogin'

test('API 9: DELETE To Verify Login', async ({ request }) => {
    const verifylogin = new VerifyLogin(request)
    const response = await verifylogin.deleteVerifyLogin();

    expect(response.status()).toBe(200)

    const body: MessageResponse = await response.json()
    // console.log(JSON.stringify(body))

    expect(body).toHaveProperty('responseCode');
    expect(body).toHaveProperty('message');

    expect(body.responseCode).toBe(405)
    expect(body.message).toBe('This request method is not supported.')
})