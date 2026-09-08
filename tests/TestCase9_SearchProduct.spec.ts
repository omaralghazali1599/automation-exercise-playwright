import { test } from '@playwright/test';
import BasePage from '../pages/BasePage';
import HomePage from '../pages/HomePage';
import ProductPage from '../pages/ProductsPage';

test('Search Product', async ({ page }) => {
  const basepage = new BasePage(page)
  const homePage = new HomePage(page)
  const productpage = new ProductPage(page)
  await basepage.goto();
  //Verify that home page is visible successfully
  await homePage.VerifyHomePageVisible();
  // Click on 'Products' button
  await basepage.goToProducts();
  // Verify user is navigated to ALL PRODUCTS page successfully
  await productpage.VerifyProductPageVisibilty();
  // Enter product name in search input and click search button
  await productpage.FillSearchField('top');
  // Verify 'SEARCHED PRODUCTS' is visible
  await productpage.VerifySearchedProductsHeading();
  // Verify all the products related to search are visible
  await productpage.VerifySearchedRelatedProducts('top|shirt');
});
