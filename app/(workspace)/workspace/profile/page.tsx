import { Metadata } from 'next';
import { GlassCard } from '@/components/data-display/GlassCard';
import { Icons } from '@/components/constants/icons';
import { Button } from '@/components/primitives/button';

export const metadata: Metadata = {
  title: 'Profile - IKIGAI 2026',
};

export default function ProfilePage() {
  return (
    <div className="flex flex-col gap-6 max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Team Profile</h1>
          <p className="text-muted-foreground mt-1">Manage your team and personal information.</p>
        </div>
        <Button variant="primary">
          Save Changes
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Team Details & Members */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <GlassCard>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-primary/20 rounded-lg text-primary">
                <Icons.building className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-semibold">Team Details</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Team Name (Uneditable)</label>
                <input 
                  type="text" 
                  value="Neural Ninjas" 
                  disabled
                  className="w-full bg-black/20 border border-white/5 rounded-lg px-4 py-2.5 text-sm opacity-70 cursor-not-allowed text-foreground"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Hackathon Track</label>
                <input 
                  type="text" 
                  value="Artificial Intelligence" 
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
                  <Icons.users className="w-5 h-5" />
                </div>
                <h2 className="text-xl font-semibold">Members Roster</h2>
              </div>
            </div>
            
            <div className="space-y-4">
              {[
                { name: 'John Doe', role: 'Team Leader', email: 'john@example.com', self: true },
                { name: 'Jane Smith', role: 'Developer', email: 'jane@example.com', self: false },
                { name: 'Mike Ross', role: 'Designer', email: 'mike@example.com', self: false }
              ].map((member, i) => (
                <div key={i} className={`flex items-center justify-between p-4 rounded-xl border ${member.self ? 'border-primary/50 bg-primary/5' : 'border-white/5 bg-white/5'}`}>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-sm">
                      {member.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm flex items-center gap-2">
                        {member.name}
                        {member.self && <span className="text-[10px] bg-primary/20 text-primary px-1.5 py-0.5 rounded font-bold uppercase">You</span>}
                      </h4>
                      <p className="text-xs text-muted-foreground">{member.email}</p>
                    </div>
                  </div>
                  <div className="text-xs font-medium px-3 py-1 bg-white/10 rounded-full">
                    {member.role}
                  </div>
                </div>
              ))}
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
                  J
                </div>
                <button className="absolute bottom-0 right-0 p-1.5 bg-primary text-primary-foreground rounded-full shadow-lg hover:scale-110 transition-transform">
                  <Icons.upload className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="space-y-5">
              <div className="space-y-2">
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Full Name</label>
                <input 
                  type="text" 
                  defaultValue="John Doe" 
                  className="w-full bg-background border border-white/10 rounded-lg px-4 py-2.5 text-sm focus:border-primary outline-none transition-colors"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Email (Uneditable)</label>
                <input 
                  type="email" 
                  value="john@example.com" 
                  disabled
                  className="w-full bg-black/20 border border-white/5 rounded-lg px-4 py-2.5 text-sm opacity-70 cursor-not-allowed text-foreground"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Phone Number</label>
                <input 
                  type="tel" 
                  defaultValue="+1 234 567 890" 
                  className="w-full bg-background border border-white/10 rounded-lg px-4 py-2.5 text-sm focus:border-primary outline-none transition-colors"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">College / Institution</label>
                <input 
                  type="text" 
                  defaultValue="Tech University" 
                  className="w-full bg-background border border-white/10 rounded-lg px-4 py-2.5 text-sm focus:border-primary outline-none transition-colors"
                />
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
