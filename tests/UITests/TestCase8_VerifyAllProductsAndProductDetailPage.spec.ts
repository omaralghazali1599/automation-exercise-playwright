import { test } from '@playwright/test';
import BasePage from '../../pages/BasePage';
import HomePage from '../../pages/HomePage';
import ProductPage from '../../pages/ProductsPage';

test('Test Case 8: Verify All Products and Product Detail Page', async ({ page }) => {
  const basepage = new BasePage(page)
  const homepage = new HomePage(page)
  const productpage = new ProductPage(page)
  await basepage.goto();
  // Verify that home page is visible successfully
  await homepage.VerifyHomePageVisible();
  // Click on 'Products' button
  await basepage.goToProducts();
  // Verify user is navigated to ALL PRODUCTS page successfully
  await productpage.VerifyProductPageVisibilty();
  // The products list is visible
  await productpage.VerifyProductListVisibility();
  // Click on 'View Product' of first product
  await productpage.ClickOnViewProductButton('Blue Top');
  // User is landed to product detail page
  await productpage.VerifyProductDetailPageVisibility(1); 
  // Verify that detail detail is visible: product name, category, price, availability, condition, brand
  await productpage.VerifyProductInfo({
    name: 'Blue Top',
    category: 'Women > Tops',
    price: 'Rs. 500',
    availability: 'In Stock',
    condition: 'New',
    brand: 'Polo',})
});
