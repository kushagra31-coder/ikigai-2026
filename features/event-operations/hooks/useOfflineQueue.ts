'use client';

import { useState, useCallback, useEffect } from 'react';
import { OfflineQueueItem } from '../types';
import { offlineQueueRepository } from '../repository/offlineQueue.repository';
import { scanService } from '../services/scan.service';

export function useOfflineQueue() {
  const [queue, setQueue] = useState<OfflineQueueItem[]>([]);
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSyncResult, setLastSyncResult] = useState<{success: number, failed: number} | null>(null);

  const loadQueue = useCallback(async () => {
    const data = await offlineQueueRepository.getQueue();
    setQueue(data);
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadQueue();
    // Poll the queue every 5 seconds to update UI
    const interval = setInterval(loadQueue, 5000);
    return () => clearInterval(interval);
  }, [loadQueue]);

  const syncNow = async () => {
    if (isSyncing || queue.length === 0) return;
    
    setIsSyncing(true);
    setLastSyncResult(null);
    try {
      const result = await scanService.syncOfflineQueue();
      setLastSyncResult(result);
    } finally {
      await loadQueue();
      setIsSyncing(false);
    }
  };

  return {
    queue,
    queueSize: queue.length,
    isSyncing,
    lastSyncResult,
    syncNow
  };
}
