# Deployment Guide

## Production Environment
We use Vercel for production deployments.

### Automatic Vercel Deployment
1. Connect the GitHub repository to a Vercel project.
2. Set the Framework Preset to Next.js.
3. Configure the Environment Variables in the Vercel dashboard.
4. Any push to `main` triggers a production deployment.

## CI/CD Pipeline
We use GitHub Actions for Continuous Integration.
The workflow is defined in `.github/workflows/ci.yml`.

### Pipeline Steps:
1. **Checkout**: Pulls the repository.
2. **Setup**: Installs Node 20.
3. **Install**: Runs `npm ci`.
4. **Typecheck**: Validates TypeScript (`npx tsc --noEmit`).
5. **Lint**: Runs ESLint.
6. **Test**: Executes Vitest suite.
7. **Build**: Tests the Next.js production build (`npm run build`).

A PR cannot be merged into `main` unless the CI pipeline succeeds.
