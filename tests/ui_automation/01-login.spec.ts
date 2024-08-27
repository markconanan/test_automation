import { test } from "@playwright/test";
import LoginPage from "../../pages/loginPage";
import userdata from "../../testdata/userdata.json";

let loginPage: LoginPage;

test.beforeEach(async ({ page }) => {
  await page.goto("/");
  loginPage = new LoginPage(page);
});

test("TC01A - Standard Login test", async ({ page }) => {
  await loginPage.loginWithCredentials(
    userdata.standard_username,
    userdata.standard_pw
  );
  await loginPage.verifySuccessfulLogin();
});

test("TC01B - Lockedout User Login test", async ({ page }) => {
  await loginPage.loginWithCredentials(userdata.lo_username, userdata.lo_pw);
  await loginPage.verifyError(
    "Epic sadface: Sorry, this user has been locked out."
  );
});
