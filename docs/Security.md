# Security Protocol

## Authentication
- Uses Supabase Auth (JWT).
- Protected routes enforced via Next.js `middleware.ts`.

## Role-Based Access Control (RBAC)
- Five tiers: `SUPER_ADMIN`, `ADMIN`, `MENTOR`, `VOLUNTEER`, `USER`.
- Defined in `features/authentication/utils/permissionMatrix.ts`.

## Event Operations Security
- QR Codes contain a cryptographic checksum (`cryptoUtils`).
- Tampered payloads are rejected instantly.
- Expiration limits applied (e.g., 7 days).
- Duplicate scans at Checkpoints are blocked (e.g., double lunches).
- Blocked passes (`status: BLOCKED`) cannot be scanned.

## Data Security
- Row Level Security (RLS) is applied to all Supabase tables.
- Server Actions always verify user session via `getSession()` before mutating data.
- Input validation enforced by `Zod` on all API endpoints and forms.
