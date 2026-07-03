'use client';

import { GlassCard } from '@/components/data-display/GlassCard';
import { AdminSession } from '../types';
import { Button } from '@/components/primitives/button';

export function AdminSessionsTable({ sessions }: { sessions: AdminSession[] }) {
  if (sessions.length === 0) {
    return (
      <GlassCard className="p-12 text-center text-muted-foreground">
        <p>No evaluation sessions available.</p>
      </GlassCard>
    );
  }

  return (
    <GlassCard className="overflow-hidden overflow-x-auto">
      <table className="w-full text-left text-sm whitespace-nowrap">
        <thead>
          <tr className="border-b border-white/10 text-muted-foreground bg-white/5">
            <th className="py-3 px-4 font-semibold uppercase tracking-wider text-xs">Session Name</th>
            <th className="py-3 px-4 font-semibold uppercase tracking-wider text-xs">State</th>
            <th className="py-3 px-4 font-semibold uppercase tracking-wider text-xs">Timeline</th>
            <th className="py-3 px-4 font-semibold uppercase tracking-wider text-xs text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {sessions.map(s => (
            <tr key={s.id} className="hover:bg-white/5">
              <td className="py-3 px-4 font-medium">{s.name}</td>
              <td className="py-3 px-4">
                <span className="px-2 py-1 rounded text-xs bg-primary/20 text-primary">
                  {s.status}
                </span>
              </td>
              <td className="py-3 px-4 text-xs text-muted-foreground">
                {new Date(s.startTime).toLocaleTimeString()} - {new Date(s.endTime).toLocaleTimeString()}
              </td>
              <td className="py-3 px-4 text-right">
                <Button variant="outline" size="sm">Manage</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </GlassCard>
  );
}
