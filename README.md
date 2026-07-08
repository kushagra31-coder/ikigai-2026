# IKIGAI 2026 - Hackathon Platform

The official digital platform for **IKIGAI 2026**, a National-level Hackathon organized by Acropolis Institute of Technology and Research (AITR), Indore.

## Features
- **Dynamic Leaderboard**: Realtime ranking and tie-breaking engine.
- **Evaluation Engine**: Complex scoring algorithms based on official grading criteria.
- **Live Event System**: Realtime activity feeds and unified event pub/sub.
- **Digital Event Operations**: Secure QR generation, Offline-first volunteer scanning, and cryptographic checksum validation.
- **Role-Based Workspaces**: Specialized dashboards for Admins, Mentors, Volunteers, and Teams.

## Getting Started
Please see the /docs directory for comprehensive guides on Architecture, Deployment, Security, and usage.

### Environment Setup
This project requires Supabase configuration to run properly. Otherwise, it will run in mock mode and might throw runtime errors during authentication flows.

1. Copy the example environment file:
   \\\ash
   cp .env.example .env.local
   \\\
2. Fill in your Supabase credentials in \.env.local\:
   \\\env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   \\\

### Installation & Execution
- \
pm install\
- \
pm run dev\

## Production Ready
This project has undergone rigorous Security, Performance, and Accessibility audits (Phase 16). Code is fortified with strict typing, Vitest suites, and GitHub Actions CI pipelines.