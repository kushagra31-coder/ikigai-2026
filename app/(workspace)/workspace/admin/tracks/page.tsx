'use client';

import { useAdminTracks } from '@/features/admin/hooks/useAdminTracks';
import { AdminTracksTable } from '@/features/admin/components/AdminTracksTable';

export default function AdminTracksPage() {
  const { data: tracks, loading } = useAdminTracks();

  if (loading || !tracks) return <div className="animate-pulse h-96 bg-white/5 rounded-xl w-full" />;

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Track Management</h1>
        <p className="text-muted-foreground mt-1">Manage event tracks and visibility.</p>
      </div>
      
      <AdminTracksTable tracks={tracks} />
    </div>
  );
}
