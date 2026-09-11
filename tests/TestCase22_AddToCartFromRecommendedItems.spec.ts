import { test } from '@playwright/test';
import BasePage from '../pages/BasePage';
import HomePage from '../pages/HomePage';
import ProductPage from '../pages/ProductsPage';
import CartPage from '../pages/CartPage';

test('Add to cart from Recommended items', async ({ page }) => {
  const product = 'Stylish Dress';
  const basepage = new BasePage(page);
  const homepage = new HomePage(page);
  const productpage = new ProductPage(page);
  const cartpage = new CartPage(page);

  await basepage.goto();
  await homepage.VerifyHomePageVisible();
  // Scroll to bottom of page
  await homepage.ScrollToFooter();
  // Verify 'RECOMMENDED ITEMS' are visible
  await homepage.VerifyRecommendedItemsVisible();
  // Click on 'Add To Cart' on Recommended product
  await homepage.AddRecommendedItemToCart(product);
  // Click on 'View Cart' button
  await productpage.ClickViewCart();
  // Verify that product is displayed in cart page
  await cartpage.VerifyProductsInCart(product);
});
