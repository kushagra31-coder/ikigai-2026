'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';

export function useRealtimeSubscription<T extends { id: string }>(
  table: string, 
  teamId?: string,
  onUpdate?: (payload: Record<string, unknown>) => void
) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    let isMounted = true;
    
    // Initial fetch (Implementation depends on the specific table)
    const fetchData = async () => {
      setLoading(true);
      try {
        let query = supabase.from(table).select('*');
        if (teamId) query = query.eq('team_id', teamId);
        
        const { data: result, error } = await query;
        if (error) throw error;
        if (isMounted) setData(result as T[]);
      } catch (e) {
        console.error(`Error fetching ${table}:`, e);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchData();

    // Realtime Subscription
    let filter = undefined;
    if (teamId) {
      filter = `team_id=eq.${teamId}`;
    }

    const subscription = supabase
      .channel(`realtime:${table}`)
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: table, filter },
        (payload) => {
          if (onUpdate) {
            onUpdate(payload);
          } else {
            // Default generic state update logic for Inserts/Updates/Deletes
            if (payload.eventType === 'INSERT') {
              setData(prev => [...prev, payload.new as T]);
            } else if (payload.eventType === 'UPDATE') {
              setData(prev => prev.map(item => item.id === payload.new.id ? payload.new as T : item));
            } else if (payload.eventType === 'DELETE') {
              setData(prev => prev.filter(item => item.id !== payload.old.id));
            }
          }
        }
      )
      .subscribe();

    return () => {
      isMounted = false;
      supabase.removeChannel(subscription);
    };
  }, [table, teamId, supabase, onUpdate]);

  return { data, loading };
}
