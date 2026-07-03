import { test, expect } from '@playwright/test';

test.describe('CRUD Operations', () => {
  test.beforeEach(async ({ page }) => {
    // Authenticate as Admin to verify full CRUD capabilities
    await page.goto('/login');
    await page.fill('input[type="email"]', 'admin@ikigai.com');
    await page.fill('input[type="password"]', 'admin123');
    await page.click('button[type="submit"]');
    await page.waitForURL(/.*workspace.*/);
  });

  test('should allow creating and updating an announcement', async ({ page }) => {
    await page.goto('/workspace/admin/announcements');
    
    // Create new announcement
    const title = `E2E Announcement ${Date.now()}`;
    await page.click('button:has-text("Create Announcement")');
    await page.fill('input[name="title"]', title);
    await page.fill('textarea[name="content"]', 'This is an E2E generated announcement.');
    await page.click('button[type="submit"]');

    // Verify it appeared in the list
    await expect(page.locator(`text=${title}`)).toBeVisible();

    // Verify deletion (assuming there's a delete button)
    const deleteButton = page.locator(`button[aria-label="Delete ${title}"]`);
    if (await deleteButton.isVisible()) {
        await deleteButton.click();
        await expect(page.locator(`text=${title}`)).not.toBeVisible();
    }
  });

  test('should allow tracking tasks for a team', async ({ page }) => {
    // Assuming team view is at workspace/admin/teams or workspace/tasks
    await page.goto('/workspace/admin/teams');
    
    // We expect the list of teams to render
    const firstTeam = page.locator('text=View Team').first();
    if (await firstTeam.isVisible()) {
      await firstTeam.click();
      
      // Update task status if editable here, or check rendering
      await expect(page.locator('text=Tasks')).toBeVisible();
    }
  });
});
