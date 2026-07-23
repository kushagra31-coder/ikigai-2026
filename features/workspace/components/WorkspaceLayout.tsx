'use client';

import { ReactNode } from 'react';
import { WorkspaceProvider } from '../context/WorkspaceContext';
import { useAuthContext } from '@/components/providers/AuthProvider';
import { ToastProvider } from '@/components/providers/ToastProvider';
import { DialogProvider } from '@/components/providers/DialogProvider';
import { LoadingScreen } from './LoadingScreen';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { useRouter } from 'next/navigation';
import { CommandMenu } from './CommandMenu';
import { useEffect } from 'react';

export const WorkspaceLayout = ({ children }: { children: ReactNode }) => {
  const { loading, authenticated, role } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !authenticated) {
      router.push('/login');
    } else if (!loading && authenticated && role !== 'MENTOR' && role !== 'ADMIN') {
      // Not whitelisted — sign out and redirect with error
      import('@/features/authentication/services/auth.service').then(({ AuthService }) => {
        AuthService.signOut().then(() => {
          window.location.href = '/login?error=not_whitelisted';
        });
      });
    }
  }, [loading, authenticated, role, router]);

  if (loading || !authenticated) {
    return <LoadingScreen />;
  }

  // Only MENTOR and ADMIN roles reach this point
  if (role !== 'MENTOR' && role !== 'ADMIN') {
    return <LoadingScreen />;
  }

  return (
    <WorkspaceProvider>
      <ToastProvider>
        <DialogProvider>
          <div className="flex h-screen overflow-hidden bg-background">
            {/* Desktop & Mobile Sidebar */}
            <Sidebar />

            {/* Main content area */}
            <div className="flex flex-col flex-1 overflow-hidden min-w-0">
              {/* Sticky top header */}
              <Header />

              <main className="flex-1 overflow-y-auto p-4 md:p-8 relative">
                <div className="mx-auto max-w-7xl h-full">
                  {children}
                </div>
              </main>
            </div>
          </div>
          <CommandMenu />
        </DialogProvider>
      </ToastProvider>
    </WorkspaceProvider>
  );
};
