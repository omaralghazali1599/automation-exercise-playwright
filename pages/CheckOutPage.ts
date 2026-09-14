import {Page, Locator, expect} from '@playwright/test';
import User from '../Models/User';

export default class CheckOutPage{
    private page:Page;

    constructor(page: Page) {
        this.page = page
    }

    // Elements
    private AddressBlock(type: 'delivery' | 'invoice'): Locator { return this.page.locator(`#address_${type}`)}
    private get MessageBox(): Locator { return this.page.locator('textarea[name="message"]')}
    private get PlaceOrederButton(): Locator { return this.page.getByRole('link', { name: 'Place Order' })}
    // Methods
    async EnterCommentAndPlaceOrder(text: string){
        await this.MessageBox.fill(text)
        await this.PlaceOrederButton.click()
    }
    private async VerifyAddressMatches(type: 'delivery' | 'invoice', user: User) {
        const address = user.getAddress();
        const block = this.AddressBlock(type);
        await expect(block).toContainText(address.lastName);
        await expect(block).toContainText(address.firstName);
        await expect(block).toContainText(address.company);
        await expect(block).toContainText(address.address1);
        await expect(block).toContainText(address.city);
        await expect(block).toContainText(address.state);
        await expect(block).toContainText(address.zipcode);
        await expect(block).toContainText(address.country);
        await expect(block).toContainText(address.mobile);
        // console.log(block)
        // console.log(address)

    }

    async VerifyDeliveryAddressMatches(user: User) { await this.VerifyAddressMatches('delivery', user)}
    async VerifyBillingAddressMatches(user: User) { await this.VerifyAddressMatches('invoice', user)}
    async VerifyDeliveryAndInvoicesAddressesAreVisible() { 
        await expect(this.AddressBlock('delivery')).toBeVisible()
        await expect(this.AddressBlock('invoice')).toBeVisible()
    }

}