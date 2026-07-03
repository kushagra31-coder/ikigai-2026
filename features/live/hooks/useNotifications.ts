'use client';

import { useState, useEffect } from 'react';
import { notificationStore, AppNotification } from '../notifications/notificationStore';

export function useNotifications() {
  const [notifications, setNotifications] = useState<AppNotification[]>([]);

  useEffect(() => {
    return notificationStore.subscribe((newNotifications) => {
      setNotifications(newNotifications);
    });
  }, []);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return {
    notifications,
    unreadCount,
    markAsRead: (id: string) => notificationStore.markAsRead(id),
    markAllAsRead: () => notificationStore.markAllAsRead(),
    togglePin: (id: string) => notificationStore.togglePin(id)
  };
}
