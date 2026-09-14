import { Page, Locator, expect } from "@playwright/test";
import User from "../Models/User";

type NavItem =
  | 'Home' | 'Products' | 'Cart' | 'Signup / Login'
  | 'Test Cases' | 'API Testing' | 'Contact us' | 'Logout' | 'Delete Account';

export default class BasePage{

    static url = 'https://www.automationexercise.com';
    static consentScript = '**/fundingchoicesmessages.google.com/**';


    private page:Page;
    private dialogMessage = '';


    // Constructor
    constructor(page:Page){
        this.page = page;
    }

    // Elements

    private get Nav(): Locator { return this.page.locator('.navbar-nav'); }
    private NavLink(name: NavItem): Locator { return this.Nav.getByRole('link', { name }); }
    private LoggedInAs(name: string): Locator { return this.Nav.getByText(`Logged in as ${name}`); }

    // Methods

    async AcceptDialog() {
    this.dialogMessage = '';
    this.page.once('dialog', async dialog => {
      this.dialogMessage = dialog.message();
      await dialog.accept();
    });
  }

    async VerifyDialogMessage(expected: string) {
        expect(this.dialogMessage).toBe(expected);
    }

    async goto(path: string = '') {
        await this.page.route(BasePage.consentScript, route => route.abort());
        await this.page.goto(BasePage.url + path);
    }

    async VerifyLoggedInAs(user: User) {
        const loggedinastext = this.LoggedInAs(user.getFirstName());
        await expect(loggedinastext).toBeVisible();
        // console.log(await loggedinastext.textContent())
    }

    async goToHome()      { await this.NavLink('Home').click(); }
    async goToProducts()  { await this.NavLink('Products').click(); }
    async goToCart()      { await this.NavLink('Cart').click(); }
    async goToLogin()     { await this.NavLink('Signup / Login').click(); }
    async goToContactUs() { await this.NavLink('Contact us').click(); }
    async goToTestCases() { await this.NavLink('Test Cases').click(); }
    async goToLogout()    { await this.NavLink('Logout').click(); }
    async goToDeleteAcc() { await this.NavLink('Delete Account').click();}

}