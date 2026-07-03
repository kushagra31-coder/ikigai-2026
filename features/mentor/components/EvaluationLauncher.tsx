'use client';

import { GlassCard } from '@/components/data-display/GlassCard';
import { Button } from '@/components/primitives/button';
import { Icons } from '@/components/constants/icons';
import Link from 'next/link';

interface EvaluationLauncherProps {
  teamId: string;
  teamName: string;
  evaluationStatus: string;
}

export function EvaluationLauncher({ teamId, evaluationStatus }: EvaluationLauncherProps) {
  const isComplete = evaluationStatus === 'SUBMITTED';

  return (
    <GlassCard className="p-6">
      <h3 className="font-semibold text-lg flex items-center gap-2 mb-4">
        <Icons.star className="w-5 h-5 text-warning" /> Evaluation Status
      </h3>
      
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white/5 p-4 rounded-xl border border-white/5">
        <div>
          <h4 className="font-medium text-sm">Session: Checkpoint 1</h4>
          <p className="text-xs text-muted-foreground mt-1">
            {isComplete ? 'This team has been successfully evaluated.' : 'Evaluate this team based on the criteria for this session.'}
          </p>
        </div>
        <Link href={`/workspace/mentor/evaluation?teamId=${teamId}`}>
          <Button variant={isComplete ? 'outline' : 'primary'}>
            {isComplete ? 'View Evaluation' : 'Start Evaluation'}
          </Button>
        </Link>
      </div>
    </GlassCard>
  );
}
