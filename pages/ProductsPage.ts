import { expect, Page, Locator } from '@playwright/test';
import User from '../Models/User';

export type ProductDetails = {
  name: string;
  category: string;
  price: string;
  availability: string;
  condition: string;
  brand: string;
};

export default class ProductPage{
    private  page:Page;

    // Constructor

    constructor(page:Page){
        this.page = page;
    }

    // Elements
    private get ProductNameInProductDetailPage(): Locator { return this.page.locator('.product-information h2')}
    private get CountSpinner(): Locator { return this.page.locator('#quantity')}
    private get AddToCartButtonInProductDetailPage(): Locator { return this.page.getByRole('button',{name: 'Add to cart'})}
    private get ViewCartButton(): Locator { return this.page.getByRole('link', {name: 'View Cart'})}
    private get ProductPageHeading(): Locator { return this.page.getByRole('heading', {name:'All Products'})}
    private get ProductsList(): Locator { return this.page.locator('.features_items .product-image-wrapper')}
    private get ProductInfo(): Locator { return this.page.locator('.product-information'); }
    private ViewProductButton(product: string): Locator { return this.page.locator('.product-image-wrapper').filter({hasText:product}).getByRole('link', {name: 'View Product'})}
    private get SearchField(): Locator { return this.page.getByPlaceholder("Search Product")}
    private get SearchFieldButton(): Locator {return this.page.locator('#submit_search')}
    private get SearchedProductsHeading(): Locator { return this.page.getByRole('heading', {name: 'Searched Products'})}
    private get AllSearchedItems(): Locator { return this.page.locator('.productinfo')}
    private get ProductCard(): Locator {return this.page.locator('.product-image-wrapper')}
    private get ContinueShoppingButton(): Locator { return this.page.getByRole('button', {name: 'Continue Shopping'})}
    private get BrandsList(): Locator { return this.page.locator('.brands_products')}
    private SpecificBrand(brand: string): Locator { return this.BrandsList.locator('li').filter({hasText:brand})} 
    private BrandHeader(brand: string): Locator { return this.page.getByText(`Brand - ${brand} Products`)}
    private get WriteReviewText(): Locator { return this.page.locator('li').getByText('Write Your Review')}
    private get NameReviewField(): Locator {return this.page.getByPlaceholder('Your Name')}
    private get EmailReviewField(): Locator { return this.page.locator('#email')}
    private get MessageReviewField(): Locator { return this.page.getByPlaceholder('Add Review Here!')}
    private get SubmitReviewButton(): Locator { return this.page.locator('#button-review')}
    private get ReviewSuccessMeassage(): Locator { return this.page.getByText('Thank you for your review.')}
    private CategoryHeaderText(category: string, subcategory: string): Locator { return this.page.getByText(`${category} - ${subcategory} Products`)}
    private CategoryList(category: string): Locator { return this.page.locator('#accordian .panel-title').filter({hasText: new RegExp(`\\b${category}\\b`)}).locator('.fa-plus')}
    private SubCategory(category: string ,subcategroy: string): Locator { return this.page.locator(`#${category} .panel-body`).getByRole('link', {name: subcategroy})}

    // Methods
    async ClickOnSubCategory(category: string, subcategory: string) { 
    const link = this.SubCategory(category, subcategory)
    await expect(link).toBeVisible()
    await link.click()}
    
    async ClickOnCategory(category: string) { await this.CategoryList(category).click()}
 
    async VerifyCategoryHeaderText(category: string, subcategory: string) { await expect(this.CategoryHeaderText(category, subcategory)).toBeVisible()}
    async VerifyReviewSuccessMessage() { await expect(this.ReviewSuccessMeassage).toBeVisible()}
    async SubmitReview() { await this.SubmitReviewButton.click()}

    async FillReview(user:User){
        await this.NameReviewField.fill(user.getFirstName())
        await this.EmailReviewField.fill(user.getEmail())
        await this.MessageReviewField.fill(user.getMessage())
    }

    async VerifyReviewVisible(){ await expect(this.WriteReviewText).toBeVisible()}

    async VerifyListingHeading(brand: string) { 
        const headertext = this.BrandHeader(brand);
        await expect(headertext).toBeVisible()
        // console.log(headertext)
    }   

    async AccessASpecificBrand(brand:string) { await this.SpecificBrand(brand).click()}

    async VerifyBrandSidebarVisible() {await expect(this.BrandsList).toBeVisible()}

    async ClickContinueButton(){ await this.ContinueShoppingButton.click()}

    async AddProductsToCart(product:string) { 
        const card = this.ProductCard.filter({ hasText: product})
        const addtocart = card.locator('.product-overlay .add-to-cart');
        await card.hover()
        await expect(addtocart).toBeVisible();
        await addtocart.click();
    }

    async VerifySearchedRelatedProducts(term: string){
        const totalcount = await this.AllSearchedItems.count()
        const matching = this.AllSearchedItems.filter({hasText: new RegExp(term, 'i')})
        await expect(this.AllSearchedItems).not.toHaveCount(0);
        await expect(matching).toHaveCount(totalcount)
        // console.log(totalcount)
        
    }

    async VerifySearchedProductsHeading() {await expect(this.SearchedProductsHeading).toBeVisible()}

    async FillSearchField(name:string){ 
        await this.SearchField.fill(name)
        await this.SearchFieldButton.click()
    }

    async VerifyProductInfo(details: ProductDetails){
        await expect(this.ProductInfo).toContainText(details.name);
        await expect(this.ProductInfo).toContainText(details.category);
        await expect(this.ProductInfo).toContainText(details.price);
        await expect(this.ProductInfo).toContainText(details.availability);
        await expect(this.ProductInfo).toContainText(details.condition);
        await expect(this.ProductInfo).toContainText(details.brand);
    }

    async VerifyProductDetailPageVisibility(productId: number){ await expect(this.page).toHaveURL(`https://www.automationexercise.com/product_details/${productId}`)}

    async ClickOnViewProductButton(product: string){
        await this.ViewProductButton(product).click()
    }

    async VerifyProductListVisibility(){
        await expect(this.ProductsList.first()).toBeVisible();
        expect(await this.ProductsList.count()).toBeGreaterThan(0)
        // console.log(await this.ProductsList.count())
    }

    async VerifyProductPageVisibilty(){
        await expect(this.page).toHaveURL('https://www.automationexercise.com/products');
        await expect(this.ProductPageHeading).toBeVisible();
    }

    async VerifyProductNameInProductsDetailPage(productName:string){
        await expect(this.ProductNameInProductDetailPage).toHaveText(productName)
    }

    async AddQuantity(quantity:number){for(let i = 1; i < quantity; i++){await this.CountSpinner.press('ArrowUp')}}

    async ClickAddToCartButtonInProductDetailPage(){ await this.AddToCartButtonInProductDetailPage.click()}

    async ClickViewCart(){ await this.ViewCartButton.click()}

}


