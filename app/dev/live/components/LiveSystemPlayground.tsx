'use client';

import React from 'react';
import { liveEventBus } from '@/features/live/core/eventBus';
import { LiveEventType } from '@/features/live/core/eventRegistry';
import { Button } from '@/components/primitives/button';
import { GlassCard } from '@/components/data-display/GlassCard';
import { EventState } from '@/features/admin/types';
import { ActivityFeed } from '@/features/live/components/ActivityFeed';
import { NotificationCenter } from '@/features/live/components/NotificationCenter';
import { LiveTimeline } from '@/features/live/components/LiveTimeline';
import { EventStatusIndicator } from '@/features/live/components/EventStatusIndicator';
import { SessionStatusIndicator } from '@/features/live/components/SessionStatusIndicator';

function emitMock(type: LiveEventType, payload: unknown = {}, priority: 'LOW'|'MEDIUM'|'HIGH'|'CRITICAL' = 'LOW', actor = 'Admin', target = 'System') {
  liveEventBus.emit({
    id: `evt_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    type,
    timestamp: new Date().toISOString(),
    actor,
    target,
    payload,
    priority,
    source: 'DevPlayground'
  });
}

export function LiveSystemPlayground() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* LEFT COLUMN: Controls & Timeline */}
      <div className="space-y-6">
        <GlassCard className="p-6">
          <h3 className="font-bold text-lg mb-4">Event Controls</h3>
          
          <div className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground mb-2">Activity & Leaderboard</p>
              <div className="flex flex-wrap gap-2">
                <Button size="sm" onClick={() => emitMock(LiveEventType.EVALUATION_SUBMITTED, {}, 'LOW', 'Judge Smith', 'Team Neural Ninjas')}>Mock Evaluation</Button>
                <Button size="sm" onClick={() => emitMock(LiveEventType.TASK_ASSIGNED, {}, 'LOW', 'System', 'Mentor John')}>Mock Task</Button>
                <Button size="sm" onClick={() => emitMock(LiveEventType.LEADERBOARD_PUBLISHED, {}, 'HIGH', 'Admin', 'Global Leaderboard')}>Publish Leaderboard</Button>
              </div>
            </div>

            <div>
              <p className="text-sm text-muted-foreground mb-2">Announcements & Notifications</p>
              <div className="flex flex-wrap gap-2">
                <Button size="sm" onClick={() => emitMock(LiveEventType.ANNOUNCEMENT_PUBLISHED, {}, 'MEDIUM', 'Organizers', 'All Teams')}>Mock Announcement</Button>
                <Button size="sm" onClick={() => {
                  emitMock(LiveEventType.NOTIFICATION_CREATED, {
                    id: `notif_${Date.now()}`,
                    title: 'Welcome to IKIGAI 2026!',
                    message: 'Please review the official rulebook before hacking begins.',
                    category: 'System',
                    source: 'Admin'
                  }, 'HIGH');
                }}>Mock Notification</Button>
                <Button size="sm" onClick={() => {
                  emitMock(LiveEventType.NOTIFICATION_CREATED, {
                    id: `notif_${Date.now()}`,
                    title: 'Server Maintenance',
                    message: 'The submission portal will be down for 5 minutes.',
                    category: 'Urgent',
                    source: 'DevOps',
                    actionUrl: '/dev'
                  }, 'CRITICAL');
                }}>Mock Critical Notification</Button>
              </div>
            </div>

            <div>
              <p className="text-sm text-muted-foreground mb-2">Status Overrides</p>
              <div className="flex flex-wrap gap-2">
                <Button size="sm" variant="outline" onClick={() => emitMock(LiveEventType.EVENT_STATE_CHANGED, { state: EventState.EVALUATION })}>Set Event: Evaluation</Button>
                <Button size="sm" variant="outline" onClick={() => emitMock(LiveEventType.EVENT_STATE_CHANGED, { state: EventState.RESULTS_PUBLISHED })}>Set Event: Results</Button>
                <Button size="sm" variant="outline" onClick={() => emitMock(LiveEventType.SESSION_STARTED, { id: 'session_1' })}>Start Session</Button>
                <Button size="sm" variant="outline" onClick={() => emitMock(LiveEventType.SESSION_PAUSED, { id: 'session_1' })}>Pause Session</Button>
              </div>
            </div>
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <div className="flex gap-4 flex-col">
            <EventStatusIndicator />
            <SessionStatusIndicator />
          </div>
        </GlassCard>

        <LiveTimeline />
      </div>

      {/* MIDDLE COLUMN: Activity Feed */}
      <div className="lg:col-span-1">
        <ActivityFeed />
      </div>

      {/* RIGHT COLUMN: Notifications */}
      <div className="lg:col-span-1">
        <NotificationCenter />
      </div>
    </div>
  );
}
