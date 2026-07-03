/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { describe, it, expect, vi } from 'vitest';
import { liveEventBus } from '../features/live/core/eventBus';
import { LiveEventType } from '../features/live/core/eventRegistry';
import { eventDispatcher } from '../features/live/core/eventDispatcher';

describe('eventBus', () => {
  it('throws an error if published event is missing required fields', () => {
    const invalidEvent = {
      type: LiveEventType.EVALUATION_SUBMITTED
    } as any;

    expect(() => liveEventBus.publish(invalidEvent)).toThrow('Invalid event payload structure');
  });

  it('successfully publishes and triggers subscribers', () => {
    const handler = vi.fn();
    const unsubscribe = liveEventBus.subscribe(LiveEventType.SESSION_STARTED, handler);

    const validEvent = {
      id: 'evt_1',
      type: LiveEventType.SESSION_STARTED,
      timestamp: new Date().toISOString(),
      actor: 'admin_1',
      target: 'session_1',
      payload: {},
      priority: 'HIGH',
      source: 'Admin'
    } as const;

    liveEventBus.emit(validEvent);

    expect(handler).toHaveBeenCalledWith(validEvent);

    unsubscribe();
    liveEventBus.emit(validEvent);
    expect(handler).toHaveBeenCalledTimes(1); // Should not be called again
  });

  it('supports wildcard subscriptions', () => {
    const wildcardHandler = vi.fn();
    liveEventBus.subscribe('*', wildcardHandler);

    const event = {
      id: 'evt_2',
      type: LiveEventType.NOTIFICATION_CREATED,
      timestamp: new Date().toISOString(),
      actor: 'system',
      target: 'user_1',
      payload: {},
      priority: 'LOW',
      source: 'System'
    } as const;

    liveEventBus.publish(event);
    expect(wildcardHandler).toHaveBeenCalledWith(event);
  });
});
