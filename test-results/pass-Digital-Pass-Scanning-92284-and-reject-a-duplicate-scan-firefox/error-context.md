# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: pass.spec.ts >> Digital Pass & Scanning >> should accept a valid pass and reject a duplicate scan
- Location: e2e\pass.spec.ts:16:7

# Error details

```
Test timeout of 30000ms exceeded while running "beforeEach" hook.
```

```
Error: page.fill: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('input[type="email"]')

```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test.describe('Digital Pass & Scanning', () => {
  4  |   test.beforeEach(async ({ page }) => {
  5  |     // Authenticate as a Volunteer
  6  |     await page.goto('/login');
> 7  |     await page.fill('input[type="email"]', 'volunteer@ikigai.com');
     |                ^ Error: page.fill: Test timeout of 30000ms exceeded.
  8  |     await page.fill('input[type="password"]', 'volunteer123');
  9  |     await page.click('button[type="submit"]');
  10 |     await page.waitForURL(/.*workspace.*/);
  11 |     
  12 |     // Navigate to the scanner interface
  13 |     await page.goto('/dev/event-operations');
  14 |   });
  15 | 
  16 |   test('should accept a valid pass and reject a duplicate scan', async ({ page }) => {
  17 |     // In our event operations UI, there's likely a text input to simulate a QR scan
  18 |     const simulateInput = page.locator('input[placeholder="Enter Pass ID"]');
  19 |     if (await simulateInput.isVisible()) {
  20 |         const passId = '123e4567-e89b-12d3-a456-426614174000'; // Example UUID
  21 |         await simulateInput.fill(passId);
  22 |         await page.click('button:has-text("Scan")');
  23 |         
  24 |         // Wait for result
  25 |         // For E2E this might fail since we don't have a specific seeded pass ID, 
  26 |         // but we're testing the UI behavior.
  27 |         const result = page.locator('text=success');
  28 |         const errResult = page.locator('text=Invalid pass');
  29 |         
  30 |         // Let's assume it works or fails cleanly
  31 |         // Then we scan again
  32 |         await simulateInput.fill(passId);
  33 |         await page.click('button:has-text("Scan")');
  34 |         await expect(page.locator('text=Duplicate').first()).toBeVisible();
  35 |     }
  36 |   });
  37 | });
  38 | 
```