import { expect, Locator, Page } from "@playwright/test";

export class InventoryPage {
  readonly page: Page;
  readonly filterDropdown: Locator;
  readonly allInventoryItems: Locator;
  readonly cartBadge: Locator;
  readonly cartLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.filterDropdown = this.page.locator(
      '[data-test="product-sort-container"]'
    );
    this.allInventoryItems = this.page.locator('[data-test="inventory-item"]');
    this.cartBadge = this.page.locator('[data-test="shopping-cart-badge"]');
    this.cartLink = this.page.locator('[data-test="shopping-cart-link"]');
  }

  async filterProductsLowToHigh() {
    await this.filterDropdown.selectOption("lohi");
  }

  async verifyLowToHighFilter() {
    const cartItems = await this.allInventoryItems.all();
    for (let i = 0; i < cartItems.length - 1; i++) {
      var cartPrice1 = parseFloat(
        (
          await cartItems[i]
            .locator('[data-test="inventory-item-price"]')
            .innerText()
        ).replace(/[$,]+/g, "")
      );
      var cartPrice2 = parseFloat(
        (
          await cartItems[i + 1]
            .locator('[data-test="inventory-item-price"]')
            .innerText()
        ).replace(/[$,]+/g, "")
      );
      expect(cartPrice1).toBeLessThanOrEqual(cartPrice2);
    }
  }

  async addFirstItems(noOfItems: number) {
    const cartItems = await this.allInventoryItems.all();
    for (let i = 0; i < 2; i++) {
      expect(
        await cartItems[i].locator(".btn_inventory").innerText()
      ).toContain("Add to cart");
      await cartItems[i].locator(".btn_inventory").click();
      expect(
        await cartItems[i].locator(".btn_inventory").innerText()
      ).toContain("Remove");
    }
  }

  async addNthItemAndReturnName(nth: number) {
    const cartItems = await this.allInventoryItems.all();
    const itemName = await cartItems[nth]
      .locator('[data-test="inventory-item-name"]')
      .innerText();
    await cartItems[nth].locator(".btn_inventory").click();
    expect(
      await cartItems[nth].locator(".btn_inventory").innerText()
    ).toContain("Remove");
    return itemName;
  }

  async verifyNoOfItemsInCartBadge(noOfItems: number) {
    expect(parseFloat(await this.cartBadge.innerText())).toEqual(noOfItems);
  }

  async goToCart() {
    await this.cartLink.click();
    await expect(this.page).toHaveURL(/.*cart/);
  }
}
export default InventoryPage;
