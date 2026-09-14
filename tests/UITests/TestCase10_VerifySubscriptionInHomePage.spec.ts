import { test } from '@playwright/test';
import BasePage from '../../pages/BasePage';
import User from '../../Models/User';
import HomePage from '../../pages/HomePage';

test('Test Case 10: Verify Subscription in Home Page', async ({ page }) => {
  const basepage = new BasePage(page)
  const user = User.random()
  const homepage = new HomePage(page)
  // Verify that home page is visible successfully
  await basepage.goto();
  // Scroll down to footer
  await homepage.ScrollToFooter();
  // Verify text 'SUBSCRIPTION'
  await homepage.VerifySubscribtionText();
  // Enter email address in input and click arrow button
  await homepage.FillEmailAndSubmit(user);
  // Verify success message 'You have been successfully subscribed!' is visible
  await homepage.VerifySuccessMessage();
});