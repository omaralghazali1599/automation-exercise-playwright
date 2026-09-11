/// <reference types="node" />
import { Page, Locator, expect } from "@playwright/test";
import User, { PaymentInfo } from "../Models/User";
import fs from 'fs';


export default class PaymentPage{
    private page:Page;

    // Constructor
    constructor(page: Page) {
        this.page = page
    }

    // Elements 
    private get nameOnCard(): Locator { return this.page.locator('[data-qa="name-on-card"]')}
    private get cardNumber(): Locator { return this.page.locator('[data-qa="card-number"]')}
    private get cvv(): Locator { return this.page.locator('[data-qa="cvc"]')}
    private get expiryMonth(): Locator { return this.page.locator('[data-qa="expiry-month"]')}
    private get expiryYear(): Locator { return this.page.locator('[data-qa="expiry-year"]')}
    private get clickConfirm(): Locator { return this.page.getByText('Pay and Confirm Order')}
    private get confirmationText(): Locator { return this.page.getByText('Order Placed!')}
    private get DownloadInvoiceButton(): Locator { return this.page.getByText('Download Invoice'); }
    private get ContinueButton(): Locator { return this.page.getByRole('link', { name: 'Continue' }); }


    // Methods
    async DownloadInvoiceAndVerify(user: User) {
        const downloadPromise = this.page.waitForEvent('download');
        await this.DownloadInvoiceButton.click();
        const download = await downloadPromise;
        console.log(download.suggestedFilename())

        expect(download.suggestedFilename()).toBe('invoice.txt');

        const path = await download.path();
        expect(path).not.toBeNull();
        const content = fs.readFileSync(path!, 'utf-8');
        expect(content).toContain(user.getFirstName());

        await download.delete();
    }

    async ClickContinueButton() { await this.ContinueButton.click(); }

    async VerifyConfirmationMessage() { await expect(this.confirmationText).toBeVisible()}

    async ClickPayAndConfirm(){ await this.clickConfirm.click()}

    async FillPaymentInfo(payment: PaymentInfo){
        await this.nameOnCard.fill(payment.nameOnCard)
        await this.cardNumber.fill(payment.cardNumber)
        await this.cvv.fill(payment.cvc)
        await this.expiryMonth.fill(payment.expirationMonth)
        await this.expiryYear.fill(payment.expirationYear)
    }
    async Assert(){ await expect(this.nameOnCard).toBeVisible()}
}