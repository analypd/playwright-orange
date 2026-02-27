import { expect, type Page, type Locator } from '@playwright/test';

export class SuperPage {
	page: Page;
	popup: (text: string) => Locator;
	username: string | undefined;
	password: string | undefined;

	constructor(page: Page) {
		this.page = page;

		this.username = process.env.APP_USERNAME;
		this.password = process.env.APP_PASSWORD;

		console.log("APP_USERNAME:", this.username);
		console.log("APP_PASSWORD:", this.password);

		this.popup = (text: string) =>
			this.page.getByRole('dialog', { name: text });
	}

	getCredentials() {
		if (!this.username || !this.password) {
			throw new Error('Missing credentials in ENV VARS');
		}

		return {
			username: this.username,
			password: this.password
		};
	}

	async goHome() {
		await this.page.goto('/');
	}

	async getPopup(name: string) {
		const popup = this.popup(name);
		await expect(popup).toBeVisible();
		return popup;
	}
}