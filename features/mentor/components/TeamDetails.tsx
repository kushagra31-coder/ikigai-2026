'use client';

import { GlassCard } from '@/components/data-display/GlassCard';
import { TeamDetails as TeamDetailsType } from '../types';
import { SubmissionStatusBadge, EvaluationStatusBadge } from './Badges';
import { Icons } from '@/components/constants/icons';
import React from 'react';

interface TeamDetailsProps {
  team: TeamDetailsType;
}

export function TeamDetails({ team }: TeamDetailsProps) {
  return (
    <div className="flex flex-col gap-6">
      <GlassCard className="p-8 border-primary/20 bg-primary/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
          <Icons.users className="w-48 h-48" />
        </div>
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{team.name}</h1>
            <p className="text-muted-foreground mt-2">{team.track} Track</p>
          </div>
          <div className="flex items-center gap-3">
            <SubmissionStatusBadge status={team.submissionStatus} />
            <EvaluationStatusBadge status={team.evaluationStatus} />
          </div>
        </div>
      </GlassCard>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 flex flex-col gap-6">
          <GlassCard className="p-6">
            <h3 className="font-semibold text-lg flex items-center gap-2 mb-4">
              <Icons.users className="w-5 h-5 text-primary" /> Team Information
            </h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground block mb-1">Team Leader</span>
                <span className="font-medium">{team.leaderName}</span>
              </div>
              <div>
                <span className="text-muted-foreground block mb-1">Total Members</span>
                <span className="font-medium">{team.membersCount}</span>
              </div>
            </div>
          </GlassCard>

          <GlassCard className="p-6">
            <h3 className="font-semibold text-lg flex items-center gap-2 mb-4">
              <Icons.upload className="w-5 h-5 text-primary" /> Submission Materials
            </h3>
            
            {team.submissionStatus === 'NOT_STARTED' ? (
              <p className="text-sm text-muted-foreground opacity-70 italic">This team has not submitted any materials yet.</p>
            ) : (
              <div className="space-y-4">
                <MaterialLink label="GitHub Repository" url={team.githubUrl} icon={Icons.link} />
                <MaterialLink label="Presentation" url={team.presentationUrl} icon={Icons.link} />
                <MaterialLink label="Demo Video" url={team.videoUrl} icon={Icons.link} />
                {team.hasZipUpload && (
                  <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-white/5">
                    <div className="p-2 bg-primary/20 rounded-md"><Icons.upload className="w-4 h-4 text-primary" /></div>
                    <span className="text-sm font-medium flex-1">Source Code Archive (.zip)</span>
                    <button className="text-xs font-semibold bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded transition-colors">Download</button>
                  </div>
                )}
              </div>
            )}
          </GlassCard>
        </div>

        <div className="flex flex-col gap-6">
          <GlassCard className="p-6">
            <h3 className="font-semibold text-lg flex items-center gap-2 mb-4">
              <Icons.star className="w-5 h-5 text-warning" /> Current Score
            </h3>
            {team.currentScore !== null ? (
              <div className="flex items-baseline gap-2">
                <span className="text-5xl font-bold text-primary">{team.currentScore.toFixed(1)}</span>
                <span className="text-lg text-muted-foreground">/ 10</span>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">Not evaluated yet.</p>
            )}
          </GlassCard>
        </div>
      </div>
    </div>
  );
}

function MaterialLink({ label, url, icon: Icon }: { label: string, url?: string, icon: React.ElementType }) {
  if (!url) return null;
  return (
    <a href={url} target="_blank" rel="noreferrer" className="flex items-center gap-3 p-3 bg-white/5 hover:bg-white/10 rounded-lg border border-white/5 transition-colors group">
      <div className="p-2 bg-primary/10 group-hover:bg-primary/20 rounded-md transition-colors"><Icon className="w-4 h-4 text-primary" /></div>
      <div className="flex-1 overflow-hidden">
        <span className="text-sm font-medium block">{label}</span>
        <span className="text-xs text-muted-foreground truncate block">{url}</span>
      </div>
      <Icons.more className="w-4 h-4 text-muted-foreground" />
    </a>
  );
}
