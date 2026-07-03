'use client';

import React from 'react';
import { useNotifications } from '../hooks/useNotifications';
import { GlassCard } from '@/components/data-display/GlassCard';
import { Icons } from '@/components/constants/icons';
import { Button } from '@/components/primitives/button';

export function NotificationCenter() {
  const { notifications, unreadCount, markAsRead, markAllAsRead, togglePin } = useNotifications();

  if (notifications.length === 0) {
    return (
      <GlassCard className="p-8 text-center text-muted-foreground border-dashed">
        <Icons.bell className="w-8 h-8 mx-auto mb-2 opacity-50" />
        <p>No notifications</p>
      </GlassCard>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-lg flex items-center gap-2">
          <Icons.bell className="w-5 h-5 text-primary" />
          Notifications
          {unreadCount > 0 && (
            <span className="bg-primary text-primary-foreground text-xs px-2 py-0.5 rounded-full">
              {unreadCount} new
            </span>
          )}
        </h3>
        {unreadCount > 0 && (
          <Button variant="ghost" size="sm" onClick={markAllAsRead}>
            Mark all read
          </Button>
        )}
      </div>

      <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
        {notifications.map(notification => (
          <GlassCard 
            key={notification.id} 
            className={`p-4 transition-all hover:bg-white/5 border-l-4 ${
              !notification.isRead ? 'border-primary' : 'border-transparent'
            }`}
          >
            <div className="flex justify-between items-start gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  {notification.isPinned && <Icons.star className="w-3 h-3 text-yellow-500 fill-current" />}
                  <span className={`text-xs font-bold ${getPriorityColor(notification.priority)}`}>
                    {notification.priority}
                  </span>
                  <span className="text-xs text-muted-foreground">{notification.category}</span>
                </div>
                <h4 className="font-bold text-foreground/90">{notification.title}</h4>
                <p className="text-sm text-foreground/70 mt-1">{notification.message}</p>
              </div>
              <div className="flex flex-col items-end gap-2">
                <span className="text-xs text-muted-foreground" suppressHydrationWarning>
                  {new Date(notification.createdAt).toLocaleTimeString()}
                </span>
                <div className="flex items-center gap-1">
                  <button onClick={() => togglePin(notification.id)} className="p-1 hover:text-yellow-500 transition-colors">
                    <Icons.star className={`w-4 h-4 ${notification.isPinned ? 'text-yellow-500 fill-current' : 'text-muted-foreground'}`} />
                  </button>
                  {!notification.isRead && (
                    <button onClick={() => markAsRead(notification.id)} className="p-1 hover:text-primary transition-colors">
                      <Icons.check className="w-4 h-4 text-muted-foreground" />
                    </button>
                  )}
                </div>
              </div>
            </div>
            {notification.actionUrl && (
              <div className="mt-3 pt-3 border-t border-white/5">
                <a href={notification.actionUrl} className="text-sm text-primary hover:underline flex items-center gap-1">
                  View Details <Icons.arrowRight className="w-3 h-3" />
                </a>
              </div>
            )}
          </GlassCard>
        ))}
      </div>
    </div>
  );
}

function getPriorityColor(priority: string) {
  switch (priority) {
    case 'CRITICAL': return 'text-red-500';
    case 'HIGH': return 'text-orange-500';
    case 'MEDIUM': return 'text-blue-500';
    default: return 'text-muted-foreground';
  }
}
