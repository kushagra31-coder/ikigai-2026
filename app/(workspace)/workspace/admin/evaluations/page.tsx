'use client';

import { useState, useEffect } from 'react';
import { createClient as supabase } from '@/lib/supabase/client';
import { GlassCard } from '@/components/data-display/GlassCard';

export default function AdminEvaluationsPage() {
  const [evaluations, setEvaluations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvaluations();

    const channel = supabase()
      .channel(`admin:evaluations:${Math.random()}`)
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'evaluations' },
        () => {
          fetchEvaluations();
        }
      )
      .subscribe();

    return () => {
      supabase().removeChannel(channel);
    };
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this evaluation? This will recalculate the team's score.")) return;
    
    await supabase().from('evaluations').delete().eq('id', id);
    // The realtime subscription will automatically refresh the list!
  };

  const fetchEvaluations = async () => {
    setLoading(true);
    // Fetch evaluations, joining with submissions(teams(name, tracks(name))), and profiles(full_name) for mentors
    const { data } = await supabase()
      .from('evaluations')
      .select(`
        id,
        score_innovation,
        score_technical,
        score_impact,
        score_presentation,
        feedback,
        created_at,
        mentor:profiles!mentor_id(full_name, email),
        submission:submissions!submission_id(
          team:teams(name, tracks(name))
        )
      `)
      .order('created_at', { ascending: false });

    if (data) {
      setEvaluations(data);
    }
    setLoading(false);
  };

  if (loading) return <div className="animate-pulse h-96 bg-white/5 rounded-xl w-full" />;

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Evaluations Monitor</h1>
        <p className="text-muted-foreground mt-1">Review all scores submitted by mentors in real-time.</p>
      </div>
      
      <GlassCard className="overflow-hidden overflow-x-auto">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead>
            <tr className="border-b border-white/10 text-muted-foreground bg-white/5">
              <th className="py-3 px-4 font-semibold uppercase tracking-wider text-xs">Time</th>
              <th className="py-3 px-4 font-semibold uppercase tracking-wider text-xs">Mentor</th>
              <th className="py-3 px-4 font-semibold uppercase tracking-wider text-xs">Team & Track</th>
              <th className="py-3 px-4 font-semibold uppercase tracking-wider text-xs">Scores</th>
              <th className="py-3 px-4 font-semibold uppercase tracking-wider text-xs">Feedback</th>
              <th className="py-3 px-4 font-semibold uppercase tracking-wider text-xs text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {evaluations.length === 0 ? (
              <tr><td colSpan={5} className="py-8 text-center text-muted-foreground">No evaluations submitted yet.</td></tr>
            ) : evaluations.map(ev => {
              const totalScore = ev.score_innovation + ev.score_technical + ev.score_impact + ev.score_presentation;
              const teamData = Array.isArray(ev.submission?.team) ? ev.submission.team[0] : ev.submission?.team;
              const trackData = Array.isArray(teamData?.tracks) ? teamData.tracks[0] : teamData?.tracks;
              const mentorData = Array.isArray(ev.mentor) ? ev.mentor[0] : ev.mentor;
              
              return (
                <tr key={ev.id} className="hover:bg-white/5">
                  <td className="py-3 px-4 text-muted-foreground">
                    {new Date(ev.created_at).toLocaleString([], { hour: '2-digit', minute: '2-digit', month: 'short', day: 'numeric' })}
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-medium">{mentorData?.full_name || 'Unknown Mentor'}</div>
                    <div className="text-xs text-muted-foreground">{mentorData?.email}</div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-medium">{teamData?.name || 'Unknown Team'}</div>
                    <div className="text-[10px] text-muted-foreground px-2 py-0.5 bg-white/5 rounded-md inline-block mt-1">
                      {trackData?.name || 'No Track'}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-primary">{totalScore}</span>
                      <span className="text-xs text-muted-foreground">/ 40</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="max-w-[200px] truncate text-muted-foreground text-xs" title={ev.feedback}>
                      {ev.feedback || 'No feedback provided.'}
                    </div>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button 
                      onClick={() => handleDelete(ev.id)}
                      className="text-xs text-red-400 hover:text-red-300 transition-colors"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </GlassCard>
    </div>
  );
}
