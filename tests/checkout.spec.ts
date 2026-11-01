import { test, expect } from './fixtures';

test.describe('Checkout Scenarios', () => {
  test.beforeEach(async ({ loggedInPage, inventoryPage }) => {
    await inventoryPage.addProductToCart('Sauce Labs Backpack'); // $29.99
  });

  test('CHK-001: Complete purchase successfully @smoke', async ({ cartPage, checkoutPage, page }) => {
    await cartPage.goto();
    await cartPage.checkout();
    await expect(page).toHaveURL('/checkout-step-one.html');
    await checkoutPage.fillCustomerInformation('John', 'Doe', '10000');
    await checkoutPage.continue();
    await expect(page).toHaveURL('/checkout-step-two.html');
    await checkoutPage.finish();
    await expect(checkoutPage.completeHeader).toHaveText('Thank you for your order!');
  });

  test('CHK-002: Checkout without first name', async ({ cartPage, checkoutPage }) => {
    await cartPage.goto();
    await cartPage.checkout();
    await checkoutPage.fillCustomerInformation('', 'Doe', '10000');
    await checkoutPage.continue();
    await checkoutPage.expectError('First Name is required');
  });

  test('CHK-003: Checkout without last name', async ({ cartPage, checkoutPage }) => {
    await cartPage.goto();
    await cartPage.checkout();
    await checkoutPage.fillCustomerInformation('John', '', '10000');
    await checkoutPage.continue();
    await checkoutPage.expectError('Last Name is required');
  });

  test('CHK-004: Checkout without postal code', async ({ cartPage, checkoutPage }) => {
    await cartPage.goto();
    await cartPage.checkout();
    await checkoutPage.fillCustomerInformation('John', 'Doe', '');
    await checkoutPage.continue();
    await checkoutPage.expectError('Postal Code is required');
  });

  test('CHK-005: Calculate subtotal, tax, and total price correctly', async ({ inventoryPage, cartPage, checkoutPage }) => {
    await inventoryPage.addProductToCart('Sauce Labs Bike Light'); // $9.99
    await cartPage.goto();
    await cartPage.checkout();
    await checkoutPage.fillCustomerInformation('John', 'Doe', '10000');
    await checkoutPage.continue();

    const subtotalText = await checkoutPage.subtotalLabel.textContent();
    const taxText = await checkoutPage.taxLabel.textContent();
    const totalText = await checkoutPage.totalLabel.textContent();

    const subtotal = parseFloat(subtotalText?.replace('Item total: $', '') || '0');
    const tax = parseFloat(taxText?.replace('Tax: $', '') || '0');
    const total = parseFloat(totalText?.replace('Total: $', '') || '0');

    expect(subtotal).toBeCloseTo(39.98, 2);
    expect(tax).toBeCloseTo(3.20, 2);
    expect(total).toBeCloseTo(43.18, 2);
  });

  test('CHK-006: Cancel checkout step 1', async ({ cartPage, checkoutPage, page }) => {
    await cartPage.goto();
    await cartPage.checkout();
    await checkoutPage.cancel();
    await expect(page).toHaveURL('/cart.html');
  });

  test('CHK-007: Cancel checkout step 2', async ({ cartPage, checkoutPage, page }) => {
    await cartPage.goto();
    await cartPage.checkout();
    await checkoutPage.fillCustomerInformation('John', 'Doe', '10000');
    await checkoutPage.continue();
    await expect(page).toHaveURL('/checkout-step-two.html');
    await checkoutPage.cancel();
    await expect(page).toHaveURL('/inventory.html');
  });

});
