import { LiveEvent } from '../core/eventTypes';
import { liveEventBus } from '../core/eventBus';

class ActivityStore {
  private activities: LiveEvent[] = [];
  private listeners: Set<(activities: LiveEvent[]) => void> = new Set();
  private readonly MAX_ACTIVITIES = 100;

  constructor() {
    // Listen to all events
    liveEventBus.subscribe('*', this.handleEvent.bind(this));
  }

  private handleEvent(event: LiveEvent) {
    // We can filter out high-volume events if we want, but for now everything is an activity
    this.activities.unshift(event);
    
    if (this.activities.length > this.MAX_ACTIVITIES) {
      this.activities.pop();
    }
    
    this.notify();
  }

  subscribe(listener: (activities: LiveEvent[]) => void) {
    this.listeners.add(listener);
    // Send immediate initial state
    listener(this.getActivities());
    
    return () => { this.listeners.delete(listener); };
  }

  private notify() {
    const current = this.getActivities();
    this.listeners.forEach(l => l(current));
  }

  getActivities() {
    return [...this.activities];
  }
}

export const activityStore = new ActivityStore();
