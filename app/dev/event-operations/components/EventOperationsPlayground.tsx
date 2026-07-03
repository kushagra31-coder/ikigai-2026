'use client';

import React, { useEffect } from 'react';
import { DigitalPassCard } from '@/features/event-operations/components/DigitalPassCard';
import { VolunteerScanner } from '@/features/event-operations/components/VolunteerScanner';
import { AdminScanner } from '@/features/event-operations/components/AdminScanner';
import { ScanHistoryTable } from '@/features/event-operations/components/ScanHistoryTable';
import { usePassManagement } from '@/features/event-operations/hooks/usePassManagement';
import { useOfflineQueue } from '@/features/event-operations/hooks/useOfflineQueue';
import { GlassCard } from '@/components/data-display/GlassCard';
import { Button } from '@/components/primitives/button';
import { Icons } from '@/components/constants/icons';

export function EventOperationsPlayground() {
  const { passes, fetchPasses } = usePassManagement();
  const { queueSize, isSyncing, lastSyncResult, syncNow } = useOfflineQueue();

  useEffect(() => {
    fetchPasses();
  }, [fetchPasses]);

  return (
    <div className="space-y-12">
      
      {/* MOCK DIGITAL PASSES */}
      <div>
        <h2 className="text-2xl font-black mb-6">Digital Passes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {passes.map(pass => (
            <DigitalPassCard key={pass.id} pass={pass} />
          ))}
        </div>
      </div>

      {/* SCANNER AND OFFLINE QUEUE */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* SCANNER (Volunteer Mode) */}
        <div className="lg:col-span-1">
          <VolunteerScanner />
        </div>

        {/* ADMIN CONTROLS & QUEUE */}
        <div className="lg:col-span-2 space-y-8">
          
          <GlassCard className="p-6 border-blue-500/30">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold flex items-center gap-2">
                <Icons.wifiOff className="w-5 h-5 text-blue-500" />
                Offline Sync Queue
              </h3>
              <Button onClick={syncNow} disabled={isSyncing || queueSize === 0} variant="outline" className="border-blue-500/50 hover:bg-blue-500/10">
                <Icons.refreshCw className={`w-4 h-4 mr-2 ${isSyncing ? 'animate-spin' : ''}`} />
                Sync Now ({queueSize})
              </Button>
            </div>
            
            {lastSyncResult && (
              <div className="text-sm p-3 bg-white/5 rounded flex gap-4">
                <span className="text-green-400">Successfully synced: {lastSyncResult.success}</span>
                <span className="text-red-400">Failed to sync: {lastSyncResult.failed}</span>
              </div>
            )}
            
            <p className="text-sm text-muted-foreground mt-2">
              Turn on &quot;Offline&quot; mode in the Scanner, perform scans, and watch them queue up here instead of hitting the live system.
            </p>
          </GlassCard>

          <AdminScanner />
          <ScanHistoryTable />
        </div>
      </div>
    </div>
  );
}
