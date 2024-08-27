import { test } from "@playwright/test";
import LoginPage from "../../pages/loginPage";
import InventoryPage from "../../pages/inventoryPage";
import CartPage from "../../pages/cartPage";

let loginPage: LoginPage;
let inventoryPage: InventoryPage;
let cartPage: CartPage;

test.beforeEach(async ({ page }) => {
  await page.goto("/");
  loginPage = new LoginPage(page);
  inventoryPage = new InventoryPage(page);
  await loginPage.loginWithCredentials("standard_user", "secret_sauce");
  await loginPage.verifySuccessfulLogin();
});

test("TC03A - Add First 2 Items to Cart", async ({ page }) => {
  await inventoryPage.filterProductsLowToHigh();
  const firstItem = await inventoryPage.addNthItemAndReturnName(0);
  const secondItem = await inventoryPage.addNthItemAndReturnName(1);
  await inventoryPage.verifyNoOfItemsInCartBadge(2);
  await inventoryPage.cartLink.click();
  cartPage = new CartPage(page);
  cartPage.verifyNthItemName(0, firstItem);
  cartPage.verifyNthItemName(1, secondItem);
});
