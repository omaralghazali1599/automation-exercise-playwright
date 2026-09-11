import { test } from '@playwright/test';
import BasePage from '../pages/BasePage';
import HomePage from '../pages/HomePage';
import ProductPage from '../pages/ProductsPage';

// NOTE: official title says "View & Cart Brand Products" but the official steps never add anything
// to a cart — implementing the steps as written below, not the title.
test('View Brand Products', async ({ page }) => {
  const brand1 = 'Kookie Kids'
  const brand2 = 'Polo'

  const basepage = new BasePage(page);
  const homepage = new HomePage(page);
  const productpage = new ProductPage(page);

  await basepage.goto();
  await homepage.VerifyHomePageVisible();
  // Click on 'Products' button
  await basepage.goToProducts();
  // Verify user is navigated to ALL PRODUCTS page successfully
  await productpage.VerifyProductPageVisibilty();
  // Verify that Brands are visible on left side bar
  await productpage.VerifyBrandSidebarVisible();
  // Click on any brand name
  await productpage.AccessASpecificBrand(brand1);
  // Verify that user is navigated to brand page and brand products are displayed
  await productpage.VerifyListingHeading(brand1);
  // On left side bar, click on any other brand link
  await productpage.AccessASpecificBrand(brand2);
  // Verify that user is navigated to that brand page and can see products
  await productpage.VerifyListingHeading(brand2);
});
