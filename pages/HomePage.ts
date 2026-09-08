import { expect, Page, Locator } from '@playwright/test';
import User from '../Models/User';


export default class HomePage {

  private page: Page;

  // Constructor
  constructor(page: Page) {
    this.page = page;
  }

  // Elements
  private get Heading(): Locator { return this.page.getByRole('heading', { name: 'AutomationExercise', level: 1 }); }
  private get Footer(): Locator { return this.page.locator('#footer')}
  private get SubscribtionText(): Locator { return this.page.getByRole('heading', { name: 'Subscription' })}
  private get SubscribtionEmailField(): Locator { return this.page.locator('#susbscribe_email')}
  private get SubscribtionButton(): Locator { return this.page.locator('#subscribe')}
  private get SubscribtionSuccessMessage(): Locator { return this.page.getByText('You have been successfully subscribed!')}
  private ViewProduct(productName: string): Locator { return this.page.locator('.product-image-wrapper')
    .filter({ hasText: productName })
    .getByRole('link', { name: 'View Product' });}

  // Methods
  async VerifyHomePageVisible() {
    await expect(this.Heading).toBeVisible();
  }

  async ScrollToFooter() { await this.Footer.scrollIntoViewIfNeeded()}

  async VerifySubscribtionText() {await expect(this.SubscribtionText).toBeVisible()}

  async FillEmailAndSubmit(user:User) {
    await this.SubscribtionEmailField.fill(user.getEmail());
    await this.SubscribtionButton.click();
  }

  async VerifySuccessMessage() {await expect(this.SubscribtionSuccessMessage).toBeVisible()}

  async OpenProduct(productName: string) {await this.ViewProduct(productName).click();}


  

 

}