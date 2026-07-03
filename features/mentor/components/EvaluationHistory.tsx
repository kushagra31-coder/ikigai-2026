'use client';

import { GlassCard } from '@/components/data-display/GlassCard';
import { EvaluationHistoryRecord } from '../types';
import { EvaluationStatusBadge } from './Badges';
import { Icons } from '@/components/constants/icons';

interface EvaluationHistoryTableProps {
  records: EvaluationHistoryRecord[];
}

export function EvaluationHistoryTable({ records }: EvaluationHistoryTableProps) {
  if (records.length === 0) {
    return (
      <GlassCard className="py-12 flex flex-col items-center justify-center text-center">
        <Icons.clock className="w-8 h-8 text-muted-foreground mb-4 opacity-50" />
        <h3 className="font-semibold text-lg">No History Found</h3>
        <p className="text-sm text-muted-foreground mt-1">You haven&apos;t completed any evaluations yet.</p>
      </GlassCard>
    );
  }

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full text-left text-sm whitespace-nowrap">
        <thead>
          <tr className="border-b border-white/10 text-muted-foreground">
            <th className="pb-3 px-4 font-semibold uppercase tracking-wider text-xs">Team</th>
            <th className="pb-3 px-4 font-semibold uppercase tracking-wider text-xs">Session</th>
            <th className="pb-3 px-4 font-semibold uppercase tracking-wider text-xs">Score</th>
            <th className="pb-3 px-4 font-semibold uppercase tracking-wider text-xs">Status</th>
            <th className="pb-3 px-4 font-semibold uppercase tracking-wider text-xs">Date</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {records.map((record) => (
            <tr key={record.id} className="group hover:bg-white/5 transition-colors">
              <td className="py-4 px-4 font-medium text-foreground">{record.teamName}</td>
              <td className="py-4 px-4 text-muted-foreground">{record.sessionName}</td>
              <td className="py-4 px-4">
                <span className="font-bold text-primary">{record.score.toFixed(1)}</span>
                <span className="text-xs text-muted-foreground"> / 10</span>
              </td>
              <td className="py-4 px-4">
                <EvaluationStatusBadge status={record.status} />
              </td>
              <td className="py-4 px-4 text-muted-foreground">{new Date(record.date).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
