import { test } from '@playwright/test';
import BasePage from '../../pages/BasePage';
import HomePage from '../../pages/HomePage';
import ProductPage from '../../pages/ProductsPage';

test('Test Case 18: View Category Products', async ({ page }) => {
    let Category = 'Women';    let Category2 = 'Men';
    let SubCategory = 'Dress'; let SubCategory2 = 'Tshirts';
    const basepage = new BasePage(page);
    const homepage = new HomePage(page);
    const productpage = new ProductPage(page);
    await basepage.goto();
    await homepage.VerifyHomePageVisible();
    // Verify that categories are visible on left side bar
    await homepage.VerifyCategoryVisisble();
    // Click on 'Women' category
    await homepage.ClickOnCategory(Category);
    // Click on any category link under 'Women' category, for example: Dress
    await homepage.ClickOnSubCategory(Category,SubCategory); 
    // Verify that category page is displayed and confirm text 'WOMEN - TOPS PRODUCTS'
    await productpage.VerifyCategoryHeaderText(Category, SubCategory); 
    // On left side bar, click on any sub-category link of 'Men' category
    await productpage.ClickOnCategory(Category2);
    await productpage.ClickOnSubCategory(Category2,SubCategory2);
    // Verify that user is navigated to that category page
    await productpage.VerifyCategoryHeaderText(Category2,SubCategory2);
});
