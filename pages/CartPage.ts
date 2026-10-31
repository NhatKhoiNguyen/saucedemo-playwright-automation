import { expect, type Page, type Locator } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly cartItems: Locator;
  readonly checkoutButton: Locator;
  readonly continueShoppingButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartItems = page.locator('.cart_item');
    this.checkoutButton = page.getByRole('button', { name: 'Checkout' });
    this.continueShoppingButton = page.getByRole('button', { name: 'Continue Shopping' });
  }

  async goto() {
    await this.page.goto('/cart.html');
  }
  
  async expectProduct(productName: string) {
    await expect(this.cartItems.filter({
      has: this.page.getByText(productName, { exact: true })
    })).toBeVisible();
  }

  async removeProduct(productName: string) {
    const item = this.cartItems.filter({ hasText: productName });
    await item.locator('button:has-text("Remove")').click();
  }

  async expectEmpty() {
    await expect(this.cartItems).toHaveCount(0);
  }

  async checkout() {
    await this.checkoutButton.click();
  }

  async continueShopping() {
    await this.continueShoppingButton.click();
  }
}
