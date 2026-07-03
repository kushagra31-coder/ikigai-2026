'use client';

import { LeaderboardControls } from '@/features/admin/components/LeaderboardControls';

export default function AdminLeaderboardPage() {
  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-yellow-400">Leaderboard Operations</h1>
        <p className="text-muted-foreground mt-1">Control visibility, freeze states, and manage final exports.</p>
      </div>
      
      <LeaderboardControls />
    </div>
  );
}
