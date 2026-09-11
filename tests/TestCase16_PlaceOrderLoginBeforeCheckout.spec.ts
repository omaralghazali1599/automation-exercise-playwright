import { test } from '@playwright/test';
import User from '../Models/User';
import BasePage from '../pages/BasePage';
import HomePage from '../pages/HomePage';
import ProductPage from '../pages/ProductsPage';
import CartPage from '../pages/CartPage';
import SignUpLoginPage from '../pages/SignUpLoginPage';
import CheckoutPage from '../pages/CheckOutPage';
import PaymentPage from '../pages/PaymentPage';

test('Place Order: Login before Checkout', async ({ page }) => {
  const user = User.notRandom();
  const product = 'Blue Top';
  const basepage = new BasePage(page);
  const homepage = new HomePage(page);
  const productpage = new ProductPage(page);
  const cartpage = new CartPage(page);
  const signuploginpage = new SignUpLoginPage(page);
  const checkoutpage = new CheckoutPage(page);
  const paymentpage = new PaymentPage(page);

  await basepage.goto();
  // Verify that home page is visible successfully
  await homepage.VerifyHomePageVisible();
  // Click 'Signup / Login' button
  await basepage.goToLogin();
  // Fill email, password and click 'Login' button
  await signuploginpage.VerifyLoginText();
  await signuploginpage.ProvideLoginCredentials(user);
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
  // Verify Address Details and Review Your Order
  await checkoutpage.VerifyDeliveryAndInvoicesAddressesAreVisible();
  // Enter description in comment text area and click 'Place Order'
  await checkoutpage.EnterCommentAndPlaceOrder('Please deliver in the morning.'); 
  // Enter payment details: Name on Card, Card Number, CVC, Expiration date
  await paymentpage.FillPaymentInfo(user.getCardInfo());
  // Click 'Pay and Confirm Order' button
  await paymentpage.ClickPayAndConfirm();
  // Verify success message 'Your order has been placed successfully!'
  await paymentpage.VerifyConfirmationMessage();
});
