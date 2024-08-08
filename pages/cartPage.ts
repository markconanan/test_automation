import { expect, Locator, Page } from "@playwright/test";

export class CartPage {
  readonly page: Page;
  readonly allCartItems: Locator;
  readonly cartBadge: Locator;
  readonly cartLink: Locator;
  readonly checkoutLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.allCartItems = this.page.locator('[data-test="inventory-item"]');
    this.cartBadge = this.page.locator('[data-test="shopping-cart-badge"]');
    this.cartLink = this.page.locator('[data-test="shopping-cart-link"]');
    this.checkoutLink = this.page.locator('[data-test="checkout"]');
  }

  async verifyNthItemName(nth: number, name: string) {
    const cartItems = await this.allCartItems.all();
    expect(
      await cartItems[nth]
        .locator('[data-test="inventory-item-name"]')
        .innerText()
    ).toEqual(name);
  }

  async verifyNoOfItemsInCart(no: number) {
    const cartItems = await this.allCartItems.all();
    expect(cartItems.length).toEqual(no);
  }

  async goToCheckoutStepOne() {
    await this.checkoutLink.click();
    await expect(this.page).toHaveURL(/.*checkout-step-one/);
  }
}
export default CartPage;
