import { ScanResult, Checkpoint, ScanResultStatus } from '../types';
import { scanEngine } from '../core/scanEngine';
import { offlineQueueRepository } from '../repository/offlineQueue.repository';
import { scanLogRepository } from '../repository/scanLog.repository';
import { Result } from '../../../types/result';

function unwrap<T>(result: Result<T>): T {
  if (!result.success) throw result.error;
  return result.data;
}

export const scanService = {
  /**
   * Perform a scan. If the network is down (simulated), it falls back to the offline queue.
   */
  async performScan(
    rawPayload: string, 
    checkpoint: Checkpoint, 
    volunteerId: string, 
    deviceId: string,
    simulateOffline: boolean = false
  ): Promise<ScanResult> {
    
    if (simulateOffline) {
      await offlineQueueRepository.enqueue({
        payload: rawPayload,
        checkpoint,
        volunteerId,
        deviceId
      });
      return {
        status: ScanResultStatus.OFFLINE_PENDING,
        message: 'Saved to Offline Queue. Will sync when connection is restored.'
      };
    }

    // Normal Online Scan
    return await scanEngine.processScan({
      rawPayload,
      checkpoint,
      volunteerId,
      deviceId
    });
  },

  /**
   * Background process to sync the offline queue to the server.
   */
  async syncOfflineQueue(): Promise<{ success: number, failed: number }> {
    const queue = await offlineQueueRepository.getQueue();
    if (queue.length === 0) return { success: 0, failed: 0 };

    let successCount = 0;
    let failedCount = 0;
    const processedIds: string[] = [];

    for (const item of queue) {
      const result = await scanEngine.processScan({
        rawPayload: item.payload,
        checkpoint: item.checkpoint,
        volunteerId: item.volunteerId,
        deviceId: item.deviceId
      });

      processedIds.push(item.id);
      
      if (result.status === ScanResultStatus.VALID || result.status === ScanResultStatus.ALREADY_SCANNED) {
        // Technically already scanned is a successful resolution of state
        successCount++;
      } else {
        failedCount++;
      }
    }

    // Remove processed items from local queue
    await offlineQueueRepository.dequeue(processedIds);

    return { success: successCount, failed: failedCount };
  },

  async getHistory(filter?: { checkpoint?: Checkpoint; teamId?: string }) {
    return unwrap(await scanLogRepository.getLogs(filter));
  }
};
