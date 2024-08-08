import { test } from "@playwright/test";
import LoginPage from "../../pages/LoginPage";
import InventoryPage from "../../pages/inventoryPage";
import CartPage from "../../pages/cartPage";
import CheckoutPage1 from "../../pages/checkoutPage1";
import CheckoutPage2 from "../../pages/checkoutPage2";

let loginPage: LoginPage;
let inventoryPage: InventoryPage;
let cartPage: CartPage;
let checkoutPage1: CheckoutPage1;
let checkoutPage2: CheckoutPage2;

test.beforeEach(async ({ page }) => {
  await page.goto("/");
  loginPage = new LoginPage(page);
  inventoryPage = new InventoryPage(page);
  await loginPage.loginWithCredentials("standard_user", "secret_sauce");
  await loginPage.verifySuccessfulLogin();
});

test("TC04A - Verify Checkout Journey", async ({ page }) => {
  await inventoryPage.filterProductsLowToHigh();
  const firstItem = await inventoryPage.addNthItemAndReturnName(0);
  const secondItem = await inventoryPage.addNthItemAndReturnName(1);
  await inventoryPage.verifyNoOfItemsInCartBadge(2);
  await inventoryPage.cartLink.click();
  cartPage = new CartPage(page);

  await cartPage.verifyNoOfItemsInCart(2);
  await cartPage.goToCheckoutStepOne();
  checkoutPage1 = new CheckoutPage1(page);

  await checkoutPage1.fillInCheckoutForm("First", "Last", "1234");
  await checkoutPage1.verifyCheckoutFormValues("First", "Last", "1234");
  await checkoutPage1.goToCheckoutStepTwo();
  checkoutPage2 = new CheckoutPage2(page);

  await checkoutPage2.verifyNthItemName(0, firstItem);
  await checkoutPage2.verifyNthItemName(1, secondItem);
  await checkoutPage2.verifyTotalPriceOfItems();
});
