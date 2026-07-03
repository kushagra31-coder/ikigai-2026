import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { IS_MOCKED } from './is-mocked';

export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    IS_MOCKED ? 'https://mock.supabase.co' : process.env.NEXT_PUBLIC_SUPABASE_URL!,
    IS_MOCKED ? 'mock-key' : process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options);
            });
          } catch {
            // The `set` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  );
}
