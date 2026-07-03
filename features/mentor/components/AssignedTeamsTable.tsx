'use client';

import { GlassCard } from '@/components/data-display/GlassCard';
import { AssignedTeam } from '../types';
import { SubmissionStatusBadge, EvaluationStatusBadge } from './Badges';
import { Icons } from '@/components/constants/icons';
import Link from 'next/link';

interface AssignedTeamsTableProps {
  teams: AssignedTeam[];
}

export function AssignedTeamsTable({ teams }: AssignedTeamsTableProps) {
  if (teams.length === 0) {
    return (
      <GlassCard className="py-12 flex flex-col items-center justify-center text-center">
        <Icons.users className="w-8 h-8 text-muted-foreground mb-4 opacity-50" />
        <h3 className="font-semibold text-lg">No Teams Assigned</h3>
        <p className="text-sm text-muted-foreground mt-1">You have no teams assigned for evaluation yet.</p>
      </GlassCard>
    );
  }

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full text-left text-sm whitespace-nowrap">
        <thead>
          <tr className="border-b border-white/10 text-muted-foreground">
            <th className="pb-3 px-4 font-semibold uppercase tracking-wider text-xs">Team</th>
            <th className="pb-3 px-4 font-semibold uppercase tracking-wider text-xs">Track</th>
            <th className="pb-3 px-4 font-semibold uppercase tracking-wider text-xs">Submission</th>
            <th className="pb-3 px-4 font-semibold uppercase tracking-wider text-xs">Evaluation</th>
            <th className="pb-3 px-4 font-semibold uppercase tracking-wider text-xs">Score</th>
            <th className="pb-3 px-4 font-semibold uppercase tracking-wider text-xs text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {teams.map((team) => (
            <tr key={team.id} className="group hover:bg-white/5 transition-colors">
              <td className="py-4 px-4">
                <div className="font-medium text-foreground">{team.name}</div>
                <div className="text-xs text-muted-foreground mt-0.5">{team.leaderName} • {team.membersCount} members</div>
              </td>
              <td className="py-4 px-4 text-muted-foreground">{team.track}</td>
              <td className="py-4 px-4">
                <SubmissionStatusBadge status={team.submissionStatus} />
              </td>
              <td className="py-4 px-4">
                <EvaluationStatusBadge status={team.evaluationStatus} />
              </td>
              <td className="py-4 px-4">
                {team.currentScore !== null ? (
                  <span className="font-bold text-primary">{team.currentScore.toFixed(1)} <span className="text-xs text-muted-foreground font-normal">/ 10</span></span>
                ) : (
                  <span className="text-muted-foreground">-</span>
                )}
              </td>
              <td className="py-4 px-4 text-right">
                <Link 
                  href={`/workspace/mentor/team/${team.id}`}
                  className="inline-flex items-center justify-center bg-white/5 hover:bg-white/10 text-foreground text-xs font-medium px-3 py-1.5 rounded-lg transition-colors border border-white/10"
                >
                  View Details
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
