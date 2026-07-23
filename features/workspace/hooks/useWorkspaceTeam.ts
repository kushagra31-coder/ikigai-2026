import { useState, useEffect } from 'react';
import { createClient as supabase } from '@/lib/supabase/client';
import { useAuthContext } from '@/components/providers/AuthProvider';

export const useWorkspaceTeam = () => {
  const { user } = useAuthContext();
  const [teamId, setTeamId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    const fetchTeamId = async () => {
      const { data, error } = await supabase()
        .from('team_members')
        .select('team_id')
        .eq('profile_id', user.id)
        .single();
        
      if (data && !error) {
        setTeamId(data.team_id);
      }
      setLoading(false);
    };

    fetchTeamId();
  }, [user]);

  return { teamId, loading };
};
