import { test, expect, request } from '@playwright/test'
import { MessageResponse } from '../../Models/APITypes'

test('API 9: DELETE To Verify Login', async ({ request }) => {
    const reponse = await request.delete('/api/verifyLogin')

    expect(reponse.status()).toBe(200)

    const body: MessageResponse = await reponse.json()
    // console.log(JSON.stringify(body))

    expect(body).toHaveProperty('responseCode');
    expect(body).toHaveProperty('message');

    expect(body.responseCode).toBe(405)
    expect(body.message).toBe('This request method is not supported.')
})