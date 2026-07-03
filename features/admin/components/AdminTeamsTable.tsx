'use client';

import { useState } from 'react';
import { GlassCard } from '@/components/data-display/GlassCard';
import { AdminTeam } from '../types';
import { Button } from '@/components/primitives/button';

export function AdminTeamsTable({ teams, onBulkAssignMentor, onBulkAssignTrack, onBulkLock, onBulkUnlock }: { teams: AdminTeam[], onBulkAssignMentor: (ids: string[]) => void, onBulkAssignTrack: (ids: string[]) => void, onBulkLock: (ids: string[]) => void, onBulkUnlock: (ids: string[]) => void }) {
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const toggle = (id: string) => {
    const next = new Set(selected);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelected(next);
  };

  const selectAll = () => {
    if (selected.size === teams.length) setSelected(new Set());
    else setSelected(new Set(teams.map(t => t.id)));
  };

  if (teams.length === 0) {
    return (
      <GlassCard className="p-12 text-center text-muted-foreground">
        <p>No teams available.</p>
      </GlassCard>
    );
  }

  return (
    <GlassCard className="overflow-hidden">
      <div className="p-4 border-b border-white/5 flex justify-between items-center bg-white/5">
        <span className="text-sm font-medium">{selected.size} Selected</span>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" disabled={selected.size === 0} onClick={() => onBulkAssignMentor(Array.from(selected))}>
            Assign Mentor
          </Button>
          <Button variant="outline" size="sm" disabled={selected.size === 0} onClick={() => onBulkAssignTrack(Array.from(selected))}>
            Assign Track
          </Button>
          <Button variant="outline" size="sm" disabled={selected.size === 0} onClick={() => onBulkLock(Array.from(selected))}>
            Lock
          </Button>
          <Button variant="outline" size="sm" disabled={selected.size === 0} onClick={() => onBulkUnlock(Array.from(selected))}>
            Unlock
          </Button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm whitespace-nowrap min-w-[600px]">
          <thead>
            <tr className="border-b border-white/10 text-muted-foreground hidden md:table-row">
              <th className="py-3 px-4 w-10">
                <input type="checkbox" checked={selected.size === teams.length && teams.length > 0} onChange={selectAll} className="rounded border-white/20 bg-transparent" />
              </th>
              <th className="py-3 px-4 font-semibold uppercase tracking-wider text-xs">Team Name</th>
              <th className="py-3 px-4 font-semibold uppercase tracking-wider text-xs">Members</th>
              <th className="py-3 px-4 font-semibold uppercase tracking-wider text-xs">Track ID</th>
              <th className="py-3 px-4 font-semibold uppercase tracking-wider text-xs">Mentor ID</th>
              <th className="py-3 px-4 font-semibold uppercase tracking-wider text-xs">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {teams.map(team => (
              <tr key={team.id} className="hover:bg-white/5 flex flex-col md:table-row">
                <td className="py-3 px-4 flex items-center md:table-cell">
                  <input type="checkbox" checked={selected.has(team.id)} onChange={() => toggle(team.id)} className="rounded border-white/20 bg-transparent mr-4 md:mr-0" />
                  <span className="font-medium md:hidden">{team.name}</span>
                </td>
                <td className="py-1 px-4 font-medium hidden md:table-cell">{team.name}</td>
                <td className="py-1 px-4 text-muted-foreground"><span className="md:hidden text-xs font-semibold mr-2">MEMBERS:</span>{team.membersCount}</td>
                <td className="py-1 px-4 text-muted-foreground"><span className="md:hidden text-xs font-semibold mr-2">TRACK:</span>{team.trackId || '-'}</td>
                <td className="py-1 px-4 text-muted-foreground"><span className="md:hidden text-xs font-semibold mr-2">MENTOR:</span>{team.mentorId || '-'}</td>
                <td className="py-3 px-4">
                  <span className={`px-2 py-1 rounded text-xs ${team.isLocked ? 'bg-destructive/20 text-destructive' : 'bg-success/20 text-success'}`}>
                    {team.isLocked ? 'LOCKED' : team.submissionStatus}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </GlassCard>
  );
}
