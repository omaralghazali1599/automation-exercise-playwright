import {test} from '@playwright/test'
import BasePage from '../pages/BasePage';
import HomePage from '../pages/HomePage';
import User from '../Models/User';
import ContactUsPage from '../pages/ContactUsPage';

test('Contact Us Form', async ({ page }) => {
    const user = User.random();
    const basepage = new BasePage(page)
    const homePage = new HomePage(page)
    const contactuspage = new ContactUsPage(page)
    await basepage.goto();
    // Verify that home page is visible successfully
    await homePage.VerifyHomePageVisible();
    // Click on 'Contact Us' button
    await basepage.goToContactUs();
    // Verify 'GET IN TOUCH' is visible
    await contactuspage.VerifyGetInTouchText();
    // Enter name, email, subject and message
    await contactuspage.ProvideRequiredData(user)
    // Upload file
    await contactuspage.UploadFile('airtag.png');
    // Click OK button
    await basepage.AcceptDialog();
    // Click 'Submit' button
    await contactuspage.ClickSubmitButton();
    await basepage.VerifyDialogMessage('Press OK to proceed!')
    // Verify success message 'Success! Your details have been submitted successfully.' is visible
    await contactuspage.VerifySuccessMessage();   
    // Click 'Home' button and verify that landed to home page successfully
    await basepage.goToHome()
    await homePage.VerifyHomePageVisible()
});
