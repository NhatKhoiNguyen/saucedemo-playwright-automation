import { test, expect } from './fixtures';

test.describe('Security & Unauthorized Access Scenarios', () => {
  test('SEC-001: Access inventory page without login', async ({ page }) => {
    await page.goto('/inventory.html');
    await expect(page).toHaveURL('/');
    await expect(page.locator('[data-test="error"]')).toContainText(
      "You can only access '/inventory.html' when you are logged in."
    );
  });
});