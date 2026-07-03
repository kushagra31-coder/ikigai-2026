'use client';

import { useMentorDashboard } from '../hooks/useMentorDashboard';
import { useAssignedTeams } from '../hooks/useAssignedTeams';
import { GlassCard } from '@/components/data-display/GlassCard';
import { Icons } from '@/components/constants/icons';
import React from 'react';
import { SessionBadge } from './Badges';
import { PendingEvaluationCard } from './PendingEvaluationCard';
import { QuickActions } from './QuickActions';

export function MentorDashboard() {
  const { data: stats, isLoading: statsLoading } = useMentorDashboard();
  const { data: teams, isLoading: teamsLoading } = useAssignedTeams();

  if (statsLoading || teamsLoading) {
    return (
      <div className="space-y-6">
        <div className="h-32 w-full rounded-2xl bg-white/5 animate-pulse" />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="h-24 rounded-xl bg-white/5 animate-pulse" />
          <div className="h-24 rounded-xl bg-white/5 animate-pulse" />
          <div className="h-24 rounded-xl bg-white/5 animate-pulse" />
          <div className="h-24 rounded-xl bg-white/5 animate-pulse" />
        </div>
      </div>
    );
  }

  if (!stats || !teams) return null;

  const pendingTeams = teams.filter(t => t.evaluationStatus !== 'SUBMITTED');

  return (
    <div className="flex flex-col gap-6">
      {/* Welcome Card */}
      <GlassCard className="p-8 border-primary/20 bg-primary/5">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h1 className="text-3xl font-bold">Welcome back, {stats.mentorName}</h1>
            <p className="text-muted-foreground mt-2">{stats.department}</p>
          </div>
          <div className="flex flex-col items-end gap-2">
            <SessionBadge status={stats.currentSession.status} />
            <div className="text-sm font-medium">Current Session: <span className="text-foreground">{stats.currentSession.name}</span></div>
            <div className="text-xs text-muted-foreground flex items-center gap-1.5">
              <Icons.clock className="w-3 h-3" />
              {new Date(stats.currentSession.startTime).toLocaleTimeString()} - {new Date(stats.currentSession.endTime).toLocaleTimeString()}
            </div>
          </div>
        </div>
      </GlassCard>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="Assigned Teams" value={stats.assignedTeamsCount} icon={Icons.users} color="text-blue-400" />
        <StatCard label="Completed" value={stats.completedEvaluations} icon={Icons.check} color="text-success" />
        <StatCard label="Pending" value={stats.pendingEvaluations} icon={Icons.clock} color="text-warning" />
        <StatCard label="Avg Score Given" value={stats.averageScoreGiven.toFixed(1)} icon={Icons.star} color="text-primary" suffix="/ 10" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 flex flex-col gap-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Icons.clock className="w-5 h-5 text-warning" /> Action Required ({pendingTeams.length})
          </h3>
          {pendingTeams.length > 0 ? (
            pendingTeams.map(team => (
              <PendingEvaluationCard key={team.id} team={team} />
            ))
          ) : (
            <GlassCard className="p-8 flex flex-col items-center justify-center text-center opacity-50">
              <Icons.check className="w-8 h-8 text-success mb-2" />
              <p className="text-sm font-medium">All evaluations completed!</p>
            </GlassCard>
          )}
        </div>
        
        <div>
          <QuickActions />
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, icon: Icon, color, suffix }: { label: string, value: string | number, icon: React.ElementType, color: string, suffix?: string }) {
  return (
    <GlassCard className="p-5 flex flex-col gap-3">
      <div className="flex items-center gap-2 text-muted-foreground">
        <Icon className={`w-4 h-4 ${color}`} />
        <span className="text-xs font-semibold uppercase tracking-wider">{label}</span>
      </div>
      <div className="text-3xl font-bold flex items-baseline gap-1">
        {value}
        {suffix && <span className="text-sm text-muted-foreground font-normal">{suffix}</span>}
      </div>
    </GlassCard>
  );
}
