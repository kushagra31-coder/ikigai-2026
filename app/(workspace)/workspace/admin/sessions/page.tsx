'use client';

import { useAdminSessions } from '@/features/admin/hooks/useAdminSessions';
import { AdminSessionsTable } from '@/features/admin/components/AdminSessionsTable';

export default function AdminSessionsPage() {
  const { data: sessions, loading } = useAdminSessions();

  if (loading || !sessions) return <div className="animate-pulse h-96 bg-white/5 rounded-xl w-full" />;

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Session Management</h1>
        <p className="text-muted-foreground mt-1">Control active judging checkpoints.</p>
      </div>
      
      <AdminSessionsTable sessions={sessions} />
    </div>
  );
}
