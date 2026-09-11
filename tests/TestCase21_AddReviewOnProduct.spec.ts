import { test } from '@playwright/test';
import User from '../Models/User';
import BasePage from '../pages/BasePage';
import HomePage from '../pages/HomePage';
import ProductPage from '../pages/ProductsPage';

test('Add review on product', async ({ page }) => {
  const user = User.random();
  const basepage = new BasePage(page);
  const homepage = new HomePage(page);
  const productpage = new ProductPage(page);

  await basepage.goto();
  await homepage.VerifyHomePageVisible();
  // Click on 'Products' button
  await basepage.goToProducts();
  // Verify user is navigated to ALL PRODUCTS page successfully
  await productpage.VerifyProductPageVisibilty();
  // Click on 'View Product' button
  await productpage.ClickOnViewProductButton('Blue Top');
  // Verify 'Write Your Review' is visible
  await productpage.VerifyReviewVisible();
  // Enter name, email and review
  await productpage.FillReview(user); // TODO: needs ProductPage.FillReview — not yet implemented ('#review-form #name', '#review-form #email', '#review-form #review')
  // Click 'Submit' button
  await productpage.SubmitReview(); // TODO: needs ProductPage.SubmitReview — not yet implemented ('#button-review')
  // Verify success message 'Thank you for your review.'
  await productpage.VerifyReviewSuccessMessage(); // TODO: needs ProductPage.VerifyReviewSuccessMessage — not yet implemented ('#review-section', hidden until submit)
});
