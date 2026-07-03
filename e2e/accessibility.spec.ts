import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Accessibility (a11y)', () => {
  test('public pages should have no automatically detectable accessibility violations', async ({ page }) => {
    const urls = ['/login', '/', '/faq', '/sponsors', '/timeline', '/tracks'];
    for (const url of urls) {
      await page.goto(url);
      const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
      expect(accessibilityScanResults.violations).toEqual([]);
    }
  });

  test('workspace pages should have no automatically detectable accessibility violations', async ({ page }) => {
    // Login as Admin to access workspace
    await page.goto('/login');
    await page.fill('input[type="email"]', 'admin@ikigai.com');
    await page.fill('input[type="password"]', 'admin123');
    await page.click('button[type="submit"]');
    await page.waitForURL(/.*workspace.*/);

    const urls = ['/workspace/admin', '/workspace/profile', '/workspace/tasks'];
    for (const url of urls) {
      await page.goto(url);
      const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
      expect(accessibilityScanResults.violations).toEqual([]);
    }
  });
});
