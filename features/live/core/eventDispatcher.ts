import { LiveEvent } from './eventTypes';
import { LiveEventType } from './eventRegistry';
import { logEvent } from '../utils/eventLogger';

type EventHandler = (event: LiveEvent) => void;

class EventDispatcher {
  private listeners: Map<LiveEventType | '*', Set<EventHandler>> = new Map();

  subscribe(type: LiveEventType | '*', handler: EventHandler): () => void {
    if (!this.listeners.has(type)) {
      this.listeners.set(type, new Set());
    }
    this.listeners.get(type)!.add(handler);

    // Return unsubscribe function
    return () => this.unsubscribe(type, handler);
  }

  unsubscribe(type: LiveEventType | '*', handler: EventHandler) {
    if (this.listeners.has(type)) {
      this.listeners.get(type)!.delete(handler);
    }
  }

  emit(event: LiveEvent) {
    logEvent(event);
    
    // Notify specific event listeners
    if (this.listeners.has(event.type)) {
      this.listeners.get(event.type)!.forEach(handler => {
        try {
          handler(event);
        } catch (err) {
          console.error(`Error in event handler for ${event.type}:`, err);
        }
      });
    }

    // Notify wildcard listeners
    if (this.listeners.has('*')) {
      this.listeners.get('*')!.forEach(handler => {
        try {
          handler(event);
        } catch (err) {
          console.error(`Error in wildcard event handler:`, err);
        }
      });
    }
  }
}

export const eventDispatcher = new EventDispatcher();
