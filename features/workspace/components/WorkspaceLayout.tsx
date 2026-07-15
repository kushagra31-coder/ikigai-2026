'use client';

import { ReactNode } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { WorkspaceProvider } from '../context/WorkspaceContext';
import { useAuthContext } from '@/components/providers/AuthProvider';
import { ToastProvider } from '@/components/providers/ToastProvider';
import { DialogProvider } from '@/components/providers/DialogProvider';
import { LoadingScreen } from './LoadingScreen';
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
      // Force logout for non-whitelisted users and redirect to login with error
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

  return (
    <WorkspaceProvider>
      <ToastProvider>
        <DialogProvider>
          <div className="flex h-screen overflow-hidden bg-muted/20">
            <Sidebar />
            <div className="flex flex-col flex-1 overflow-hidden min-w-0">
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
