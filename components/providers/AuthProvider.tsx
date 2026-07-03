'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { AuthState } from '@/types/auth.types';
import { IS_MOCKED } from '@/lib/supabase/is-mocked';
import { AuthService } from '@/features/authentication/services/auth.service';
import { ProfileService } from '@/features/authentication/services/profile.service';

const AuthContext = createContext<AuthState | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, setState] = useState<AuthState>({
    user: null,
    profile: null,
    role: null,
    loading: true,
    authenticated: false,
  });

  useEffect(() => {
    let mounted = true;

    const fetchSessionAndProfile = async () => {
      try {
        const session = await AuthService.getSession();
        if (session) {
          // In mock mode, ProfileService may not have a real user — use a mock profile
          const profile = IS_MOCKED
            ? null
            : await ProfileService.getProfile(session.user.id);
          if (mounted) {
            setState({
              user: session.user as AuthState['user'],
              profile,
              role: (profile?.role as AuthState['role']) || null,
              loading: false,
              authenticated: true,
            });
          }
        } else {
          if (mounted) {
            setState({ user: null, profile: null, role: null, loading: false, authenticated: false });
          }
        }
      } catch {
        if (mounted) {
          setState({ user: null, profile: null, role: null, loading: false, authenticated: false });
        }
      }
    };

    fetchSessionAndProfile();

    // Only subscribe to Supabase auth state changes when NOT mocked
    if (!IS_MOCKED) {
      import('@/lib/supabase/client').then(({ createClient }) => {
        const supabase = createClient();
        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event) => {
          if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED' || event === 'USER_UPDATED') {
            fetchSessionAndProfile();
          } else if (event === 'SIGNED_OUT') {
            setState({ user: null, profile: null, role: null, loading: false, authenticated: false });
          }
        });
        return () => {
          mounted = false;
          subscription.unsubscribe();
        };
      });
    }

    return () => {
      mounted = false;
    };
  }, []);

  return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};
