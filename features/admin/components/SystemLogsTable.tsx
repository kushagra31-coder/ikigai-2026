'use client';

import { GlassCard } from '@/components/data-display/GlassCard';
import { AuditLog } from '../types';

export function SystemLogsTable({ logs }: { logs: AuditLog[] }) {
  if (logs.length === 0) {
    return (
      <GlassCard className="p-12 text-center text-muted-foreground">
        <p>No audit logs available.</p>
      </GlassCard>
    );
  }

  return (
    <GlassCard className="overflow-hidden overflow-x-auto">
      <table className="w-full text-left text-sm whitespace-nowrap">
        <thead>
          <tr className="border-b border-white/10 text-muted-foreground bg-white/5">
            <th className="py-3 px-4 font-semibold uppercase tracking-wider text-xs">Timestamp</th>
            <th className="py-3 px-4 font-semibold uppercase tracking-wider text-xs">User / Role</th>
            <th className="py-3 px-4 font-semibold uppercase tracking-wider text-xs">Action</th>
            <th className="py-3 px-4 font-semibold uppercase tracking-wider text-xs">Target</th>
            <th className="py-3 px-4 font-semibold uppercase tracking-wider text-xs">Result</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5 font-mono text-xs">
          {logs.map(log => (
            <tr key={log.id} className="hover:bg-white/5">
              <td className="py-3 px-4 text-muted-foreground">{new Date(log.timestamp).toLocaleString()}</td>
              <td className="py-3 px-4">
                <span className="text-foreground">{log.user}</span>
                <span className="text-muted-foreground ml-2">[{log.role}]</span>
              </td>
              <td className="py-3 px-4 text-info">{log.action}</td>
              <td className="py-3 px-4 text-muted-foreground">{log.target}</td>
              <td className="py-3 px-4">
                <span className={`px-2 py-0.5 rounded text-[10px] uppercase ${log.result === 'SUCCESS' ? 'bg-success/20 text-success' : log.result === 'FAILURE' ? 'bg-destructive/20 text-destructive' : 'bg-warning/20 text-warning'}`}>
                  {log.result}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </GlassCard>
  );
}
