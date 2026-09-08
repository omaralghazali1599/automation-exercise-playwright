import { expect, Locator, Page } from "@playwright/test";

export default class TestCasePage {
    private static url = 'https://www.automationexercise.com/test_cases';

    private page:Page;

    // Constructor
    constructor(page:Page){
    this.page = page;
    }

    // Element
    private get TestCaseText(): Locator {return this.page.locator('b')}

    // Methods 
    async TestCaseVisibility(){await expect(this.TestCaseText).toBeVisible()}
    async GetPageTitle(){await expect(this.page).toHaveURL(TestCasePage.url)}

}