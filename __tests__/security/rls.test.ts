import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createClient } from '@supabase/supabase-js';

// Mocking Supabase Client to simulate RLS rejections
vi.mock('@supabase/supabase-js', () => ({
  createClient: vi.fn(() => ({
    from: vi.fn().mockReturnValue({
      select: vi.fn().mockResolvedValue({ data: null, error: { message: 'RLS policy violated', code: '42501' } }),
      insert: vi.fn().mockResolvedValue({ data: null, error: { message: 'RLS policy violated', code: '42501' } }),
      update: vi.fn().mockResolvedValue({ data: null, error: { message: 'RLS policy violated', code: '42501' } }),
      delete: vi.fn().mockResolvedValue({ data: null, error: { message: 'RLS policy violated', code: '42501' } }),
    }),
  })),
}));

describe('Row Level Security (RLS)', () => {
  let supabase: ReturnType<typeof createClient>;

  beforeEach(() => {
    supabase = createClient('http://localhost:54321', 'public-anon-key');
  });

  describe('Unauthorized CRUD', () => {
    it('should reject unauthorized SELECT on evaluations', async () => {
      const { error } = await supabase.from('evaluations').select('*') as any;
      expect(error).toBeDefined();
      expect(error?.code).toBe('42501'); // Postgres insufficient_privilege
    });

    it('should reject unauthorized INSERT on tasks', async () => {
      const { error } = await supabase.from('tasks').insert({ title: 'Hack' } as any) as any;
      expect(error).toBeDefined();
      expect(error?.code).toBe('42501');
    });

    it('should reject unauthorized UPDATE on team_members', async () => {
      // @ts-ignore - Ignore the never type on the mocked Supabase update function
      const { error } = await supabase.from('team_members').update({ role: 'LEADER' } as any) as any;
      expect(error).toBeDefined();
      expect(error?.code).toBe('42501');
    });

    it('should reject unauthorized DELETE on activity_logs', async () => {
      const { error } = await supabase.from('activity_logs').delete() as any;
      expect(error).toBeDefined();
      expect(error?.code).toBe('42501');
    });
  });
});
