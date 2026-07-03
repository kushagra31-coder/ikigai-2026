'use client';

import React, { useEffect, useState } from 'react';
import { ScanLog } from '../types';
import { scanService } from '../services/scan.service';
import { GlassCard } from '@/components/data-display/GlassCard';
import { Icons } from '@/components/constants/icons';

export function ScanHistoryTable() {
  const [logs, setLogs] = useState<ScanLog[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchLogs = async () => {
    setLoading(true);
    const data = await scanService.getHistory();
    setLogs(data);
    setLoading(false);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchLogs();
    const interval = setInterval(fetchLogs, 10000); // refresh every 10s
    return () => clearInterval(interval);
  }, []);

  return (
    <GlassCard className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-bold text-lg flex items-center gap-2">
          <Icons.list className="w-5 h-5 text-primary" />
          Recent Scan Activity
        </h3>
        <button onClick={fetchLogs} className="p-2 bg-white/5 hover:bg-white/10 rounded-md transition-colors">
          <Icons.refreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-muted-foreground uppercase bg-white/5">
            <tr>
              <th className="px-4 py-3 rounded-tl-lg">Time</th>
              <th className="px-4 py-3">Team ID</th>
              <th className="px-4 py-3">Checkpoint</th>
              <th className="px-4 py-3">Result</th>
              <th className="px-4 py-3">Volunteer</th>
              <th className="px-4 py-3 rounded-tr-lg">Device</th>
            </tr>
          </thead>
          <tbody>
            {logs.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-muted-foreground border-b border-white/5">
                  No scan history available
                </td>
              </tr>
            ) : (
              logs.map((log) => (
                <tr key={log.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="px-4 py-3 text-muted-foreground font-mono" suppressHydrationWarning>
                    {new Date(log.timestamp).toLocaleTimeString()}
                  </td>
                  <td className="px-4 py-3 font-medium">{log.teamId}</td>
                  <td className="px-4 py-3">
                    <span className="bg-white/10 px-2 py-1 rounded text-xs">
                      {log.checkpoint.replace(/_/g, ' ')}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                      log.result === 'VALID' ? 'bg-green-500/20 text-green-400' :
                      log.result === 'ALREADY_SCANNED' ? 'bg-yellow-500/20 text-yellow-400' :
                      log.result === 'OFFLINE_PENDING' ? 'bg-blue-500/20 text-blue-400' :
                      'bg-red-500/20 text-red-400'
                    }`}>
                      {log.result}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{log.volunteerId}</td>
                  <td className="px-4 py-3 text-muted-foreground font-mono text-xs">{log.deviceId}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </GlassCard>
  );
}
