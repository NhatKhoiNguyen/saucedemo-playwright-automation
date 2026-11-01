import { test, expect } from './fixtures';

const validUser = 'standard_user';
const password = 'secret_sauce';

test.describe('Login Scenarios', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
  });

  test('LOGIN-001: Login with valid standard user @smoke', async ({ page, loginPage, inventoryPage }) => {
    await loginPage.login(validUser, password);
    await expect(page).toHaveURL('/inventory.html');
    await inventoryPage.expectLoaded();
  });

  test('LOGIN-002: Login with invalid password @smoke', async ({ loginPage }) => {
    await loginPage.login(validUser, 'wrong_password');
    await loginPage.expectLoginError('Username and password do not match');
  });

  test('LOGIN-003: Submit with empty username @smoke', async ({ loginPage }) => {
    await loginPage.login('', password);
    await loginPage.expectLoginError('Username is required');
  });

  test('LOGIN-004: Submit with empty password @smoke', async ({ loginPage }) => {
    await loginPage.login(validUser, '');
    await loginPage.expectLoginError('Password is required');
  });

  test('LOGIN-005: Login with locked-out user @smoke', async ({ loginPage }) => {
    await loginPage.login('locked_out_user', password);
    await loginPage.expectLoginError('Sorry, this user has been locked out.');
  });

  test('LOGIN-006: Login with problem user', async ({ loginPage, page }) => {
    await loginPage.login('problem_user', password);
    await expect(page).toHaveURL('/inventory.html');
  });

  test('LOGIN-007: Login with performance glitch user', async ({ loginPage, page }) => {
    const startTime = Date.now();
    await loginPage.login('performance_glitch_user', password);
    await expect(page).toHaveURL('/inventory.html');
    const duration = Date.now() - startTime;
    expect(duration).toBeGreaterThan(1000);
  });
  
});
