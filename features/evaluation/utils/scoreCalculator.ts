import { EvaluationConfig, ScoreEntry } from '../types';

export interface ScoreCalculations {
  rawTotal: number;
  rawMax: number;
  weightedTotal: number;
  weightedMax: number;
  average: number;
  percentage: number;
  isPassing: boolean;
}

export function calculateScores(
  config: EvaluationConfig,
  scores: ScoreEntry[],
  passingThresholdPercentage: number = 50
): ScoreCalculations {
  let rawTotal = 0;
  let rawMax = 0;
  let weightedTotal = 0;
  let weightedMax = 0;

  for (const criterion of config.criteria) {
    const entry = scores.find((s) => s.criterionId === criterion.id);
    const scoreVal = entry?.score || 0;

    rawTotal += scoreVal;
    rawMax += criterion.maxScore;

    weightedTotal += scoreVal * criterion.weight;
    weightedMax += criterion.maxScore * criterion.weight;
  }

  // Calculate 10-point scale average
  const average = weightedMax > 0 ? (weightedTotal / weightedMax) * 10 : 0;
  
  // Calculate percentage
  const percentage = weightedMax > 0 ? (weightedTotal / weightedMax) * 100 : 0;

  // Pass/fail logic
  const isPassing = percentage >= passingThresholdPercentage;

  return {
    rawTotal,
    rawMax,
    weightedTotal,
    weightedMax,
    average,
    percentage,
    isPassing,
  };
}
