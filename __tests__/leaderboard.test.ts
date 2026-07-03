/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { buildLeaderboardState } from '../features/leaderboard/utils/leaderboardBuilder';
import { leaderboardCache } from '../features/leaderboard/utils/leaderboardCache';
import { EVENT_CONFIG } from '../config/event.config';

vi.mock('../config/event.config', () => ({
  EVENT_CONFIG: {
    tracks: [
      { id: 'trk1', name: 'Track 1' },
      { id: 'trk2', name: 'Track 2' }
    ]
  }
}));

describe('leaderboardBuilder', () => {
  it('builds overall and byTrack leaderboards', () => {
    const rawEntries = [
      { teamId: 't1', teamName: 'A', trackId: 'trk1', totalScore: 90, evaluationsCount: 1 },
      { teamId: 't2', teamName: 'B', trackId: 'trk2', totalScore: 80, evaluationsCount: 1 },
      { teamId: 't3', teamName: 'C', trackId: 'trk1', totalScore: 95, evaluationsCount: 1 }
    ];

    const state = buildLeaderboardState(rawEntries as any, 'PUBLISHED');

    expect(state.status).toBe('PUBLISHED');
    
    // Overall
    expect(state.overall.length).toBe(3);
    expect(state.overall[0].teamId).toBe('t3'); // 95
    expect(state.overall[1].teamId).toBe('t1'); // 90
    expect(state.overall[2].teamId).toBe('t2'); // 80

    // Tracks
    expect(state.byTrack['trk1'].entries.length).toBe(2);
    expect(state.byTrack['trk2'].entries.length).toBe(1);
  });
});

describe('leaderboardCache', () => {
  beforeEach(() => {
    leaderboardCache.invalidate();
  });

  it('computes initially and caches on subsequent calls', () => {
    const rawEntries = [
      { teamId: 't1', teamName: 'A', trackId: 'trk1', totalScore: 90, evaluationsCount: 1 }
    ];

    const state1 = leaderboardCache.get(rawEntries as any, 'PUBLISHED');
    const state2 = leaderboardCache.get(rawEntries as any, 'PUBLISHED');

    // Because it's a singleton instance and we are passing the same reference or returning cached
    expect(state1).toBe(state2); // Same object reference because it was cached

    leaderboardCache.invalidate();
    const state3 = leaderboardCache.get(rawEntries as any, 'PUBLISHED');
    expect(state3).not.toBe(state1); // New object reference
  });
});
