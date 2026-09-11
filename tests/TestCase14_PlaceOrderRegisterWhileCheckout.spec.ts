import { test } from '@playwright/test';
import User from '../Models/User';
import BasePage from '../pages/BasePage';
import HomePage from '../pages/HomePage';
import ProductPage from '../pages/ProductsPage';
import CartPage from '../pages/CartPage';
import SignUpLoginPage from '../pages/SignUpLoginPage';
import SignUpPage from '../pages/SignUpPage';
import CheckoutPage from '../pages/CheckOutPage'; 
import PaymentPage from '../pages/PaymentPage';

test('Place Order: Register while Checkout', async ({ page }) => {
  const user = User.random();
  const product = 'Blue Top';
  const basepage = new BasePage(page);
  const homepage = new HomePage(page);
  const productpage = new ProductPage(page);
  const cartpage = new CartPage(page);
  const signuploginpage = new SignUpLoginPage(page);
  const signuppage = new SignUpPage(page);
  const checkoutpage = new CheckoutPage(page);
  const paymentpage = new PaymentPage(page)
  await basepage.goto();
  // Verify that home page is visible successfully
  await homepage.VerifyHomePageVisible();
  // Add products to cart
  await basepage.goToProducts();
  await productpage.VerifyProductPageVisibilty();
  await productpage.AddProductsToCart(product);
  // Click 'Cart' button
  await productpage.ClickViewCart()
  // Verify that cart page is displayed
  await cartpage.VerifyProductsInCart(product);
  // Click Proceed To Checkout
  await cartpage.ClickProceedToCheckout(); // TODO: needs CartPage.ClickProceedToCheckout — not yet implemented (button class '.check_out' on cart page)
  // Click 'Register / Login' button
  await cartpage.ClickRegisterLoginInCheckoutModal(); // TODO: needs CartPage checkout-modal support ('#checkoutModal', link text 'Register / Login') — not yet implemented
  // Fill all details in Signup and create account
  await basepage.goToLogin();
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
  // Click 'Cart' button
  await basepage.goToCart();
  // Click 'Proceed To Checkout' button
  await cartpage.ClickProceedToCheckout();
  // Verify Address Details and Review Your Order
  await checkoutpage.VerifyBillingAddressMatches(user)
  await checkoutpage.VerifyDeliveryAddressMatches(user)
  // Enter description in comment text area and click 'Place Order'
  await checkoutpage.EnterCommentAndPlaceOrder('Please deliver in the morning.');
  // Enter payment details: Name on Card, Card Number, CVC, Expiration date
  await paymentpage.FillPaymentInfo(user.getCardInfo())
  // Click 'Pay and Confirm Order' button
  await paymentpage.ClickPayAndConfirm()
  // Verify success message 'Your order has been placed successfully!'
  await paymentpage.VerifyConfirmationMessage()
  // Click 'Delete Account' button
  await basepage.goToDeleteAcc();
  // Verify 'ACCOUNT DELETED!' and click 'Continue' button
  await signuppage.VerifyAccountDeletedText();
  await signuppage.ClickContinueButton();
  await homepage.VerifyHomePageVisible();
});
