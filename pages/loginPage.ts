import { expect, Locator, Page } from "@playwright/test";

export class LoginPage {
  readonly page: Page;
  readonly username_field: Locator;
  readonly password_field: Locator;
  readonly login_button: Locator;

  constructor(page: Page) {
    this.page = page;
    this.username_field = page.locator('[data-test="username"]');
    this.password_field = page.locator('[data-test="password"]');
    this.login_button = page.locator('[data-test="login-button"]');
  }

  async loginWithCredentials(username: string, password: string) {
    await this.username_field.fill(username);
    await this.password_field.fill(password);
    await this.login_button.click();
    await expect(this.page).toHaveURL(/.*inventory/);
  }
}
export default LoginPage;
