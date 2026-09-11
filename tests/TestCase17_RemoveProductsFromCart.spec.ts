import { test } from '@playwright/test';
import BasePage from '../pages/BasePage';
import HomePage from '../pages/HomePage';
import ProductPage from '../pages/ProductsPage';
import CartPage from '../pages/CartPage';

test('Remove Products From Cart', async ({ page }) => {
  const product = 'Blue Top';
  const basepage = new BasePage(page);
  const homepage = new HomePage(page);
  const productpage = new ProductPage(page);
  const cartpage = new CartPage(page);

  await basepage.goto();
  // Verify that home page is visible successfully
  await homepage.VerifyHomePageVisible();
  // Add products to cart
  await basepage.goToProducts();
  await productpage.VerifyProductPageVisibilty();
  await productpage.AddProductsToCart(product);
  // Click 'Cart' button
  await productpage.ClickContinueButton();
  await basepage.goToCart();
  // Verify that cart page is displayed
  await cartpage.VerifyProductsInCart(product);
  // Click 'X' button corresponding to particular product
  await cartpage.RemoveProduct(product); 
  // Verify that product is removed from the cart
  await cartpage.VerifyProductDeleted(product);
});
