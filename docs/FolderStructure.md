# Folder Structure

```
├── .github/workflows/    # CI/CD pipelines
├── __tests__/            # Core business logic tests (Vitest)
├── app/                  # Next.js App Router (Pages, Layouts, API Routes)
│   ├── (public)/         # Public marketing pages
│   ├── workspace/        # Protected application workspaces
│   └── dev/              # Development testing playgrounds
├── components/           # Reusable UI components (shadcn/ui based)
├── config/               # Project-wide configurations (e.g. event.config.ts)
├── features/             # Feature-based domain modules
│   ├── admin/
│   ├── authentication/
│   ├── evaluation/
│   ├── event-operations/
│   ├── leaderboard/
│   ├── live/
│   └── mentor/
├── lib/                  # Utility libraries (Supabase clients, classnames)
├── types/                # Global TypeScript definitions
└── docs/                 # Project documentation
```

### Philosophy
We organize by **Feature** rather than by **Layer**. A feature directory contains its own components, hooks, utilities, types, and services.
