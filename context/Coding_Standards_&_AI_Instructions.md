# 21_Coding_Standards_&_AI_Instructions.md

# IKIGAI 2026

AI Development Rulebook

Version

1.0

Purpose

This document defines mandatory coding standards for every AI assistant and developer working on the project.

The AI must follow these instructions without exception.

---

# 1. Project Philosophy

This project is

Production Ready

Enterprise Grade

Feature Based

Type Safe

Reusable

Scalable

Maintainable

Every line of code should support future growth.

Never optimize for short code.

Optimize for readability.

---

# 2. Tech Stack

Framework

Next.js 15

Language

TypeScript

Styling

Tailwind CSS

UI Library

shadcn/ui

Animations

Framer Motion

GSAP

Backend

Supabase

Database

PostgreSQL

State

TanStack Query

Authentication

Supabase Auth

Realtime

Supabase Realtime

Storage

Supabase Storage

---

# 3. AI Rules

Never guess.

Never create placeholder logic.

Never invent APIs.

Never invent database tables.

Never hardcode values.

Never duplicate components.

Always ask before changing architecture.

---

# 4. Folder Rules

Every feature owns

components

hooks

services

types

utils

validators

constants

Never mix features.

---

# 5. Component Rules

One Component

↓

One Responsibility

Maximum

300 Lines

Split if larger.

---

# 6. Hook Rules

Hooks only contain

Business Logic

Never UI.

Never JSX.

---

# 7. Service Rules

Services only communicate with Supabase.

No JSX.

No UI.

No state.

---

# 8. Type Rules

Everything typed.

No any.

No unknown unless necessary.

Every API

Every Component

Every Hook

Every Service

Uses interfaces.

---

# 9. Styling Rules

Tailwind Only.

No Bootstrap.

No Material UI.

No Inline Styles.

No !important.

Use CSS variables.

---

# 10. Component Naming

Components

PascalCase

Example

LeaderboardTable

NotificationCard

TeamProfile

Hooks

camelCase

Example

useLeaderboard

useSubmission

Services

feature.service.ts

Example

leaderboard.service.ts

---

# 11. State Rules

Global

Authentication

Theme

Notifications

Realtime

Local

Inputs

Forms

Modal

Dropdown

Search

---

# 12. Forms

React Hook Form

+

Zod Validation

Always.

---

# 13. Validation

Client Validation

↓

Server Validation

↓

Database Constraint

Three levels.

---

# 14. Database

Never use

SELECT *

Always select required columns.

Always paginate.

Always index searchable fields.

---

# 15. Security

Never expose secrets.

Never trust frontend.

Always verify role.

Always validate uploads.

Always sanitize input.

Always enable RLS.

---

# 16. Error Handling

Every async function

try

↓

catch

↓

Toast

↓

Log

↓

Retry

Never fail silently.

---

# 17. Loading States

Every request

Skeleton

↓

Loading

↓

Success

↓

Error

Never blank screens.

---

# 18. Animations

Landing

Premium

Dashboard

Minimal

Animation must improve UX.

Not decoration.

---

# 19. Accessibility

ARIA

Keyboard

Reduced Motion

Contrast

Labels

Always.

---

# 20. Performance

Server Components

First

Client Components

Only if needed

Lazy Loading

Dynamic Imports

Memoization

Image Optimization

---

# 21. API Rules

Never call Supabase directly from UI.

Always

UI

↓

Hook

↓

Service

↓

Supabase

---

# 22. Database Rules

Never duplicate data.

Normalize.

Use UUID.

Use Foreign Keys.

Use Constraints.

---

# 23. Logging

Every critical action

↓

Activity Log

Login

Submission

Evaluation

Announcement

Settings

Leaderboard

---

# 24. Notifications

Realtime

No polling.

Browser Notification

Optional

Activity Feed

Persistent

---

# 25. Leaderboard

Never manually edit scores.

Calculate automatically.

Realtime updates only.

Store evaluation history.

---

# 26. Testing

Every feature

Unit Tested

Every page

Responsive

Every form

Validated

---

# 27. Git Rules

Feature Branch

↓

Pull Request

↓

Review

↓

Merge

Never push directly to main.

---

# 28. Code Review

Readable

Typed

Reusable

Secure

Responsive

Accessible

Optimized

---

# 29. Documentation

Every exported function

JSDoc

Every complex algorithm

Comment

Explain WHY

Not WHAT

---

# 30. AI Prompt Rules

When generating code

Read project architecture first.

Read feature documentation first.

Generate complete files.

Do not generate placeholders.

Do not skip validation.

Do not skip loading states.

Do not skip error handling.

Do not invent features outside documentation.

---

# 31. Forbidden Practices

❌ any

❌ inline CSS

❌ duplicate components

❌ duplicate logic

❌ nested callbacks

❌ hardcoded URLs

❌ console.log in production

❌ magic numbers

❌ SQL inside components

❌ direct database access from UI

---

# 32. Required Practices

✅ TypeScript

✅ Feature Architecture

✅ Tailwind

✅ Reusable Components

✅ Reusable Hooks

✅ Services

✅ Validation

✅ Responsive

✅ Accessible

✅ Secure

---

# 33. Definition of Done

Every feature is complete only if

✓ Works

✓ Responsive

✓ Typed

✓ Secure

✓ Accessible

✓ Tested

✓ Documented

✓ Optimized

✓ Production Ready

---

# 34. AI Final Checklist

Before completing any task, verify:

□ No TypeScript errors

□ No ESLint errors

□ Mobile responsive

□ Loading state exists

□ Error state exists

□ Empty state exists

□ Accessibility checked

□ Dark theme supported

□ Reusable components used

□ No duplicated code

□ Uses project architecture

□ Uses documented database schema

□ Uses documented API layer

□ Uses correct naming conventions

---

End of Document