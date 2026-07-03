'use client';

import React, { useState } from 'react';
import { leaderboardCache } from '@/features/leaderboard/utils/leaderboardCache';
import { mockRawEntries } from '@/features/leaderboard/data/mockLeaderboardData';
import { LeaderboardState } from '@/features/leaderboard/types';
import { EVENT_CONFIG } from '@/config/event.config';
import { LeaderboardUI } from './LeaderboardUI';
import { Button } from '@/components/primitives/button';

export function LeaderboardPlayground() {
  // Initialize synchronously since we have the data right here.
  // In production, this would be an async fetch.
  const [state] = useState<LeaderboardState>(() => leaderboardCache.get(mockRawEntries, 'PUBLISHED'));
  const [activeTrack, setActiveTrack] = useState<string>('ALL');

  if (!state) return <div>Loading Leaderboard...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Phase 12: Leaderboard Engine</h2>
        <div className="flex items-center gap-2">
          <Badge variant={state.status === 'PUBLISHED' ? 'primary' : 'secondary'}>
            {state.status}
          </Badge>
          <span className="text-sm text-muted-foreground" suppressHydrationWarning>
            Last updated: {new Date(state.lastUpdated).toLocaleTimeString()}
          </span>
        </div>
      </div>
      
      <div className="flex gap-2 flex-wrap pb-4 border-b border-white/10">
        <Button 
          variant={activeTrack === 'ALL' ? 'primary' : 'outline'} 
          size="sm"
          onClick={() => setActiveTrack('ALL')}
        >
          Overall Rankings
        </Button>
        {EVENT_CONFIG.tracks.map(t => (
          <Button 
            key={t.id}
            variant={activeTrack === t.id ? 'primary' : 'outline'} 
            size="sm"
            onClick={() => setActiveTrack(t.id)}
          >
            {t.name}
          </Button>
        ))}
      </div>

      <LeaderboardUI state={state} activeTrackId={activeTrack} />
    </div>
  );
}

// Inline badge for simple usage here if not imported
function Badge({ children, variant = 'primary' }: { children: React.ReactNode, variant?: 'primary' | 'secondary' }) {
  return (
    <span className={`px-2 py-1 text-xs font-bold rounded-full ${variant === 'primary' ? 'bg-primary/20 text-primary' : 'bg-secondary/20 text-secondary'}`}>
      {children}
    </span>
  );
}
