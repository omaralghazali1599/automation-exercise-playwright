import { test } from '@playwright/test';
import User from '../Models/User';
import BasePage from '../pages/BasePage';
import HomePage from '../pages/HomePage';
import ProductPage from '../pages/ProductsPage';
import CartPage from '../pages/CartPage';
import SignUpLoginPage from '../pages/SignUpLoginPage';

test('Search Products and Verify Cart After Login', async ({ page }) => {
  const user = User.notRandom();
  const product1 = 'Sleeveless Dress';
  const product2 = 'Stylish Dress';
  const basepage = new BasePage(page);
  const homepage = new HomePage(page);
  const productpage = new ProductPage(page);
  const cartpage = new CartPage(page);
  const signuploginpage = new SignUpLoginPage(page);

  await basepage.goto();
  await homepage.VerifyHomePageVisible();
  // Click on 'Products' button
  await basepage.goToProducts();
  // Verify user is navigated to ALL PRODUCTS page successfully
  await productpage.VerifyProductPageVisibilty();
  // Enter product name in search input and click search button
  await productpage.FillSearchField('Dress');
  // Verify 'SEARCHED PRODUCTS' is visible
  await productpage.VerifySearchedProductsHeading();
  // Verify all the products related to search are visible
  await productpage.VerifySearchedRelatedProducts('Dress|Sleeve');
  // Add those products to cart
  await productpage.AddProductsToCart(product1);
  await productpage.ClickContinueButton();
  await productpage.AddProductsToCart(product2);
  // Click 'Cart' button and verify that products are visible in cart
  await productpage.ClickViewCart();
  await cartpage.VerifyProductsInCart(product1);
  await cartpage.VerifyProductsInCart(product2);
  // Click 'Signup / Login' button and submit login details
  await basepage.goToLogin();
  await signuploginpage.VerifyLoginText();
  await signuploginpage.ProvideLoginCredentials(user);
  // Again, go to Cart page
  await basepage.goToCart();
  // Verify that those products are visible in cart after login as well
  await cartpage.VerifyProductsInCart(product1);
  await cartpage.VerifyProductsInCart(product2);
});
