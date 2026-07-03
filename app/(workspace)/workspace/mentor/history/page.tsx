'use client';

import { useEvaluationHistory } from '@/features/mentor/hooks/useEvaluationHistory';
import { EvaluationHistoryTable } from '@/features/mentor/components/EvaluationHistory';

export default function HistoryPage() {
  const { data: records, isLoading } = useEvaluationHistory();

  if (isLoading) return <div className="w-full h-96 rounded-xl bg-white/5 animate-pulse" />;

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Evaluation History</h1>
        <p className="text-muted-foreground mt-1">Review your past evaluations and scores.</p>
      </div>
      
      <EvaluationHistoryTable records={records || []} />
    </div>
  );
}
