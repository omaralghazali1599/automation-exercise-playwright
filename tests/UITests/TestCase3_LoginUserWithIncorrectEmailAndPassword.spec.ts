import { test } from '@playwright/test';
import User from '../../Models/User';
import HomePage from '../../pages/HomePage';
import SignUpLoginPage from '../../pages/SignUpLoginPage';
import BasePage from '../../pages/BasePage';

test('Test Case 3: Login User with Incorrect Email and Password', async ({ page }) => {
  const basepage = new BasePage(page);
  const user = User.notRandom();
  const homePage = new HomePage(page);
  const loginpage = new SignUpLoginPage(page);
  await basepage.goto();
  // Verify Home page is visible on screen
  await homePage.VerifyHomePageVisible();
  // Click on 'Signup / Login' button
  await basepage.goToLogin();
  // Verify 'Login to your account' is visible
  await loginpage.VerifyLoginText();
  // Enter incorrect email address and password & Click 'login' button
  await loginpage.ProvideIncorrectLoginCredentials(user);
  // Verify error message 'Your email or password is incorrect!' is visible
  await loginpage.VerifyFailedLoginText();

});