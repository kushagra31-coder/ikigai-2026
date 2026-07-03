import { LeaderboardEntry } from '../types';
import { breakTie, TieBreakStrategy } from './tieBreaker';

export function calculateRankings(
  entries: LeaderboardEntry[],
  strategy: TieBreakStrategy = 'EVALUATION_COUNT'
): LeaderboardEntry[] {
  // 1. Sort the entries by total score (descending), then apply tie breaker
  const sorted = [...entries].sort((a, b) => {
    if (a.totalScore !== b.totalScore) {
      return b.totalScore - a.totalScore;
    }
    return breakTie(a, b, strategy);
  });

  // 2. Assign ranks and trends
  return sorted.map((entry, index) => {
    const newRank = index + 1;
    
    let trend: LeaderboardEntry['trend'] = 'SAME';
    if (!entry.previousRank) {
      trend = 'NEW';
    } else if (newRank < entry.previousRank) {
      trend = 'UP';
    } else if (newRank > entry.previousRank) {
      trend = 'DOWN';
    }

    return {
      ...entry,
      rank: newRank,
      trend,
    };
  });
}
