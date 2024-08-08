import { test, expect } from '@playwright/test';
import LoginPage from '../../pages/LoginPage';

const URL = 'https://www.saucedemo.com/';
let loginPage: LoginPage;

test.beforeEach(async ({page}) => {
    await page.goto(URL);
    loginPage = new LoginPage(page)
});

test('TC01 - Login test', async ({ page }) => {
    await loginPage.loginWithCredentials('standard_user', 'secret_sauce')
    await expect(page).toHaveURL(/.*inventory/);
});


