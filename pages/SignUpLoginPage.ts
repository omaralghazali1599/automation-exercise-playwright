import { Page, Locator, expect } from '@playwright/test';
import User from '../Models/User';

export default class LoginPage {
  private page: Page;

  // Constructor

  constructor(page: Page) {
    this.page = page;
  }

  // Elements

  private get LoginHeading(): Locator { return this.page.getByText('Login to your account'); }
  private get LoginEmailField(): Locator   { return this.page.locator('input[data-qa="login-email"]'); }
  private get LoginPasswordField(): Locator { return this.page.locator('input[data-qa="login-password"]'); }
  private get LoginButton(): Locator  { return this.page.locator('button[data-qa="login-button"]'); }
  private get LoginErrorText(): Locator {return this.page.getByText('Your email or password is incorrect!')}
  
  private get SignupHeading(): Locator { return this.page.getByText('New User Signup!'); }
  private get SignupEmailField(): Locator   { return this.page.locator('input[data-qa="signup-email"]'); }
  private get SignupNameField(): Locator { return this.page.locator('input[data-qa="signup-name"]'); }
  private get SignupButton(): Locator  { return this.page.locator('button[data-qa="signup-button"]'); }
  private get SignupErrorText(): Locator {return this.page.getByText('Email Address already exist!')}

  // Methods

  async VerifyLoginText() { await expect(this.LoginHeading).toBeVisible(); }
  async VerifySignUpText() { await expect(this.SignupHeading).toBeVisible(); }
  
  async VerifyFailedLoginText() { await expect(this.LoginErrorText).toBeVisible(); }
  async VerifyFailedSignupText() { await expect(this.SignupErrorText).toBeVisible(); }


  async ProvideLoginCredentials(user: User) {
    await this.LoginEmailField.fill(user.getEmail());
    await this.LoginPasswordField.fill(user.getPassword());
    await this.LoginButton.click();
  }

  async ProvideSignupCredentials(user: User) {
    await this.SignupEmailField.fill(user.getEmail());
    await this.SignupNameField.fill(user.getFirstName());
    await this.SignupButton.click();
    console.log(user.getEmail(),user.getFirstName())
  }

  async ProvideIncorrectLoginCredentials(user: User) {
    await this.LoginEmailField.fill(user.getEmail());
    await this.LoginPasswordField.fill('Pass1234');
    await this.LoginButton.click();
  }
}