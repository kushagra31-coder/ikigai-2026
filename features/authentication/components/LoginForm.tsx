'use client';

import { GoogleButton } from './GoogleButton';
import { useSearchParams } from 'next/navigation';
import { Icons } from '@/components/constants/icons';

/**
 * LoginForm — Google OAuth only.
 * No email/password. No registration. No password reset.
 * Only authorized Mentors and Admins (whitelisted by an Admin) can access.
 */
export const LoginForm = () => {

  const searchParams = useSearchParams();
  const errorParam = searchParams?.get('error');

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
      {errorParam === 'not_whitelisted' && (
        <div className="p-4 text-sm bg-red-500/10 border border-red-500/20 rounded-xl text-center space-y-1">
          <div className="font-semibold text-red-400">Access Denied</div>
          <div className="text-red-400/80">
            Your Google account is not authorized. Contact the event administrator to be added as a Mentor or Admin.
          </div>
        </div>
      )}

      {errorParam === 'auth-failed' && (
        <div className="p-4 text-sm bg-red-500/10 border border-red-500/20 rounded-xl text-center space-y-1">
          <div className="font-semibold text-red-400">Authentication Failed</div>
          <div className="text-red-400/80">Google sign-in could not be completed. Please try again.</div>
        </div>
      )}

      {/* Google Sign-In — the only auth method */}
      <div className="flex flex-col gap-4">
        <GoogleButton />
        <p className="text-[11px] text-muted-foreground text-center leading-relaxed">
          Only authorized Mentors and Admins can sign in. <br />
          Public visitors do not require an account.
        </p>
      </div>

      {/* Access Notice */}
      <div className="border border-border rounded-xl p-4 bg-muted/5 flex gap-3 items-start">
        <Icons.info className="w-4 h-4 text-primary mt-0.5 shrink-0" />
        <div className="text-xs text-muted-foreground leading-relaxed">
          <span className="font-semibold text-foreground">Mentor onboarding:</span> Sign in with Google first.
          If you see "Access Denied", your account needs to be activated by the admin.
          Contact the event coordinator with your Gmail address.
        </div>
      </div>
    </div>
  );
};
