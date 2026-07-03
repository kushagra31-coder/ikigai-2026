import { LeaderboardEntry } from '../types';

export type TieBreakStrategy = 'ALPHABETICAL' | 'EVALUATION_COUNT' | 'TIME_SUBMITTED';

export function breakTie(
  teamA: LeaderboardEntry,
  teamB: LeaderboardEntry,
  strategy: TieBreakStrategy = 'EVALUATION_COUNT'
): number {
  switch (strategy) {
    case 'EVALUATION_COUNT':
      // More evaluations = higher confidence, so they win tie-break
      if (teamA.evaluationsCount !== teamB.evaluationsCount) {
        return teamB.evaluationsCount - teamA.evaluationsCount;
      }
      // fallback to alphabetical
      return teamA.teamName.localeCompare(teamB.teamName);
      
    case 'ALPHABETICAL':
      return teamA.teamName.localeCompare(teamB.teamName);
      
    case 'TIME_SUBMITTED':
      // Not yet fully implemented, fallback to alphabetical
      return teamA.teamName.localeCompare(teamB.teamName);
      
    default:
      return 0;
  }
}
