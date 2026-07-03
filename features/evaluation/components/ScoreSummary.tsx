'use client';

import { Icons } from '@/components/constants/icons';
import { Badge } from '@/components/primitives/badge';
import { EvaluationConfig, ScoreEntry } from '../types';
import { calculateScores } from '../utils/scoreCalculator';

interface ScoreSummaryProps {
  config: EvaluationConfig;
  scores: ScoreEntry[];
}

export function ScoreSummary({ config, scores }: ScoreSummaryProps) {
  const calculations = calculateScores(config, scores);

  return (
    <div className="bg-primary/5 border border-primary/20 rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/20 rounded-lg text-primary">
            <Icons.star className="w-5 h-5" />
          </div>
          <h3 className="font-semibold text-lg">Evaluation Summary</h3>
        </div>
        <Badge className={calculations.isPassing ? 'bg-success/20 text-success border-success/20' : 'bg-destructive/20 text-destructive border-destructive/20'}>
          {calculations.isPassing ? 'PASSING' : 'NEEDS IMPROVEMENT'}
        </Badge>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-background/50 border border-white/5 rounded-lg p-4 flex flex-col justify-center">
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">
            Raw Total
          </span>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold">{calculations.rawTotal.toFixed(1)}</span>
            <span className="text-sm text-muted-foreground">/ {calculations.rawMax}</span>
          </div>
          <span className="text-xs text-muted-foreground mt-1 font-medium">{calculations.percentage.toFixed(0)}% Overall</span>
        </div>

        <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 flex flex-col justify-center">
          <span className="text-xs font-medium text-primary uppercase tracking-wider mb-1 flex items-center gap-1.5">
            <Icons.trophy className="w-3 h-3" /> Weighted Avg
          </span>
          <div className="flex items-baseline gap-1 text-primary">
            <span className="text-3xl font-bold">{calculations.average.toFixed(2)}</span>
            <span className="text-sm opacity-70 font-medium">/ 10</span>
          </div>
        </div>
      </div>
    </div>
  );
}
