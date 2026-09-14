import { test } from '@playwright/test';
import BasePage from '../../pages/BasePage';
import HomePage from '../../pages/HomePage';
import SignUpLoginPage from '../../pages/SignUpLoginPage';
import User from '../../Models/User';
import SignUpPage from '../../pages/SignUpPage';

test('Test Case 1: Register User', async ({ page }) => {
  const user = User.random();
  const basepage = new BasePage(page)
  const homepage = new HomePage(page)
  const signup_login = new SignUpLoginPage(page)
  const signuppage = new SignUpPage(page)
  await basepage.goto();
  // Check that home page is visible successfully
  await homepage.VerifyHomePageVisible();
  // Click on 'Signup / Login' button
  await basepage.goToLogin();
  // Verify 'New User Signup!' is visible
  await signup_login.VerifySignUpText()
  // Enter name and email address & Print the values to the console & Click 'Signup' button
  await signup_login.ProvideSignupCredentials(user);
  // Verify that 'ENTER ACCOUNT INFORMATION' is visible
  await signuppage.VerifyAccountInfoText();
  // Filling the account information form
  await signuppage.FillAcountInfo({ title: 2, password: user.getPassword(), day: '1', month: '5', year: '1999'})
  await signuppage.VerifyNameAndEmail(user);
  //Verify that 'Address Information' is visible
  await signuppage.VerifyAddressInfoText();
  // Fill in the address information
  await signuppage.FillAddressInfo(user.getAddress());
  // Click 'Create Account' button
  await signuppage.ClickSubmit();
  // Verify that 'ACCOUNT CREATED!' is visible
  await signuppage.VerifyAccountCreatedText();
  // Click 'Continue' button
  await signuppage.ClickContinueButton();
  // Verify that 'Logged in as username' is visible
  await basepage.VerifyLoggedInAs(user)
  // Click 'Delete Account' button
  await basepage.goToDeleteAcc();
  // Verify that 'ACCOUNT DELETED!' is visible and click 'Continue' button
  await signuppage.VerifyAccountDeletedText();
  await signuppage.ClickContinueButton();
  await homepage.VerifyHomePageVisible()
});