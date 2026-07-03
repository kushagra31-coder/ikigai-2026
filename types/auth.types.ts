import { User as SupabaseUser, Session as SupabaseSession } from '@supabase/supabase-js';

export type Role = 'ADMIN' | 'MENTOR' | 'TEAM' | 'VISITOR';

export interface Profile {
  id: string;
  email: string;
  full_name: string;
  role: Role;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}

export type User = SupabaseUser;
export type Session = SupabaseSession;

export interface AuthState {
  user: User | null;
  profile: Profile | null;
  role: Role | null;
  loading: boolean;
  authenticated: boolean;
}
