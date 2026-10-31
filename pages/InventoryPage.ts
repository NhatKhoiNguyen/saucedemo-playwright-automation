import { expect, type Locator, type Page } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;
  readonly title: Locator;
  readonly inventoryItems: Locator;
  readonly cartLink: Locator;
  readonly sortSelect: Locator;
  readonly cartBadge: Locator;
  readonly menuButton: Locator;
  readonly logoutLink: Locator;
  readonly resetAppStateLink: Locator;
  readonly aboutLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.title = page.getByText('Products', { exact: true });
    this.inventoryItems = page.locator('.inventory_item');
    this.cartLink = page.locator('.shopping_cart_link');
    this.sortSelect = page.locator('[data-test="product-sort-container"]');
    this.cartBadge = page.locator('.shopping_cart_badge');
    this.menuButton = page.locator('#react-burger-menu-btn');
    this.logoutLink = page.locator('#logout_sidebar_link');
    this.resetAppStateLink = page.locator('#reset_sidebar_link');
    this.aboutLink = page.locator('#about_sidebar_link');
  }

  async expectLoaded() {
    await expect(this.title).toBeVisible();
    await expect(this.inventoryItems.first()).toBeVisible();
  }

  async addProductToCart(productName: string) {
    const item = this.inventoryItems.filter({ has: this.page.getByText(productName, { exact: true }) });
    await item.getByRole('button', { name: 'Add to cart' }).click();
  }

  async removeProductFromCart(productName: string) {
    const item = this.inventoryItems.filter({ has: this.page.getByText(productName, { exact: true }) });
    await item.getByRole('button', { name: 'Remove' }).click();
  }

  async openProductDetail(productName: string) {
    await this.page.locator('.inventory_item_name', { hasText: productName }).click();
  }

  async sortBy(value: 'az' | 'za' | 'lohi' | 'hilo') {
    await this.sortSelect.selectOption(value);
  }

  async getProductNames(): Promise<string[]> {
    return await this.page.locator('.inventory_item_name').allTextContents();
  }

  async getProductPrices(): Promise<number[]> {
    const priceTexts = await this.page.locator('.inventory_item_price').allTextContents();
    return priceTexts.map(price => parseFloat(price.replace('$', '')));
  }

  async openCart() {
    await this.cartLink.click();
  }

  async openMenu() {
    await this.menuButton.click();
  }

  async logout() {
    await this.openMenu();
    await this.logoutLink.click();
  }

  async resetAppState() {
    await this.openMenu();
    await this.resetAppStateLink.click();
  }
}
