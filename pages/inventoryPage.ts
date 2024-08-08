import { expect, Locator, Page } from '@playwright/test';

export class InventoryPage {
    readonly page: Page;
    readonly filter_dropdown: Locator;
    readonly allCartItems: Locator;
    readonly cart_badge: Locator

    constructor(page: Page) {
        this.page = page;
        this.filter_dropdown = this.page.locator('[data-test="product-sort-container"]')
        this.allCartItems = this.page.locator('[data-test="inventory-item"]')
        this.cart_badge = this.page.locator('[data-test="shopping-cart-badge"]')
    }

    async filterProductsLowToHigh() {
        await this.filter_dropdown.selectOption('lohi')
    }

    async verifyLowToHighFilter() {
        const cartItems = await this.allCartItems.all()
        for (let i=0; i < cartItems.length-1; i++) {
            var cartPrice1 = parseFloat((await cartItems[i].locator('[data-test="inventory-item-price"]').innerText()).replace(/[$,]+/g,""))
            var cartPrice2 = parseFloat((await cartItems[i+1].locator('[data-test="inventory-item-price"]').innerText()).replace(/[$,]+/g,""))
            expect(cartPrice1).toBeLessThanOrEqual(cartPrice2)
        }
    }

    async addFirstItems(noOfItems: number) {
        const cartItems = await this.allCartItems.all()
        for (let i=0; i < 2; i++) {
            expect(await cartItems[i].locator('.btn_inventory').innerText()).toContain('Add to cart')
            await cartItems[i].locator('.btn_inventory').click()
            expect(await cartItems[i].locator('.btn_inventory').innerText()).toContain('Remove')
        }
    }

    async verifyNoOfItemsInCart(noOfItems: number) {
        expect(parseFloat(await this.cart_badge.innerText())).toEqual(noOfItems)
    }
    
}
export default InventoryPage;