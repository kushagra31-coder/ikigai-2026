'use client';

import { GlassCard } from '@/components/data-display/GlassCard';
import { Button } from '@/components/primitives/button';

export function LeaderboardControls() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <ControlCard 
        title="Publish Leaderboard" 
        description="Make the leaderboard visible to all participants on the public routes."
        actionLabel="Publish to Public"
        actionVariant="success"
      />
      <ControlCard 
        title="Hide Leaderboard" 
        description="Instantly revoke public access to the leaderboard."
        actionLabel="Hide Leaderboard"
        actionVariant="danger"
      />
      <ControlCard 
        title="Freeze Scores" 
        description="Stop realtime score updates from incoming evaluations."
        actionLabel="Freeze Realtime"
        actionVariant="outline"
      />
      <ControlCard 
        title="Reset Standings" 
        description="Clear all accumulated points. This cannot be undone."
        actionLabel="Reset Everything"
        actionVariant="destructive"
      />
      <ControlCard 
        title="Export CSV" 
        description="Download a full audit trail of all final team scores."
        actionLabel="Download CSV"
        actionVariant="primary"
      />
      <ControlCard 
        title="Live Preview" 
        description="View the leaderboard exactly as participants see it."
        actionLabel="Open Preview"
        actionVariant="outline"
      />
    </div>
  );
}

function ControlCard({ title, description, actionLabel, actionVariant }: { title: string, description: string, actionLabel: string, actionVariant: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | "primary" | "success" | "danger" | null | undefined }) {
  return (
    <GlassCard className="p-6 flex flex-col justify-between gap-4">
      <div>
        <h3 className="font-semibold text-lg">{title}</h3>
        <p className="text-sm text-muted-foreground mt-1">{description}</p>
      </div>
      <Button variant={actionVariant} className="w-full">{actionLabel}</Button>
    </GlassCard>
  );
}
