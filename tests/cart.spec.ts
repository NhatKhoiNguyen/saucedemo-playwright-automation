import { test, expect } from './fixtures';

test.describe('Cart Scenarios', () => {
  test.beforeEach(async ({ loggedInPage, inventoryPage }) => {
    await inventoryPage.addProductToCart('Sauce Labs Backpack');
  });

  test('CART-001: Verify selected item in cart', async ({ cartPage }) => {
    await cartPage.goto();
    await cartPage.expectProduct('Sauce Labs Backpack');
  });

  test('CART-002: Continue shopping from cart', async ({ cartPage, page }) => {
    await cartPage.goto();
    await cartPage.continueShopping();
    await expect(page).toHaveURL('/inventory.html');
  });

  test('CART-003: Remove item directly from cart', async ({ cartPage }) => {
    await cartPage.goto();
    await cartPage.removeProduct('Sauce Labs Backpack');
    await expect(cartPage.cartItems).toHaveCount(0);
  });

  test('CART-004: Cart persistence after page refresh', async ({ inventoryPage, page, cartPage }) => {
    await page.reload();
    await expect(inventoryPage.cartBadge).toHaveText('1');
    await cartPage.goto();
    await expect(cartPage.cartItems).toHaveCount(1);
  });

});
