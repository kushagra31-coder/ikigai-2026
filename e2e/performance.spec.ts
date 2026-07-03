import { test, expect } from '@playwright/test';

test.describe('Performance Metrics', () => {
  test('Dashboard should load within performance budget', async ({ page }) => {
    await page.goto('/login');
    await page.fill('input[type="email"]', 'admin@ikigai.com');
    await page.fill('input[type="password"]', 'admin123');
    
    // Start timing
    const startTime = Date.now();
    await page.click('button[type="submit"]');
    
    // Wait for the workspace to fully load (e.g. wait for a key element)
    await page.waitForURL(/.*workspace.*/);
    const dashboardElement = page.locator('text=Dashboard').first();
    await expect(dashboardElement).toBeVisible();
    
    const loadTime = Date.now() - startTime;
    console.log(`Dashboard load time: ${loadTime}ms`);
    
    // Assuming a 3000ms budget for initial E2E load
    expect(loadTime).toBeLessThan(3000);
  });
});
