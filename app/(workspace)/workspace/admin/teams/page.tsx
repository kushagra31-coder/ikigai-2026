'use client';

import { useAdminTeams } from '@/features/admin/hooks/useAdminTeams';
import { useAdminTracks } from '@/features/admin/hooks/useAdminTracks';
import { AdminTeamsTable } from '@/features/admin/components/AdminTeamsTable';
import { useState } from 'react';
import { Button } from '@/components/primitives/button';

export default function AdminTeamsPage() {
  const { data: teams, loading, actions } = useAdminTeams();
  const { data: tracks } = useAdminTracks();
  const [assignModalOpen, setAssignModalOpen] = useState(false);
  const [selectedTeamsForTrack, setSelectedTeamsForTrack] = useState<string[]>([]);
  const [selectedTrackId, setSelectedTrackId] = useState('');

  if (loading || !teams) return <div className="animate-pulse h-96 bg-white/5 rounded-xl w-full" />;

  const handleBulkAssignTrackClick = (ids: string[]) => {
    setSelectedTeamsForTrack(ids);
    setAssignModalOpen(true);
  };

  const confirmAssignTrack = async () => {
    if (!selectedTrackId) return;
    await actions.bulkAssignTrack({ teamIds: selectedTeamsForTrack, trackId: selectedTrackId });
    setAssignModalOpen(false);
    setSelectedTrackId('');
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
        onBulkAssignTrack={handleBulkAssignTrackClick}
        onBulkLock={handleBulkLock}
        onBulkUnlock={handleBulkUnlock}
      />

      {assignModalOpen && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card border border-white/10 rounded-2xl p-6 max-w-md w-full shadow-2xl">
            <h3 className="text-xl font-bold mb-4">Assign Track to {selectedTeamsForTrack.length} Teams</h3>
            <div className="mb-6">
              <label className="block text-sm text-muted-foreground mb-2">Select Track</label>
              <select 
                className="w-full bg-background border border-white/10 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-primary focus:outline-none"
                value={selectedTrackId}
                onChange={(e) => setSelectedTrackId(e.target.value)}
              >
                <option value="">-- Choose a Track --</option>
                {tracks?.map((t: any) => (
                  <option key={t.id} value={t.id}>{t.name}</option>
                ))}
              </select>
            </div>
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setAssignModalOpen(false)}>Cancel</Button>
              <Button onClick={confirmAssignTrack} disabled={!selectedTrackId}>Confirm Assignment</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
