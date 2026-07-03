# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: accessibility.spec.ts >> Accessibility (a11y) >> public pages should have no automatically detectable accessibility violations
- Location: e2e\accessibility.spec.ts:5:7

# Error details

```
Error: expect(received).toEqual(expected) // deep equality

- Expected  -   1
+ Received  + 138

- Array []
+ Array [
+   Object {
+     "description": "Ensure the document has a main landmark",
+     "help": "Document should have one main landmark",
+     "helpUrl": "https://dequeuniversity.com/rules/axe/4.12/landmark-one-main?application=playwright",
+     "id": "landmark-one-main",
+     "impact": "moderate",
+     "nodes": Array [
+       Object {
+         "all": Array [
+           Object {
+             "data": null,
+             "id": "page-has-main",
+             "impact": "moderate",
+             "message": "Document does not have a main landmark",
+             "relatedNodes": Array [],
+           },
+         ],
+         "any": Array [],
+         "failureSummary": "Fix all of the following:
+   Document does not have a main landmark",
+         "html": "<html lang=\"en\" class=\"dark\">",
+         "impact": "moderate",
+         "none": Array [],
+         "target": Array [
+           "html",
+         ],
+       },
+     ],
+     "tags": Array [
+       "cat.semantics",
+       "best-practice",
+     ],
+   },
+   Object {
+     "description": "Ensure all page content is contained by landmarks",
+     "help": "All page content should be contained by landmarks",
+     "helpUrl": "https://dequeuniversity.com/rules/axe/4.12/region?application=playwright",
+     "id": "region",
+     "impact": "moderate",
+     "nodes": Array [
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": Object {
+               "isIframe": false,
+             },
+             "id": "region",
+             "impact": "moderate",
+             "message": "Some page content is not contained by landmarks",
+             "relatedNodes": Array [],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Some page content is not contained by landmarks",
+         "html": "<div class=\"space-y-2 text-center\"><h1 class=\"text-3xl font-bold tracking-tight\">Welcome back</h1><p class=\"text-muted-foreground\">Sign in to your IKIGAI 2026 account</p></div>",
+         "impact": "moderate",
+         "none": Array [],
+         "target": Array [
+           ".text-center",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": Object {
+               "isIframe": false,
+             },
+             "id": "region",
+             "impact": "moderate",
+             "message": "Some page content is not contained by landmarks",
+             "relatedNodes": Array [],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Some page content is not contained by landmarks",
+         "html": "<div class=\"space-y-2\">",
+         "impact": "moderate",
+         "none": Array [],
+         "target": Array [
+           "form > .space-y-2:nth-child(1)",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": Object {
+               "isIframe": false,
+             },
+             "id": "region",
+             "impact": "moderate",
+             "message": "Some page content is not contained by landmarks",
+             "relatedNodes": Array [],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Some page content is not contained by landmarks",
+         "html": "<div class=\"space-y-2\">",
+         "impact": "moderate",
+         "none": Array [],
+         "target": Array [
+           ".space-y-2:nth-child(2)",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": Object {
+               "isIframe": false,
+             },
+             "id": "region",
+             "impact": "moderate",
+             "message": "Some page content is not contained by landmarks",
+             "relatedNodes": Array [],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Some page content is not contained by landmarks",
+         "html": "<div class=\"relative\"><div class=\"absolute inset-0 flex items-center\"><span class=\"w-full border-t\"></span></div><div class=\"relative flex justify-center text-xs uppercase\"><span class=\"bg-background px-2 text-muted-foreground\">Or continue with</span></div></div>",
+         "impact": "moderate",
+         "none": Array [],
+         "target": Array [
+           ".max-w-md > .relative",
+         ],
+       },
+     ],
+     "tags": Array [
+       "cat.keyboard",
+       "best-practice",
+       "RGAAv4",
+       "RGAA-9.2.1",
+     ],
+   },
+ ]
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
  2  | import AxeBuilder from '@axe-core/playwright';
  3  | 
  4  | test.describe('Accessibility (a11y)', () => {
  5  |   test('public pages should have no automatically detectable accessibility violations', async ({ page }) => {
  6  |     const urls = ['/login', '/', '/faq', '/sponsors', '/timeline', '/tracks'];
  7  |     for (const url of urls) {
  8  |       await page.goto(url);
  9  |       const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
> 10 |       expect(accessibilityScanResults.violations).toEqual([]);
     |                                                   ^ Error: expect(received).toEqual(expected) // deep equality
  11 |     }
  12 |   });
  13 | 
  14 |   test('workspace pages should have no automatically detectable accessibility violations', async ({ page }) => {
  15 |     // Login as Admin to access workspace
  16 |     await page.goto('/login');
  17 |     await page.fill('input[type="email"]', 'admin@ikigai.com');
  18 |     await page.fill('input[type="password"]', 'admin123');
  19 |     await page.click('button[type="submit"]');
  20 |     await page.waitForURL(/.*workspace.*/);
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