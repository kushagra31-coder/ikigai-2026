import { LoginForm } from '@/features/authentication/components/LoginForm';

import { Suspense } from 'react';

export default function LoginPage() {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-muted/20 px-4">
      <Suspense fallback={<div className="animate-pulse w-96 h-96 bg-white/5 rounded-2xl" />}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
