'use client';

import React from 'react';
import { useActivityFeed } from '../hooks/useActivityFeed';
import { LiveEventType } from '../core/eventRegistry';
import { GlassCard } from '@/components/data-display/GlassCard';
import { Icons } from '@/components/constants/icons';

export function ActivityFeed() {
  const activities = useActivityFeed();

  if (activities.length === 0) {
    return (
      <GlassCard className="p-8 text-center text-muted-foreground border-dashed">
        <p>No recent activity</p>
      </GlassCard>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
        <Icons.activity className="w-5 h-5 text-primary" />
        Live Activity Feed
      </h3>
      <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
        {activities.map(activity => (
          <GlassCard key={activity.id} className="p-3 text-sm hover:bg-white/5 transition-colors">
            <div className="flex justify-between items-start mb-1">
              <span className="font-semibold text-primary/90">{formatActivityType(activity.type)}</span>
              <span className="text-xs text-muted-foreground" suppressHydrationWarning>
                {new Date(activity.timestamp).toLocaleTimeString()}
              </span>
            </div>
            <p className="text-foreground/80 break-words">
              {renderActivityMessage(activity.type, activity.actor, activity.target)}
            </p>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}

function formatActivityType(type: string): string {
  return type.replace(/_/g, ' ').replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
}

function renderActivityMessage(type: LiveEventType, actor: string, target: string): string {
  switch (type) {
    case LiveEventType.EVALUATION_SUBMITTED:
      return `${actor} submitted an evaluation for ${target}.`;
    case LiveEventType.TASK_ASSIGNED:
      return `${actor} assigned a task to ${target}.`;
    case LiveEventType.ANNOUNCEMENT_PUBLISHED:
      return `${actor} published a new announcement.`;
    case LiveEventType.LEADERBOARD_PUBLISHED:
      return `The leaderboard has been updated by ${actor}.`;
    case LiveEventType.TEAM_REGISTERED:
      return `Team ${target} has registered.`;
    case LiveEventType.SESSION_STARTED:
      return `Session ${target} has started.`;
    case LiveEventType.SESSION_PAUSED:
      return `Session ${target} is paused.`;
    default:
      return `${actor} performed ${formatActivityType(type)} on ${target}.`;
  }
}
