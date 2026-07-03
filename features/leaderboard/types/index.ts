export interface LeaderboardEntry {
  teamId: string;
  teamName: string;
  trackId: string;
  trackName: string;
  totalScore: number;
  evaluationsCount: number;
  rank: number;
  previousRank?: number;
  trend: 'UP' | 'DOWN' | 'SAME' | 'NEW';
}

export interface LeaderboardTrackView {
  trackId: string;
  trackName: string;
  entries: LeaderboardEntry[];
  lastUpdated: string;
}

export interface LeaderboardState {
  overall: LeaderboardEntry[];
  byTrack: Record<string, LeaderboardTrackView>;
  status: 'PREVIEW' | 'PUBLISHED' | 'FROZEN';
  lastUpdated: string;
}
