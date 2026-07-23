import { useState, useEffect } from 'react';
import { createClient as supabase } from '@/lib/supabase/client';

export interface Announcement {
  id: string;
  title: string;
  content: string;
  priority: 'High' | 'Normal';
  date: string;
  isPinned: boolean;
}

export const useAnnouncements = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      setLoading(true);
      const { data, error } = await supabase()
        .from('announcements')
        .select('*')
        .order('is_pinned', { ascending: false })
        .order('created_at', { ascending: false });

      if (data && !error) {
        setAnnouncements(data.map((row: any) => ({
          id: row.id,
          title: row.title,
          content: row.content,
          priority: row.priority === 'HIGH' ? 'High' : 'Normal',
          date: row.created_at,
          isPinned: row.is_pinned,
        })));
      }
      setLoading(false);
    };

    fetchAnnouncements();

    const channel = supabase()
      .channel('public:announcements')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'announcements' }, fetchAnnouncements)
      .subscribe();

    return () => {
      supabase().removeChannel(channel);
    };
  }, []);

  return { announcements, loading };
};
