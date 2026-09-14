import { test } from '@playwright/test';
import HomePage from '../../pages/HomePage';
import TestCasePage from '../../pages/TestCasePage';
import BasePage from '../../pages/BasePage';

test('Test Case 7: Verify Test Cases Page', async ({ page }) => {
  const basepage = new BasePage(page);
  const homepage = new HomePage(page);
  const testcasepage = new TestCasePage(page);
  await basepage.goto();
  // Verify that home page is visible successfully
  await homepage.VerifyHomePageVisible();
  // Click on 'Test case' button
  await basepage.goToTestCases();
  // Verify user is navigated to test cases page successfully
  await testcasepage.GetPageTitle();
  await testcasepage.TestCaseVisibility();
});

