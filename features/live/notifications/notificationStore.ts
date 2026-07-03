import { LiveEvent } from '../core/eventTypes';
import { LiveEventType } from '../core/eventRegistry';
import { liveEventBus } from '../core/eventBus';

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  isRead: boolean;
  isPinned: boolean;
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  expiresAt?: string;
  category: string;
  source: string;
  actionUrl?: string;
  createdAt: string;
}

class NotificationStore {
  private notifications: AppNotification[] = [];
  private listeners: Set<(notifications: AppNotification[]) => void> = new Set();

  constructor() {
    liveEventBus.subscribe(LiveEventType.NOTIFICATION_CREATED, this.handleNewNotification.bind(this));
  }

  private handleNewNotification(event: LiveEvent) {
    const payload = event.payload as AppNotification;
    this.notifications.unshift({ ...payload, isRead: false, createdAt: event.timestamp });
    this.cleanupExpired();
    this.notify();
  }

  markAsRead(id: string) {
    const idx = this.notifications.findIndex(n => n.id === id);
    if (idx > -1) {
      this.notifications[idx].isRead = true;
      this.notify();
    }
  }

  markAllAsRead() {
    this.notifications.forEach(n => (n.isRead = true));
    this.notify();
  }

  togglePin(id: string) {
    const idx = this.notifications.findIndex(n => n.id === id);
    if (idx > -1) {
      this.notifications[idx].isPinned = !this.notifications[idx].isPinned;
      this.notify();
    }
  }

  private cleanupExpired() {
    const now = new Date().getTime();
    this.notifications = this.notifications.filter(n => {
      if (!n.expiresAt) return true;
      return new Date(n.expiresAt).getTime() > now;
    });
  }

  subscribe(listener: (notifications: AppNotification[]) => void) {
    this.listeners.add(listener);
    listener(this.getNotifications());
    return () => { this.listeners.delete(listener); };
  }

  private notify() {
    this.listeners.forEach(l => l(this.getNotifications()));
  }

  getNotifications() {
    // Sort pinned first, then by date descending
    return [...this.notifications].sort((a, b) => {
      if (a.isPinned && !b.isPinned) return -1;
      if (!a.isPinned && b.isPinned) return 1;
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }
}

export const notificationStore = new NotificationStore();
