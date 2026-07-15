'use client';

import { GlassCard } from '@/components/data-display/GlassCard';
import { Icons } from '@/components/constants/icons';
import React from 'react';

export function StatCard({ label, value, icon: Icon, color, suffix }: { label: string, value: string | number, icon: React.ElementType, color: string, suffix?: string }) {
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

export function EventStatusCard({ status }: { status: string }) {
  return (
    <GlassCard className="p-6 border-primary/20 bg-primary/5 flex items-center justify-between">
      <div>
        <h2 className="text-lg font-semibold text-muted-foreground">Global Event Status</h2>
        <div className="text-2xl font-bold mt-1 text-primary">{(status || 'NOT SET').replace('_', ' ')}</div>
      </div>
      <Icons.settings className="w-12 h-12 text-primary opacity-20" />
    </GlassCard>
  );
}
