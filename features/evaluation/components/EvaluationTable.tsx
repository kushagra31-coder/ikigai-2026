'use client';

import { GlassCard } from '@/components/data-display/GlassCard';
import { Badge } from '@/components/primitives/badge';
import { Icons } from '@/components/constants/icons';

interface EvaluationRecord {
  id: string;
  teamName: string;
  sessionName: string;
  score: number;
  status: 'DRAFT' | 'SUBMITTED';
  date: string;
}

interface EvaluationTableProps {
  records: EvaluationRecord[];
  onSelect?: (id: string) => void;
}

export function EvaluationTable({ records, onSelect }: EvaluationTableProps) {
  if (records.length === 0) {
    return (
      <GlassCard className="py-12 flex flex-col items-center justify-center text-center">
        <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mb-4">
          <Icons.star className="w-6 h-6 text-muted-foreground" />
        </div>
        <h3 className="font-semibold text-lg">No Evaluations Found</h3>
        <p className="text-sm text-muted-foreground mt-1">You haven&apos;t evaluated any teams yet.</p>
      </GlassCard>
    );
  }

  return (
    <div className="w-full overflow-x-auto pb-4">
      <table className="w-full text-left text-sm whitespace-nowrap">
        <thead>
          <tr className="border-b border-white/10 text-muted-foreground">
            <th className="pb-3 px-4 font-semibold uppercase tracking-wider text-xs">Team</th>
            <th className="pb-3 px-4 font-semibold uppercase tracking-wider text-xs">Session</th>
            <th className="pb-3 px-4 font-semibold uppercase tracking-wider text-xs">Score</th>
            <th className="pb-3 px-4 font-semibold uppercase tracking-wider text-xs">Status</th>
            <th className="pb-3 px-4 font-semibold uppercase tracking-wider text-xs">Date</th>
            <th className="pb-3 px-4"></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {records.map((record) => (
            <tr 
              key={record.id} 
              className={`group transition-colors ${onSelect ? 'cursor-pointer hover:bg-white/5' : ''}`}
              onClick={() => onSelect?.(record.id)}
            >
              <td className="py-4 px-4 font-medium">{record.teamName}</td>
              <td className="py-4 px-4 text-muted-foreground">{record.sessionName}</td>
              <td className="py-4 px-4">
                <span className="font-bold text-primary">{record.score.toFixed(2)}</span>
                <span className="text-xs text-muted-foreground"> / 10</span>
              </td>
              <td className="py-4 px-4">
                <Badge className={record.status === 'SUBMITTED' ? 'bg-success/20 text-success border-success/20' : 'bg-warning/20 text-warning border-warning/20'}>
                  {record.status}
                </Badge>
              </td>
              <td className="py-4 px-4 text-muted-foreground">{new Date(record.date).toLocaleDateString()}</td>
              <td className="py-4 px-4 text-right">
                {onSelect && (
                  <button className="text-muted-foreground hover:text-foreground p-1 rounded-md hover:bg-white/10 transition-colors">
                    <Icons.more className="w-4 h-4" />
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
