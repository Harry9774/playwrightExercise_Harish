import { test, expect } from "@playwright/test";
import { taxCreditSurveyPage } from "../pages/taxCreditSurveyPage";
import data from "../testData/userDetails.json";


test.describe('Automation Challenge from Experain', () => {

  test.only("Verify user is able to submit the form and validate the confirmation", async ({ browser }) => {

    // Create context and page
    const context = await browser.newContext();
    const page = await context.newPage();
    //page.setDefaultNavigationTimeout(10000); 
    const taxCreditPage = new taxCreditSurveyPage(page);

    // Test Data
    const firstName = data.firstName+taxCreditPage.generateRandomAlphanumeric(5);
    const lastName = data.lastName+taxCreditPage.generateRandomAlphanumeric(4);
    const email = data.email;
    const address = data.address;
    const city = data.city;
    const zipCode = data.zipCode;
    const expectedFullName = `${firstName} ${lastName}`;

    // Test Steps
    await page.route('**/*.{png,jpg,jpeg,woff,ttf}', route => route.abort());
    await taxCreditPage.navigate();
    await taxCreditPage.fillFirstPage(firstName, lastName, email, address, city, zipCode);
    await taxCreditPage.answeringEligiblityQuestionaries();

    const confirmedName = await taxCreditPage.getConfirmedFullName();
    expect(confirmedName).toContain(expectedFullName);

    await page.getByRole('button', { name: 'Submit form' }).click();

    // Validate the confirmation message
    await expect(page).toHaveTitle(data.title);
    await expect(page).toHaveURL(data.URL);
  });
});
