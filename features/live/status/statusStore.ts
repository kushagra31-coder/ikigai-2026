import { LiveEvent } from '../core/eventTypes';
import { LiveEventType } from '../core/eventRegistry';
import { liveEventBus } from '../core/eventBus';
import { EventState, SessionState } from '../../admin/types';

class StatusStore {
  private eventState: EventState = EventState.PLANNING;
  private sessionState: SessionState = SessionState.CREATED;
  
  private eventListeners: Set<(state: EventState) => void> = new Set();
  private sessionListeners: Set<(state: SessionState) => void> = new Set();

  constructor() {
    liveEventBus.subscribe(LiveEventType.EVENT_STATE_CHANGED, this.handleEventStateChanged.bind(this));
    liveEventBus.subscribe(LiveEventType.SESSION_STARTED, this.handleSessionStarted.bind(this));
    liveEventBus.subscribe(LiveEventType.SESSION_PAUSED, this.handleSessionPaused.bind(this));
    liveEventBus.subscribe(LiveEventType.SESSION_LOCKED, this.handleSessionLocked.bind(this));
  }

  private handleEventStateChanged(e: LiveEvent) {
    const payload = e.payload as { state: EventState };
    this.eventState = payload.state;
    this.eventListeners.forEach(l => l(this.eventState));
  }

  private handleSessionStarted() {
    this.sessionState = SessionState.ACTIVE;
    this.sessionListeners.forEach(l => l(this.sessionState));
  }

  private handleSessionPaused() {
    this.sessionState = SessionState.PAUSED;
    this.sessionListeners.forEach(l => l(this.sessionState));
  }

  private handleSessionLocked() {
    this.sessionState = SessionState.LOCKED;
    this.sessionListeners.forEach(l => l(this.sessionState));
  }

  subscribeEvent(listener: (state: EventState) => void) {
    this.eventListeners.add(listener);
    listener(this.eventState);
    return () => { this.eventListeners.delete(listener); };
  }

  subscribeSession(listener: (state: SessionState) => void) {
    this.sessionListeners.add(listener);
    listener(this.sessionState);
    return () => { this.sessionListeners.delete(listener); };
  }

  getEventState() {
    return this.eventState;
  }

  getSessionState() {
    return this.sessionState;
  }
}

export const statusStore = new StatusStore();
