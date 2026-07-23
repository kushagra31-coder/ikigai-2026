 
 
import { describe, it, expect, vi } from 'vitest';
import { AuthService } from '../features/authentication/services/auth.service';

vi.mock('@/lib/supabase/client', () => {
  return {
    createClient: () => ({
      auth: {
        signInWithPassword: vi.fn().mockResolvedValue({ data: { user: { id: 'u1' } }, error: null }),
        signUp: vi.fn().mockResolvedValue({ data: { user: { id: 'u2' } }, error: null }),
        signOut: vi.fn().mockResolvedValue({ error: null }),
        resetPasswordForEmail: vi.fn().mockResolvedValue({ error: null }),
        updateUser: vi.fn().mockResolvedValue({ error: null }),
        getSession: vi.fn().mockResolvedValue({ data: { session: { access_token: 'abc' } }, error: null }),
      }
    })
  };
});

describe('AuthService', () => {
  it('signInWithEmail calls supabase auth', async () => {
    const result = await AuthService.signInWithEmail('test@test.com', 'password') as any;
    expect(result.user!.id).toBe('u1');
  });

  it('signUpWithEmail passes metadata correctly', async () => {
    const result = await AuthService.signUpWithEmail('test@test.com', 'password', 'Test User') as any;
    expect(result.user!.id).toBe('u2');
  });

  it('getSession returns session', async () => {
    const session = await AuthService.getSession();
    expect(session!.access_token).toBe('abc');
  });
});
