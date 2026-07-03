# Developer Guide

## Local Setup
1. Clone the repository.
2. Run `npm install`.
3. Ensure `.env.local` is configured with Supabase credentials.
4. Run `npm run dev` to start the development server.

## Adding Features
- All new features must be placed in the `features/` directory.
- Define your types in `features/[name]/types.ts`.
- Mock repository layers should be placed in `features/[name]/repository`.
- Build UI components in `features/[name]/components`.

## Guidelines
- Avoid defining generic types in component files.
- Prefer Server Actions over API Routes for mutations.
- Adhere to the `EVENT_CONFIG` as the single source of truth.
