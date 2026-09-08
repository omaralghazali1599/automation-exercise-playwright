import { Page, Locator, expect} from '@playwright/test'
import User, { AddressInfo } from '../Models/User';

export type AccountInfo = {
    title: 1 | 2;
    password: string;
    day: string;
    month: string;
    year: string;
};

export default class SignUpPage{

    private page:Page;

    // Constructor
    constructor(page:Page){
        this.page = page
    }

    // Elements
    private get AccountInfoText(): Locator{ return this.page.getByText('Enter Account Information')}
    private  RadioButton(title: number ): Locator {return this.page.locator(`#id_gender${title}`)}
    private get NameField(): Locator { return this.page.locator('#name'); }
    private get EmailField(): Locator { return this.page.locator('#email'); }
    private get PasswordField():Locator { return this.page.locator('#password')}
    private get Days(): Locator { return this.page.locator('#days')}
    private get Months(): Locator { return this.page.locator('#months')}
    private get Years(): Locator { return this.page.locator('#years')}
    private get SignUpCheckbox(): Locator { return this.page.locator('#newsletter')}
    private get RecieveCheckBox(): Locator { return this.page.locator('#optin')}
    private get AddressInfoText(): Locator { return this.page.getByText('Address Information')}
    private get FirstName(): Locator { return this.page.locator('#first_name'); }
    private get LastName(): Locator { return this.page.locator('#last_name'); }
    private get Company(): Locator { return this.page.locator('#company'); }
    private get Address1(): Locator { return this.page.locator('#address1'); }
    private get Address2(): Locator { return this.page.locator('#address2'); }
    private get Country(): Locator { return this.page.locator('#country'); }
    private get State(): Locator { return this.page.locator('#state'); }
    private get City(): Locator { return this.page.locator('#city'); }
    private get Zipcode(): Locator { return this.page.locator('#zipcode'); }
    private get Mobile(): Locator { return this.page.locator('#mobile_number'); }
    private get CreateAccButton(): Locator { return this.page.locator('[data-qa="create-account"]')}
    private get AccountCreatedTexts(): Locator {return this.page.getByText('Account Created!')}
    private get ContinueButton(): Locator { return this.page.locator('[data-qa="continue-button"]')}
    private get AccDeletedText(): Locator { return this.page.locator('[data-qa="account-deleted"]')}
    // Methods
    async VerifyAccountDeletedText(){await expect(this.AccDeletedText).toBeVisible()}

    async ClickContinueButton(){ await this.ContinueButton.click()}

    async VerifyAccountCreatedText(){ await expect(this.AccountCreatedTexts).toBeVisible()}

    async ClickSubmit(){ await this.CreateAccButton.click()}

    async FillAddressInfo(address: AddressInfo) {
        await this.FirstName.fill(address.firstName);
        await this.LastName.fill(address.lastName);
        await this.Company.fill(address.company);
        await this.Address1.fill(address.address1);
        await this.Address2.fill(address.address2);
        await this.Country.selectOption(address.country);
        await this.State.fill(address.state);
        await this.City.fill(address.city);
        await this.Zipcode.fill(address.zipcode);
        await this.Mobile.fill(address.mobile);
    }


    async VerifyAddressInfoText(){ await expect(this.AddressInfoText).toBeVisible();}

    async FillAcountInfo(info:AccountInfo){
        await this.RadioButton(info.title).check();
        await this.PasswordField.fill(info.password);
        await this.Days.selectOption(info.day);
        await this.Months.selectOption(info.month);
        await this.Years.selectOption(info.year);
        await this.SignUpCheckbox.check();  
        await this.RecieveCheckBox.check();
    }

    async VerifyNameAndEmail(user:User){
        await expect(this.NameField).toHaveValue(user.getFirstName())
        await expect(this.EmailField).toHaveValue(user.getEmail())
    }

    async VerifyAccountInfoText(){await expect(this.AccountInfoText).toBeVisible();}
}