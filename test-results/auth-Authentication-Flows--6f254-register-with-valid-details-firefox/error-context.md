# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: auth.spec.ts >> Authentication Flows >> should allow a user to register with valid details
- Location: e2e\auth.spec.ts:4:7

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: page.fill: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('input[placeholder*="Name" i]')

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
        - textbox "Email" [ref=e9]:
          - /placeholder: m@example.com
          - text: testuser_1783084811529@example.com
      - generic [ref=e10]:
        - generic [ref=e11]:
          - generic [ref=e12]: Password
          - link "Forgot password?" [ref=e13] [cursor=pointer]:
            - /url: "#"
        - textbox "Password" [active] [ref=e14]: SecurePassword123!
      - button "Sign in" [ref=e15]
    - generic [ref=e20]: Or continue with
    - button "Continue with Google" [ref=e21]:
      - img [ref=e22]
      - text: Continue with Google
  - button "Open Next.js Dev Tools" [ref=e31] [cursor=pointer]:
    - generic [ref=e34]:
      - text: Compiling
      - generic [ref=e35]:
        - generic [ref=e36]: .
        - generic [ref=e37]: .
        - generic [ref=e38]: .
  - alert [ref=e39]
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test.describe('Authentication Flows', () => {
  4  |   test('should allow a user to register with valid details', async ({ page }) => {
  5  |     // Navigate to register page
  6  |     await page.goto('/login');
  7  |     // For our app, login/register might be the same UI or have a toggle
  8  |     // This assumes there's a sign up toggle/tab
  9  |     const signUpTab = page.locator('button', { hasText: /Sign Up/i });
  10 |     if (await signUpTab.isVisible()) {
  11 |       await signUpTab.click();
  12 |     }
  13 |     
  14 |     const testEmail = `testuser_${Date.now()}@example.com`;
  15 |     
  16 |     // Assuming form fields exist based on previous stages
  17 |     await page.fill('input[type="email"]', testEmail);
  18 |     await page.fill('input[type="password"]', 'SecurePassword123!');
> 19 |     await page.fill('input[placeholder*="Name" i]', 'Test User');
     |                ^ Error: page.fill: Test timeout of 30000ms exceeded.
  20 |     
  21 |     await page.click('button[type="submit"]');
  22 | 
  23 |     // Should redirect to dashboard or show confirmation
  24 |     await expect(page).toHaveURL(/.*workspace.*/);
  25 |     
  26 |     // Logout
  27 |     await page.click('button:has-text("Logout")');
  28 |     await expect(page).toHaveURL('/login');
  29 |   });
  30 | 
  31 |   test('should fail login with invalid credentials', async ({ page }) => {
  32 |     await page.goto('/login');
  33 |     
  34 |     await page.fill('input[type="email"]', 'wrong@example.com');
  35 |     await page.fill('input[type="password"]', 'WrongPass123!');
  36 |     
  37 |     await page.click('button[type="submit"]');
  38 | 
  39 |     // Expect an error message
  40 |     const errorMsg = page.locator('text=Invalid login credentials');
  41 |     await expect(errorMsg).toBeVisible();
  42 |   });
  43 | 
  44 |   test('should allow login with valid credentials', async ({ page }) => {
  45 |     await page.goto('/login');
  46 |     
  47 |     // In a real environment, we use a seeded user.
  48 |     // For testing, we can use standard seed credentials if known, or register first.
  49 |     // Assuming 'admin@ikigai.com' exists in seed.
  50 |     await page.fill('input[type="email"]', 'admin@ikigai.com');
  51 |     await page.fill('input[type="password"]', 'admin123'); // Example seeded password
  52 |     
  53 |     await page.click('button[type="submit"]');
  54 | 
  55 |     await expect(page).toHaveURL(/.*workspace.*/);
  56 |   });
  57 | 
  58 |   test('should redirect unauthorized users to login', async ({ page }) => {
  59 |     await page.goto('/workspace');
  60 |     await expect(page).toHaveURL(/.*login.*/);
  61 |   });
  62 | });
  63 | 
```