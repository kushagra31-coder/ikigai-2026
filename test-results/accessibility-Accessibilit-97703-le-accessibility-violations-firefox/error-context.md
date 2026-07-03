# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: accessibility.spec.ts >> Accessibility (a11y) >> workspace pages should have no automatically detectable accessibility violations
- Location: e2e\accessibility.spec.ts:14:7

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
  - button "Open Next.js Dev Tools" [ref=e32] [cursor=pointer]:
    - generic [ref=e35]:
      - text: Compiling
      - generic [ref=e36]:
        - generic [ref=e37]: .
        - generic [ref=e38]: .
        - generic [ref=e39]: .
  - alert [ref=e40]
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | import AxeBuilder from '@axe-core/playwright';
  3  | 
  4  | test.describe('Accessibility (a11y)', () => {
  5  |   test('public pages should have no automatically detectable accessibility violations', async ({ page }) => {
  6  |     const urls = ['/login', '/', '/faq', '/sponsors', '/timeline', '/tracks'];
  7  |     for (const url of urls) {
  8  |       await page.goto(url);
  9  |       const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
  10 |       expect(accessibilityScanResults.violations).toEqual([]);
  11 |     }
  12 |   });
  13 | 
  14 |   test('workspace pages should have no automatically detectable accessibility violations', async ({ page }) => {
  15 |     // Login as Admin to access workspace
  16 |     await page.goto('/login');
  17 |     await page.fill('input[type="email"]', 'admin@ikigai.com');
  18 |     await page.fill('input[type="password"]', 'admin123');
  19 |     await page.click('button[type="submit"]');
> 20 |     await page.waitForURL(/.*workspace.*/);
     |                ^ Error: page.waitForURL: Test timeout of 30000ms exceeded.
  21 | 
  22 |     const urls = ['/workspace/admin', '/workspace/profile', '/workspace/tasks'];
  23 |     for (const url of urls) {
  24 |       await page.goto(url);
  25 |       const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
  26 |       expect(accessibilityScanResults.violations).toEqual([]);
  27 |     }
  28 |   });
  29 | });
  30 | 
```