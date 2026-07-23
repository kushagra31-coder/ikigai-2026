'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  const [submission, setSubmission] = useState<{ presentation_url: string | null; demo_video_url: string | null } | null>(null);
  const [submissionLoading, setSubmissionLoading] = useState(false);

  useEffect(() => {
    fetchTeams();
  }, []);

  const fetchTeams = async () => {
    const { data: { session } } = await supabase().auth.getSession();
    const mentorId = session?.user?.id;
    
    if (mentorId) {
      const { data: profile } = await supabase()
        .from('profiles')
        .select('assigned_track_id')
        .eq('id', mentorId)
        .single();
        
      if (profile && profile.assigned_track_id) {
        setAssignedTrackId(profile.assigned_track_id);
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
        setAssignedTrackId(null);
        setTeams([]);
      }
    }
  };

  const handleScoreSubmit = async () => {
    if (!selectedTeam) return;
    setIsLoading(true);
    
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
      setToast({ message: 'Evaluation failed: Submission missing.', type: 'error' });
      setIsLoading(false);
      return;
    }

    const { data: { session } } = await supabase().auth.getSession();
    const mentorId = session?.user?.id;
    
    if (!mentorId) {
      setToast({ message: 'Authentication required to transmit scores.', type: 'error' });
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
      setToast({ message: 'Telemetry synchronized successfully.', type: 'success' });
      setTimeout(() => setToast(null), 3000);
      
      // Auto-advance to next team in queue
      const currentIndex = teams.findIndex(t => t.id === selectedTeam);
      if (currentIndex !== -1 && currentIndex < teams.length - 1) {
        setSelectedTeam(teams[currentIndex + 1].id);
        setScores({ innovation: 0, technical: 0, impact: 0, presentation: 0, feedback: '' });
      } else {
        setSelectedTeam(null);
      }
    }
  };

  const updateScore = (field: keyof typeof scores, value: number) => {
    if (value >= 0 && value <= 10) {
      setScores(prev => ({ ...prev, [field]: value }));
    }
  };

  useEffect(() => {
    if (selectedTeam) {
      fetchSubmissionDetails(selectedTeam);
    } else {
      setSubmission(null);
    }
  }, [selectedTeam]);

  const fetchSubmissionDetails = async (teamId: string) => {
    setSubmissionLoading(true);
    const { data } = await supabase()
      .from('submissions')
      .select('presentation_url, demo_video_url')
      .eq('team_id', teamId)
      .limit(1)
      .single();
    
    setSubmission(data || null);
    setSubmissionLoading(false);
  };

  const activeTeamData = teams.find(t => t.id === selectedTeam);
  const totalScore = scores.innovation + scores.technical + scores.impact + scores.presentation;

  return (
    <div className="flex h-[calc(100vh-80px)] w-full overflow-hidden bg-background">
      
      {/* LEFT PANE: QUEUE */}
      <div className="w-1/3 min-w-[350px] max-w-[450px] border-r border-border flex flex-col bg-background z-10">
        <div className="p-6 border-b border-border bg-muted/5">
          <div className="flex items-center gap-3 mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Evaluation Queue</span>
          </div>
          <h2 className="text-2xl font-semibold tracking-tight">{activeTrack}</h2>
          <div className="text-xs text-muted-foreground mt-2 font-mono">{teams.length} Pending Submissions</div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {!assignedTrackId ? (
            <div className="flex flex-col items-center justify-center h-full p-8 text-center border-b border-border bg-muted/5">
              <Icons.shield className="w-6 h-6 text-muted-foreground mb-4 opacity-50" />
              <div className="text-sm font-medium tracking-tight mb-2">Clearance Required</div>
              <div className="text-xs text-muted-foreground">You are not assigned to a judging track. Please contact operations.</div>
            </div>
          ) : teams.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full p-8 text-center">
              <Icons.inbox className="w-6 h-6 text-muted-foreground mb-4 opacity-50" />
              <div className="text-sm font-medium tracking-tight mb-2">Queue Empty</div>
              <div className="text-xs text-muted-foreground">Awaiting team submissions for your track.</div>
            </div>
          ) : (
            <div className="flex flex-col divide-y divide-border border-b border-border">
              {teams.map((team, idx) => (
                <button
                  key={team.id}
                  onClick={() => setSelectedTeam(team.id)}
                  className={`text-left p-5 transition-colors duration-150 flex items-center justify-between group ${
                    selectedTeam === team.id 
                      ? 'bg-primary/10' 
                      : 'hover:bg-muted/10'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`text-xs font-mono font-bold ${selectedTeam === team.id ? 'text-primary' : 'text-muted-foreground'}`}>
                      {String(idx + 1).padStart(2, '0')}
                    </div>
                    <div>
                      <div className="font-semibold text-sm tracking-tight">{team.name}</div>
                      <div className="text-[10px] font-mono text-muted-foreground mt-1 uppercase tracking-widest">
                        Pending Review
                      </div>
                    </div>
                  </div>
                  <Icons.chevronRight className={`w-4 h-4 ${selectedTeam === team.id ? 'text-primary' : 'text-transparent group-hover:text-muted-foreground'} transition-colors`} />
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* RIGHT PANE: EVALUATION WORKSTATION */}
      <div className="flex-1 flex flex-col bg-muted/5 relative overflow-hidden">
        
        {/* Toast Notification */}
        <AnimatePresence>
          {toast && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`absolute top-6 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-none border text-xs font-mono tracking-wide uppercase flex items-center gap-3 shadow-2xl ${
                toast.type === 'error' ? 'bg-background border-red-500/50 text-red-500' : 'bg-background border-primary/50 text-primary'
              }`}
            >
              {toast.type === 'error' ? <Icons.error className="w-4 h-4" /> : <Icons.check className="w-4 h-4" />}
              {toast.message}
            </motion.div>
          )}
        </AnimatePresence>

        {!selectedTeam ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-12">
            <Icons.activity className="w-12 h-12 text-muted-foreground mb-6 opacity-20" />
            <h3 className="text-xl font-semibold tracking-tight mb-2">Evaluation Workstation Idle</h3>
            <p className="text-sm text-muted-foreground max-w-md">
              Select a team from the queue to initiate the scoring sequence. The rubric will load automatically.
            </p>
          </div>
        ) : (
          <motion.div 
            key={selectedTeam} 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="flex-1 flex flex-col h-full overflow-hidden"
          >
            
            {/* Workstation Header */}
            <div className="px-8 py-6 border-b border-border bg-background flex items-center justify-between shrink-0">
              <div>
                <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-2">Current Target</div>
                <h2 className="text-3xl font-semibold tracking-tighter">{activeTeamData?.name}</h2>
              </div>
              <div className="text-right">
                <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-2">Total Score</div>
                <div className="text-4xl font-mono font-bold text-primary">{totalScore.toString().padStart(2, '0')}</div>
              </div>
            </div>

            {/* Workstation Body - Scrollable */}
            <div className="flex-1 overflow-y-auto p-8 flex flex-col gap-12">
              
              {/* Submission Evidence */}
              <section>
                <div className="flex items-center gap-3 mb-6">
                  <Icons.github className="w-4 h-4 text-muted-foreground" />
                  <h3 className="text-sm font-semibold uppercase tracking-widest text-foreground font-mono">Submission Evidence</h3>
                </div>
                <div className="border border-border bg-background p-8 flex flex-col items-center justify-center min-h-[200px] text-center">
                  {submissionLoading ? (
                    <Icons.spinner className="w-6 h-6 animate-spin text-muted-foreground" />
                  ) : submission && (submission.presentation_url || submission.demo_video_url) ? (
                    <div className="flex gap-4">
                      {submission.presentation_url && (
                        <a href={submission.presentation_url} target="_blank" rel="noopener noreferrer">
                          <Button variant="outline" size="sm" className="font-mono text-xs uppercase tracking-widest">
                            View Presentation
                          </Button>
                        </a>
                      )}
                      {submission.demo_video_url && (
                        <a href={submission.demo_video_url} target="_blank" rel="noopener noreferrer">
                          <Button variant="outline" size="sm" className="font-mono text-xs uppercase tracking-widest">
                            View Demo Video
                          </Button>
                        </a>
                      )}
                    </div>
                  ) : (
                    <>
                      <div className="text-sm text-muted-foreground mb-4">No presentation or repository links provided by the team yet.</div>
                      <Button variant="outline" size="sm" className="font-mono text-xs uppercase tracking-widest" disabled>
                        View Repository (Unavailable)
                      </Button>
                    </>
                  )}
                </div>
              </section>

              {/* Rubric */}
              <section>
                <div className="flex items-center gap-3 mb-6">
                  <Icons.check className="w-4 h-4 text-muted-foreground" />
                  <h3 className="text-sm font-semibold uppercase tracking-widest text-foreground font-mono">Evaluation Rubric</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-px border border-border bg-border">
                  <ScoreWidget 
                    label="Innovation" 
                    desc="Creativity and originality" 
                    value={scores.innovation} 
                    onChange={(v) => updateScore('innovation', v)} 
                  />
                  <ScoreWidget 
                    label="Technical" 
                    desc="Implementation quality" 
                    value={scores.technical} 
                    onChange={(v) => updateScore('technical', v)} 
                  />
                  <ScoreWidget 
                    label="Impact" 
                    desc="Social or market potential" 
                    value={scores.impact} 
                    onChange={(v) => updateScore('impact', v)} 
                  />
                  <ScoreWidget 
                    label="Presentation" 
                    desc="Pitch clarity" 
                    value={scores.presentation} 
                    onChange={(v) => updateScore('presentation', v)} 
                  />
                </div>
              </section>

              {/* Feedback */}
              <section>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <Icons.fileText className="w-4 h-4 text-muted-foreground" />
                    <h3 className="text-sm font-semibold uppercase tracking-widest text-foreground font-mono">Internal Feedback</h3>
                  </div>
                  <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">Auto-saving</span>
                </div>
                <textarea 
                  className="w-full bg-background border border-border p-6 text-sm min-h-[160px] focus:outline-none focus:border-primary transition-colors resize-none placeholder:text-muted-foreground/50"
                  placeholder="Record your justification for the provided scores. This feedback is immutable once submitted..."
                  value={scores.feedback}
                  onChange={(e) => setScores(prev => ({ ...prev, feedback: e.target.value }))}
                />
              </section>

            </div>

            {/* Footer Action */}
            <div className="p-6 border-t border-border bg-background shrink-0">
              <Button 
                onClick={handleScoreSubmit}
                disabled={isLoading || totalScore === 0}
                className="w-full h-14 text-sm font-semibold uppercase tracking-widest rounded-none bg-primary text-primary-foreground hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2"><Icons.spinner className="w-4 h-4 animate-spin" /> Transmitting Telemetry...</span>
                ) : (
                  <span className="flex items-center gap-2"><Icons.check className="w-4 h-4" /> Transmit Evaluation</span>
                )}
              </Button>
            </div>

          </motion.div>
        )}
      </div>

    </div>
  );
}

function ScoreWidget({ label, desc, value, onChange }: { label: string, desc: string, value: number, onChange: (v: number) => void }) {
  return (
    <div className="bg-background p-8 flex flex-col justify-between group">
      <div className="mb-8">
        <h4 className="text-base font-semibold tracking-tight mb-2">{label}</h4>
        <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
      </div>
      <div className="flex items-center justify-between">
        <button 
          onClick={() => onChange(value - 1)} 
          className="w-10 h-10 border border-border flex items-center justify-center text-muted-foreground hover:border-foreground hover:text-foreground transition-colors font-mono text-lg"
        >-</button>
        <div className="text-3xl font-mono font-bold text-foreground w-16 text-center">{value}</div>
        <button 
          onClick={() => onChange(value + 1)} 
          className="w-10 h-10 border border-border flex items-center justify-center text-muted-foreground hover:border-primary hover:text-primary transition-colors font-mono text-lg"
        >+</button>
      </div>
    </div>
  );
}
