import { test, expect } from '@playwright/test';

test.describe('Error Handling & Network Interruptions', () => {
  test('should display offline indicator when network drops', async ({ page, context }) => {
    // Go to login page first to set context
    await page.goto('/login');
    
    // Disable network
    await context.setOffline(true);
    
    // Depending on application logic, it might show a banner or handle offline states
    // For this E2E, we'll try to submit a form offline and expect a network error message
    await page.fill('input[type="email"]', 'admin@ikigai.com');
    await page.fill('input[type="password"]', 'admin123');
    await page.click('button[type="submit"]');

    // Look for generic offline / network error message
    const errorMsg = page.locator('text=/network|offline|failed to fetch/i').first();
    await expect(errorMsg).toBeVisible();

    // Re-enable to clean up
    await context.setOffline(false);
  });

  test('should handle Supabase 500 API errors gracefully', async ({ page }) => {
    // Mock the Supabase Auth API to return 500
    await page.route('**/auth/v1/token?grant_type=password', route => {
      route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({ message: 'Internal Server Error' })
      });
    });

    await page.goto('/login');
    await page.fill('input[type="email"]', 'admin@ikigai.com');
    await page.fill('input[type="password"]', 'admin123');
    await page.click('button[type="submit"]');

    // Should show error boundary or toast rather than crashing
    const errorAlert = page.locator('text=Internal Server Error').first();
    await expect(errorAlert).toBeVisible();
  });
});
