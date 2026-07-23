'use client';

import { GoogleButton } from './GoogleButton';
import { useSearchParams, useRouter } from 'next/navigation';
import { Icons } from '@/components/constants/icons';
import { useState } from 'react';
import { AuthService } from '@/features/authentication/services/auth.service';

/**
 * LoginForm
 * Supports both Google OAuth and Email/Password for Admin-assigned credentials.
 */
export const LoginForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const errorParam = searchParams?.get('error');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);
    setIsLoading(true);

    try {
      await AuthService.signInWithEmailAndPassword(email, password);
      // Redirect to workspace upon successful login
      router.push('/workspace');
      router.refresh();
    } catch (err: any) {
      setLocalError(err?.message || 'Authentication Failed');
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-8">
      {/* Logo & Title */}
      <div className="flex flex-col items-center text-center space-y-4">
        <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 mb-2">
          <Icons.cpu className="w-8 h-8 text-primary" />
        </div>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">IKIGAI 2026</h1>
          <p className="text-muted-foreground mt-1 text-sm">Operations Platform — Authorized Access Only</p>
        </div>
      </div>

      {/* Error States */}
      {(errorParam === 'not_whitelisted' || localError === 'not_whitelisted') && (
        <div className="p-4 text-sm bg-red-500/10 border border-red-500/20 rounded-xl text-center space-y-1">
          <div className="font-semibold text-red-400">Access Denied</div>
          <div className="text-red-400/80">
            Your account is not authorized. Contact the event administrator to be added as a Mentor or Admin.
          </div>
        </div>
      )}

      {(errorParam === 'auth-failed' || (localError && localError !== 'not_whitelisted')) && (
        <div className="p-4 text-sm bg-red-500/10 border border-red-500/20 rounded-xl text-center space-y-1">
          <div className="font-semibold text-red-400">Authentication Failed</div>
          <div className="text-red-400/80">{localError || 'Sign-in could not be completed. Please try again.'}</div>
        </div>
      )}

      <form onSubmit={handleEmailLogin} className="flex flex-col gap-4">
        <div className="space-y-3">
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Email address"
            required
            className="w-full bg-background border border-white/10 rounded-lg px-4 py-3 text-sm focus:border-primary outline-none transition-colors"
          />
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Password"
            required
            className="w-full bg-background border border-white/10 rounded-lg px-4 py-3 text-sm focus:border-primary outline-none transition-colors"
          />
        </div>
        
        <button 
          type="submit" 
          disabled={isLoading}
          className="w-full py-3 px-4 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Signing in...' : 'Sign in with Email'}
        </button>
      </form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-white/10" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <GoogleButton />
        <p className="text-[11px] text-muted-foreground text-center leading-relaxed mt-2">
          Only authorized Mentors and Admins can sign in. <br />
          Public visitors do not require an account.
        </p>
      </div>
    </div>
  );
};
