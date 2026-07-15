'use client';

import { useAdminDashboard } from '@/features/admin/hooks/useAdminDashboard';
import { useAdminSettings } from '@/features/admin/hooks/useAdminSettings';
import { StatCard, EventStatusCard } from '@/features/admin/components/CoreCards';
import { AdminQuickActions } from '@/features/admin/components/AdminQuickActions';
import { LeaderboardAdminControls } from '@/features/admin/components/LeaderboardAdminControls';
import { Icons } from '@/components/constants/icons';

export default function AdminPage() {
  const { data: stats, loading } = useAdminDashboard();
  const { data: settings } = useAdminSettings();

  if (loading || !stats || !settings) return <div className="animate-pulse h-96 bg-white/5 rounded-xl w-full" />;

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <EventStatusCard status={settings.eventStatus} />
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="Total Teams" value={stats.totalTeams} icon={Icons.users} color="text-blue-400" />
        <StatCard label="Total Mentors" value={stats.totalMentors} icon={Icons.users} color="text-green-400" />
        <StatCard label="Total Tracks" value={stats.totalTracks} icon={Icons.settings} color="text-yellow-400" />
        <StatCard label="Active Sessions" value={stats.activeSessions} icon={Icons.clock} color="text-purple-400" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <LeaderboardAdminControls />
        {/* Placeholder for other admin controls */}
      </div>

      <AdminQuickActions />
    </div>
  );
}
