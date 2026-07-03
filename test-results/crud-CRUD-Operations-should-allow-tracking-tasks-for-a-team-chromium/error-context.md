# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: crud.spec.ts >> CRUD Operations >> should allow tracking tasks for a team
- Location: e2e\crud.spec.ts:34:7

# Error details

```
Test timeout of 30000ms exceeded while running "beforeEach" hook.
```

```
Error: page.waitForURL: Test timeout of 30000ms exceeded.
=========================== logs ===========================
waiting for navigation until "load"
============================================================
```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - generic [ref=e3]:
    - generic [ref=e4]:
      - heading "Welcome back" [level=1] [ref=e5]
      - paragraph [ref=e6]: Sign in to your IKIGAI 2026 account
    - generic [ref=e7]:
      - generic [ref=e8]:
        - text: Email
        - textbox "Email" [ref=e9]:
          - /placeholder: m@example.com
          - text: admin@ikigai.com
      - generic [ref=e10]:
        - generic [ref=e11]:
          - generic [ref=e12]: Password
          - link "Forgot password?" [ref=e13] [cursor=pointer]:
            - /url: "#"
        - textbox "Password" [ref=e14]: admin123
      - generic [ref=e15]: Invalid login credentials
      - button "Sign in" [ref=e16]
    - generic [ref=e21]: Or continue with
    - button "Continue with Google" [ref=e22]:
      - img [ref=e23]
      - text: Continue with Google
  - button "Open Next.js Dev Tools" [ref=e31] [cursor=pointer]:
    - img [ref=e32]
  - alert [ref=e35]
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test.describe('CRUD Operations', () => {
  4  |   test.beforeEach(async ({ page }) => {
  5  |     // Authenticate as Admin to verify full CRUD capabilities
  6  |     await page.goto('/login');
  7  |     await page.fill('input[type="email"]', 'admin@ikigai.com');
  8  |     await page.fill('input[type="password"]', 'admin123');
  9  |     await page.click('button[type="submit"]');
> 10 |     await page.waitForURL(/.*workspace.*/);
     |                ^ Error: page.waitForURL: Test timeout of 30000ms exceeded.
  11 |   });
  12 | 
  13 |   test('should allow creating and updating an announcement', async ({ page }) => {
  14 |     await page.goto('/workspace/admin/announcements');
  15 |     
  16 |     // Create new announcement
  17 |     const title = `E2E Announcement ${Date.now()}`;
  18 |     await page.click('button:has-text("Create Announcement")');
  19 |     await page.fill('input[name="title"]', title);
  20 |     await page.fill('textarea[name="content"]', 'This is an E2E generated announcement.');
  21 |     await page.click('button[type="submit"]');
  22 | 
  23 |     // Verify it appeared in the list
  24 |     await expect(page.locator(`text=${title}`)).toBeVisible();
  25 | 
  26 |     // Verify deletion (assuming there's a delete button)
  27 |     const deleteButton = page.locator(`button[aria-label="Delete ${title}"]`);
  28 |     if (await deleteButton.isVisible()) {
  29 |         await deleteButton.click();
  30 |         await expect(page.locator(`text=${title}`)).not.toBeVisible();
  31 |     }
  32 |   });
  33 | 
  34 |   test('should allow tracking tasks for a team', async ({ page }) => {
  35 |     // Assuming team view is at workspace/admin/teams or workspace/tasks
  36 |     await page.goto('/workspace/admin/teams');
  37 |     
  38 |     // We expect the list of teams to render
  39 |     const firstTeam = page.locator('text=View Team').first();
  40 |     if (await firstTeam.isVisible()) {
  41 |       await firstTeam.click();
  42 |       
  43 |       // Update task status if editable here, or check rendering
  44 |       await expect(page.locator('text=Tasks')).toBeVisible();
  45 |     }
  46 |   });
  47 | });
  48 | 
```