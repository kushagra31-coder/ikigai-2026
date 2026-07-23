'use client';

import Link from 'next/link';
import { Icons } from '@/components/constants/icons';
import { Badge } from '@/components/primitives/badge';
import { Button } from '@/components/primitives/button';
import { useAuthContext } from '@/components/providers/AuthProvider';
import { useState, useEffect } from 'react';

export default function DashboardPage() {
  const { role, profile } = useAuthContext();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial load for loading state demonstration
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col max-w-6xl mx-auto w-full pb-16 pt-8 px-4 md:px-0">
      {/* Top Header / Command Area */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
        <div className="flex flex-col gap-1">
          <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20 flex items-center gap-2 w-fit mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            <span className="font-mono text-[9px] uppercase tracking-widest">Live: Judging Phase</span>
          </Badge>
          <h1 className="text-3xl font-semibold tracking-tight text-foreground">
            {profile?.full_name?.split(' ')[0] || (role === 'ADMIN' ? 'Admin Workspace' : 'Judge Workspace')}
          </h1>
          <p className="text-sm text-muted-foreground">
            {role === 'ADMIN' ? 'Manage event operations and teams.' : 'Your pending evaluations and schedule.'}
          </p>
        </div>
        
        <div className="flex w-full md:w-auto items-center gap-3">
          {/* Command Palette Trigger */}
          <button 
            onClick={() => document.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', ctrlKey: true }))}
            className="flex items-center justify-between w-full sm:w-64 px-4 py-2 bg-muted/20 border border-border rounded-lg text-sm text-muted-foreground hover:bg-muted/40 transition-colors focus:outline-none focus:ring-1 focus:ring-primary/50"
          >
            <div className="flex items-center gap-2">
              <Icons.search className="w-4 h-4" />
              <span>Search platform...</span>
            </div>
            <kbd className="hidden sm:inline-flex items-center gap-1 font-mono text-[10px] bg-background px-1.5 py-0.5 rounded border border-border">
              <span>Ctrl</span>K
            </kbd>
          </button>
        </div>
      </header>

      {isLoading ? (
        <div className="animate-pulse space-y-8">
          <div className="h-32 bg-muted/20 rounded-xl border border-border" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="col-span-2 h-64 bg-muted/20 rounded-xl border border-border" />
            <div className="col-span-1 h-64 bg-muted/20 rounded-xl border border-border" />
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-12">
          {/* Primary Action / Progress Header */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-px bg-border border border-border rounded-xl overflow-hidden shadow-sm">
            <div className="col-span-1 md:col-span-3 bg-background p-6 md:p-8 flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-4">
                <Icons.fileText className="w-4 h-4 text-primary" />
                <span className="text-xs font-mono font-semibold uppercase tracking-widest text-muted-foreground">Evaluation Required</span>
              </div>
              <h2 className="text-xl font-semibold tracking-tight text-foreground mb-2">0 teams await your review</h2>
              <p className="text-sm text-muted-foreground mb-6 max-w-lg">
                Your queue is currently empty. The system will notify you when new submissions are assigned to your panel.
              </p>
              <div>
                <Button disabled asChild size="default" className="h-10 px-6 shadow-sm transition-transform hover:scale-[0.98] opacity-50 cursor-not-allowed">
                  <span>Start Evaluations</span>
                </Button>
              </div>
            </div>
            
            <div className="col-span-1 bg-muted/10 p-6 md:p-8 flex flex-col justify-center border-l border-border">
              <div className="text-xs text-muted-foreground uppercase tracking-widest font-mono mb-2">Your Progress</div>
              <div className="flex items-baseline gap-1 mb-4">
                <span className="text-4xl font-semibold tracking-tight text-foreground">0</span>
                <span className="text-sm text-muted-foreground font-mono">/ 0</span>
              </div>
              <div className="w-full bg-border h-2 rounded-full overflow-hidden mb-6">
                <div className="bg-primary h-full rounded-full transition-all w-[0%]" />
              </div>
              <div className="text-[10px] text-muted-foreground uppercase tracking-widest font-mono opacity-50">Deadline: Pending</div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Task List / Queue */}
            <div className="lg:col-span-8 flex flex-col gap-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold tracking-tight text-foreground">Priority Queue</h3>
                <Link href="/workspace/judge" className="text-xs font-medium text-primary hover:underline">View All</Link>
              </div>
              
              <div className="flex flex-col border border-border rounded-xl overflow-hidden bg-muted/5 shadow-sm min-h-[300px] items-center justify-center p-8 text-center">
                <Icons.inbox className="w-8 h-8 text-muted-foreground mb-4 opacity-50" />
                <h4 className="text-base font-semibold text-foreground tracking-tight mb-2">Queue Empty</h4>
                <p className="text-sm text-muted-foreground max-w-sm">
                  You have no pending evaluations. Submissions will appear here once assigned to you.
                </p>
              </div>
            </div>

            {/* Sidebar Area */}
            <div className="lg:col-span-4 flex flex-col gap-10">
              {/* Quick Links */}
              <div className="flex flex-col gap-3">
                <h3 className="text-sm font-semibold text-foreground tracking-tight">Quick Links</h3>
                <div className="flex flex-col gap-2">
                  <SidebarLink icon={<Icons.trophy className="w-4 h-4" />} title="Live Leaderboard" href="/leaderboard" />
                  <SidebarLink icon={<Icons.fileText className="w-4 h-4" />} title="Judging Rubric" href="/rulebook" />
                  <SidebarLink icon={<Icons.settings className="w-4 h-4" />} title="Workspace Settings" href="/workspace/profile" />
                </div>
              </div>

              {/* System Log / Authenticity */}
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-foreground tracking-tight">System Log</h3>
                </div>
                
                <div className="flex flex-col gap-5 p-8 border border-border rounded-xl bg-muted/5 shadow-sm min-h-[200px] items-center justify-center text-center">
                  <Icons.activity className="w-6 h-6 text-muted-foreground mb-3 opacity-50" />
                  <div className="text-xs font-mono text-muted-foreground uppercase tracking-widest">No recent alerts</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function SidebarLink({ icon, title, href }: { icon: React.ReactNode, title: string, href: string }) {
  return (
    <Link href={href} className="flex items-center gap-3 px-4 py-3 rounded-lg border border-border bg-background hover:border-primary/30 hover:bg-primary/5 transition-colors group shadow-sm">
      <div className="text-muted-foreground group-hover:text-primary transition-colors">
        {icon}
      </div>
      <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">{title}</span>
    </Link>
  );
}
