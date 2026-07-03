import { test, expect } from '@playwright/test';

test.describe('Storage Integrations', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
    await page.fill('input[type="email"]', 'team@ikigai.com');
    await page.fill('input[type="password"]', 'team123');
    await page.click('button[type="submit"]');
    await page.waitForURL(/.*workspace.*/);
  });

  test('should handle avatar upload properly', async ({ page }) => {
    await page.goto('/workspace/profile');

    const fileInput = page.locator('input[type="file"]');
    if (await fileInput.isVisible()) {
        // Playwright allows setting input files directly if it's an <input type="file">
        // Since we don't have a real file, we use a buffer or wait to mock it.
        // For actual E2E we would upload a small test image.
        await fileInput.setInputFiles({
            name: 'test-avatar.png',
            mimeType: 'image/png',
            buffer: Buffer.from('fake image data') // Ideally a real PNG buffer
        });

        // Click save or wait for auto-upload
        const saveBtn = page.locator('button:has-text("Save")');
        if (await saveBtn.isVisible()) {
            await saveBtn.click();
        }

        // Verify some success message
        await expect(page.locator('text=uploaded successfully').first()).toBeVisible();
    }
  });

  test('should reject oversized or invalid files', async ({ page }) => {
    // If the client side handles this, we can just intercept
    await page.goto('/workspace/submission');
    const fileInput = page.locator('input[type="file"]');
    if (await fileInput.isVisible()) {
        await fileInput.setInputFiles({
            name: 'huge-file.pdf',
            mimeType: 'application/pdf',
            buffer: Buffer.alloc(10 * 1024 * 1024) // 10MB to trigger oversized error if limit is 5MB
        });

        await expect(page.locator('text=exceeds the limit').first()).toBeVisible();
    }
  });
});
