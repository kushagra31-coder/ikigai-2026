import { createBrowserClient } from '@supabase/ssr';
import { IS_MOCKED } from './is-mocked';

export function createClient() {
  return createBrowserClient(
    IS_MOCKED ? 'https://mock.supabase.co' : process.env.NEXT_PUBLIC_SUPABASE_URL!,
    IS_MOCKED ? 'mock-key' : process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
