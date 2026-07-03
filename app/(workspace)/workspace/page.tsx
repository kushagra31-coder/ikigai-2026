import { Metadata } from 'next';
import { GlassCard } from '@/components/data-display/GlassCard';
import { Icons } from '@/components/constants/icons';
import { Badge } from '@/components/primitives/badge';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Dashboard - IKIGAI 2026',
};

export default function DashboardPage() {
  // Placeholder Data
  const teamName = "Neural Ninjas";
  const profileCompletion = 85;
  const currentSession = "Hacking Phase 1";
  const tasksPending = 3;
  const tasksCompleted = 5;
  const submissionStatus = "Drafting";
  
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground mt-1">Welcome back to IKIGAI 2026.</p>
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
        {/* Welcome & Profile Card */}
        <GlassCard className="lg:col-span-2 flex flex-col justify-between overflow-hidden relative">
          <div className="absolute right-0 top-0 w-64 h-64 bg-primary/20 blur-[100px] rounded-full pointer-events-none translate-x-1/3 -translate-y-1/3" />
          
          <div className="relative z-10 flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Hello, {teamName}! 👋</h2>
              <p className="text-muted-foreground mt-2 max-w-md text-sm leading-relaxed">
                You are currently in the <strong>{currentSession}</strong>. Keep up the momentum. Remember to complete your profile before the final submission phase.
              </p>
            </div>
            <div className="flex flex-col items-center shrink-0 w-full md:w-auto bg-black/20 p-4 rounded-xl border border-white/5">
              <span className="text-xs text-muted-foreground mb-2 font-medium uppercase tracking-wider">Profile Completion</span>
              <div className="relative flex items-center justify-center w-20 h-20">
                <svg className="w-20 h-20 -rotate-90">
                  <circle cx="40" cy="40" r="36" className="stroke-white/10 fill-none" strokeWidth="8" />
                  <circle 
                    cx="40" cy="40" r="36" 
                    className="stroke-primary fill-none transition-all duration-1000 ease-in-out" 
                    strokeWidth="8" 
                    strokeDasharray="226" 
                    strokeDashoffset={226 - (226 * profileCompletion) / 100} 
                    strokeLinecap="round" 
                  />
                </svg>
                <span className="absolute text-lg font-bold">{profileCompletion}%</span>
              </div>
              <Link href="/workspace/profile" className="text-xs text-primary mt-3 hover:underline">Complete Profile</Link>
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
            <h4 className="text-xl font-bold text-accent">{currentSession}</h4>
            <p className="text-sm text-muted-foreground mt-2">
              Focus on building your core MVP. Mentors are actively reviewing early progress.
            </p>
            <div className="mt-6 flex items-center justify-between text-xs font-medium border-t border-white/10 pt-4">
              <span className="text-muted-foreground">Next Phase:</span>
              <span className="text-foreground">Checkpoint Review</span>
            </div>
          </div>
        </GlassCard>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <QuickActionCard 
          icon={<Icons.upload className="w-5 h-5 text-primary" />}
          title="Submit Project"
          desc="Update your draft"
          href="/workspace/submission"
        />
        <QuickActionCard 
          icon={<Icons.check className="w-5 h-5 text-success" />}
          title="Tasks"
          desc={`${tasksPending} pending tasks`}
          href="/workspace/tasks"
        />
        <QuickActionCard 
          icon={<Icons.users className="w-5 h-5 text-accent" />}
          title="Team Profile"
          desc="Manage details"
          href="/workspace/profile"
        />
        <QuickActionCard 
          icon={<Icons.star className="w-5 h-5 text-warning" />}
          title="View Scores"
          desc="Check mentor feedback"
          href="/workspace/scores"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Task Summary & Submission Status */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <GlassCard>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold flex items-center gap-2">
                  <Icons.check className="w-4 h-4 text-primary" /> Task Progress
                </h3>
                <Link href="/workspace/tasks" className="text-xs text-muted-foreground hover:text-primary">View all</Link>
              </div>
              <div className="flex items-end gap-3 mb-2">
                <span className="text-4xl font-bold">{tasksCompleted}</span>
                <span className="text-sm text-muted-foreground mb-1">/ {tasksCompleted + tasksPending} completed</span>
              </div>
              <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden mt-4">
                <div 
                  className="bg-primary h-full rounded-full transition-all duration-1000" 
                  style={{ width: `${(tasksCompleted / (tasksCompleted + tasksPending)) * 100}%` }}
                />
              </div>
            </GlassCard>

            <GlassCard>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold flex items-center gap-2">
                  <Icons.upload className="w-4 h-4 text-accent" /> Submission Status
                </h3>
              </div>
              <div className="flex items-center gap-3">
                <Badge className="bg-warning/20 text-warning border-warning/20 hover:bg-warning/30 px-3 py-1 text-sm uppercase tracking-wider font-semibold">
                  {submissionStatus}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground mt-4">
                Your submission is in draft. Make sure to complete all fields before the deadline.
              </p>
            </GlassCard>
          </div>

          {/* Team Members */}
          <GlassCard>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold flex items-center gap-2">
                <Icons.users className="w-4 h-4 text-foreground" /> Team Roster
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-center gap-3 p-3 bg-white/5 border border-white/5 rounded-xl">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center font-bold text-sm border border-primary/20 shrink-0">
                    T{i}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium truncate">Member {i}</p>
                    <p className="text-xs text-muted-foreground truncate">{i === 1 ? 'Leader' : 'Developer'}</p>
                  </div>
                </div>
              ))}
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
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex gap-4 p-4 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 transition-colors group cursor-pointer">
                <div className="mt-1 shrink-0">
                  {i === 1 ? (
                    <Icons.warning className="w-5 h-5 text-destructive" />
                  ) : (
                    <div className="w-2 h-2 rounded-full bg-primary mt-1.5" />
                  )}
                </div>
                <div>
                  <h4 className="text-sm font-medium group-hover:text-primary transition-colors">
                    {i === 1 ? 'Emergency Server Maintenance' : 'Checkpoint 2 Guidelines Available'}
                  </h4>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                    Please make sure to save your work. The databases will go offline for 5 minutes...
                  </p>
                  <p className="text-[10px] text-muted-foreground mt-2">{i}h ago</p>
                </div>
              </div>
            ))}
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
