import { test } from '@playwright/test';
import User from '../../Models/User';
import HomePage from '../../pages/HomePage';
import SignUp_LoginPage from '../../pages/SignUpLoginPage';
import BasePage from '../../pages/BasePage';

test('Test Case 5: Register User with Existing Email', async ({ page }) => {
  const basepage = new BasePage(page);
  const user = User.notRandom();
  const loginPage = new SignUp_LoginPage(page);
  const homePage = new HomePage(page);
  await basepage.goto();
  // Verify Home page is visible on screen
  await homePage.VerifyHomePageVisible();
  // Click on 'Signup / Login' button
  await basepage.goToLogin();
  // Verify 'New User Signup!' is visible
  await loginPage.VerifySignUpText();
  // Enter name and already registered email address & Click 'Signup' button
  await loginPage.ProvideSignupCredentials(user);
  // Verify error 'Email Address already exist!' is visible
  await loginPage.VerifyFailedSignupText();
});


