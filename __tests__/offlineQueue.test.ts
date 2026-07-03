 
/* eslint-disable @typescript-eslint/no-unused-vars */
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { offlineQueueRepository } from '../features/event-operations/repository/offlineQueue.repository';
import { Checkpoint } from '../features/event-operations/types';

describe('offlineQueueRepository', () => {
  beforeEach(() => {
    // Clear mock localStorage
    localStorage.clear();
  });

  it('enqueues items successfully', async () => {
    const item = await offlineQueueRepository.enqueue({
      payload: 'test_payload',
      checkpoint: Checkpoint.REGISTRATION_DESK,
      volunteerId: 'vol_1',
      deviceId: 'dev_1'
    });

    expect(item).toHaveProperty('id');
    expect(item).toHaveProperty('timestamp');
    expect(item.payload).toBe('test_payload');

    const queue = await offlineQueueRepository.getQueue();
    expect(queue.length).toBe(1);
    expect(queue[0].id).toBe(item.id);
  });

  it('dequeues items correctly', async () => {
    const item1 = await offlineQueueRepository.enqueue({
      payload: 'p1', checkpoint: Checkpoint.REGISTRATION_DESK, volunteerId: 'v1', deviceId: 'd1'
    });
    const item2 = await offlineQueueRepository.enqueue({
      payload: 'p2', checkpoint: Checkpoint.REGISTRATION_DESK, volunteerId: 'v1', deviceId: 'd1'
    });

    let queue = await offlineQueueRepository.getQueue();
    expect(queue.length).toBe(2);

    await offlineQueueRepository.dequeue([item1.id]);
    queue = await offlineQueueRepository.getQueue();
    
    expect(queue.length).toBe(1);
    expect(queue[0].id).toBe(item2.id);
  });
});
