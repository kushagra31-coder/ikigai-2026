'use client';

import { useState, useEffect } from 'react';
import { GlassCard } from '@/components/data-display/GlassCard';
import { Button } from '@/components/primitives/button';
import { createClient as supabase } from '@/lib/supabase/client';
import { Icons } from '@/components/constants/icons';

export function LeaderboardControls() {
  const [mode, setMode] = useState<'hidden' | 'live' | 'final'>('hidden');
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    const { data } = await supabase().from('settings').select('value').eq('id', 'leaderboard').single();
    if (data?.value?.mode) {
      setMode(data.value.mode);
    }
    setLoading(false);
  };

  const updateMode = async (newMode: 'hidden' | 'live' | 'final') => {
    setLoading(true);
    const { error } = await supabase().from('settings').upsert({ id: 'leaderboard', value: { mode: newMode } });
    if (error) {
      setToast({ message: `Failed to update mode: ${error.message}`, type: 'error' });
    } else {
      setMode(newMode);
      setToast({ message: `Leaderboard mode updated to: ${newMode}`, type: 'success' });
    }
    setLoading(false);
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <div className="relative">
      {/* Toast Notification */}
      {toast && (
        <div className={`absolute -top-16 left-1/2 -translate-x-1/2 z-50 px-6 py-3 border text-xs font-mono tracking-wide uppercase flex items-center gap-3 shadow-2xl ${
          toast.type === 'error' ? 'bg-background border-red-500/50 text-red-500' : 'bg-background border-primary/50 text-primary'
        }`}>
          {toast.type === 'error' ? <Icons.error className="w-4 h-4" /> : <Icons.check className="w-4 h-4" />}
          {toast.message}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
        <ControlCard 
          title="Publish Leaderboard" 
          description="Make the leaderboard visible to all participants on the public routes."
          actionLabel={mode === 'live' ? 'Currently Live' : 'Publish to Public'}
          actionVariant={mode === 'live' ? 'success' : 'outline'}
          onClick={() => updateMode('live')}
          disabled={loading || mode === 'live'}
          icon={mode === 'live' ? <Icons.check className="w-4 h-4 mr-2" /> : null}
        />
        <ControlCard 
          title="Hide Leaderboard" 
          description="Instantly revoke public access to the leaderboard."
          actionLabel={mode === 'hidden' ? 'Currently Hidden' : 'Hide Leaderboard'}
          actionVariant={mode === 'hidden' ? 'danger' : 'outline'}
          onClick={() => updateMode('hidden')}
          disabled={loading || mode === 'hidden'}
          icon={mode === 'hidden' ? <Icons.eyeOff className="w-4 h-4 mr-2" /> : null}
        />
        <ControlCard 
          title="Finalize Standings" 
          description="Mark leaderboard as final and show trophies."
          actionLabel={mode === 'final' ? 'Currently Final' : 'Set as Final'}
          actionVariant={mode === 'final' ? 'primary' : 'outline'}
          onClick={() => updateMode('final')}
          disabled={loading || mode === 'final'}
          icon={mode === 'final' ? <Icons.trophy className="w-4 h-4 mr-2" /> : null}
        />
      </div>
    </div>
  );
}

function ControlCard({ title, description, actionLabel, actionVariant, onClick, disabled, icon }: any) {
  return (
    <GlassCard className="p-6 flex flex-col justify-between gap-4">
      <div>
        <h3 className="font-semibold text-lg">{title}</h3>
        <p className="text-sm text-muted-foreground mt-1">{description}</p>
      </div>
      <Button variant={actionVariant} className="w-full" onClick={onClick} disabled={disabled}>
        {icon}
        {actionLabel}
      </Button>
    </GlassCard>
  );
}
