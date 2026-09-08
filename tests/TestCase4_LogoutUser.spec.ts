import { test } from '@playwright/test';
import User from '../Models/User';
import HomePage from '../pages/HomePage';
import SignUpLoginPage from '../pages/SignUpLoginPage';
import BasePage from '../pages/BasePage';

test('Logout User', async ({ page }) => {
  const basepage = new BasePage(page);
  const user = User.notRandom();
  const homePage = new HomePage(page);
  const loginPage = new SignUpLoginPage(page);
  await basepage.goto();
  // Verify Home page is visible on screen
  await homePage.VerifyHomePageVisible();
  // Click on 'Signup / Login' button
  await basepage.goToLogin();
  // Verify 'Login to your account' is visible
  await loginPage.VerifyLoginText();
  // Enter correct email address and password & Click 'login' button
  await loginPage.ProvideLoginCredentials(user);
  // Verify that 'Logged in as username' is visible
  await basepage.VerifyLoggedInAs(user);
  // Click on 'Logout' button
  await basepage.goToLogout();
  // Verify that the user is logged out
  await loginPage.VerifyLoginText();
});