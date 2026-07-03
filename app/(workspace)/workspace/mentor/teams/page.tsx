'use client';

import { useState } from 'react';
import { useAssignedTeams } from '@/features/mentor/hooks/useAssignedTeams';
import { AssignedTeamsTable } from '@/features/mentor/components/AssignedTeamsTable';
import { Icons } from '@/components/constants/icons';

export default function TeamsPage() {
  const { data: teams, isLoading } = useAssignedTeams();
  const [search, setSearch] = useState('');

  if (isLoading) {
    return <div className="w-full h-96 rounded-xl bg-white/5 animate-pulse" />;
  }

  const filteredTeams = teams?.filter(team => 
    team.name.toLowerCase().includes(search.toLowerCase()) ||
    team.track.toLowerCase().includes(search.toLowerCase()) ||
    team.leaderName.toLowerCase().includes(search.toLowerCase())
  ) || [];

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Assigned Teams</h1>
          <p className="text-muted-foreground mt-1">Manage and evaluate your assigned teams.</p>
        </div>
        <div className="relative w-full sm:w-72">
          <Icons.search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search teams, tracks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-background border border-white/10 rounded-lg pl-9 pr-4 py-2 text-sm focus:border-primary outline-none transition-colors"
          />
        </div>
      </div>
      
      <AssignedTeamsTable teams={filteredTeams} />
    </div>
  );
}
