'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { EvaluationEngine } from '@/features/evaluation/components/EvaluationEngine';
import { DEFAULT_EVALUATION_CONFIG } from '@/features/evaluation/config/schema';
import { useAssignedTeams } from '@/features/mentor/hooks/useAssignedTeams';

function EvaluationPageContent() {
  const searchParams = useSearchParams();
  const teamId = searchParams.get('teamId');
  const { data: teams, isLoading } = useAssignedTeams();

  if (isLoading) return <div className="w-full h-[600px] rounded-xl bg-white/5 animate-pulse" />;

  const team = teams?.find(t => t.id === teamId);

  if (!teamId || !team) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <h2 className="text-2xl font-bold mb-2">No Team Selected</h2>
        <p className="text-muted-foreground">Please select a team from your assigned list to evaluate.</p>
      </div>
    );
  }

  const mockSessions = [
    { id: 'session-1', name: 'Checkpoint 1: MVP Architecture' }
  ];

  return (
    <div className="pb-12">
      <EvaluationEngine 
        config={DEFAULT_EVALUATION_CONFIG}
        teamName={team.name}
        sessions={mockSessions}
        initialStatus={team.evaluationStatus === 'SUBMITTED' ? 'SUBMITTED' : 'IDLE'}
      />
    </div>
  );
}

export default function EvaluationPage() {
  return (
    <Suspense fallback={<div className="w-full h-[600px] rounded-xl bg-white/5 animate-pulse" />}>
      <EvaluationPageContent />
    </Suspense>
  );
}
