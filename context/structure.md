# 14_Project_Folder_Structure.md

# IKIGAI 2026

Project Structure

Version 1.0

Framework

Next.js 15 (App Router)

Language

TypeScript

Architecture

Feature Based

---

# 1. Philosophy

The project must be

• Modular

• Scalable

• Feature Oriented

• Easy to Navigate

• Easy to Test

• Easy to Maintain

No folder should become larger than necessary.

Every feature owns its own components, hooks, services and types.

---

# 2. Root Structure

ikigai-2026/

│

├── app/

├── features/

├── components/

├── lib/

├── hooks/

├── types/

├── styles/

├── public/

├── middleware.ts

├── utils/

├── constants/

├── config/

├── docs/

├── scripts/

├── tests/

├── package.json

├── tsconfig.json

├── next.config.ts

├── tailwind.config.ts

├── eslint.config.js

├── prettier.config.js

└── README.md

---

# 3. app/

Contains routing only.

No business logic.

Example

app/

layout.tsx

page.tsx

loading.tsx

error.tsx

not-found.tsx

about/

leaderboard/

login/

register/

team/

mentor/

admin/

---

# 4. Route Groups

app/

(public)/

(auth)/

(team)/

(mentor)/

(admin)/

Separate layouts for each group.

---

# 5. features/

Each feature owns itself.

features/

authentication/

leaderboard/

team/

mentor/

admin/

tracks/

submissions/

notifications/

announcements/

tasks/

sponsors/

results/

dashboard/

settings/

Each folder contains

components/

hooks/

services/

types/

utils/

constants/

validators/

---

# 6. Example Feature

leaderboard/

components/

LeaderboardTable.tsx

LeaderboardRow.tsx

RankBadge.tsx

TrackTabs.tsx

SearchBar.tsx

FilterMenu.tsx

hooks/

useLeaderboard.ts

services/

leaderboard.service.ts

types/

leaderboard.types.ts

utils/

ranking.ts

constants/

leaderboard.constants.ts

validators/

leaderboard.schema.ts

---

# 7. Shared Components

components/

Contains reusable UI only.

Button

Input

Modal

Card

Dialog

Table

Avatar

Badge

Toast

Spinner

Navbar

Footer

Sidebar

Never store business logic here.

---

# 8. lib/

Contains third-party configurations.

Supabase Client

Query Client

Theme Provider

Providers

Utilities

---

# 9. hooks/

Global hooks only.

Example

useTheme

useMediaQuery

useDebounce

useWindowSize

Feature-specific hooks stay inside their feature.

---

# 10. utils/

Pure helper functions.

Example

Date Formatter

Time Formatter

File Formatter

String Helpers

Validators

No React code.

---

# 11. constants/

Contains

Routes

Roles

Colors

Limits

Messages

Config

Nothing dynamic.

---

# 12. config/

Environment configuration.

Site Metadata

SEO

Navigation

Feature Flags

App Settings

---

# 13. public/

Images

Logos

Icons

Fonts

Sponsors

OG Images

Robots.txt

Manifest

Favicon

---

# 14. styles/

globals.css

animations.css

theme.css

No component-specific styles.

Tailwind first.

---

# 15. types/

Global TypeScript interfaces.

User

Team

Mentor

Notification

Announcement

Track

Leaderboard

---

# 16. middleware.ts

Authentication

Role Protection

Redirects

Session Validation

Logging

---

# 17. tests/

Unit

Integration

E2E

Future

Playwright

Vitest

---

# 18. scripts/

Database Seed

Migration Helpers

Build Helpers

Cleanup Scripts

Import Tools

---

# 19. docs/

Contains all documentation.

Architecture

API

Database

Deployment

Future Plans

---

# 20. Naming Convention

Folders

lowercase

Components

PascalCase

Hooks

camelCase

Types

PascalCase

Interfaces

PascalCase

Enums

PascalCase

Constants

UPPER_CASE

---

# 21. Import Order

External Packages

↓

Internal Packages

↓

Components

↓

Hooks

↓

Types

↓

Styles

↓

Assets

Always consistent.

---

# 22. File Naming

LeaderboardTable.tsx

useLeaderboard.ts

leaderboard.service.ts

leaderboard.types.ts

leaderboard.utils.ts

leaderboard.constants.ts

leaderboard.schema.ts

Never abbreviate filenames.

---

# 23. Code Rules

One Component

One Responsibility

Maximum

300 Lines

Split if larger.

Hooks

Maximum

200 Lines

Services

Small

Focused

Reusable

---

# 24. Environment Variables

.env.local

Contains

SUPABASE_URL

SUPABASE_ANON_KEY

NEXT_PUBLIC_SITE_URL

GOOGLE_CLIENT_ID

Never commit secrets.

---

# 25. Git Branch Strategy

main

Production

develop

Development

feature/

New Features

fix/

Bug Fixes

hotfix/

Critical Fixes

release/

Release Candidate

---

# 26. Commit Format

feat:

fix:

refactor:

style:

docs:

test:

perf:

Example

feat: add leaderboard realtime updates

---

# 27. Build Pipeline

Developer

↓

GitHub

↓

Pull Request

↓

Review

↓

Merge

↓

Deploy

↓

Vercel

---

# 28. Performance Rules

Dynamic Imports

Lazy Components

Code Splitting

Server Components

Caching

Image Optimization

No unnecessary renders.

---

# 29. Security Rules

No secrets inside code.

No direct SQL.

Use RLS.

Validate inputs.

Sanitize outputs.

Role verification everywhere.

---

# 30. Success Criteria

✓ Easy navigation

✓ Production ready

✓ Highly scalable

✓ Easy onboarding

✓ Feature isolation

✓ Maintainable for years

---

End of Document