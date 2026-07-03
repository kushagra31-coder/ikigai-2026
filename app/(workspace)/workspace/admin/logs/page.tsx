'use client';

import { useAdminLogs } from '@/features/admin/hooks/useAdminLogs';
import { SystemLogsTable } from '@/features/admin/components/SystemLogsTable';

export default function AdminLogsPage() {
  const { data: logs, loading } = useAdminLogs();

  if (loading || !logs) return <div className="animate-pulse h-96 bg-white/5 rounded-xl w-full" />;

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Audit Logs</h1>
        <p className="text-muted-foreground mt-1">Immutable record of system operations.</p>
      </div>
      
      <SystemLogsTable logs={logs} />
    </div>
  );
}
