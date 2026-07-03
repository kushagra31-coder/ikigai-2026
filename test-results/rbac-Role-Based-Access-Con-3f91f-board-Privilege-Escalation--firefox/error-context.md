# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: rbac.spec.ts >> Role Based Access Control (RBAC) >> Regular Team Member User >> should be denied access to admin dashboard (Privilege Escalation)
- Location: e2e\rbac.spec.ts:32:9

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
          - text: team@ikigai.com
      - generic [ref=e10]:
        - generic [ref=e11]:
          - generic [ref=e12]: Password
          - link "Forgot password?" [ref=e13] [cursor=pointer]:
            - /url: "#"
        - textbox "Password" [ref=e14]: team123
      - generic [ref=e15]: Invalid login credentials
      - button "Sign in" [ref=e16]
    - generic [ref=e21]: Or continue with
    - button "Continue with Google" [ref=e22]:
      - img [ref=e23]
      - text: Continue with Google
  - button "Open Next.js Dev Tools" [ref=e32] [cursor=pointer]:
    - img [ref=e33]
  - alert [ref=e37]
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test.describe('Role Based Access Control (RBAC)', () => {
  4  |   
  5  |   test.describe('Admin User', () => {
  6  |     test.use({ storageState: 'e2e/.auth/admin.json' }); // Assumes pre-authenticated state, or we login in beforeEach
  7  |     
  8  |     test.beforeEach(async ({ page }) => {
  9  |       // Temporary login since we don't have global setup yet
  10 |       await page.goto('/login');
  11 |       await page.fill('input[type="email"]', 'admin@ikigai.com');
  12 |       await page.fill('input[type="password"]', 'admin123');
  13 |       await page.click('button[type="submit"]');
  14 |       await page.waitForURL(/.*workspace.*/);
  15 |     });
  16 | 
  17 |     test('should access admin dashboard', async ({ page }) => {
  18 |       await page.goto('/workspace/admin');
  19 |       await expect(page.locator('text=Admin Dashboard').first()).toBeVisible();
  20 |     });
  21 |   });
  22 | 
  23 |   test.describe('Regular Team Member User', () => {
  24 |     test.beforeEach(async ({ page }) => {
  25 |       await page.goto('/login');
  26 |       await page.fill('input[type="email"]', 'team@ikigai.com'); // seed user
  27 |       await page.fill('input[type="password"]', 'team123');
  28 |       await page.click('button[type="submit"]');
> 29 |       await page.waitForURL(/.*workspace.*/);
     |                  ^ Error: page.waitForURL: Test timeout of 30000ms exceeded.
  30 |     });
  31 | 
  32 |     test('should be denied access to admin dashboard (Privilege Escalation)', async ({ page }) => {
  33 |       await page.goto('/workspace/admin');
  34 |       
  35 |       // Should redirect or show unauthorized
  36 |       const isUnauthorized = await page.locator('text=Unauthorized').isVisible() 
  37 |                           || page.url().includes('/workspace') && !page.url().includes('admin');
  38 |                           
  39 |       expect(isUnauthorized).toBeTruthy();
  40 |     });
  41 |     
  42 |     test('should access team workspace', async ({ page }) => {
  43 |       await page.goto('/workspace');
  44 |       await expect(page.locator('text=My Team').first()).toBeVisible();
  45 |     });
  46 |   });
  47 | 
  48 |   test.describe('Mentor User', () => {
  49 |     test.beforeEach(async ({ page }) => {
  50 |       await page.goto('/login');
  51 |       await page.fill('input[type="email"]', 'mentor@ikigai.com'); // seed user
  52 |       await page.fill('input[type="password"]', 'mentor123');
  53 |       await page.click('button[type="submit"]');
  54 |       await page.waitForURL(/.*workspace.*/);
  55 |     });
  56 | 
  57 |     test('should access mentor dashboard but not admin', async ({ page }) => {
  58 |       await page.goto('/workspace/mentor');
  59 |       await expect(page.locator('text=Mentor Dashboard').first()).toBeVisible();
  60 | 
  61 |       await page.goto('/workspace/admin');
  62 |       const isUnauthorized = await page.locator('text=Unauthorized').isVisible() 
  63 |                           || page.url().includes('/workspace') && !page.url().includes('admin');
  64 |       expect(isUnauthorized).toBeTruthy();
  65 |     });
  66 |   });
  67 | 
  68 |   test.describe('Volunteer User', () => {
  69 |     test.beforeEach(async ({ page }) => {
  70 |       await page.goto('/login');
  71 |       await page.fill('input[type="email"]', 'volunteer@ikigai.com'); // seed user
  72 |       await page.fill('input[type="password"]', 'volunteer123');
  73 |       await page.click('button[type="submit"]');
  74 |       await page.waitForURL(/.*workspace.*/);
  75 |     });
  76 | 
  77 |     test('should access scanner but not mentor workspace', async ({ page }) => {
  78 |       await page.goto('/dev/event-operations'); // Using the dev playground path for QR scanner
  79 |       await expect(page.locator('text=Scanner').first()).toBeVisible();
  80 | 
  81 |       await page.goto('/workspace/mentor');
  82 |       const isUnauthorized = await page.locator('text=Unauthorized').isVisible() 
  83 |                           || page.url().includes('/workspace');
  84 |       expect(isUnauthorized).toBeTruthy();
  85 |     });
  86 |   });
  87 | });
  88 | 
```