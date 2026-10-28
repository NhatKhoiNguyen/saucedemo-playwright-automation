import { test, expect } from './fixtures';

test.describe('Product inventory', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
  });

  test('should display products on inventory page', async ({ inventoryPage }) => {
    await inventoryPage.expectLoaded();
    await expect(inventoryPage.inventoryItems).toHaveCount(6);
  });

  test('should add a product to cart and update cart badge', async ({ inventoryPage, page }) => {
    await inventoryPage.addProductToCart('Sauce Labs Backpack');
    await expect(inventoryPage.cartBadge).toHaveText('1');
    await inventoryPage.openCart();
    await expect(page).toHaveURL(/cart\.html/);
    await expect(page.getByText('Sauce Labs Backpack', { exact: true })).toBeVisible();
  });

  test('should remove a product from inventory and clear cart badge', async ({ inventoryPage }) => {
    await inventoryPage.addProductToCart('Sauce Labs Backpack');
    await inventoryPage.removeProductFromCart('Sauce Labs Backpack');
    await expect(inventoryPage.cartBadge).toHaveCount(0);
  });

  test('should sort products by name A to Z', async ({ inventoryPage }) => {
    await inventoryPage.sortBy('az');
    const names = await inventoryPage.inventoryItems.locator('.inventory_item_name').allTextContents();
    expect(names).toEqual([...names].sort((a, b) => a.localeCompare(b)));
  });

  test('should sort products by price low to high', async ({ inventoryPage }) => {
    await inventoryPage.sortBy('lohi');
    const prices = (await inventoryPage.inventoryItems.locator('.inventory_item_price').allTextContents())
      .map(price => Number(price.replace('$', '')));
    expect(prices).toEqual([...prices].sort((a, b) => a - b));
  });
});
