# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: security.spec.ts >> Security & XSS Validations >> should reject SQL injection payloads in login
- Location: e2e\security.spec.ts:4:7

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: expect(locator).toBeVisible() failed

Locator:  locator('text=Invalid')
Expected: visible
Received: undefined

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for locator('text=Invalid')

```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test.describe('Security & XSS Validations', () => {
  4  |   test('should reject SQL injection payloads in login', async ({ page }) => {
  5  |     await page.goto('/login');
  6  |     
  7  |     await page.fill('input[type="email"]', "' OR '1'='1");
  8  |     await page.fill('input[type="password"]', "password");
  9  |     await page.click('button[type="submit"]');
  10 | 
  11 |     // Should not allow login, should show validation or login error
> 12 |     await expect(page.locator('text=Invalid')).toBeVisible();
     |                                                ^ Error: expect(locator).toBeVisible() failed
  13 |     await expect(page).toHaveURL(/.*login.*/);
  14 |   });
  15 | 
  16 |   test('should escape XSS payloads in announcements', async ({ page }) => {
  17 |     // Login as Admin
  18 |     await page.goto('/login');
  19 |     await page.fill('input[type="email"]', 'admin@ikigai.com');
  20 |     await page.fill('input[type="password"]', 'admin123');
  21 |     await page.click('button[type="submit"]');
  22 |     await page.waitForURL(/.*workspace.*/);
  23 | 
  24 |     await page.goto('/workspace/admin/announcements');
  25 |     
  26 |     const xssPayload = '<script>alert("XSS")</script>';
  27 |     
  28 |     // Assume form for creating announcement
  29 |     const titleInput = page.locator('input[name="title"]');
  30 |     if (await titleInput.isVisible()) {
  31 |         await page.click('button:has-text("Create")');
  32 |         await titleInput.fill('Malicious Announcement');
  33 |         await page.fill('textarea[name="content"]', xssPayload);
  34 |         await page.click('button[type="submit"]');
  35 | 
  36 |         // Verify script is not executed but rendered as text
  37 |         const renderedAnnouncement = page.locator('text=' + xssPayload);
  38 |         await expect(renderedAnnouncement).toBeVisible();
  39 |         
  40 |         // Also verify that no dialog was triggered
  41 |         page.on('dialog', dialog => {
  42 |             expect(dialog.message()).not.toBe('XSS');
  43 |             dialog.dismiss();
  44 |         });
  45 |     }
  46 |   });
  47 | });
  48 | 
```