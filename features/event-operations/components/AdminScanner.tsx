'use client';

import React, { useEffect } from 'react';
import { usePassManagement } from '../hooks/usePassManagement';
import { GlassCard } from '@/components/data-display/GlassCard';
import { Icons } from '@/components/constants/icons';
import { Button } from '@/components/primitives/button';

export function AdminScanner() {
  const { passes, isLoading, fetchPasses, blockPass, reactivatePass } = usePassManagement();

  useEffect(() => {
    fetchPasses();
  }, [fetchPasses]);

  return (
    <GlassCard className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-bold text-lg flex items-center gap-2">
          <Icons.shield className="w-5 h-5 text-primary" />
          Admin Pass Management
        </h3>
        <Button size="sm" variant="outline" onClick={fetchPasses} disabled={isLoading}>
          <Icons.refreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-muted-foreground uppercase bg-white/5">
            <tr>
              <th className="px-4 py-3 rounded-tl-lg">Pass ID</th>
              <th className="px-4 py-3">Team Name</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Last Scan</th>
              <th className="px-4 py-3 rounded-tr-lg">Actions</th>
            </tr>
          </thead>
          <tbody>
            {passes.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-muted-foreground border-b border-white/5">
                  No passes found
                </td>
              </tr>
            ) : (
              passes.map((pass) => (
                <tr key={pass.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="px-4 py-3 font-mono text-xs">{pass.id}</td>
                  <td className="px-4 py-3 font-bold">{pass.teamName}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                      pass.status === 'ACTIVE' ? 'bg-green-500/20 text-green-400' :
                      pass.status === 'BLOCKED' ? 'bg-red-500/20 text-red-400' :
                      'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {pass.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground text-xs">
                    {pass.lastScan ? (
                      <>
                        <span className="block">{pass.lastScan.checkpoint}</span>
                        <span suppressHydrationWarning>{new Date(pass.lastScan.timestamp).toLocaleString()}</span>
                      </>
                    ) : (
                      'Never'
                    )}
                  </td>
                  <td className="px-4 py-3">
                    {pass.status === 'ACTIVE' ? (
                      <Button size="sm" variant="destructive" onClick={() => blockPass(pass.id)}>
                        Block
                      </Button>
                    ) : (
                      <Button size="sm" variant="outline" className="text-green-500 border-green-500/50 hover:bg-green-500/10" onClick={() => reactivatePass(pass.id)}>
                        Reactivate
                      </Button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </GlassCard>
  );
}
