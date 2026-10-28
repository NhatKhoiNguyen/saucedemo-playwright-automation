import { test, expect } from './fixtures';

const validUser = 'standard_user';
const password = 'secret_sauce';

test.describe('Login', () => {
  test('should login with valid credentials', async ({ page, loginPage, inventoryPage }) => {
    await loginPage.goto();
    await loginPage.login(validUser, password);

    await expect(page).toHaveURL(/inventory\.html/);
    await inventoryPage.expectLoaded();
  });

  test('should show an error for an invalid password', async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.login(validUser, 'wrong_password');

    await loginPage.expectLoginError('Username and password do not match');
  });

  test('should show an error when username is empty', async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.login('', password);

    await loginPage.expectLoginError('Username is required');
  });

  test('should show an error when password is empty', async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.login(validUser, '');

    await loginPage.expectLoginError('Password is required');
  });

  test('should prevent a locked-out user from logging in', async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.login('locked_out_user', password);

    await loginPage.expectLoginError('locked out');
  });
});
