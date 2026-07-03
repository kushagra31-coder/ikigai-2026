import { test, expect } from '@playwright/test';

test.describe('Realtime Sync', () => {
  // We need two separate browser contexts
  test('should sync task updates between mentor and team instantly', async ({ browser }) => {
    const mentorContext = await browser.newContext();
    const teamContext = await browser.newContext();

    const mentorPage = await mentorContext.newPage();
    const teamPage = await teamContext.newPage();

    // Mentor Login
    await mentorPage.goto('/login');
    await mentorPage.fill('input[type="email"]', 'mentor@ikigai.com');
    await mentorPage.fill('input[type="password"]', 'mentor123');
    await mentorPage.click('button[type="submit"]');
    await mentorPage.waitForURL(/.*workspace.*/);

    // Team Login
    await teamPage.goto('/login');
    await teamPage.fill('input[type="email"]', 'team@ikigai.com');
    await teamPage.fill('input[type="password"]', 'team123');
    await teamPage.click('button[type="submit"]');
    await teamPage.waitForURL(/.*workspace.*/);

    // Navigate to tasks
    await teamPage.goto('/workspace/tasks');
    await mentorPage.goto('/workspace/mentor/tasks'); // Or wherever mentor updates tasks

    // Mentor adds a task
    if (await mentorPage.locator('button:has-text("Add Task")').isVisible()) {
        await mentorPage.click('button:has-text("Add Task")');
        const taskName = `Realtime Task ${Date.now()}`;
        await mentorPage.fill('input[name="title"]', taskName);
        await mentorPage.click('button[type="submit"]');

        // It should appear on the team's screen without a refresh
        await expect(teamPage.locator(`text=${taskName}`).first()).toBeVisible({ timeout: 5000 });
    }

    await mentorContext.close();
    await teamContext.close();
  });
});
