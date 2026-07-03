# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: error-handling.spec.ts >> Error Handling & Network Interruptions >> should display offline indicator when network drops
- Location: e2e\error-handling.spec.ts:4:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('text=network|offline|failed to fetch').first()
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for locator('text=network|offline|failed to fetch').first()

```

```yaml
- heading "Welcome back" [level=1]
- paragraph: Sign in to your IKIGAI 2026 account
- text: Email
- textbox "Email":
  - /placeholder: m@example.com
  - text: admin@ikigai.com
- text: Password
- link "Forgot password?":
  - /url: "#"
- textbox "Password": admin123
- text: Failed to fetch
- button "Sign in"
- text: Or continue with
- button "Continue with Google"
- alert
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test.describe('Error Handling & Network Interruptions', () => {
  4  |   test('should display offline indicator when network drops', async ({ page, context }) => {
  5  |     // Go to login page first to set context
  6  |     await page.goto('/login');
  7  |     
  8  |     // Disable network
  9  |     await context.setOffline(true);
  10 |     
  11 |     // Depending on application logic, it might show a banner or handle offline states
  12 |     // For this E2E, we'll try to submit a form offline and expect a network error message
  13 |     await page.fill('input[type="email"]', 'admin@ikigai.com');
  14 |     await page.fill('input[type="password"]', 'admin123');
  15 |     await page.click('button[type="submit"]');
  16 | 
  17 |     // Look for generic offline / network error message
  18 |     const errorMsg = page.locator('text=network|offline|failed to fetch', { ignoreCase: true }).first();
> 19 |     await expect(errorMsg).toBeVisible();
     |                            ^ Error: expect(locator).toBeVisible() failed
  20 | 
  21 |     // Re-enable to clean up
  22 |     await context.setOffline(false);
  23 |   });
  24 | 
  25 |   test('should handle Supabase 500 API errors gracefully', async ({ page }) => {
  26 |     // Mock the Supabase Auth API to return 500
  27 |     await page.route('**/auth/v1/token?grant_type=password', route => {
  28 |       route.fulfill({
  29 |         status: 500,
  30 |         contentType: 'application/json',
  31 |         body: JSON.stringify({ message: 'Internal Server Error' })
  32 |       });
  33 |     });
  34 | 
  35 |     await page.goto('/login');
  36 |     await page.fill('input[type="email"]', 'admin@ikigai.com');
  37 |     await page.fill('input[type="password"]', 'admin123');
  38 |     await page.click('button[type="submit"]');
  39 | 
  40 |     // Should show error boundary or toast rather than crashing
  41 |     const errorAlert = page.locator('text=Internal Server Error').first();
  42 |     await expect(errorAlert).toBeVisible();
  43 |   });
  44 | });
  45 | 
```