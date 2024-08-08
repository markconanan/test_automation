import { expect, Locator, Page } from "@playwright/test";

export class CheckoutPage2 {
  readonly page: Page;
  readonly allCheckoutItems: Locator;
  readonly subTotalLabel: Locator;
  readonly finishButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.allCheckoutItems = this.page.locator('[data-test="inventory-item"]');
    this.subTotalLabel = this.page.locator('[data-test="subtotal-label"]');
    this.finishButton = this.page.locator('[data-test="finish"]');
  }

  async verifyNthItemName(nth: number, name: string) {
    const cartItems = await this.allCheckoutItems.all();
    expect(
      await cartItems[nth]
        .locator('[data-test="inventory-item-name"]')
        .innerText()
    ).toEqual(name);
  }

  async verifyTotalPriceOfItems() {
    const cartItems = await this.allCheckoutItems.all();
    var itemsTotalPrice = 0;
    for (let i = 0; i < cartItems.length; i++) {
      itemsTotalPrice += parseFloat(
        (
          await cartItems[i]
            .locator('[data-test="inventory-item-price"]')
            .innerText()
        ).replace(/[$,]+/g, "")
      );
    }
    const subTotal = (await this.subTotalLabel.innerText()).replace(
      /[$,]+/g,
      ""
    );
    expect(subTotal).toEqual("Item total: " + itemsTotalPrice);
  }

  async verifyNoOfItemsInCart(no: number) {
    const cartItems = await this.allCheckoutItems.all();
    expect(cartItems.length).toEqual(no);
  }

  async clickFinishButtonAndVerifyCheckoutComplete() {
    await this.finishButton.click();
    await expect(this.page).toHaveURL(/.*checkout-complete/);
    await expect(this.page.locator('[data-test="title"]')).toContainText(
      "Checkout: Complete!"
    );
  }
}

export default CheckoutPage2;
