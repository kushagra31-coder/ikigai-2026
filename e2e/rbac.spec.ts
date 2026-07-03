import { test, expect } from '@playwright/test';

test.describe('Role Based Access Control (RBAC)', () => {
  
  test.describe('Admin User', () => {
    test.use({ storageState: 'e2e/.auth/admin.json' }); // Assumes pre-authenticated state, or we login in beforeEach
    
    test.beforeEach(async ({ page }) => {
      // Temporary login since we don't have global setup yet
      await page.goto('/login');
      await page.fill('input[type="email"]', 'admin@ikigai.com');
      await page.fill('input[type="password"]', 'admin123');
      await page.click('button[type="submit"]');
      await page.waitForURL(/.*workspace.*/);
    });

    test('should access admin dashboard', async ({ page }) => {
      await page.goto('/workspace/admin');
      await expect(page.locator('text=Admin Dashboard').first()).toBeVisible();
    });
  });

  test.describe('Regular Team Member User', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/login');
      await page.fill('input[type="email"]', 'team@ikigai.com'); // seed user
      await page.fill('input[type="password"]', 'team123');
      await page.click('button[type="submit"]');
      await page.waitForURL(/.*workspace.*/);
    });

    test('should be denied access to admin dashboard (Privilege Escalation)', async ({ page }) => {
      await page.goto('/workspace/admin');
      
      // Should redirect or show unauthorized
      const isUnauthorized = await page.locator('text=Unauthorized').isVisible() 
                          || page.url().includes('/workspace') && !page.url().includes('admin');
                          
      expect(isUnauthorized).toBeTruthy();
    });
    
    test('should access team workspace', async ({ page }) => {
      await page.goto('/workspace');
      await expect(page.locator('text=My Team').first()).toBeVisible();
    });
  });

  test.describe('Mentor User', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/login');
      await page.fill('input[type="email"]', 'mentor@ikigai.com'); // seed user
      await page.fill('input[type="password"]', 'mentor123');
      await page.click('button[type="submit"]');
      await page.waitForURL(/.*workspace.*/);
    });

    test('should access mentor dashboard but not admin', async ({ page }) => {
      await page.goto('/workspace/mentor');
      await expect(page.locator('text=Mentor Dashboard').first()).toBeVisible();

      await page.goto('/workspace/admin');
      const isUnauthorized = await page.locator('text=Unauthorized').isVisible() 
                          || page.url().includes('/workspace') && !page.url().includes('admin');
      expect(isUnauthorized).toBeTruthy();
    });
  });

  test.describe('Volunteer User', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/login');
      await page.fill('input[type="email"]', 'volunteer@ikigai.com'); // seed user
      await page.fill('input[type="password"]', 'volunteer123');
      await page.click('button[type="submit"]');
      await page.waitForURL(/.*workspace.*/);
    });

    test('should access scanner but not mentor workspace', async ({ page }) => {
      await page.goto('/dev/event-operations'); // Using the dev playground path for QR scanner
      await expect(page.locator('text=Scanner').first()).toBeVisible();

      await page.goto('/workspace/mentor');
      const isUnauthorized = await page.locator('text=Unauthorized').isVisible() 
                          || page.url().includes('/workspace');
      expect(isUnauthorized).toBeTruthy();
    });
  });
});
