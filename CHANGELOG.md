# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-07-03
### Added
- Complete architecture for IKIGAI 2026 platform.
- Modular configuration system (`config/`) for driving all UI components.
- Single Source of Truth architecture.
- Full UI components including Hero, About, Tracks, Timeline, Sponsors, Leadership, Downloads, Rulebook, FAQ, and Contact.
- Dynamic Metadata and JSON-LD SEO optimizations.
- Zod validations for configuration integrity.
- Supabase SSR fallback mechanism for robust static builds.

### Changed
- All placeholder components and content replaced with official IKIGAI 2026 event data via the configuration layer.
- `public-content.ts` mapped to `IKIGAI2026_CONFIG`.
