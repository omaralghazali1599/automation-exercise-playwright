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
    private ProductInCart(product: string): Locator { return this.page.getByRole('link', { name: product });}
    private CartQuantity(productName: string): Locator {
    return this.page.locator('tr')
    .filter({ hasText: productName })
    .locator('.cart_quantity button');
    }
    // Methods
    async VerifyProductsInCart(product:string){await expect(this.ProductInCart(product)).toBeVisible()}

    async VerifyQuantity(productName: string, quantity: number) {
        await expect(this.CartQuantity(productName)).toHaveText(String(quantity));
    }

    async verifySubscriptionText() {
        await expect(this.Subscription).toBeVisible();
    }

    async enterEmail(user: User) {
        await this.EmailInput.fill(user.getEmail());
    }

    async clickSubmit() {
        await this.SubmitButton.click();
    }

    async verifySuccessMessage() {
        await expect(this.SuccessMessage).toBeVisible();
    }
    
}