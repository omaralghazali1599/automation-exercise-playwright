import { expect, Page, Locator } from '@playwright/test';

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
    private ViewProductButton(index:number): Locator { return this.page.locator('.product-image-wrapper').nth(index).getByRole('link', {name: 'View Product'})}
    private get SearchField(): Locator { return this.page.getByPlaceholder("Search Product")}
    private get SearchFieldButton(): Locator {return this.page.locator('#submit_search')}
    private get SearchedProductsHeading(): Locator { return this.page.getByRole('heading', {name: 'Searched Products'})}
    private get AllSearchedItems(): Locator { return this.page.locator('.productinfo')}
    private get ProductCard(): Locator {return this.page.locator('.product-image-wrapper')}
    private get ContinueShoppingButton(): Locator { return this.page.getByRole('button', {name: 'Continue Shopping'})}

    // Methods
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
        console.log(totalcount)
        
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

    async ClickOnViewProductButton(index: number){
        await this.ViewProductButton(index).click()
    }

    async VerifyProductListVisibility(){
        await expect(this.ProductsList.first()).toBeVisible();
        expect(await this.ProductsList.count()).toBeGreaterThan(0)
        console.log(await this.ProductsList.count())
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


