'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { AuthState } from '@/types/auth.types';
import { createClient } from '@/lib/supabase/client';
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
    const supabase = createClient();

    const fetchSessionAndProfile = async () => {
      try {
        const session = await AuthService.getSession();
        if (session) {
          const profile = await ProfileService.getProfile(session.user.id);
          if (mounted) {
            setState({
              user: session.user,
              profile,
              role: profile?.role || null,
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
