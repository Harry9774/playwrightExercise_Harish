import { Page, Locator } from "@playwright/test";

export class taxCreditSurveyPage {
  readonly page: Page;

  // Locators in readOnly mode
  readonly firstNameEditBox: Locator;
  readonly lastNameEditBox: Locator;
  readonly emailEditBox: Locator;
  readonly addressEditBox: Locator;
  readonly cityEditBox: Locator;
  readonly zipCodeEditBox: Locator;
  readonly nextButton: Locator;
  readonly SNAP_NoSelection: Locator;
  readonly TANF_NoSelection: Locator;
  readonly armedForces_NoSelection: Locator;
  readonly disability_NoSelection: Locator;
  readonly felcony_NoSelection: Locator;
  readonly unEmpBenefits_NoSelection: Locator;
  readonly nameConfirmationInput: Locator;

    // Constructor to initialize the page and its elements
    constructor(page: Page) {
    this.page = page;

    // Page elements
    this.firstNameEditBox = page.getByLabel("First Name");
    this.lastNameEditBox = page.getByLabel("Last Name");
    this.emailEditBox = page.getByLabel("Email Address");
    this.addressEditBox = page.getByLabel("Street Address");
    this.cityEditBox = page.getByLabel("City");
    this.zipCodeEditBox = page.getByLabel("Zip Code");
    this.nextButton = page.getByRole('button', { name: 'Next' });

    this.SNAP_NoSelection = page.locator("#SurveyControl_Question11396").getByText('No');
    this.TANF_NoSelection = page.locator("#SurveyControl_Question11397").getByText('No');
    this.armedForces_NoSelection = page.locator("#SurveyControl_Question914").getByText('No');
    this.disability_NoSelection = page.locator("#SurveyControl_Question11361").getByText('No');
    this.felcony_NoSelection = page.locator("#SurveyControl_Question915").getByText('No');
    this.unEmpBenefits_NoSelection = page.locator("#SurveyControl_Question1244").getByText('No');

    this.nameConfirmationInput = page.locator("input[id^='SurveyControl_Question1137']");
  }

  // Navigate to the page and wait until the DOM is loaded
  async navigate() {
    await this.page.goto("https://uat-survey.taxcreditco.com/automation-challenge", {
        timeout: 30000,
        waitUntil: 'domcontentloaded'
      });
  }

   // Filling the data in first page
  async fillFirstPage(firstName: string, lastName: string, email: string, address: string, city: string, zip: string) {
    await this.firstNameEditBox.fill(firstName);
    await this.lastNameEditBox.fill(lastName);
    await this.emailEditBox.fill(email);
    await this.addressEditBox.fill(address);
    await this.cityEditBox.fill(city);
    await this.zipCodeEditBox.fill(zip);
    await this.nextButton.click();
  }

  // Answering the Questionaries
  async answeringEligiblityQuestionaries() {
    await this.SNAP_NoSelection.click();
    await this.TANF_NoSelection.click();
    await this.armedForces_NoSelection.click();
    await this.disability_NoSelection.click();
    await this.felcony_NoSelection.click();
    await this.unEmpBenefits_NoSelection.click();
    await this.nextButton.click();
  }

  //Retrieving the confirmed full name
  async getConfirmedFullName(): Promise<string> {
    return await this.nameConfirmationInput.inputValue();
  }

  generateRandomAlphanumeric(length: number): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      result += chars[randomIndex];
    }
    return result;
  }
}
