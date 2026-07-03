# Environment Variables

You must define the following variables in `.env.local` for development and in your hosting provider for production.

```env
# Supabase Integration
NEXT_PUBLIC_SUPABASE_URL="https://[YOUR_PROJECT_ID].supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key"

# SEO / Application Settings
NEXT_PUBLIC_SITE_URL="http://localhost:3000" # Change to production domain
```

> [!WARNING]
> Do not expose `SUPABASE_SERVICE_ROLE_KEY` to the client prefix (`NEXT_PUBLIC_`). Keep secret keys securely in the server environment.
