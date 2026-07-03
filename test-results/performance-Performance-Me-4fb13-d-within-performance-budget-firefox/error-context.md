# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: performance.spec.ts >> Performance Metrics >> Dashboard should load within performance budget
- Location: e2e\performance.spec.ts:4:7

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
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test.describe('Performance Metrics', () => {
  4  |   test('Dashboard should load within performance budget', async ({ page }) => {
  5  |     await page.goto('/login');
  6  |     await page.fill('input[type="email"]', 'admin@ikigai.com');
  7  |     await page.fill('input[type="password"]', 'admin123');
  8  |     
  9  |     // Start timing
  10 |     const startTime = Date.now();
  11 |     await page.click('button[type="submit"]');
  12 |     
  13 |     // Wait for the workspace to fully load (e.g. wait for a key element)
> 14 |     await page.waitForURL(/.*workspace.*/);
     |                ^ Error: page.waitForURL: Test timeout of 30000ms exceeded.
  15 |     const dashboardElement = page.locator('text=Dashboard').first();
  16 |     await expect(dashboardElement).toBeVisible();
  17 |     
  18 |     const loadTime = Date.now() - startTime;
  19 |     console.log(`Dashboard load time: ${loadTime}ms`);
  20 |     
  21 |     // Assuming a 3000ms budget for initial E2E load
  22 |     expect(loadTime).toBeLessThan(3000);
  23 |   });
  24 | });
  25 | 
```