'use client';

import { useState } from 'react';
import { useAdminDashboard } from '@/features/admin/hooks/useAdminDashboard';
import { useAdminSettings } from '@/features/admin/hooks/useAdminSettings';
import { LeaderboardAdminControls } from '@/features/admin/components/LeaderboardAdminControls';
import { Icons } from '@/components/constants/icons';
import { Button } from '@/components/primitives/button';
import { createClient as supabase } from '@/lib/supabase/client';

export default function AdminPage() {
  const { data: stats, loading, refresh } = useAdminDashboard();
  const { data: settings } = useAdminSettings();
  const [announcementText, setAnnouncementText] = useState('');
  const [audience, setAudience] = useState<'ALL' | 'MENTOR'>('ALL');
  const [isBroadcasting, setIsBroadcasting] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  if (loading || !stats || !settings) {
    return (
      <div className="flex flex-col h-[calc(100vh-80px)] items-center justify-center space-y-4">
        <Icons.spinner className="w-8 h-8 animate-spin text-muted-foreground" />
        <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Initializing Telemetry...</div>
      </div>
    );
  }

  const healthyTeamsPercentage = stats.totalTeams > 0 ? Math.round((stats.totalSubmissions / stats.totalTeams) * 100) : 0;
  const pendingReviews = stats.pendingReviews;
  const judgeProgress = stats.totalSubmissions > 0 ? Math.round((stats.totalEvaluations / stats.totalSubmissions) * 100) : 0;

  const handleBroadcast = async () => {
    if (!announcementText.trim()) return;
    setIsBroadcasting(true);
    
    const { error } = await supabase().from('announcements').insert({
      title: 'Global Announcement',
      content: announcementText.trim(),
      is_published: true,
      priority: 'HIGH',
      audience
    });

    setIsBroadcasting(false);

    if (error) {
      setToast({ message: `Broadcast failed: ${error.message}`, type: 'error' });
    } else {
      setToast({ message: 'Announcement broadcasted globally.', type: 'success' });
      setAnnouncementText('');
    }
    
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <div className="flex flex-col gap-8 max-w-[1600px] mx-auto p-6 md:p-12 relative">
      {/* Toast Notification */}
      {toast && (
        <div className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 px-6 py-3 border text-xs font-mono tracking-wide uppercase flex items-center gap-3 shadow-2xl ${
          toast.type === 'error' ? 'bg-background border-red-500/50 text-red-500' : 'bg-background border-primary/50 text-primary'
        }`}>
          {toast.type === 'error' ? <Icons.error className="w-4 h-4" /> : <Icons.check className="w-4 h-4" />}
          {toast.message}
        </div>
      )}

      {/* HEADER */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-border pb-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className={`w-2 h-2 rounded-full ${settings.eventStatus === 'LIVE' ? 'bg-primary animate-pulse' : 'bg-muted-foreground'}`} />
            <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">System Status: {settings.eventStatus}</span>
          </div>
          <h1 className="text-4xl font-semibold tracking-tighter">Mission Control</h1>
        </div>
        
        <div className="flex gap-4">
          <Button variant="outline" size="sm" className="font-mono text-[10px] uppercase tracking-widest rounded-none" onClick={refresh}>
            <Icons.refreshCw className="w-3 h-3 mr-2" /> Refresh Data
          </Button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* MAIN PANEL */}
        <div className="lg:col-span-8 flex flex-col gap-8">
          
          {/* Action Required */}
          <section>
            <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-4 border-b border-border pb-2">Requires Attention</div>
            <div className="flex flex-col border border-border bg-background">
              {pendingReviews === 0 ? (
                <div className="p-8 text-center flex flex-col items-center justify-center min-h-[150px]">
                  <Icons.check className="w-6 h-6 text-primary mb-3" />
                  <div className="text-sm font-semibold">All Systems Nominal</div>
                  <div className="text-xs text-muted-foreground">No pending administrative actions required.</div>
                </div>
              ) : (
                <div className="p-8 text-center flex flex-col items-center justify-center min-h-[150px]">
                  <Icons.alert className="w-6 h-6 text-warning mb-3" />
                  <div className="text-sm font-semibold">{pendingReviews} Unassigned or Pending Submissions</div>
                  <div className="text-xs text-muted-foreground mt-2">Monitor mentors to ensure completion.</div>
                </div>
              )}
            </div>
          </section>

          {/* Announcement Composer */}
          <section>
            <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-4 border-b border-border pb-2">Announcement Composer</div>
            <div className="border border-border bg-background flex flex-col">
              <textarea 
                className="w-full bg-transparent border-none p-6 text-sm min-h-[120px] focus:outline-none focus:ring-0 resize-none placeholder:text-muted-foreground/50"
                placeholder="Type a global announcement... This will be broadcasted to all participants and judges instantly via Realtime."
                value={announcementText}
                onChange={(e) => setAnnouncementText(e.target.value)}
              />
              <div className="border-t border-border p-4 bg-muted/5 flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <span className="text-[10px] font-mono text-muted-foreground uppercase">Audience:</span>
                  <select 
                    value={audience} 
                    onChange={(e) => setAudience(e.target.value as 'ALL' | 'MENTOR')}
                    className="bg-background border border-border text-xs px-2 py-1 outline-none text-foreground"
                  >
                    <option value="ALL">Public (All Users)</option>
                    <option value="MENTOR">Mentors Only</option>
                  </select>
                </div>
                <Button 
                  size="sm" 
                  disabled={!announcementText.trim() || isBroadcasting}
                  onClick={handleBroadcast}
                  className="font-mono text-[10px] uppercase tracking-widest rounded-none bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
                >
                  {isBroadcasting ? <Icons.spinner className="w-3 h-3 mr-2 animate-spin" /> : <Icons.radio className="w-3 h-3 mr-2" />}
                  {isBroadcasting ? 'Broadcasting...' : 'Broadcast Now'}
                </Button>
              </div>
            </div>
          </section>

          {/* Leaderboard Controls (Existing component injected) */}
          <section>
            <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-4 border-b border-border pb-2">Leaderboard Mode</div>
            <div className="border border-border p-6 bg-background">
               <LeaderboardAdminControls />
            </div>
          </section>
        </div>

        {/* SIDEBAR PANEL */}
        <div className="lg:col-span-4 flex flex-col gap-8">
          
        </div>
      </div>
      
    </div>
  );
}

function TelemetryWidget({ title, value, subtext, status, icon }: { title: string, value: string, subtext: string, status: 'good' | 'warning' | 'error', icon: React.ReactNode }) {
  return (
    <div className="bg-background p-6 flex flex-col justify-between">
      <div className="flex justify-between items-start mb-6">
        <h3 className="text-sm font-semibold tracking-tight">{title}</h3>
        {icon}
      </div>
      <div>
        <div className={`text-4xl font-mono font-bold tracking-tighter mb-2 ${
          status === 'error' ? 'text-red-500' : status === 'warning' ? 'text-yellow-500' : 'text-foreground'
        }`}>
          {value}
        </div>
        <div className="text-xs text-muted-foreground leading-relaxed">{subtext}</div>
      </div>
    </div>
  );
}
