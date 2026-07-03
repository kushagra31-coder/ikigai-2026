# Testing Guide

The IKIGAI platform relies on **Vitest** for core business logic testing.

## Running Tests
- `npm run test`: Runs the test suite in watch mode.

## Test Scope
We focus unit testing on pure functions and deterministic core logic:
- `scoreCalculator`
- `rankingEngine`
- `tieBreaker`
- `qrValidator`
- `scanEngine`

UI components are manually tested alongside strict Accessibility audits. E2E testing (Playwright) architecture is planned for future phases.
