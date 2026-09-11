import { test } from '@playwright/test';
import User from '../Models/User';
import HomePage from '../pages/HomePage';
import CartPage from '../pages/CartPage';
import BasePage from '../pages/BasePage';

test('Verify Subscription in Cart Page', async ({ page }) => {
    const basepage = new BasePage(page);
    const user = User.random();
    const homepage = new HomePage(page)
    const cartpage = new CartPage(page)
    await basepage.goto();
    // Verify that home page is visible successfully
    await homepage.VerifyHomePageVisible();
    // Click 'Cart' button
    await basepage.goToCart();
    // Verify text 'SUBSCRIPTION'
    await cartpage.VerifySubscriptionText();
    // Enter email address in input and click arrow button
    await cartpage.EnterEmail(user);
    // Click arrow button
    await cartpage.ClickSubmit();
    // Verify success message 'You have been successfully subscribed!' is visible
    await cartpage.VerifySuccessMessage();
});
