import { LeaderboardEntry } from '../types';

export const mockRawEntries: Omit<LeaderboardEntry, 'rank' | 'trend'>[] = [
  {
    teamId: 'team-1',
    teamName: 'Neural Ninjas',
    trackId: 'T_AIML',
    trackName: 'Artificial Intelligence & Machine Learning',
    totalScore: 92.5,
    evaluationsCount: 3,
    previousRank: 2,
  },
  {
    teamId: 'team-2',
    teamName: 'AI Pioneers',
    trackId: 'T_AIML',
    trackName: 'Artificial Intelligence & Machine Learning',
    totalScore: 92.5,
    evaluationsCount: 2, // Less evaluations, should lose tie-breaker to team-1
    previousRank: 1,
  },
  {
    teamId: 'team-3',
    teamName: 'Visionary Tech',
    trackId: 'T_CV',
    trackName: 'Computer Vision',
    totalScore: 88.0,
    evaluationsCount: 4,
    previousRank: 3,
  },
  {
    teamId: 'team-4',
    teamName: 'Agro Innovators',
    trackId: 'T_AGRI',
    trackName: 'Agricultural Technology & Smart Farming',
    totalScore: 85.5,
    evaluationsCount: 2,
    previousRank: undefined, // New entry
  },
  {
    teamId: 'team-5',
    teamName: 'Crop AI',
    trackId: 'T_AGRI',
    trackName: 'Agricultural Technology & Smart Farming',
    totalScore: 90.0,
    evaluationsCount: 3,
    previousRank: 5,
  },
  {
    teamId: 'team-6',
    teamName: 'Sports Metrics',
    trackId: 'T_SPORTS',
    trackName: 'Sports Analytics using AI & Machine Learning',
    totalScore: 78.0,
    evaluationsCount: 1,
    previousRank: 6,
  },
  {
    teamId: 'team-7',
    teamName: 'Web Wizards',
    trackId: 'T_WEB_MOBILE',
    trackName: 'Web & Mobile Applications',
    totalScore: 95.0,
    evaluationsCount: 5,
    previousRank: 1,
  },
  {
    teamId: 'team-8',
    teamName: 'Future Forge',
    trackId: 'T_EMERGING',
    trackName: 'Emerging Technologies and Innovation',
    totalScore: 89.5,
    evaluationsCount: 3,
    previousRank: 8,
  }
];
