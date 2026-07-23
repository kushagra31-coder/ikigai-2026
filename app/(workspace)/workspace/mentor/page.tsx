'use client';

import { useState, useEffect, useCallback } from 'react';
import { createClient as supabase } from '@/lib/supabase/client';
import { Icons } from '@/components/constants/icons';
import { Button } from '@/components/primitives/button';
import { mentorRepository } from '@/features/mentor/repository/mentor.repository';
import { createPlaceholderSubmission } from './actions';

/**
 * Judging criteria — aligned with IKIGAI 2026 Rulebook (rulebook.config.ts):
 *   Technical Excellence  30%  → score_technical  (0–30)
 *   Innovation & Creativity 25% → score_innovation (0–25)
 *   Problem Relevance     20%  → score_impact     (0–20)  [maps to "impact / relevance"]
 *   Overall Impact        15%  → score_presentation (0–15) [maps to "presentation / impact"]
 *   User Experience       10%  → (combined into presentation in 4-field schema)
 *
 * The DB schema has 4 score columns (total = 40 max for equal weights).
 * We scale weights to fit: max per criterion proportional to rulebook weight.
 */
const CRITERIA = [
  { key: 'score_technical',    label: 'Technical Excellence',   max: 30, weight: '30%', db: 'score_technical'    },
  { key: 'score_innovation',   label: 'Innovation & Creativity',max: 25, weight: '25%', db: 'score_innovation'   },
  { key: 'score_impact',       label: 'Problem Relevance',      max: 20, weight: '20%', db: 'score_impact'       },
  { key: 'score_presentation', label: 'Presentation & Impact',  max: 15, weight: '15%', db: 'score_presentation' },
] as const;

type CriterionKey = typeof CRITERIA[number]['key'];
type ScoreMap = Record<CriterionKey, number>;

const DEFAULT_SCORES: ScoreMap = {
  score_technical: 0,
  score_innovation: 0,
  score_impact: 0,
  score_presentation: 0,
};

export default function MentorPage() {
  const [profile, setProfile] = useState<any>(null);
  const [teams, setTeams] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [announcements, setAnnouncements] = useState<any[]>([]);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [hasUnread, setHasUnread] = useState(false);

  const [selectedTeam, setSelectedTeam] = useState<any | null>(null);
  const [scores, setScores] = useState<ScoreMap>({ ...DEFAULT_SCORES });
  const [feedback, setFeedback] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null);

  const [searchQuery, setSearchQuery] = useState('');

  const showToast = (msg: string, type: 'success' | 'error') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 4000);
  };

  const loadData = useCallback(async () => {
    setIsLoading(true);

    // Parallel: profile + assigned teams + recent announcements
    const [profileResult, teamsResult, announcementsResp] = await Promise.all([
      mentorRepository.getProfile(),
      mentorRepository.getAssignedTeams(),
      supabase()
        .from('announcements')
        .select('id, title, content, created_at, priority, audience')
        .eq('is_published', true)
        .in('audience', ['ALL', 'MENTOR'])
        .order('created_at', { ascending: false })
        .limit(5),
    ]);

    if (profileResult.success) setProfile(profileResult.data);
    if (teamsResult.success) setTeams(teamsResult.data);
    if (announcementsResp.data) {
      setAnnouncements(announcementsResp.data);
      if (announcementsResp.data.length > 0) setHasUnread(true);
    }

    setIsLoading(false);
  }, []);

  useEffect(() => {
    loadData();

    // Realtime: refresh teams when any evaluation changes
    const evalChannel = supabase()
      .channel('mentor:evaluations')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'evaluations' }, () => {
        loadData();
      })
      .subscribe();

    // Realtime: live announcements banner
    const announcementChannel = supabase()
      .channel('mentor:announcements')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'announcements' }, (payload) => {
        if (payload.new?.is_published && (payload.new?.audience === 'ALL' || payload.new?.audience === 'MENTOR')) {
          setAnnouncements(prev => [payload.new, ...prev].slice(0, 5));
          setHasUnread(true);
        }
      })
      .subscribe();

    return () => {
      supabase().removeChannel(evalChannel);
      supabase().removeChannel(announcementChannel);
    };
  }, [loadData]);

  const handleSelectTeam = (team: any) => {
    setSelectedTeam(team);
    if (team.evaluation) {
      setScores({
        score_technical:    team.evaluation.score_technical    ?? 0,
        score_innovation:   team.evaluation.score_innovation   ?? 0,
        score_impact:       team.evaluation.score_impact       ?? 0,
        score_presentation: team.evaluation.score_presentation ?? 0,
      });
      setFeedback(team.evaluation.feedback || '');
    } else {
      setScores({ ...DEFAULT_SCORES });
      setFeedback('');
    }
  };

  const handleSave = async () => {
    const { data: { user } } = await supabase().auth.getUser();
    if (!user) {
      showToast('Session expired. Please refresh.', 'error');
      return;
    }

    setIsSaving(true);

    let submissionId = selectedTeam?.submission?.id;

    // If the team has no submission, create a placeholder using a Server Action (bypasses RLS)
    if (!submissionId) {
      const res = await createPlaceholderSubmission(selectedTeam.id);

      if (!res.success) {
        showToast(`Failed to initialize evaluation record: ${res.error}`, 'error');
        setIsSaving(false);
        return;
      }
      submissionId = res.submissionId;
    }


    const total = Object.values(scores).reduce((sum, v) => sum + v, 0);

    const payload = {
      submission_id:      submissionId,
      mentor_id:          user.id,
      score_innovation:   scores.score_innovation,
      score_technical:    scores.score_technical,
      score_impact:       scores.score_impact,
      score_presentation: scores.score_presentation,
      feedback,
      status: 'COMPLETED',
    };

    let error;
    if (selectedTeam.evaluation?.id) {
      ({ error } = await supabase().from('evaluations').update(payload).eq('id', selectedTeam.evaluation.id));
    } else {
      ({ error } = await supabase().from('evaluations').insert(payload));
    }

    setIsSaving(false);

    if (error) {
      showToast(`Save failed: ${error.message}`, 'error');
    } else {
      showToast('Evaluation saved successfully.', 'success');

      // Auto-advance to next pending team
      const currentIdx = teams.findIndex(t => t.id === selectedTeam.id);
      const nextPending = teams.slice(currentIdx + 1).find(t => t.evaluationStatus === 'PENDING');
      if (nextPending) {
        handleSelectTeam(nextPending);
      } else {
        setSelectedTeam(null);
      }

      loadData();
    }
  };

  // Derived stats
  const completed = teams.filter(t => t.evaluationStatus === 'COMPLETED').length;
  const pending = teams.filter(t => t.evaluationStatus === 'PENDING').length;
  const progress = teams.length > 0 ? Math.round((completed / teams.length) * 100) : 0;

  const filteredTeams = teams
    .filter(t => {
      if (!searchQuery) return true;
      const tokens = searchQuery.toLowerCase().split(/\s+/).filter(Boolean);
      const text = `${t.name} ${t.trackName} ${t.evaluationStatus}`.toLowerCase();
      return tokens.every(token => text.includes(token));
    })
    .sort((a, b) => {
      // PENDING teams first, then COMPLETED
      if (a.evaluationStatus === 'PENDING' && b.evaluationStatus !== 'PENDING') return -1;
      if (a.evaluationStatus !== 'PENDING' && b.evaluationStatus === 'PENDING') return 1;
      // If both have same status, keep original order (or sort by name)
      return a.name.localeCompare(b.name);
    });

  const totalScore = Object.values(scores).reduce((sum, v) => sum + v, 0);
  const maxScore = CRITERIA.reduce((sum, c) => sum + c.max, 0);

  if (isLoading) {
    return (
      <div className="flex flex-col h-[calc(100vh-80px)] items-center justify-center gap-4">
        <Icons.spinner className="w-8 h-8 animate-spin text-muted-foreground" />
        <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Loading Judge Panel...</div>
      </div>
    );
  }

  if (!profile?.assigned_track_id) {
    return (
      <div className="flex flex-col h-[calc(100vh-80px)] items-center justify-center gap-4 text-center max-w-md mx-auto">
        <Icons.alert className="w-10 h-10 text-warning" />
        <h2 className="text-xl font-semibold tracking-tight">No Track Assigned</h2>
        <p className="text-muted-foreground text-sm leading-relaxed">
          You have not been assigned a judging track yet.
          Contact the event administrator to complete your setup.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-0 h-[calc(100vh-80px)] bg-background text-foreground relative overflow-hidden">

      {/* Toast */}
      {toast && (
        <div className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 px-6 py-3 border text-xs font-mono tracking-wide uppercase flex items-center gap-3 shadow-2xl ${
          toast.type === 'error' ? 'bg-background border-red-500/50 text-red-500' : 'bg-background border-primary/50 text-primary'
        }`}>
          {toast.type === 'error' ? <Icons.error className="w-4 h-4" /> : <Icons.check className="w-4 h-4" />}
          {toast.msg}
        </div>
      )}


      <header className="px-6 py-4 border-b border-border shrink-0">
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                Judge Panel Active
              </span>
            </div>
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-semibold tracking-tight">
                {profile?.full_name || 'Mentor'}
              </h1>
              {/* Notification Bell */}
              <div className="relative">
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="rounded-full w-8 h-8 relative"
                  onClick={() => {
                    setIsNotificationsOpen(!isNotificationsOpen);
                    setHasUnread(false);
                  }}
                >
                  <Icons.bell className="w-4 h-4" />
                  {hasUnread && (
                    <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                  )}
                </Button>

                {isNotificationsOpen && (
                  <div className="absolute top-full left-0 mt-2 w-80 bg-background border border-border rounded-lg shadow-2xl z-50 overflow-hidden">
                    <div className="p-3 border-b border-border bg-muted/5 font-semibold text-sm">
                      Announcements
                    </div>
                    <div className="max-h-[300px] overflow-y-auto">
                      {announcements.length === 0 ? (
                        <div className="p-4 text-xs text-muted-foreground text-center">No announcements yet.</div>
                      ) : (
                        announcements.map((ann, idx) => (
                          <div key={idx} className="p-4 border-b border-border/50 hover:bg-white/5 transition-colors">
                            <div className="flex justify-between items-start mb-1">
                              <h4 className="text-sm font-semibold">{ann.title}</h4>
                              {ann.audience === 'MENTOR' && (
                                <span className="text-[9px] bg-primary/20 text-primary px-1.5 py-0.5 rounded font-mono uppercase tracking-wider">Admin to Mentor</span>
                              )}
                            </div>
                            <p className="text-xs text-muted-foreground leading-relaxed">{ann.content}</p>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mt-1">
              Track: {profile?.track_name || teams[0]?.track || 'Loading...'}
            </div>
          </div>

          {/* Progress Stats */}
          <div className="flex items-end gap-8">
            <div className="text-right">
              <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-1">Pending</div>
              <div className="text-3xl font-mono font-bold text-warning">{pending}</div>
            </div>
            <div className="text-right">
              <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-1">Completed</div>
              <div className="text-3xl font-mono font-bold text-primary">{completed}</div>
            </div>
            <div className="text-right min-w-[120px]">
              <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-1">Progress</div>
              <div className="flex items-center gap-2">
                <div className="flex-1 h-1.5 bg-border rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <span className="text-xs font-mono font-bold">{progress}%</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main 3-column layout */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-0 min-h-0 overflow-hidden">

        {/* ─── LEFT: Team List ─── */}
        <div className="lg:col-span-4 flex flex-col border-r border-border min-h-0">
          <div className="p-3 border-b border-border shrink-0">
            <div className="relative">
              <Icons.search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search teams..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full bg-transparent border border-border px-9 py-2 text-xs font-mono focus:outline-none focus:border-primary text-foreground"
              />
            </div>
          </div>

          {filteredTeams.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-6 gap-3">
              <Icons.users className="w-8 h-8 text-muted-foreground opacity-40" />
              <div className="text-sm text-muted-foreground">
                {teams.length === 0 ? 'No teams assigned to your track yet.' : 'No teams match your search.'}
              </div>
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto divide-y divide-border">
              {filteredTeams.map(team => (
                <button
                  key={team.id}
                  onClick={() => handleSelectTeam(team)}
                  className={`w-full p-4 text-left transition-colors duration-150 flex justify-between items-center ${
                    selectedTeam?.id === team.id
                      ? 'bg-primary/10 border-l-2 border-l-primary'
                      : 'hover:bg-muted/10 border-l-2 border-l-transparent'
                  }`}
                >
                  <div>
                    <div className={`text-sm font-semibold tracking-tight ${selectedTeam?.id === team.id ? 'text-primary' : 'text-foreground'}`}>
                      {team.name}
                    </div>
                    <div className="text-[10px] font-mono text-muted-foreground mt-0.5">
                      {team.evaluationStatus === 'COMPLETED' ? 'Evaluated' : 'Pending live evaluation'}
                    </div>
                  </div>
                  {team.evaluationStatus === 'COMPLETED' ? (
                    <div className="flex items-center gap-1 text-primary">
                      <Icons.check className="w-3.5 h-3.5" />
                      <span className="text-[10px] font-mono">{team.currentScore}/{maxScore}</span>
                    </div>
                  ) : (
                    <Icons.clock className="w-4 h-4 text-muted-foreground opacity-40" />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* ─── RIGHT: Evaluation Form ─── */}
        <div className="lg:col-span-8 flex flex-col min-h-0 bg-background">
          <div className="p-4 border-b border-border shrink-0 bg-muted/5">
            <h2 className="text-[10px] font-mono uppercase tracking-widest text-primary">Score Entry</h2>
            {selectedTeam && (
              <div className="text-xs font-mono text-muted-foreground mt-0.5">Total: {totalScore} / {maxScore} pts</div>
            )}
          </div>

          <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
            {!selectedTeam ? (
              <div className="flex-1 flex items-center justify-center text-muted-foreground font-mono text-sm text-center">
                Select a team to begin evaluation
              </div>
            ) : (
              <>
                {/* Criteria sliders */}
                <div className="flex flex-col gap-5">
                  {CRITERIA.map(criterion => (
                    <div key={criterion.key}>
                      <div className="flex justify-between items-center mb-2">
                        <label className="text-xs font-mono uppercase tracking-widest text-foreground">
                          {criterion.label}
                        </label>
                        <div className="flex items-center gap-1">
                          <span className="text-sm font-mono font-bold text-primary">{scores[criterion.key]}</span>
                          <span className="text-xs font-mono text-muted-foreground">/ {criterion.max}</span>
                          <span className="text-[10px] font-mono text-muted-foreground ml-1">({criterion.weight})</span>
                        </div>
                      </div>
                      <input
                        type="range"
                        min={0}
                        max={criterion.max}
                        value={scores[criterion.key]}
                        onChange={e => setScores(prev => ({ ...prev, [criterion.key]: Number(e.target.value) }))}
                        className="w-full accent-primary cursor-pointer"
                      />
                      <div className="flex justify-between text-[9px] font-mono text-muted-foreground mt-0.5">
                        <span>0</span>
                        <span>{Math.floor(criterion.max / 2)}</span>
                        <span>{criterion.max}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Total */}
                <div className="border-t border-border pt-4 flex justify-between items-center">
                  <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Total Score</span>
                  <span className="text-4xl font-mono font-bold text-primary">{totalScore}</span>
                </div>

                {/* Feedback */}
                <div>
                  <label className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-2 block">
                    Mentor Feedback
                  </label>
                  <textarea
                    value={feedback}
                    onChange={e => setFeedback(e.target.value)}
                    className="w-full bg-muted/5 border border-border p-4 text-sm min-h-[100px] focus:outline-none focus:border-primary text-foreground placeholder:text-muted-foreground/40 resize-none"
                    placeholder="Qualitative evaluation notes (optional)..."
                  />
                </div>

                {/* Save */}
                <Button
                  onClick={handleSave}
                  disabled={isSaving || totalScore === 0}
                  className="w-full rounded-none font-mono text-[10px] uppercase tracking-widest"
                >
                  {isSaving
                    ? <><Icons.spinner className="w-4 h-4 animate-spin mr-2" /> Saving...</>
                    : <><Icons.check className="w-4 h-4 mr-2" /> {selectedTeam.evaluation ? 'Update Evaluation' : 'Commit Evaluation'}</>
                  }
                </Button>

                {totalScore === 0 && (
                  <p className="text-[10px] text-muted-foreground text-center font-mono">
                    Score must be greater than 0 to submit
                  </p>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
