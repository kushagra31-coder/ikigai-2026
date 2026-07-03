import { GlassCard } from '@/components/data-display/GlassCard';
import { AssignedTeam } from '../types';
import { Icons } from '@/components/constants/icons';
import Link from 'next/link';
import { Button } from '@/components/primitives/button';

interface PendingEvaluationCardProps {
  team: AssignedTeam;
}

export function PendingEvaluationCard({ team }: PendingEvaluationCardProps) {
  return (
    <GlassCard className="p-5 flex items-center justify-between group hover:border-primary/50 transition-colors">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
          <Icons.users className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h4 className="font-semibold text-foreground">{team.name}</h4>
          <p className="text-xs text-muted-foreground mt-0.5">{team.track}</p>
        </div>
      </div>
      <Link href={`/workspace/mentor/team/${team.id}`}>
        <Button variant="primary" size="sm">Evaluate</Button>
      </Link>
    </GlassCard>
  );
}
