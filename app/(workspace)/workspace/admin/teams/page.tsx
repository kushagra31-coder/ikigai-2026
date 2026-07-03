'use client';

import { useAdminTeams } from '@/features/admin/hooks/useAdminTeams';
import { AdminTeamsTable } from '@/features/admin/components/AdminTeamsTable';

export default function AdminTeamsPage() {
  const { data: teams, loading, actions } = useAdminTeams();

  if (loading || !teams) return <div className="animate-pulse h-96 bg-white/5 rounded-xl w-full" />;

  const handleBulkAssignMentor = (ids: string[]) => {
    actions.bulkAssignMentor({ teamIds: ids, mentorId: 'mentor-bulk' });
  };
  const handleBulkAssignTrack = (ids: string[]) => {
    actions.bulkAssignTrack({ teamIds: ids, trackId: 'track-bulk' });
  };
  const handleBulkLock = (ids: string[]) => {
    actions.bulkLockUnlock({ teamIds: ids, isLocked: true });
  };
  const handleBulkUnlock = (ids: string[]) => {
    actions.bulkLockUnlock({ teamIds: ids, isLocked: false });
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Team Management</h1>
        <p className="text-muted-foreground mt-1">Select teams to bulk assign mentors, tracks, or lock submissions.</p>
      </div>
      
      <AdminTeamsTable 
        teams={teams} 
        onBulkAssignMentor={handleBulkAssignMentor}
        onBulkAssignTrack={handleBulkAssignTrack}
        onBulkLock={handleBulkLock}
        onBulkUnlock={handleBulkUnlock}
      />
    </div>
  );
}
