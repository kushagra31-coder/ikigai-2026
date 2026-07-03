import { LeaderboardEntry, LeaderboardTrackView, LeaderboardState } from '../types';
import { calculateRankings } from './rankingEngine';
import { EVENT_CONFIG } from '@/config/event.config';

export function buildLeaderboardState(
  rawEntries: Omit<LeaderboardEntry, 'rank' | 'trend'>[],
  status: LeaderboardState['status']
): LeaderboardState {
  // Calculate overall rankings
  const overallRanked = calculateRankings(rawEntries as LeaderboardEntry[]);

  // Build byTrack mapping using official tracks
  const byTrack: Record<string, LeaderboardTrackView> = {};
  
  EVENT_CONFIG.tracks.forEach(track => {
    const trackEntries = rawEntries.filter(e => e.trackId === track.id);
    const trackRanked = calculateRankings(trackEntries as LeaderboardEntry[]);
    
    byTrack[track.id] = {
      trackId: track.id,
      trackName: track.name,
      entries: trackRanked,
      lastUpdated: new Date().toISOString(),
    };
  });

  return {
    overall: overallRanked,
    byTrack,
    status,
    lastUpdated: new Date().toISOString(),
  };
}
