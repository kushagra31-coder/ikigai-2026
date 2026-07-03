/* eslint-disable @typescript-eslint/no-explicit-any */
 
import { describe, it, expect } from 'vitest';
import { calculateScores } from '../features/evaluation/utils/scoreCalculator';

describe('scoreCalculator', () => {
  const mockConfig = {
    id: 'cfg1',
    name: 'Hackathon Eval',
    version: '1.0',
    criteria: [
      { id: 'c1', name: 'Innovation', maxScore: 10, weight: 2 },
      { id: 'c2', name: 'Execution', maxScore: 10, weight: 1 }
    ]
  };

  it('calculates scores correctly with all criteria met', () => {
    const scores = [
      { criterionId: 'c1', score: 8, comment: '' },
      { criterionId: 'c2', score: 7, comment: '' }
    ];

    const result = calculateScores(mockConfig as any, scores);

    // rawTotal: 8 + 7 = 15
    // rawMax: 10 + 10 = 20
    // weightedTotal: (8*2) + (7*1) = 16 + 7 = 23
    // weightedMax: (10*2) + (10*1) = 20 + 10 = 30
    // percentage: (23/30) * 100 = 76.666...
    // average: 7.666...
    
    expect(result.rawTotal).toBe(15);
    expect(result.rawMax).toBe(20);
    expect(result.weightedTotal).toBe(23);
    expect(result.weightedMax).toBe(30);
    expect(result.percentage).toBeCloseTo(76.666, 2);
    expect(result.average).toBeCloseTo(7.666, 2);
    expect(result.isPassing).toBe(true);
  });

  it('handles missing scores as zero', () => {
    const scores = [
      { criterionId: 'c1', score: 8, comment: '' }
    ];

    const result = calculateScores(mockConfig as any, scores);

    expect(result.rawTotal).toBe(8);
    expect(result.weightedTotal).toBe(16);
  });

  it('handles failing scores based on threshold', () => {
    const scores = [
      { criterionId: 'c1', score: 2, comment: '' },
      { criterionId: 'c2', score: 2, comment: '' }
    ];

    const result = calculateScores(mockConfig as any, scores, 50);

    expect(result.isPassing).toBe(false);
  });
});
