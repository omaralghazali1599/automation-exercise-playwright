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
  private get HeroText(): Locator { return this.page.getByRole('heading', { name: 'Full-Fledged practice website' })}
  private get Footer(): Locator { return this.page.locator('#footer')}
  private get Header(): Locator { return this.page.locator('#header')}
  private get SubscribtionText(): Locator { return this.page.getByRole('heading', { name: 'Subscription' })}
  private get SubscribtionEmailField(): Locator { return this.page.locator('#susbscribe_email')}
  private get SubscribtionButton(): Locator { return this.page.locator('#subscribe')}
  private get SubscribtionSuccessMessage(): Locator { return this.page.getByText('You have been successfully subscribed!')}
  private get UpArrowButton(): Locator {return this.page.locator('#scrollUp')}
  private get RecommendedText(): Locator { return this.page.getByText('recommended items')}
  private RecommendedItemElement(product: string): Locator { return this.page.locator('#recommended-item-carousel .product-image-wrapper').filter({ hasText: product });}  
  private RecommendedAddToCartButton(product: string): Locator { return this.RecommendedItemElement(product).getByText('Add to cart')}
  private CategoryList(category: string): Locator { return this.page.locator('#accordian .panel-title').filter({hasText: new RegExp(`\\b${category}\\b`)}).locator('.fa-plus')}
  private get CategoryElement(): Locator { return this.page.locator('.left-sidebar')}
  private SubCategory(category: string ,subcategroy: string): Locator { return this.page.locator(`#${category} .panel-body`).getByRole('link', {name: subcategroy})}
  private ViewProduct(productName: string): Locator { return this.page.locator('.product-image-wrapper')
    .filter({ hasText: productName })
    .getByRole('link', { name: 'View Product' });}

  // Methods
  async ClickOnSubCategory(category: string, subcategory: string) { 
    const link = this.SubCategory(category, subcategory)
    await expect(link).toBeVisible()
    await link.click()}
  async ClickOnCategory(category: string) { await this.CategoryList(category).click()}
  async VerifyCategoryVisisble(){ await expect(this.CategoryElement).toBeVisible()}
  async AddRecommendedItemToCart(product: string) { await this.RecommendedAddToCartButton(product).click()}
  async VerifyRecommendedItemsVisible(){ await expect(this.RecommendedText).toBeVisible()}
  async ClickScrollUpArrow() {await this.UpArrowButton.click()}

  async VerifyHeroTextVisible() { await expect(this.HeroText).toBeVisible()}

  async VerifyHomePageVisible() { await expect(this.Heading).toBeVisible();
  }

  async ScrollToTop() {await this.Header.scrollIntoViewIfNeeded()}

  async ScrollToFooter() { await this.Footer.scrollIntoViewIfNeeded()}

  async VerifySubscribtionText() {await expect(this.SubscribtionText).toBeVisible()}

  async FillEmailAndSubmit(user:User) {
    await this.SubscribtionEmailField.fill(user.getEmail());
    await this.SubscribtionButton.click();
  }

  async VerifySuccessMessage() {await expect(this.SubscribtionSuccessMessage).toBeVisible()}

  async OpenProduct(productName: string) {await this.ViewProduct(productName).click();}


  

 

}