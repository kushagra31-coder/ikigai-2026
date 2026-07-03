'use client';

import { GlassCard } from '@/components/data-display/GlassCard';
import { Track } from '../types';

export function AdminTracksTable({ tracks }: { tracks: Track[] }) {
  if (tracks.length === 0) {
    return (
      <GlassCard className="p-12 text-center text-muted-foreground">
        <p>No tracks available.</p>
      </GlassCard>
    );
  }

  return (
    <GlassCard className="overflow-hidden overflow-x-auto">
      <table className="w-full text-left text-sm whitespace-nowrap">
        <thead>
          <tr className="border-b border-white/10 text-muted-foreground bg-white/5">
            <th className="py-3 px-4 font-semibold uppercase tracking-wider text-xs">Track Name</th>
            <th className="py-3 px-4 font-semibold uppercase tracking-wider text-xs">Status</th>
            <th className="py-3 px-4 font-semibold uppercase tracking-wider text-xs text-right">Teams</th>
            <th className="py-3 px-4 font-semibold uppercase tracking-wider text-xs text-right">Mentors</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {tracks.map(track => (
            <tr key={track.id} className="hover:bg-white/5">
              <td className="py-3 px-4 font-medium">{track.name}</td>
              <td className="py-3 px-4">
                <span className={`px-2 py-1 rounded text-xs ${track.status === 'ACTIVE' ? 'bg-success/20 text-success' : 'bg-white/10 text-muted-foreground'}`}>
                  {track.status}
                </span>
              </td>
              <td className="py-3 px-4 text-right text-muted-foreground">{track.teamCount}</td>
              <td className="py-3 px-4 text-right text-muted-foreground">{track.mentorCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </GlassCard>
  );
}
