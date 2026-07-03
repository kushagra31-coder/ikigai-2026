# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: crud.spec.ts >> CRUD Operations >> should allow creating and updating an announcement
- Location: e2e\crud.spec.ts:13:7

# Error details

```
Test timeout of 30000ms exceeded while running "beforeEach" hook.
```

```
Tearing down "context" exceeded the test timeout of 30000ms.
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
          - text: admin@ikigai.com
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
  - button "Open Next.js Dev Tools" [ref=e30] [cursor=pointer]:
    - img [ref=e31]
  - alert [ref=e34]
```