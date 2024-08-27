import { test } from "@playwright/test";
import LoginPage from "../../pages/loginPageoginPage";
import InventoryPage from "../../pages/inventoryPage";

let loginPage: LoginPage;
let inventoryPage: InventoryPage;

test.beforeEach(async ({ page }) => {
  await page.goto("/");
  loginPage = new LoginPage(page);
  inventoryPage = new InventoryPage(page);
  await loginPage.loginWithCredentials("standard_user", "secret_sauce");
  await loginPage.verifySuccessfulLogin();
});

test("TC02A - Validate Filter Products Low to High", async () => {
  await inventoryPage.filterProductsLowToHigh();
  await inventoryPage.verifyLowToHighFilter();
});
