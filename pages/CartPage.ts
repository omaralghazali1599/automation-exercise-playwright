import { expect, Page, Locator } from '@playwright/test';
import User from '../Models/User';

export default class CartPage {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    // Elements

    private get Subscription(): Locator { return this.page.locator('.single-widget h2'); }
    private get EmailInput(): Locator   { return this.page.getByPlaceholder('Your email address'); }
    private get SubmitButton(): Locator { return this.page.locator('#subscribe'); }
    private get SuccessMessage(): Locator { return this.page.getByText('You have been successfully subscribed!');}

    private get ContinueToCheckouButton(): Locator{ return this.page.getByText('Proceed To Checkout')}
    private get RegisterandLoginModal(): Locator { return this.page.getByRole('link', {name: 'Register / Login'})}
    private ProductRow(product: string): Locator { return this.page.locator('tr').filter({hasText:product})}
    private RemoveProductButton(product:string): Locator { return this.ProductRow(product).locator('.cart_quantity_delete')}
    
    private ProductInCart(product: string): Locator { return this.page.getByRole('link', { name: product });}
    private CartQuantity(productName: string): Locator {
    return this.page.locator('tr')
    .filter({ hasText: productName })
    .locator('.cart_quantity button');
    }

    // Methods
    async ClickRegisterLoginInCheckoutModal() { await this.RegisterandLoginModal.click()}
    async ClickProceedToCheckout() { await this.ContinueToCheckouButton.click()}
 
    async VerifyProductDeleted(product: string) { await expect(this.ProductRow(product)).not.toBeVisible()}

    async RemoveProduct(product: string){ await this.RemoveProductButton(product).click()}

    async VerifyProductsInCart(product:string){await expect(this.ProductInCart(product)).toBeVisible()}

    async VerifyQuantity(productName: string, quantity: number) {
        await expect(this.CartQuantity(productName)).toHaveText(String(quantity));
    }

    async VerifySubscriptionText() {
        await expect(this.Subscription).toBeVisible();
    }

    async EnterEmail(user: User) {
        await this.EmailInput.fill(user.getEmail());
    }

    async ClickSubmit() {
        await this.SubmitButton.click();
    }

    async VerifySuccessMessage() {
        await expect(this.SuccessMessage).toBeVisible();
    }
    
}