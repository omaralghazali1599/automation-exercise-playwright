import { test } from '@playwright/test';
import BasePage from '../../pages/BasePage';
import HomePage from '../../pages/HomePage';
import ProductPage from '../../pages/ProductsPage';
import CartPage from '../../pages/CartPage';

test('Test Case 12: Add Products in Cart', async ({ page }) => {
  const basepage = new BasePage(page)
  const homepage = new HomePage(page)
  const productpage = new ProductPage(page)
  const cartpage = new CartPage(page)
  let product1 = 'Blue Top';
  let product2 = 'Men Tshirt';
  await basepage.goto();
  
  // Verify that home page is visible successfully
  await homepage.VerifyHomePageVisible();
  // Click 'Products' button
  await basepage.goToProducts();
  // Verify user is navigated to ALL PRODUCTS page successfully
  await productpage.VerifyProductPageVisibilty();
  // Click 'Add to cart' on the first product product
  await productpage.AddProductsToCart(product1);
  // Click 'Continue Shopping' button
  await productpage.ClickContinueButton();
  // Click 'Add to cart' on the second product product
  await productpage.AddProductsToCart(product2)  ;
  // Click 'View Cart' button
  await productpage.ClickViewCart();
  // Verify both products are added to Cart
  await cartpage.VerifyProductsInCart(product1);
  await cartpage.VerifyProductsInCart(product2);
});