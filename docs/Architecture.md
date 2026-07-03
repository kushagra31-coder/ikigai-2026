# Architecture Overview

## Technology Stack
- **Framework**: Next.js 16.2.10 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4, Framer Motion
- **Database/Auth**: Supabase
- **State Management**: React Query, Zustand (where needed), Context API
- **Testing**: Vitest, React Testing Library

## Core Principles
1. **Feature-Driven Architecture**: The codebase is split into domain-specific features (`features/`) instead of technical layers.
2. **Server-First Execution**: Default to React Server Components. Client components are pushed to the leaves.
3. **Single Source of Truth**: All event configuration originates from `config/event.config.ts`.

## Domain Modules
- **Authentication**: Handles Supabase Auth, RBAC, and middleware redirection.
- **Evaluation Engine**: Dynamic multi-criterion scoring mechanism (`scoreCalculator`).
- **Leaderboard Engine**: Calculates ranks, handles ties, and builds views (`rankingEngine`, `leaderboardBuilder`).
- **Live Event System**: Realtime pub/sub layer using a custom `EventBus` ready for Supabase Realtime integration.
- **Digital Event Operations**: QR parsing, validation, scan logic, and offline capabilities.
