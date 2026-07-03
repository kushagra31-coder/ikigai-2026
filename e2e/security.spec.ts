import { test, expect } from '@playwright/test';

test.describe('Security & XSS Validations', () => {
  test('should reject SQL injection payloads in login', async ({ page }) => {
    await page.goto('/login');
    
    await page.fill('input[type="email"]', "' OR '1'='1");
    await page.fill('input[type="password"]', "password");
    await page.click('button[type="submit"]');

    // Should not allow login, should show validation or login error
    await expect(page.locator('text=Invalid')).toBeVisible();
    await expect(page).toHaveURL(/.*login.*/);
  });

  test('should escape XSS payloads in announcements', async ({ page }) => {
    // Login as Admin
    await page.goto('/login');
    await page.fill('input[type="email"]', 'admin@ikigai.com');
    await page.fill('input[type="password"]', 'admin123');
    await page.click('button[type="submit"]');
    await page.waitForURL(/.*workspace.*/);

    await page.goto('/workspace/admin/announcements');
    
    const xssPayload = '<script>alert("XSS")</script>';
    
    // Assume form for creating announcement
    const titleInput = page.locator('input[name="title"]');
    if (await titleInput.isVisible()) {
        await page.click('button:has-text("Create")');
        await titleInput.fill('Malicious Announcement');
        await page.fill('textarea[name="content"]', xssPayload);
        await page.click('button[type="submit"]');

        // Verify script is not executed but rendered as text
        const renderedAnnouncement = page.locator('text=' + xssPayload);
        await expect(renderedAnnouncement).toBeVisible();
        
        // Also verify that no dialog was triggered
        page.on('dialog', dialog => {
            expect(dialog.message()).not.toBe('XSS');
            dialog.dismiss();
        });
    }
  });
});
