import { test, expect } from "@playwright/test";
import LoginPage from "../../pages/LoginPage";
import InventoryPage from "../../pages/inventoryPage";

const URL = "https://www.saucedemo.com/";
let loginPage: LoginPage;
let inventoryPage: InventoryPage;

test.beforeEach(async ({ page }) => {
  await page.goto(URL);
  loginPage = new LoginPage(page);
  inventoryPage = new InventoryPage(page);
  await loginPage.loginWithCredentials("standard_user", "secret_sauce");
});

test("TC02A - Validate Filter Products Low to High", async () => {
  await inventoryPage.filterProductsLowToHigh();
  await inventoryPage.verifyLowToHighFilter();
});
