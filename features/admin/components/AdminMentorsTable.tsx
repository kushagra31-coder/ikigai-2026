'use client';

import { GlassCard } from '@/components/data-display/GlassCard';
import { AdminMentor } from '../types';

export function AdminMentorsTable({ mentors }: { mentors: AdminMentor[] }) {
  if (mentors.length === 0) {
    return (
      <GlassCard className="p-12 text-center text-muted-foreground">
        <p>No mentors available.</p>
      </GlassCard>
    );
  }

  return (
    <GlassCard className="overflow-hidden overflow-x-auto">
      <table className="w-full text-left text-sm whitespace-nowrap">
        <thead>
          <tr className="border-b border-white/10 text-muted-foreground bg-white/5">
            <th className="py-3 px-4 font-semibold uppercase tracking-wider text-xs">Mentor Name</th>
            <th className="py-3 px-4 font-semibold uppercase tracking-wider text-xs">Department</th>
            <th className="py-3 px-4 font-semibold uppercase tracking-wider text-xs">Status</th>
            <th className="py-3 px-4 font-semibold uppercase tracking-wider text-xs">Load</th>
            <th className="py-3 px-4 font-semibold uppercase tracking-wider text-xs">Progress</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {mentors.map(mentor => (
            <tr key={mentor.id} className="hover:bg-white/5">
              <td className="py-3 px-4 font-medium">{mentor.name}</td>
              <td className="py-3 px-4 text-muted-foreground">{mentor.department}</td>
              <td className="py-3 px-4">
                <span className={`px-2 py-1 rounded text-xs ${mentor.availability === 'ONLINE' ? 'bg-success/20 text-success' : 'bg-warning/20 text-warning'}`}>
                  {mentor.availability}
                </span>
              </td>
              <td className="py-3 px-4">
                <div className="flex items-center gap-2">
                  <div className="w-24 h-2 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-primary" style={{ width: `${mentor.currentLoad}%` }} />
                  </div>
                  <span className="text-xs text-muted-foreground">{mentor.assignedTeams}/{mentor.maximumCapacity}</span>
                </div>
              </td>
              <td className="py-3 px-4">
                <span className="font-medium text-success">{mentor.evaluationProgress}%</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </GlassCard>
  );
}
