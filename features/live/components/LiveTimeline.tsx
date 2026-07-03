'use client';

import React from 'react';
import { useEventTimeline } from '../hooks/useEventTimeline';
import { GlassCard } from '@/components/data-display/GlassCard';
import { Icons } from '@/components/constants/icons';

export function LiveTimeline() {
  const stages = useEventTimeline();

  return (
    <div className="space-y-4">
      <h3 className="font-bold text-lg flex items-center gap-2">
        <Icons.clock className="w-5 h-5 text-primary" />
        Event Timeline
      </h3>
      <div className="relative border-l-2 border-white/10 ml-4 space-y-6 pb-4">
        {stages.map((stage) => (
          <div key={stage.id} className="relative pl-6">
            {/* Timeline Dot */}
            <div className={`absolute -left-[9px] top-1 w-4 h-4 rounded-full border-2 ${
              stage.status === 'PAST' ? 'bg-primary border-primary' : 
              stage.status === 'CURRENT' ? 'bg-background border-primary animate-pulse' : 
              'bg-background border-muted-foreground/30'
            }`} />
            
            <GlassCard className={`p-4 transition-all ${
              stage.status === 'CURRENT' ? 'border-primary shadow-[0_0_15px_rgba(var(--primary),0.2)]' : 'border-transparent'
            }`}>
              <div className="flex justify-between items-center mb-1">
                <span className={`text-xs font-bold uppercase tracking-wider ${
                  stage.status === 'PAST' ? 'text-primary/70' : 
                  stage.status === 'CURRENT' ? 'text-primary' : 
                  'text-muted-foreground'
                }`}>
                  {stage.status}
                </span>
                <span className="text-xs text-muted-foreground" suppressHydrationWarning>
                  {stage.date}
                </span>
              </div>
              <h4 className={`font-bold ${stage.status !== 'UPCOMING' ? 'text-foreground' : 'text-foreground/50'}`}>
                {stage.title}
              </h4>
            </GlassCard>
          </div>
        ))}
      </div>
    </div>
  );
}
