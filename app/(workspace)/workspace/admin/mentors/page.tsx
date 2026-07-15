'use client';

import { useState, useEffect } from 'react';
import { createClient as supabase } from '@/lib/supabase/client';
import { GlassCard } from '@/components/data-display/GlassCard';
import { Icons } from '@/components/constants/icons';
import { Button } from '@/components/primitives/button';

export default function AdminMentorsPage() {
  const [mentors, setMentors] = useState<any[]>([]);
  const [tracks, setTracks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [profilesRes, tracksRes] = await Promise.all([
        supabase().from('profiles').select('*').eq('role', 'MENTOR'),
        supabase().from('tracks').select('id, name')
      ]);

      if (profilesRes.data) setMentors(profilesRes.data);
      if (tracksRes.data) setTracks(tracksRes.data);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  const handleTrackAssign = async (mentorId: string, trackId: string) => {
    setSavingId(mentorId);
    try {
      const value = trackId === 'unassigned' ? null : trackId;
      await supabase()
        .from('profiles')
        .update({ assigned_track_id: value })
        .eq('id', mentorId);
        
      setMentors(prev => prev.map(m => m.id === mentorId ? { ...m, assigned_track_id: value } : m));
    } catch (e) {
      console.error(e);
      alert('Failed to update track assignment.');
    }
    setSavingId(null);
  };

  if (loading) return <div className="animate-pulse h-96 bg-white/5 rounded-xl w-full" />;

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Mentor Management</h1>
        <p className="text-muted-foreground mt-1">Assign Mentors to specific evaluation tracks.</p>
      </div>
      
      <GlassCard className="overflow-hidden overflow-x-auto">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead>
            <tr className="border-b border-white/10 text-muted-foreground bg-white/5">
              <th className="py-3 px-4 font-semibold uppercase tracking-wider text-xs">Mentor Name</th>
              <th className="py-3 px-4 font-semibold uppercase tracking-wider text-xs">Email</th>
              <th className="py-3 px-4 font-semibold uppercase tracking-wider text-xs">Track Assignment</th>
              <th className="py-3 px-4 font-semibold uppercase tracking-wider text-xs">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {mentors.length === 0 ? (
              <tr>
                <td colSpan={4} className="py-8 text-center text-muted-foreground">
                  No mentors found in the database.
                </td>
              </tr>
            ) : mentors.map(mentor => (
              <tr key={mentor.id} className="hover:bg-white/5">
                <td className="py-3 px-4 font-medium">{mentor.full_name || 'Unknown'}</td>
                <td className="py-3 px-4 text-muted-foreground">{mentor.email}</td>
                <td className="py-3 px-4">
                  <select 
                    className="bg-black/20 border border-white/10 rounded-md p-2 text-sm focus:border-primary outline-none min-w-[200px]"
                    value={mentor.assigned_track_id || 'unassigned'}
                    onChange={(e) => handleTrackAssign(mentor.id, e.target.value)}
                    disabled={savingId === mentor.id}
                  >
                    <option value="unassigned">-- Unassigned --</option>
                    {tracks.map(track => (
                      <option key={track.id} value={track.id}>{track.name}</option>
                    ))}
                  </select>
                </td>
                <td className="py-3 px-4">
                  {savingId === mentor.id ? (
                    <Icons.spinner className="w-4 h-4 animate-spin text-primary" />
                  ) : (
                    <Icons.check className={`w-4 h-4 ${mentor.assigned_track_id ? 'text-success' : 'text-muted-foreground/30'}`} />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </GlassCard>
    </div>
  );
}
