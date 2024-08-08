import { expect, Locator, Page } from "@playwright/test";

export class CheckoutPage1 {
  readonly page: Page;
  readonly continueButton: Locator;
  readonly firstName: Locator;
  readonly lastName: Locator;
  readonly postCode: Locator;

  constructor(page: Page) {
    this.page = page;
    this.continueButton = this.page.locator('[data-test="continue"]');
    this.firstName = this.page.locator('[data-test="firstName"]');
    this.lastName = this.page.locator('[data-test="lastName"]');
    this.postCode = this.page.locator('[data-test="postalCode"]');
  }

  async fillInCheckoutForm(
    firstName: string,
    lastName: string,
    postCode: string
  ) {
    await this.firstName.fill(firstName);
    await this.lastName.fill(lastName);
    await this.postCode.fill(postCode);
  }

  async verifyCheckoutFormValues(
    firstName: string,
    lastName: string,
    postCode: string
  ) {
    expect(await this.firstName.inputValue()).toBe(firstName);
    expect(await this.lastName.inputValue()).toBe(lastName);
    expect(await this.postCode.inputValue()).toBe(postCode);
  }

  async goToCheckoutStepTwo() {
    await this.continueButton.click();
    await expect(this.page).toHaveURL(/.*checkout-step-two/);
  }
}
export default CheckoutPage1;
