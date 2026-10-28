import { expect, type Page } from '@playwright/test';

export class CheckoutPage {
  constructor(private readonly page: Page) {}

  async fillCustomerInformation(firstName: string, lastName: string, postalCode: string) {
    await this.page.getByPlaceholder('First Name').fill(firstName);
    await this.page.getByPlaceholder('Last Name').fill(lastName);
    await this.page.getByPlaceholder('Zip/Postal Code').fill(postalCode);
  }

  async continue() {
    await this.page.getByRole('button', { name: 'Continue' }).click();
  }

  async finish() {
    await this.page.getByRole('button', { name: 'Finish' }).click();
  }

  async expectError(message: string | RegExp) {
    const error = this.page.locator('[data-test="error"]');
    await expect(error).toBeVisible();
    await expect(error).toContainText(message);
  }

  async expectOrderComplete() {
    await expect(this.page.getByRole('heading', { name: 'Thank you for your order!' })).toBeVisible();
    await expect(this.page.getByText('Your order has been dispatched')).toBeVisible();
  }
}
