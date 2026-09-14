import { test } from '@playwright/test';
import HomePage from '../../pages/HomePage';
import BasePage from '../../pages/BasePage';
import ProductPage from '../../pages/ProductsPage';
import CartPage from '../../pages/CartPage';

test('Test Case 13: Verify Product Quantity in Cart', async ({ page }) => {
  const product = 'Blue Top';
  const quantity = 4;
  const basepage = new BasePage(page);
  const homepage = new HomePage(page);
  const productpage = new ProductPage(page);
  const cartpage = new CartPage(page);
  await basepage.goto();
  // Verify that home page is visible successfully
  await homepage.VerifyHomePageVisible();
  // Click 'View Product' for any product on home page
  await homepage.OpenProduct(product);
  // Verify product detail is opened
  await productpage.VerifyProductNameInProductsDetailPage(product);
  // Increase quantity to 4
  await productpage.AddQuantity(quantity);
  // Click 'Add to cart' button
  await productpage.ClickAddToCartButtonInProductDetailPage();
  // Click 'View Cart' button
  await productpage.ClickViewCart();
  // Verify that product is displayed in cart page with exact quantity
  await cartpage.VerifyQuantity(product,quantity);
});