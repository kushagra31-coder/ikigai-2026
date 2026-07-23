import { IS_MOCKED } from '@/lib/supabase/is-mocked';

// ─── Mock Store ────────────────────────────────────────────────────────────────
// Tracks whether the user has deliberately logged out in mock mode.
// Uses localStorage so it survives hot-reloads but resets on full page refresh.
const MOCK_USER = { id: 'mock-user-1', email: 'demo@ikigai2026.com' };

function isMockLoggedOut(): boolean {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem('mock_logged_out') === 'true';
}

function setMockLoggedOut(val: boolean) {
  if (typeof window === 'undefined') return;
  if (val) {
    localStorage.setItem('mock_logged_out', 'true');
  } else {
    localStorage.removeItem('mock_logged_out');
  }
}

// ─── Auth Service ──────────────────────────────────────────────────────────────
export const AuthService = {
  /**
   * Returns true when Supabase is not configured (no .env.local).
   * Evaluated from the module-level constant so Turbopack inlines it correctly.
   */
  isMocked(): boolean {
    return IS_MOCKED;
  },

  async signInWithGoogle(): Promise<unknown> {
    if (IS_MOCKED) {
      await new Promise(r => setTimeout(r, 600));
      setMockLoggedOut(false);
      return { user: MOCK_USER };
    }
    const { createClient } = await import('@/lib/supabase/client');
    const supabase = createClient();
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || window.location.origin}/callback`,
      },
    });
    if (error) throw error;
    return data;
  },

  async signOut() {
    if (IS_MOCKED) {
      setMockLoggedOut(true);
      return;
    }
    const { createClient } = await import('@/lib/supabase/client');
    const supabase = createClient();
    await supabase.auth.signOut();
  },

  async getSession() {
    if (IS_MOCKED) {
      if (isMockLoggedOut()) return null;
      return {
        user: MOCK_USER,
        access_token: 'mock-access-token',
      };
    }
    const { createClient } = await import('@/lib/supabase/client');
    const supabase = createClient();
    const { data: { session }, error } = await supabase.auth.getSession();
    if (error) throw error;
    return session;
  },
};
