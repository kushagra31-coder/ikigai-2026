import { test, expect } from '@playwright/test';

test.describe('Authentication Flows', () => {
  test('should allow a user to register with valid details', async ({ page }) => {
    // Navigate to register page
    await page.goto('/login');
    // For our app, login/register might be the same UI or have a toggle
    // This assumes there's a sign up toggle/tab
    const signUpTab = page.locator('button', { hasText: /Sign Up/i });
    if (await signUpTab.isVisible()) {
      await signUpTab.click();
    }
    
    const testEmail = `testuser_${Date.now()}@example.com`;
    
    // Assuming form fields exist based on previous stages
    await page.fill('input[type="email"]', testEmail);
    await page.fill('input[type="password"]', 'SecurePassword123!');
    await page.fill('input[placeholder*="Name" i]', 'Test User');
    
    await page.click('button[type="submit"]');

    // Should redirect to dashboard or show confirmation
    await expect(page).toHaveURL(/.*workspace.*/);
    
    // Logout
    await page.click('button:has-text("Logout")');
    await expect(page).toHaveURL('/login');
  });

  test('should fail login with invalid credentials', async ({ page }) => {
    await page.goto('/login');
    
    await page.fill('input[type="email"]', 'wrong@example.com');
    await page.fill('input[type="password"]', 'WrongPass123!');
    
    await page.click('button[type="submit"]');

    // Expect an error message
    const errorMsg = page.locator('text=Invalid login credentials');
    await expect(errorMsg).toBeVisible();
  });

  test('should allow login with valid credentials', async ({ page }) => {
    await page.goto('/login');
    
    // In a real environment, we use a seeded user.
    // For testing, we can use standard seed credentials if known, or register first.
    // Assuming 'admin@ikigai.com' exists in seed.
    await page.fill('input[type="email"]', 'admin@ikigai.com');
    await page.fill('input[type="password"]', 'admin123'); // Example seeded password
    
    await page.click('button[type="submit"]');

    await expect(page).toHaveURL(/.*workspace.*/);
  });

  test('should redirect unauthorized users to login', async ({ page }) => {
    await page.goto('/workspace');
    await expect(page).toHaveURL(/.*login.*/);
  });
});
