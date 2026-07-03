'use client';

import { GlassCard } from '@/components/data-display/GlassCard';
import { Icons } from '@/components/constants/icons';
import Link from 'next/link';
import React from 'react';
import { Button } from '@/components/primitives/button';

export function AdminQuickActions() {
  const actions = [
    { label: 'Manage Teams', icon: Icons.users, href: '/workspace/admin/teams', color: 'text-blue-400' },
    { label: 'Mentors', icon: Icons.users, href: '/workspace/admin/mentors', color: 'text-green-400' },
    { label: 'Sessions', icon: Icons.clock, href: '/workspace/admin/sessions', color: 'text-purple-400' },
    { label: 'Leaderboard', icon: Icons.star, href: '/workspace/admin/leaderboard', color: 'text-yellow-400' },
    { label: 'Settings', icon: Icons.settings, href: '/workspace/admin/settings', color: 'text-gray-400' },
    { label: 'Audit Logs', icon: Icons.shield, href: '/workspace/admin/logs', color: 'text-red-400' },
  ];

  return (
    <GlassCard className="p-6">
      <h3 className="font-semibold mb-4">Quick Navigation</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {actions.map((action, i) => (
          <Link 
            key={i}
            href={action.href}
            className="flex flex-col gap-2 p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 transition-all group"
          >
            <action.icon className={`w-5 h-5 ${action.color} group-hover:scale-110 transition-transform`} />
            <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground">{action.label}</span>
          </Link>
        ))}
      </div>
      <div className="mt-8 border-t border-white/10 pt-6">
        <h3 className="font-semibold mb-4 text-muted-foreground">Operational Triggers</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
          <Button variant="outline" size="sm" className="w-full text-[10px] uppercase">Open Reg</Button>
          <Button variant="outline" size="sm" className="w-full text-[10px] uppercase">Close Reg</Button>
          <Button variant="outline" size="sm" className="w-full text-[10px] uppercase">Open Sub</Button>
          <Button variant="outline" size="sm" className="w-full text-[10px] uppercase">Close Sub</Button>
          <Button variant="outline" size="sm" className="w-full text-[10px] uppercase bg-primary/10 text-primary hover:bg-primary/20">Pub Announce</Button>
          <Button variant="outline" size="sm" className="w-full text-[10px] uppercase bg-success/10 text-success hover:bg-success/20">Pub LBoard</Button>
          <Button variant="outline" size="sm" className="w-full text-[10px] uppercase bg-destructive/10 text-destructive hover:bg-destructive/20">Toggle Maint</Button>
        </div>
      </div>
    </GlassCard>
  );
}
