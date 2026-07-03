import { OfflineQueueItem } from '../types';

const OFFLINE_QUEUE_KEY = 'ikigai_offline_scan_queue';

export const offlineQueueRepository = {
  /**
   * Adds a failed scan to the local storage queue to be synced later.
   */
  async enqueue(item: Omit<OfflineQueueItem, 'id' | 'timestamp'>): Promise<OfflineQueueItem> {
    const queue = await this.getQueue();
    
    const newItem: OfflineQueueItem = {
      ...item,
      id: `oq_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date().toISOString()
    };
    
    queue.push(newItem);
    this.saveQueue(queue);
    
    return newItem;
  },

  /**
   * Removes items from the queue after successful sync.
   */
  async dequeue(ids: string[]): Promise<void> {
    let queue = await this.getQueue();
    queue = queue.filter(item => !ids.includes(item.id));
    this.saveQueue(queue);
  },

  /**
   * Gets the entire offline queue.
   */
  async getQueue(): Promise<OfflineQueueItem[]> {
    if (typeof window === 'undefined') return [];
    
    try {
      const data = localStorage.getItem(OFFLINE_QUEUE_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  /**
   * Helper to persist the queue.
   */
  saveQueue(queue: OfflineQueueItem[]): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem(OFFLINE_QUEUE_KEY, JSON.stringify(queue));
    }
  }
};
