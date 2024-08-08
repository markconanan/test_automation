import { test, expect } from '@playwright/test';
import LoginPage from '../../pages/LoginPage';
import InventoryPage from '../../pages/inventoryPage';

const URL = 'https://www.saucedemo.com/';
let loginPage: LoginPage;
let inventoryPage: InventoryPage;

test.beforeEach(async ({page}) => {
    await page.goto(URL);
    loginPage = new LoginPage(page)
    inventoryPage = new InventoryPage(page)
    await loginPage.loginWithCredentials('standard_user', 'secret_sauce')
    await expect(page).toHaveURL(/.*inventory/);
});

test('TC03A - Add First 2 Items to Cart', async ({ page }) => {
    await inventoryPage.filterProductsLowToHigh();
    await inventoryPage.addFirstItems(2);
    await inventoryPage.verifyNoOfItemsInCart(2);
});


