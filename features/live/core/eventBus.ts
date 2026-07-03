import { LiveEvent } from './eventTypes';
import { LiveEventType } from './eventRegistry';
import { eventDispatcher } from './eventDispatcher';

/**
 * EventBus acts as the single communication layer across all modules.
 * In the future, this class will integrate seamlessly with Supabase Realtime
 * by wrapping the underlying dispatcher with a RealtimeChannel subscription.
 */
class EventBus {
  private broadcastProvider?: (event: LiveEvent) => void;

  setBroadcastProvider(provider: (event: LiveEvent) => void) {
    this.broadcastProvider = provider;
  }

  publish(event: LiveEvent) {
    // Standard validation
    if (!event.id || !event.type || !event.timestamp || !event.actor) {
      throw new Error(`Invalid event payload structure for ${event.type}`);
    }
    
    // Dispatch locally
    eventDispatcher.emit(event);

    // If it's locally originated (not from realtime bridge) and we have a provider, broadcast it
    if (!event.source.startsWith('realtime') && this.broadcastProvider) {
      this.broadcastProvider(event);
    }
  }

  subscribe(type: LiveEventType | '*', handler: (event: LiveEvent) => void): () => void {
    return eventDispatcher.subscribe(type, handler);
  }

  unsubscribe(type: LiveEventType | '*', handler: (event: LiveEvent) => void) {
    eventDispatcher.unsubscribe(type, handler);
  }
  
  // Syntactic sugar alias for publish
  emit(event: LiveEvent) {
    this.publish(event);
  }
}

export const liveEventBus = new EventBus();
