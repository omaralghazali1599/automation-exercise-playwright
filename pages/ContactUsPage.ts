import { Page, Locator, expect} from '@playwright/test'
import User from '../Models/User';
import { faker } from '@faker-js/faker';

export default class ContactUsPage{
    private page:Page;

    // Constructor
    constructor(page:Page){
        this.page = page;
    }

    // Elements
    private get GetInTouchText(): Locator { return this.page.getByText('Get In Touch')}
    
    private get NameField(): Locator { return this.page.locator('input[data-qa="name"]') }
    private get EmailField(): Locator { return this.page.locator('input[data-qa="email"]')}
    private get SubjectField(): Locator { return this.page.locator('input[data-qa="subject"]')}
    private get MessageField(): Locator { return this.page.locator('#message')}
    private get UploadFileButton(): Locator { return this.page.locator('input[name="upload_file"]')}
    private get ContactUsSubmitButton(): Locator { return this.page.getByRole('button', {name: 'Submit'})}
    private get SuccessMessage(): Locator { return this.page.locator('#contact-page').getByText('Success! Your details have been submitted successfully.')}
    // Methods
    async VerifySuccessMessage(){
        await expect(this.SuccessMessage).toBeVisible();
    }

    async ClickSubmitButton(){
        await this.ContactUsSubmitButton.click()
    }


    async UploadFile(file:string){
        await this.UploadFileButton.setInputFiles(file);
    }

    async ProvideRequiredData(user:User){
        await this.NameField.fill(user.getFirstName())
        await this.EmailField.fill(user.getEmail())
        await this.SubjectField.fill(faker.lorem.words())
        await this.MessageField.fill(faker.lorem.text())
    }
    async VerifyGetInTouchText(){
        await expect(this.GetInTouchText).toBeVisible();
    }

}