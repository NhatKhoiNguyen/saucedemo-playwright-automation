import { test, expect } from './fixtures';

test.describe('Inventory Scenarios', () => {
  test.beforeEach(async ({ loggedInPage }) => {});

  test('INV-001: Display products', async ({ inventoryPage }) => {
    await inventoryPage.expectLoaded();
    await expect(inventoryPage.inventoryItems).toHaveCount(6);
  });

  test('INV-002: Add product to cart', async ({ inventoryPage, page }) => {
    await inventoryPage.addProductToCart('Sauce Labs Backpack');
    await expect(inventoryPage.cartBadge).toHaveText('1');
  });

  test('INV-003: Remove product from cart', async ({ inventoryPage }) => {
    await inventoryPage.addProductToCart('Sauce Labs Backpack');
    await inventoryPage.removeProductFromCart('Sauce Labs Backpack');
    await expect(inventoryPage.cartBadge).not.toBeVisible();
  });

  test('INV-004: Sort products A to Z', async ({ inventoryPage }) => {
    await inventoryPage.sortBy('az');
    const names = await inventoryPage.getProductNames();
    expect(names).toEqual([...names].sort());
  });

  test('INV-005: Sort products Z to A', async ({ inventoryPage }) => {
    await inventoryPage.sortBy('za');
    const names = await inventoryPage.getProductNames();
    expect(names).toEqual([...names].sort().reverse());
  });

  test('INV-006: Sort products by price low to high', async ({ inventoryPage }) => {
    await inventoryPage.sortBy('lohi');
    const prices = await inventoryPage.getProductPrices();
    expect(prices).toEqual([...prices].sort((a, b) => a - b));
  });

  test('INV-007: Sort products by price high to low', async ({ inventoryPage }) => {
    await inventoryPage.sortBy('hilo');
    const prices = await inventoryPage.getProductPrices();
    expect(prices).toEqual([...prices].sort((a, b) => b - a));
  });

  test('INV-008: View product details page', async ({ inventoryPage, page }) => {
    await inventoryPage.openProductDetail('Sauce Labs Backpack');
    await expect(page).toHaveURL('/inventory-item.html?id=4');
    await expect(page.locator('[data-test="inventory-item-name"]')).toHaveText('Sauce Labs Backpack');
  });  
});
