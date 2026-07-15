'use client';

// Remove Metadata import as this is now a client component
import { GlassCard } from '@/components/data-display/GlassCard';
import { Icons } from '@/components/constants/icons';
import { Badge } from '@/components/primitives/badge';
import Link from 'next/link';



import { useAuthContext } from '@/components/providers/AuthProvider';

export default function DashboardPage() {
  const { role } = useAuthContext();
  
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Welcome back, {role === 'ADMIN' ? 'Admin' : 'Mentor'}.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 flex items-center gap-2 py-1.5 px-3">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            Live Session
          </Badge>
          <div className="text-sm font-mono bg-card border border-white/10 px-4 py-1.5 rounded-full">
            24:15:30 left
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Welcome & Quick Action Card */}
        <GlassCard className="lg:col-span-2 flex flex-col justify-between overflow-hidden relative">
          <div className="absolute right-0 top-0 w-64 h-64 bg-primary/20 blur-[100px] rounded-full pointer-events-none translate-x-1/3 -translate-y-1/3" />
          
          <div className="relative z-10 flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Hello! 👋</h2>
              <p className="text-muted-foreground mt-2 max-w-md text-sm leading-relaxed">
                Thank you for taking the time to evaluate our teams. Your feedback is crucial for their growth. 
                Ready to start judging?
              </p>
            </div>
            <div className="flex flex-col items-center shrink-0 w-full md:w-auto bg-black/20 p-4 rounded-xl border border-white/5">
              <span className="text-xs text-muted-foreground mb-4 font-medium uppercase tracking-wider">Quick Action</span>
              <Link 
                href="/workspace/judge" 
                className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-bold rounded-xl shadow-lg shadow-primary/20 hover:scale-105 transition-transform"
              >
                <Icons.fileText className="w-5 h-5" />
                Go to Judge Panel
              </Link>
            </div>
          </div>
        </GlassCard>

        {/* Current Session */}
        <GlassCard className="flex flex-col">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-accent/20 rounded-lg text-accent">
              <Icons.clock className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-lg">Current Phase</h3>
          </div>
          <div className="flex-1 flex flex-col justify-center">
            <h4 className="text-xl font-bold text-accent">Judging Phase</h4>
            <p className="text-sm text-muted-foreground mt-2">
              Teams have submitted their projects. Please review their MVPs and provide constructive feedback.
            </p>
            <div className="mt-6 flex items-center justify-between text-xs font-medium border-t border-white/10 pt-4">
              <span className="text-muted-foreground">Next Phase:</span>
              <span className="text-foreground">Final Results</span>
            </div>
          </div>
        </GlassCard>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <QuickActionCard 
          icon={<Icons.fileText className="w-5 h-5 text-primary" />}
          title="Judge Panel"
          desc="Evaluate teams"
          href="/workspace/judge"
        />
        <QuickActionCard 
          icon={<Icons.star className="w-5 h-5 text-success" />}
          title="Leaderboard"
          desc="View live rankings"
          href="/leaderboard"
        />
        <QuickActionCard 
          icon={<Icons.users className="w-5 h-5 text-accent" />}
          title="Profile"
          desc="Manage details"
          href="/workspace/profile"
        />
        <QuickActionCard 
          icon={<Icons.bell className="w-5 h-5 text-warning" />}
          title="Announcements"
          desc="Important updates"
          href="/workspace/announcements"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 flex flex-col gap-6">
          <GlassCard>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold flex items-center gap-2">
                <Icons.check className="w-4 h-4 text-primary" /> Judging Progress
              </h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Access the Judge Panel to see exactly which teams have been assigned to you.
            </p>
            <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
              <div 
                className="bg-primary h-full rounded-full transition-all duration-1000 w-1/4" 
              />
            </div>
          </GlassCard>
        </div>

        {/* Announcements Preview */}
        <GlassCard className="flex flex-col h-full">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-semibold flex items-center gap-2">
              <Icons.bell className="w-4 h-4 text-warning" /> Announcements
            </h3>
            <Link href="/workspace/announcements" className="text-xs text-muted-foreground hover:text-primary">View all</Link>
          </div>
          
          <div className="flex flex-col gap-4 flex-1">
            <div className="flex gap-4 p-4 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 transition-colors group cursor-pointer">
              <div className="mt-1 shrink-0">
                <div className="w-2 h-2 rounded-full bg-primary mt-1.5" />
              </div>
              <div>
                <h4 className="text-sm font-medium group-hover:text-primary transition-colors">
                  Judging is Live!
                </h4>
                <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                  Please make sure to submit your feedback before the deadline.
                </p>
              </div>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}

function QuickActionCard({ icon, title, desc, href }: { icon: React.ReactNode, title: string, desc: string, href: string }) {
  return (
    <Link href={href}>
      <GlassCard className="hover:border-primary/50 hover:bg-white/5 transition-all cursor-pointer group flex items-center gap-4 py-4 px-5">
        <div className="p-2.5 bg-white/5 rounded-xl border border-white/5 group-hover:scale-110 transition-transform">
          {icon}
        </div>
        <div>
          <h4 className="text-sm font-semibold">{title}</h4>
          <p className="text-xs text-muted-foreground">{desc}</p>
        </div>
      </GlassCard>
    </Link>
  );
}
