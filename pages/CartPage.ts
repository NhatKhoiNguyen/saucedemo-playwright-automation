import { expect, type Page } from '@playwright/test';

export class CartPage {
  constructor(private readonly page: Page) {}

  async expectProduct(productName: string) {
    await expect(this.page.locator('.cart_item').filter({
      has: this.page.getByText(productName, { exact: true })
    })).toBeVisible();
  }

  async expectEmpty() {
    await expect(this.page.locator('.cart_item')).toHaveCount(0);
  }

  async checkout() {
    await this.page.getByRole('button', { name: 'Checkout' }).click();
  }

  async continueShopping() {
    await this.page.getByRole('button', { name: 'Continue Shopping' }).click();
  }
}
