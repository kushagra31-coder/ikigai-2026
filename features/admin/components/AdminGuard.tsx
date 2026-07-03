'use client';

import { ReactNode } from 'react';
import { hasPermission } from '../permissions';

export function AdminGuard({ children }: { children: ReactNode }) {
  // Hardcoded to ADMIN for the sake of the playground.
  const role = 'ADMIN'; 

  // Since we don't actually log out the user, we'll allow access to the workspace routes. 
  // However, in production, checking MANAGE_SETTINGS guarantees it's an admin.
  if (!hasPermission(role, 'MANAGE_SETTINGS')) {
    return (
      <div className="flex flex-col items-center justify-center h-96 text-center">
        <h2 className="text-2xl font-bold text-destructive mb-2">Access Denied</h2>
        <p className="text-muted-foreground">You do not have administrative privileges to view this page.</p>
      </div>
    );
  }

  return <>{children}</>;
}
