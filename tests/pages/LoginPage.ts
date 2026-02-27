import { expect, type Page, type Locator } from '@playwright/test';
import { SuperPage } from './SuperPage';

export class LoginPage extends SuperPage {
  usernameInput: Locator;
  passwordInput: Locator;
  submitButton: Locator;

  constructor(page: Page) {
    super(page);

    this.usernameInput = this.page.locator('input[name="username"]');
    this.passwordInput = this.page.locator('input[name="password"]');
    this.submitButton = this.page.locator('button[type="submit"]');
  }

  // 🔹 Acción de login
  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);

    // Esperamos correctamente la navegación
    await Promise.all([
      this.page.waitForNavigation(),
      this.submitButton.click()
    ]);
  }

  // 🔹 Precondición reutilizable
  async loginSuccess() {
    await this.goHome();

    const { username, password } = this.getCredentials();

    await this.login(username, password);

    // Validación robusta
    await expect(this.page).toHaveURL(/dashboard/, { timeout: 10000 });

    // Validación extra recomendada
    await expect(
      this.page.locator('h6')
    ).toHaveText('Dashboard');
  }
}