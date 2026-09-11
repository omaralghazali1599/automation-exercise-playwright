import { test } from '@playwright/test';
import BasePage from '../pages/BasePage';
import HomePage from '../pages/HomePage';

test("Verify Scroll Up without 'Arrow' button and Scroll Down functionality", async ({ page }) => {
  const basepage = new BasePage(page);
  const homepage = new HomePage(page);

  await basepage.goto();
  // Verify that home page is visible successfully
  await homepage.VerifyHomePageVisible();
  // Scroll down page to bottom
  await homepage.ScrollToFooter();
  // Verify 'SUBSCRIPTION' is visible
  await homepage.VerifySubscribtionText();
  // Scroll up page to top
  await homepage.ScrollToTop();
  // Verify that page is scrolled up and 'Full-Fledged practice website for Automation Engineers' text is visible on screen
  await homepage.VerifyHeroTextVisible(); 
});
