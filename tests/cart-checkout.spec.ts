import { test, expect } from './fixtures';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';

test.describe('Cart and checkout', () => {
  test.beforeEach(async ({ loginPage, inventoryPage }) => {
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    await inventoryPage.addProductToCart('Sauce Labs Backpack');
    await inventoryPage.openCart();
  });

  test('should display selected product in cart', async ({ page }) => {
    const cart = new CartPage(page);
    await cart.expectProduct('Sauce Labs Backpack');
  });

  test('should navigate back to inventory from cart', async ({ page }) => {
    await new CartPage(page).continueShopping();
    await expect(page).toHaveURL(/inventory\.html/);
  });

  test('should complete checkout successfully', async ({ page }) => {
    const cart = new CartPage(page);
    const checkout = new CheckoutPage(page);

    await cart.checkout();
    await expect(page).toHaveURL(/checkout-step-one\.html/);
    await checkout.fillCustomerInformation('Alex', 'Tester', '10000');
    await checkout.continue();
    await expect(page).toHaveURL(/checkout-step-two\.html/);
    await expect(page.getByText('Item total: $29.99')).toBeVisible();
    await checkout.finish();
    await checkout.expectOrderComplete();
  });

  test('should show validation error when first name is missing', async ({ page }) => {
    const checkout = new CheckoutPage(page);
    await new CartPage(page).checkout();
    await checkout.fillCustomerInformation('', 'Tester', '10000');
    await checkout.continue();
    await checkout.expectError('First Name is required');
  });

  test('should show validation error when postal code is missing', async ({ page }) => {
    const checkout = new CheckoutPage(page);
    await new CartPage(page).checkout();
    await checkout.fillCustomerInformation('Alex', 'Tester', '');
    await checkout.continue();
    await checkout.expectError('Postal Code is required');
  });
});
