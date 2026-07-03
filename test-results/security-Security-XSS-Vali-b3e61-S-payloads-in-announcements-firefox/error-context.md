# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: security.spec.ts >> Security & XSS Validations >> should escape XSS payloads in announcements
- Location: e2e\security.spec.ts:16:7

# Error details

```
Test timeout of 30000ms exceeded.
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
      - generic [ref=e10]:
        - generic [ref=e11]:
          - generic [ref=e12]: Password
          - link "Forgot password?" [ref=e13] [cursor=pointer]:
            - /url: "#"
        - textbox "Password" [ref=e14]
      - button "Sign in" [ref=e15]
    - generic [ref=e20]: Or continue with
    - button "Continue with Google" [ref=e21]:
      - img [ref=e22]
      - text: Continue with Google
  - button "Open Next.js Dev Tools" [ref=e31] [cursor=pointer]:
    - img [ref=e32]
  - alert [ref=e36]
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
  12 |     await expect(page.locator('text=Invalid')).toBeVisible();
  13 |     await expect(page).toHaveURL(/.*login.*/);
  14 |   });
  15 | 
  16 |   test('should escape XSS payloads in announcements', async ({ page }) => {
  17 |     // Login as Admin
  18 |     await page.goto('/login');
  19 |     await page.fill('input[type="email"]', 'admin@ikigai.com');
  20 |     await page.fill('input[type="password"]', 'admin123');
  21 |     await page.click('button[type="submit"]');
> 22 |     await page.waitForURL(/.*workspace.*/);
     |                ^ Error: page.waitForURL: Test timeout of 30000ms exceeded.
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