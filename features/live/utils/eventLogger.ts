import { LiveEvent } from '../core/eventTypes';
import { LiveEventType } from '../core/eventRegistry';

class EventHistoryManager {
  private history: LiveEvent[] = [];
  private readonly MAX_HISTORY_SIZE = 1000;

  log(event: LiveEvent) {
    this.history.unshift(event); // Newest first
    if (this.history.length > this.MAX_HISTORY_SIZE) {
      this.history.pop();
    }
    
    // In production, this might send logs to a telemetry service like Datadog
    if (process.env.NODE_ENV === 'development') {
      console.log(`[EVENT BUS] ${event.type}`, event);
    }
  }

  getNewest(): LiveEvent[] {
    return [...this.history];
  }

  getOldest(): LiveEvent[] {
    return [...this.history].reverse();
  }

  filterByType(type: LiveEventType): LiveEvent[] {
    return this.history.filter(e => e.type === type);
  }

  filterByPriority(priority: LiveEvent['priority']): LiveEvent[] {
    return this.history.filter(e => e.priority === priority);
  }

  clear() {
    this.history = [];
  }
}

export const eventHistoryManager = new EventHistoryManager();

export function logEvent(event: LiveEvent) {
  eventHistoryManager.log(event);
}
