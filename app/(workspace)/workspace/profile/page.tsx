'use client';

import { GlassCard } from '@/components/data-display/GlassCard';
import { Icons } from '@/components/constants/icons';
import { Button } from '@/components/primitives/button';
import { useAuthContext } from '@/components/providers/AuthProvider';

export default function ProfilePage() {
  const { profile, role } = useAuthContext();
  
  // TODO: Add backend integration for saving profile changes
  
  return (
    <div className="flex flex-col gap-6 max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
          <p className="text-muted-foreground mt-1">Manage your account information and preferences.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Team Details & Members */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <GlassCard>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-primary/20 rounded-lg text-primary">
                <Icons.shield className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-semibold">Account Status</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Role</label>
                <input 
                  type="text" 
                  value={role || 'Mentor / Judge'} 
                  disabled
                  className="w-full bg-black/20 border border-white/5 rounded-lg px-4 py-2.5 text-sm opacity-70 cursor-not-allowed text-foreground"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Access Level</label>
                <input 
                  type="text" 
                  value={role === 'ADMIN' ? 'Full Admin Access' : 'Standard Mentor Access'} 
                  disabled
                  className="w-full bg-black/20 border border-white/5 rounded-lg px-4 py-2.5 text-sm opacity-70 cursor-not-allowed text-foreground"
                />
              </div>
            </div>
          </GlassCard>

          <GlassCard>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-accent/20 rounded-lg text-accent">
                  <Icons.check className="w-5 h-5" />
                </div>
                <h2 className="text-xl font-semibold">Judging Assignments</h2>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-xl border border-white/5 bg-white/5">
                <div>
                  <h4 className="font-semibold text-sm">{profile?.tracks?.name || 'No track assigned'}</h4>
                  <p className="text-xs text-muted-foreground mt-1">You are assigned to evaluate teams in this track.</p>
                </div>
                <div className="text-xs font-medium px-3 py-1 bg-primary/20 text-primary rounded-full">
                  {profile?.assigned_track_id ? 'Active' : 'Pending'}
                </div>
              </div>
            </div>
          </GlassCard>
        </div>

        {/* Right Column - Personal Info */}
        <div className="flex flex-col gap-6">
          <GlassCard>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-success/20 rounded-lg text-success">
                <Icons.user className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-semibold">My Information</h2>
            </div>

            <div className="flex justify-center mb-8">
              <div className="relative group">
                <div className="w-24 h-24 rounded-full bg-primary/20 text-primary flex items-center justify-center text-3xl font-bold border-2 border-primary/30 relative overflow-hidden">
                  {profile?.full_name 
                    ? profile.full_name.split(' ').map((n: string) => n[0]).join('').substring(0,2).toUpperCase() 
                    : 'U'}
                </div>
              </div>
            </div>

            <div className="space-y-5">
              <div className="space-y-2">
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Full Name</label>
                <input 
                  type="text" 
                  value={profile?.full_name || ''} 
                  disabled
                  className="w-full bg-black/20 border border-white/5 rounded-lg px-4 py-2.5 text-sm opacity-70 cursor-not-allowed text-foreground"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Email</label>
                <input 
                  type="email" 
                  value={profile?.email || ''} 
                  disabled
                  className="w-full bg-black/20 border border-white/5 rounded-lg px-4 py-2.5 text-sm opacity-70 cursor-not-allowed text-foreground"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Organization / College</label>
                <input 
                  type="text" 
                  value={profile?.organization || 'IKIGAI 2026'} 
                  disabled
                  className="w-full bg-black/20 border border-white/5 rounded-lg px-4 py-2.5 text-sm opacity-70 cursor-not-allowed text-foreground"
                />
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
