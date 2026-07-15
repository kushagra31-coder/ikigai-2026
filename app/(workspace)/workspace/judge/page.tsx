'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/primitives/card';
import { Icons } from '@/components/constants/icons';
import { createClient as supabase } from '@/lib/supabase/client';
import { Button } from '@/components/primitives/button';

export default function JudgePanel() {
  const [teams, setTeams] = useState<any[]>([]);
  const [assignedTrackId, setAssignedTrackId] = useState<string | null>(null);
  const [activeTrack, setActiveTrack] = useState<string>('All Tracks');
  const [selectedTeam, setSelectedTeam] = useState<string | null>(null);
  const [scores, setScores] = useState({
    innovation: 0,
    technical: 0,
    impact: 0,
    presentation: 0,
    feedback: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    fetchTeams();
  }, []);

  const fetchTeams = async () => {
    const { data: { session } } = await supabase().auth.getSession();
    const mentorId = session?.user?.id;
    
    if (mentorId) {
      // Get mentor's assigned track
      const { data: profile } = await supabase()
        .from('profiles')
        .select('assigned_track_id')
        .eq('id', mentorId)
        .single();
        
      if (profile && profile.assigned_track_id) {
        setAssignedTrackId(profile.assigned_track_id);
        
        // Fetch teams that ONLY belong to this track
        // We filter by checking if the team's track_id matches.
        // Wait, teams doesn't have track_id directly, they have a relationship.
        // Let's just fetch all teams and filter in JS for now, or join.
        const { data } = await supabase().from('teams').select('id, name, tracks!inner(id, name)');
        if (data) {
          const filteredTeams = data.filter(t => 
            Array.isArray(t.tracks) 
              ? t.tracks.some((tr: any) => tr.id === profile.assigned_track_id)
              : (t.tracks as any)?.id === profile.assigned_track_id
          );
          setTeams(filteredTeams);
          
          if (filteredTeams.length > 0) {
            const trackName = Array.isArray(filteredTeams[0].tracks) 
                ? filteredTeams[0].tracks[0].name 
                : (filteredTeams[0].tracks as any).name;
            setActiveTrack(trackName);
          }
        }
      } else {
        // Mentor not assigned to any track
        setAssignedTrackId(null);
        setTeams([]);
      }
    }
  };

  const handleScoreSubmit = async () => {
    if (!selectedTeam) return;
    setIsLoading(true);
    
    // First, find or create a dummy submission for this team if needed
    // In our DB schema, evaluations link to submissions, not directly to teams
    let { data: subData } = await supabase()
      .from('submissions')
      .select('id')
      .eq('team_id', selectedTeam)
      .limit(1)
      .single();

    let submissionId = subData?.id;

    if (!submissionId) {
      const { data: newSub } = await supabase()
        .from('submissions')
        .insert({ team_id: selectedTeam, status: 'SUBMITTED' })
        .select()
        .single();
      submissionId = newSub?.id;
    }

    if (!submissionId) {
      setToast({ message: 'Failed to find/create submission', type: 'error' });
      setIsLoading(false);
      return;
    }

    // Get current user (mentor)
    const { data: { session } } = await supabase().auth.getSession();
    const mentorId = session?.user?.id;
    
    if (!mentorId) {
      setToast({ message: 'You must be logged in as a mentor to submit scores.', type: 'error' });
      setIsLoading(false);
      return;
    }

    const { error } = await supabase()
      .from('evaluations')
      .upsert({
        submission_id: submissionId,
        mentor_id: mentorId,
        score_innovation: scores.innovation,
        score_technical: scores.technical,
        score_impact: scores.impact,
        score_presentation: scores.presentation,
        feedback: scores.feedback,
        status: 'SUBMITTED'
      }, { onConflict: 'submission_id,mentor_id' });

    setIsLoading(false);

    if (error) {
      setToast({ message: error.message, type: 'error' });
    } else {
      setToast({ message: 'Score submitted successfully!', type: 'success' });
      setTimeout(() => setToast(null), 3000);
    }
  };

  const updateScore = (field: keyof typeof scores, value: number) => {
    if (value >= 0 && value <= 10) {
      setScores(prev => ({ ...prev, [field]: value }));
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Judge Panel</h1>
          <p className="text-muted-foreground mt-2">Evaluate and score team submissions.</p>
        </div>
        <Icons.fileText className="w-8 h-8 text-primary" />
      </div>

      {toast && (
        <div className={`p-4 rounded-md flex items-center gap-2 ${toast.type === 'error' ? 'bg-red-500/10 text-red-500' : 'bg-green-500/10 text-green-500'}`}>
          {toast.type === 'error' ? <Icons.error className="w-5 h-5" /> : <Icons.success className="w-5 h-5" />}
          {toast.message}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Teams to Judge</CardTitle>
            <div className="mt-4">
              <select 
                className="w-full p-2 rounded-md bg-background border border-white/10 text-sm opacity-50 cursor-not-allowed"
                value={activeTrack}
                disabled
                title="You can only judge teams in your assigned track."
              >
                <option value={activeTrack}>{activeTrack}</option>
              </select>
            </div>
          </CardHeader>
          <CardContent className="space-y-2 max-h-[500px] overflow-y-auto pr-2">
            {!assignedTrackId ? (
              <div className="p-4 bg-orange-500/10 border border-orange-500/20 text-orange-500 rounded-lg text-sm flex flex-col gap-2">
                <strong>Access Restricted</strong>
                You have not been assigned to a specific track yet. Please contact the administrator.
              </div>
            ) : teams.length === 0 ? (
              <p className="text-sm text-muted-foreground">No teams found in your assigned track.</p>
            ) : (
              teams.map((team) => (
                <button
                  key={team.id}
                  onClick={() => setSelectedTeam(team.id)}
                  className={`w-full text-left p-3 rounded-lg border transition-all ${
                    selectedTeam === team.id 
                      ? 'border-primary bg-primary/10' 
                      : 'border-white/5 hover:bg-white/5'
                  }`}
                >
                  <div className="font-semibold text-sm">{team.name}</div>
                  <div className="text-xs text-muted-foreground mt-1">{team.tracks?.name || 'No Track'}</div>
                </button>
              ))
            )}
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>
              {selectedTeam 
                ? `Scoring: ${teams.find(t => t.id === selectedTeam)?.name}` 
                : 'Select a team to score'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {!selectedTeam ? (
              <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
                <Icons.users className="w-12 h-12 mb-4 opacity-20" />
                <p>Please select a team from the list.</p>
              </div>
            ) : (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <ScoreInput 
                    label="Innovation" 
                    desc="Creativity and originality" 
                    value={scores.innovation} 
                    onChange={(v) => updateScore('innovation', v)} 
                  />
                  <ScoreInput 
                    label="Technical" 
                    desc="Implementation quality" 
                    value={scores.technical} 
                    onChange={(v) => updateScore('technical', v)} 
                  />
                  <ScoreInput 
                    label="Impact" 
                    desc="Social or market potential" 
                    value={scores.impact} 
                    onChange={(v) => updateScore('impact', v)} 
                  />
                  <ScoreInput 
                    label="Presentation" 
                    desc="Pitch clarity" 
                    value={scores.presentation} 
                    onChange={(v) => updateScore('presentation', v)} 
                  />
                </div>

                <div className="pt-4 border-t border-white/10">
                  <div className="flex justify-between items-center bg-black/20 p-4 rounded-lg">
                    <span className="font-semibold text-muted-foreground">Total Score</span>
                    <span className="text-3xl font-mono font-bold text-primary">
                      {scores.innovation + scores.technical + scores.impact + scores.presentation} <span className="text-sm text-muted-foreground">/ 40</span>
                    </span>
                  </div>
                </div>

                <div className="space-y-2 pt-4">
                  <label className="text-sm font-medium">Feedback / Comments</label>
                  <textarea 
                    className="w-full bg-black/20 border border-white/10 rounded-md p-3 text-sm min-h-[100px] focus:outline-none focus:border-primary"
                    placeholder="Leave constructive feedback for the team..."
                    value={scores.feedback}
                    onChange={(e) => setScores(prev => ({ ...prev, feedback: e.target.value }))}
                  />
                </div>

                <Button 
                  className="w-full h-12 text-lg font-bold" 
                  onClick={handleScoreSubmit}
                  disabled={isLoading}
                >
                  {isLoading ? <Icons.spinner className="w-5 h-5 animate-spin mr-2" /> : <Icons.check className="w-5 h-5 mr-2" />}
                  Submit Evaluation
                </Button>
              </motion.div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function ScoreInput({ label, desc, value, onChange }: { label: string, desc: string, value: number, onChange: (v: number) => void }) {
  return (
    <div className="p-4 border border-white/5 bg-white/5 rounded-xl space-y-3">
      <div>
        <h4 className="font-semibold">{label}</h4>
        <p className="text-xs text-muted-foreground">{desc}</p>
      </div>
      <div className="flex items-center gap-3">
        <button 
          onClick={() => onChange(value - 1)} 
          className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition"
        >-</button>
        <div className="text-xl font-mono font-bold w-8 text-center">{value}</div>
        <button 
          onClick={() => onChange(value + 1)} 
          className="w-8 h-8 rounded-full bg-primary/20 text-primary hover:bg-primary/30 flex items-center justify-center transition"
        >+</button>
      </div>
    </div>
  );
}
