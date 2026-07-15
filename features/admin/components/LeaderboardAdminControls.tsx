'use client';

import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/primitives/card';
import { Button } from '@/components/primitives/button';
import { Icons } from '@/components/constants/icons';
import { createClient as supabase } from '@/lib/supabase/client';

export function LeaderboardAdminControls() {
  const [mode, setMode] = useState<'hidden' | 'live' | 'final'>('live');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // We assume a singleton row in `settings` table for leaderboard config.
    // If not present, we create it.
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    const { data } = await supabase()
      .from('settings')
      .select('value')
      .eq('id', 'leaderboard')
      .single();

    if (data?.value?.mode) {
      setMode(data.value.mode);
    }
  };

  const updateMode = async (newMode: 'hidden' | 'live' | 'final') => {
    setIsLoading(true);
    setMode(newMode);
    
    await supabase()
      .from('settings')
      .upsert({ id: 'leaderboard', value: { mode: newMode } });
      
    setIsLoading(false);
  };

  return (
    <Card className="border border-white/10 bg-black/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Icons.trophy className="w-5 h-5 text-primary" />
          Leaderboard Controls
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Control the visibility and status of the public leaderboard.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <Button 
            variant={mode === 'hidden' ? 'default' : 'outline'} 
            className="flex-1"
            onClick={() => updateMode('hidden')}
            disabled={isLoading}
          >
            <Icons.eyeOff className="w-4 h-4 mr-2" /> Hidden
          </Button>
          <Button 
            variant={mode === 'live' ? 'default' : 'outline'} 
            className="flex-1"
            onClick={() => updateMode('live')}
            disabled={isLoading}
          >
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse mr-2" /> Live
          </Button>
          <Button 
            variant={mode === 'final' ? 'default' : 'outline'} 
            className="flex-1"
            onClick={() => updateMode('final')}
            disabled={isLoading}
          >
            <Icons.trophy className="w-4 h-4 mr-2" /> Final
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
