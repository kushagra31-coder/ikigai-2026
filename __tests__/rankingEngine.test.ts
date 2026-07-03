 
 
import { describe, it, expect } from 'vitest';
import { calculateRankings } from '../features/leaderboard/utils/rankingEngine';
import { breakTie } from '../features/leaderboard/utils/tieBreaker';
import { LeaderboardEntry } from '../features/leaderboard/types';

describe('tieBreaker', () => {
  const teamA: LeaderboardEntry = {
    teamId: 't1', teamName: 'Alpha', trackId: 'trk1', trackName: 'Track 1', totalScore: 100, evaluationsCount: 5, rank: 0, trend: 'NEW'
  };
  const teamB: LeaderboardEntry = {
    teamId: 't2', teamName: 'Beta', trackId: 'trk1', trackName: 'Track 1', totalScore: 100, evaluationsCount: 3, rank: 0, trend: 'NEW'
  };

  it('breaks ties using EVALUATION_COUNT (higher count wins)', () => {
    // teamA has 5 evals, teamB has 3. teamA should win (return negative)
    const result = breakTie(teamA, teamB, 'EVALUATION_COUNT');
    expect(result).toBeLessThan(0);
  });

  it('breaks ties using ALPHABETICAL (earlier letter wins)', () => {
    const result = breakTie(teamA, teamB, 'ALPHABETICAL');
    expect(result).toBeLessThan(0); // A before B
  });
});

describe('rankingEngine', () => {
  it('calculates rankings and assigns trends correctly', () => {
    const entries: LeaderboardEntry[] = [
      { teamId: 't2', teamName: 'Beta', trackId: 'trk1', trackName: 'Track 1', totalScore: 80, evaluationsCount: 2, rank: 0, trend: 'NEW', previousRank: 1 },
      { teamId: 't1', teamName: 'Alpha', trackId: 'trk1', trackName: 'Track 1', totalScore: 100, evaluationsCount: 5, rank: 0, trend: 'NEW', previousRank: 3 },
      { teamId: 't3', teamName: 'Charlie', trackId: 'trk1', trackName: 'Track 1', totalScore: 80, evaluationsCount: 4, rank: 0, trend: 'NEW' }, // tie with Beta, but more evals
    ];

    const ranked = calculateRankings(entries);

    // Alpha (100) -> 1st (was 3rd -> trend UP)
    // Charlie (80, 4 evals) -> 2nd (no prev -> trend NEW)
    // Beta (80, 2 evals) -> 3rd (was 1st -> trend DOWN)

    expect(ranked[0].teamName).toBe('Alpha');
    expect(ranked[0].rank).toBe(1);
    expect(ranked[0].trend).toBe('UP');

    expect(ranked[1].teamName).toBe('Charlie');
    expect(ranked[1].rank).toBe(2);
    expect(ranked[1].trend).toBe('NEW');

    expect(ranked[2].teamName).toBe('Beta');
    expect(ranked[2].rank).toBe(3);
    expect(ranked[2].trend).toBe('DOWN');
  });
});
