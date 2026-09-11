import { test } from '@playwright/test';
import User from '../Models/User';
import BasePage from '../pages/BasePage';
import HomePage from '../pages/HomePage';
import CartPage from '../pages/CartPage';
import SignUpLoginPage from '../pages/SignUpLoginPage';
import SignUpPage from '../pages/SignUpPage';
import ProductPage from '../pages/ProductsPage';
import CheckoutPage from '../pages/CheckOutPage'; // not yet implemented

test('Verify address details in checkout page', async ({ page }) => {
  const user = User.random();
  const product = 'Blue Top';
  const basepage = new BasePage(page);
  const homepage = new HomePage(page);
  const productpage = new ProductPage(page);
  const cartpage = new CartPage(page);
  const signuploginpage = new SignUpLoginPage(page);
  const signuppage = new SignUpPage(page);
  const checkoutpage = new CheckoutPage(page)

  await basepage.goto();
  // Verify that home page is visible successfully
  await homepage.VerifyHomePageVisible();
  // Click 'Signup / Login' button
  await basepage.goToLogin();
  // Fill all details in Signup and create account
  await signuploginpage.VerifySignUpText();
  await signuploginpage.ProvideSignupCredentials(user);
  await signuppage.VerifyAccountInfoText();
  await signuppage.FillAcountInfo({ title: 2, password: user.getPassword(), day: '1', month: '5', year: '1999' });
  await signuppage.VerifyNameAndEmail(user);
  await signuppage.VerifyAddressInfoText();
  await signuppage.FillAddressInfo(user.getAddress());
  await signuppage.ClickSubmit();
  // Verify 'ACCOUNT CREATED!' and click 'Continue' button
  await signuppage.VerifyAccountCreatedText();
  await signuppage.ClickContinueButton();
  // Verify 'Logged in as username' at top
  await basepage.VerifyLoggedInAs(user);
  // Add products to cart
  await basepage.goToProducts();
  await productpage.VerifyProductPageVisibilty();
  await productpage.AddProductsToCart(product);
  // Click 'Cart' button
  await basepage.goToCart();
  // Verify that cart page is displayed
  await cartpage.VerifyProductsInCart(product);
  // Click Proceed To Checkout
  await cartpage.ClickProceedToCheckout(); 
  // Verify that the delivery address is same address filled at the time registration of account
  await checkoutpage.VerifyDeliveryAddressMatches(user); 
  // Verify that the billing address is same address filled at the time registration of account
   await checkoutpage.VerifyBillingAddressMatches(user); 
  // Click 'Delete Account' button
  await basepage.goToDeleteAcc();
  // Verify 'ACCOUNT DELETED!' and click 'Continue' button
  await signuppage.VerifyAccountDeletedText();
  await signuppage.ClickContinueButton();
  await homepage.VerifyHomePageVisible();
});
