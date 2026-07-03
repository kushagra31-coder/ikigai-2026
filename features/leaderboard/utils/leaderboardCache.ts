import { LeaderboardState, LeaderboardEntry } from '../types';
import { buildLeaderboardState } from './leaderboardBuilder';

class LeaderboardCache {
  private cache: LeaderboardState | null = null;
  private isStale = true;

  // In a real backend, this might connect to Redis.
  // For now, this is a singleton in memory.

  get(rawEntries: Omit<LeaderboardEntry, 'rank' | 'trend'>[], status: LeaderboardState['status']): LeaderboardState {
    if (this.isStale || !this.cache) {
      this.cache = buildLeaderboardState(rawEntries, status);
      this.isStale = false;
    }
    return this.cache;
  }

  invalidate() {
    this.isStale = true;
  }

  // Future hook for WebSocket/Realtime updates
  subscribe() {
    // TODO: Phase 13
  }
}

export const leaderboardCache = new LeaderboardCache();
