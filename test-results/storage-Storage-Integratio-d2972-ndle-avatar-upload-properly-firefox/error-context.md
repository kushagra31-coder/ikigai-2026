# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: storage.spec.ts >> Storage Integrations >> should handle avatar upload properly
- Location: e2e\storage.spec.ts:12:7

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
- generic [ref=e1]:
  - generic [ref=e3]:
    - generic [ref=e4]:
      - heading "Welcome back" [level=1] [ref=e5]
      - paragraph [ref=e6]: Sign in to your IKIGAI 2026 account
    - generic [ref=e7]:
      - generic [ref=e8]:
        - text: Email
        - textbox "Email" [active] [ref=e9]:
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
  3  | test.describe('Storage Integrations', () => {
  4  |   test.beforeEach(async ({ page }) => {
  5  |     await page.goto('/login');
  6  |     await page.fill('input[type="email"]', 'team@ikigai.com');
  7  |     await page.fill('input[type="password"]', 'team123');
  8  |     await page.click('button[type="submit"]');
> 9  |     await page.waitForURL(/.*workspace.*/);
     |                ^ Error: page.waitForURL: Test timeout of 30000ms exceeded.
  10 |   });
  11 | 
  12 |   test('should handle avatar upload properly', async ({ page }) => {
  13 |     await page.goto('/workspace/profile');
  14 | 
  15 |     const fileInput = page.locator('input[type="file"]');
  16 |     if (await fileInput.isVisible()) {
  17 |         // Playwright allows setting input files directly if it's an <input type="file">
  18 |         // Since we don't have a real file, we use a buffer or wait to mock it.
  19 |         // For actual E2E we would upload a small test image.
  20 |         await fileInput.setInputFiles({
  21 |             name: 'test-avatar.png',
  22 |             mimeType: 'image/png',
  23 |             buffer: Buffer.from('fake image data') // Ideally a real PNG buffer
  24 |         });
  25 | 
  26 |         // Click save or wait for auto-upload
  27 |         const saveBtn = page.locator('button:has-text("Save")');
  28 |         if (await saveBtn.isVisible()) {
  29 |             await saveBtn.click();
  30 |         }
  31 | 
  32 |         // Verify some success message
  33 |         await expect(page.locator('text=uploaded successfully').first()).toBeVisible();
  34 |     }
  35 |   });
  36 | 
  37 |   test('should reject oversized or invalid files', async ({ page }) => {
  38 |     // If the client side handles this, we can just intercept
  39 |     await page.goto('/workspace/submission');
  40 |     const fileInput = page.locator('input[type="file"]');
  41 |     if (await fileInput.isVisible()) {
  42 |         await fileInput.setInputFiles({
  43 |             name: 'huge-file.pdf',
  44 |             mimeType: 'application/pdf',
  45 |             buffer: Buffer.alloc(10 * 1024 * 1024) // 10MB to trigger oversized error if limit is 5MB
  46 |         });
  47 | 
  48 |         await expect(page.locator('text=exceeds the limit').first()).toBeVisible();
  49 |     }
  50 |   });
  51 | });
  52 | 
```