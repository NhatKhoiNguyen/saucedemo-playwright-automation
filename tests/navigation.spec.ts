import { test, expect } from './fixtures';

test.describe('Navigation Scenarios', () => {
  test.beforeEach(async ({ loggedInPage }) => {});

  test('NAV-001: Logout via sidebar menu', async ({ inventoryPage, page }) => {
    await inventoryPage.logout();
    await expect(page).toHaveURL('/');
  });

  test('NAV-002: Reset application state', async ({ inventoryPage }) => {
    await inventoryPage.addProductToCart('Sauce Labs Backpack');
    await inventoryPage.resetAppState();
    await expect(inventoryPage.cartBadge).not.toBeVisible();
  });

  test('NAV-003: Navigate to About page', async ({ inventoryPage }) => {
    await inventoryPage.openMenu();
    await expect(inventoryPage.aboutLink).toHaveAttribute('href', 'https://saucelabs.com/');
  });
});
