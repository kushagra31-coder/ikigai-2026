import React from 'react';
import { LeaderboardState, LeaderboardEntry } from '@/features/leaderboard/types';
import { GlassCard } from '@/components/data-display/GlassCard';
import { Icons } from '@/components/constants/icons';

function Badge({ children, variant = 'primary', className = '' }: { children: React.ReactNode, variant?: 'primary' | 'secondary', className?: string }) {
  return (
    <span className={`px-2 py-1 text-xs font-bold rounded-full ${variant === 'primary' ? 'bg-primary/20 text-primary' : 'bg-secondary/20 text-secondary'} ${className}`}>
      {children}
    </span>
  );
}

interface LeaderboardUIProps {
  state: LeaderboardState;
  activeTrackId: string | 'ALL';
}

function TrendIcon({ trend }: { trend: LeaderboardEntry['trend'] }) {
  if (trend === 'UP') return <Icons.trendingUp className="w-4 h-4 text-green-500" />;
  if (trend === 'DOWN') return <Icons.trendingDown className="w-4 h-4 text-red-500" />;
  if (trend === 'NEW') return <Badge variant="secondary" className="text-[10px] px-1 py-0 h-4">NEW</Badge>;
  return <Icons.minus className="w-4 h-4 text-muted-foreground" />;
}

export function LeaderboardUI({ state, activeTrackId }: LeaderboardUIProps) {
  let entriesToRender: LeaderboardEntry[] = [];
  
  if (activeTrackId === 'ALL') {
    entriesToRender = state.overall;
  } else {
    entriesToRender = state.byTrack[activeTrackId]?.entries || [];
  }

  if (entriesToRender.length === 0) {
    return (
      <GlassCard className="p-12 text-center text-muted-foreground">
        <p>No teams evaluated yet.</p>
      </GlassCard>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center px-4 mb-2">
        <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Rank</span>
        <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wider flex-1 ml-8">Team</span>
        <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wider text-right w-24">Score</span>
      </div>
      
      {entriesToRender.map((entry) => (
        <GlassCard key={entry.teamId} className="p-4 flex items-center gap-4 transition-all hover:bg-white/5">
          <div className="flex items-center gap-4 w-16">
            <span className={`text-xl font-bold ${entry.rank <= 3 ? 'text-primary' : 'text-muted-foreground'}`}>
              #{entry.rank}
            </span>
            <TrendIcon trend={entry.trend} />
          </div>
          
          <div className="flex-1">
            <h3 className="font-bold text-lg">{entry.teamName}</h3>
            {activeTrackId === 'ALL' && (
              <p className="text-xs text-muted-foreground">{entry.trackName}</p>
            )}
            <p className="text-xs text-muted-foreground mt-1">Evaluations: {entry.evaluationsCount}</p>
          </div>
          
          <div className="text-right w-24">
            <span className="text-2xl font-black">{entry.totalScore.toFixed(1)}</span>
          </div>
        </GlassCard>
      ))}
    </div>
  );
}
