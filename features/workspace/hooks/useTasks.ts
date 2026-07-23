import { useState, useEffect } from 'react';
import { createClient as supabase } from '@/lib/supabase/client';

export interface Task {
  id: string;
  team_id: string;
  mentor_id: string;
  title: string;
  description: string;
  status: string;
  due_date: string;
  created_at: string;
  mentor?: {
    full_name: string;
  };
}

export const useTasks = (teamId: string | null) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!teamId) {
      setTasks([]);
      setLoading(false);
      return;
    }

    const fetchTasks = async () => {
      setLoading(true);
      const { data, error } = await supabase()
        .from('tasks')
        .select(`
          *,
          mentor:mentor_id(full_name)
        `)
        .eq('team_id', teamId)
        .order('due_date', { ascending: true });

      if (data && !error) {
        setTasks(data as unknown as Task[]);
      }
      setLoading(false);
    };

    fetchTasks();

    // Subscribe to realtime updates for tasks
    const channel = supabase()
      .channel(`team_tasks_${teamId}`)
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'tasks', filter: `team_id=eq.${teamId}` },
        () => fetchTasks()
      )
      .subscribe();

    return () => {
      supabase().removeChannel(channel);
    };
  }, [teamId]);

  const toggleTaskStatus = async (taskId: string, currentStatus: string) => {
    const newStatus = currentStatus === 'PENDING' ? 'COMPLETED' : 'PENDING';
    await supabase()
      .from('tasks')
      .update({ status: newStatus })
      .eq('id', taskId);
  };

  return { tasks, loading, toggleTaskStatus };
};
