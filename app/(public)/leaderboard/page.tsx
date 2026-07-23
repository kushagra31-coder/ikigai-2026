'use client';

import { useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createClient as supabase } from '@/lib/supabase/client';
import { Icons } from '@/components/constants/icons';
import { Button } from '@/components/primitives/button';
import IKIGAI2026_CONFIG from '@/config/event.config';
import { useProfile } from '@/features/authentication/hooks/useProfile';

type Activity = {
  id: string;
  teamName: string;
  mentorName: string;
  score: number;
  time: string;
};

type LeaderboardTeam = {
  id: string;
  rank: number;
  team_name: string;
  college_name: string;
  track_name: string;
  avg_total: number;
  evaluation_count: number;
  latest_feedback: string | null;
  score_change: number; 
  github?: string | null;
  presentation?: string | null;
  members?: { name: string; certificateId: string }[];
  mentor_name?: string;
};

const TRACK_MENTORS: Record<string, string> = {
  "sports-tech": "Dr. Aditi Sharma",
  "agri-tech": "Prof. R. K. Singh",
  "cyber-security": "Dr. Vivek Kumar",
  "ai-frontiers": "Prof. S. N. Joshi",
  "climate-tech": "Dr. Priya Patel"
};

export default function LeaderboardPage() {
  const [teams, setTeams] = useState<LeaderboardTeam[]>([]);
  const [tracks, setTracks] = useState<string[]>(['All Tracks']);
  const [activeTrack, setActiveTrack] = useState('All Tracks');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [mode, setMode] = useState<'hidden' | 'live' | 'final'>('live');
  const [selectedTeam, setSelectedTeam] = useState<LeaderboardTeam | null>(null);
  const [activities, setActivities] = useState<Activity[]>([]);
  const { profile } = useProfile();
  
  // Calculate if the user has a team on the board
  const userTeam = profile?.team_id ? teams.find(t => t.id === profile.team_id) : null;

  useEffect(() => {
    fetchLeaderboard();
    fetchLeaderboardMode();
    
    const channel = supabase()
      .channel('schema-db-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'evaluations' },
        () => fetchLeaderboard()
      )
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'settings', filter: 'id=eq.leaderboard' },
        () => fetchLeaderboardMode()
      )
      .subscribe();

    return () => {
      supabase().removeChannel(channel);
    };
  }, []);

  const fetchLeaderboardMode = async () => {
    const { data } = await supabase().from('settings').select('value').eq('id', 'leaderboard').single();
    if (data?.value?.mode) {
      setMode(data.value.mode);
    }
  };

  const fetchLeaderboard = async () => {
    setIsLoading(true);
    
    try {
      const res = await fetch('/api/leaderboard');
      if (!res.ok) throw new Error('Failed to fetch data');
      const { teams: teamsData, submissions: submissionsData, evaluations: evalsData }: { teams: any[], submissions: any[], evaluations: any[] } = await res.json();

    const teamScores = new Map<string, { total: number; count: number; latest_feedback: string | null; last_updated: Date | null; evals: { score: number, date: number }[] }>();
    evalsData.forEach((ev) => {
      if (ev.total_score === null) return;
      const sub = submissionsData.find((s) => s.id === ev.submission_id);
      if (!sub) return;
      
      const current = teamScores.get(sub.team_id) || { total: 0, count: 0, latest_feedback: null, last_updated: null, evals: [] };
      
      let newFeedback = current.latest_feedback;
      let newDate = current.last_updated;
      const evDate = ev.updated_at ? new Date(ev.updated_at) : null;
      
      if (ev.feedback && (!newDate || (evDate && evDate > newDate))) {
        newFeedback = ev.feedback;
        newDate = evDate;
      }

      const evals = current.evals;
      evals.push({ score: ev.total_score, date: evDate ? evDate.getTime() : 0 });

      teamScores.set(sub.team_id, { 
        total: current.total + ev.total_score, 
        count: current.count + 1,
        latest_feedback: newFeedback,
        last_updated: newDate,
        evals
      });
    });

    let leaderboard: LeaderboardTeam[] = teamsData.map((t) => {
      const scoreData = teamScores.get(t.id) || { total: 0, count: 0, latest_feedback: null, last_updated: null };
      const avg = scoreData.count > 0 ? Number((scoreData.total / scoreData.count).toFixed(2)) : 0;
      const sub = submissionsData.find(s => s.team_id === t.id);

      const trackData = Array.isArray(t.tracks) ? t.tracks[0] : (t.tracks as any);
      const trackName = trackData?.name || 'Unknown';
      const trackId = trackData?.id || 'unknown';
      const mentorName = TRACK_MENTORS[trackId] || 'Expert Panel';

      let score_change = 0;
      if (scoreData.count === 1) {
        score_change = 1; // First score given = trending up
      } else if (scoreData.count > 1) {
        const sortedEvals = [...scoreData.evals].sort((a, b) => a.date - b.date);
        const latest = sortedEvals[sortedEvals.length - 1].score;
        const prevEvals = sortedEvals.slice(0, -1);
        const prevAvg = prevEvals.reduce((sum, e) => sum + e.score, 0) / prevEvals.length;
        
        if (latest > prevAvg) score_change = 1;
        else if (latest < prevAvg) score_change = -1;
        else score_change = 0;
      }

      return {
        id: t.id,
        rank: 0,
        team_name: t.name,
        college_name: 'IKIGAI 2026',
        track_name: trackName,
        avg_total: avg,
        evaluation_count: scoreData.count,
        latest_feedback: scoreData.latest_feedback,
        score_change: score_change,
        github: t.repository_url,
        presentation: sub?.presentation_url,
        members: [],
        mentor_name: mentorName
      };
    });

    leaderboard.sort((a, b) => b.avg_total - a.avg_total);
    leaderboard.forEach((t, i) => (t.rank = i + 1));

    const configTracks = IKIGAI2026_CONFIG.tracks.map((t: any) => t.name || t.title);
    const uniqueTracks = ['All Tracks', ...configTracks];
    
    leaderboard.forEach((t, i) => (t.rank = i + 1));

    const recentEvals = evalsData
      .filter((ev: any) => ev.total_score !== null && ev.updated_at)
      .sort((a: any, b: any) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())
      .slice(0, 6)
      .map((ev: any) => {
        const sub = submissionsData.find((s: any) => s.id === ev.submission_id);
        const team = teamsData.find((t: any) => t.id === sub?.team_id);
        const trackData = Array.isArray(team?.tracks) ? team?.tracks[0] : (team?.tracks as any);
        const trackId = trackData?.id || 'unknown';
        const mentorName = TRACK_MENTORS[trackId] || 'Expert Panel';
        
        return {
          id: `${sub?.team_id}-${ev.updated_at}-${Math.random()}`,
          teamName: team?.name || 'Unknown Team',
          score: ev.total_score,
          time: new Date(ev.updated_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          mentorName
        };
      });

    setTracks(uniqueTracks);
    setTeams(leaderboard);
    setActivities(recentEvals);
    setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  const filteredTeams = useMemo(() => {
    let result = activeTrack === 'All Tracks' ? teams : teams.filter((t) => t.track_name === activeTrack);
    if (searchQuery) {
      const tokens = searchQuery.toLowerCase().split(/\s+/).filter(Boolean);
      result = result.filter(t => {
        const text = `${t.team_name} ${t.track_name} ${t.mentor_name}`.toLowerCase();
        return tokens.every(token => text.includes(token));
      });
    }
    return result;
  }, [teams, activeTrack, searchQuery]);

  const top3 = filteredTeams.slice(0, 3);
  const rest = filteredTeams.slice(3);

  if (mode === 'hidden') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
        <div className="text-center">
          <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-4">Telemetry Offline</div>
          <h1 className="text-5xl font-semibold tracking-tighter mb-4">Results Pending</h1>
          <p className="text-muted-foreground">The leaderboard will go live once evaluations are complete.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* ─── HERO & STATS ─── */}
      <section className="pt-32 pb-16 px-6 lg:px-12 border-b border-border/50 bg-background text-foreground">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-12">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="w-2 h-2 bg-primary animate-pulse" />
              <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-500">Live Telemetry Active</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-semibold tracking-tighter leading-[0.9]">Standings</h1>
          </div>
          
          <div className="flex gap-12">
            <div>
              <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-2">Evaluated</div>
              <div className="text-3xl font-semibold tracking-tight">{teams.filter(t => t.avg_total > 0).length} / {teams.length}</div>
            </div>
            <div>
              <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-2">High Score</div>
              <div className="text-3xl font-semibold tracking-tight text-cyan-500 font-mono">{top3[0]?.avg_total.toFixed(1) || "0.0"}</div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-12">
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-12 xl:gap-24">
          
          {/* Main Content Area */}
          <div className="xl:col-span-8 flex flex-col">
            
            {/* ─── PODIUM ─── */}
            {!isLoading && top3.length > 0 && !searchQuery && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-y border-border/50 mb-16">
                <PodiumColumn team={top3[1]} place={2} onClick={() => setSelectedTeam(top3[1])} />
                <PodiumColumn team={top3[0]} place={1} onClick={() => setSelectedTeam(top3[0])} />
                <PodiumColumn team={top3[2]} place={3} onClick={() => setSelectedTeam(top3[2])} />
              </div>
            )}

            {/* ─── FILTERS ─── */}
            <div className="sticky top-0 z-40 bg-background/90 backdrop-blur-xl border-b border-border/50 py-4 mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="flex flex-wrap gap-2">
                {tracks.map((t) => (
                  <button
                    key={t}
                    onClick={() => setActiveTrack(t)}
                    className={`px-4 py-2 text-[10px] font-mono uppercase tracking-widest border transition-colors duration-150 ${
                      activeTrack === t 
                        ? 'border-foreground bg-background text-foreground' 
                        : 'border-border/50 bg-transparent text-muted-foreground hover:border-cyan-500/50 hover:text-cyan-500 hover:bg-cyan-500/5'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
              <div className="relative w-full md:w-64">
                <Icons.search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input 
                  type="text" 
                  placeholder="Search telemetry..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent border border-border/50 px-10 py-2 text-xs font-mono focus:outline-none focus:border-primary transition-colors duration-150 text-foreground"
                />
              </div>
            </div>

            {/* ─── LIVE RANKINGS TABLE ─── */}
            {isLoading ? (
              <div className="animate-pulse space-y-px bg-border/30 rounded-2xl overflow-hidden backdrop-blur-md shadow-2xl">
                {[...Array(10)].map((_, i) => (
                  <div key={i} className="h-16 bg-background" />
                ))}
              </div>
            ) : filteredTeams.length === 0 ? (
              <div className="py-24 text-center border border-border/50 text-muted-foreground font-mono text-sm">
                No active telemetry found.
              </div>
            ) : (
              <div className="flex flex-col border border-border/50 bg-border/30 rounded-2xl overflow-hidden backdrop-blur-md shadow-2xl gap-px">
                {/* Table Header */}
                <div className="grid grid-cols-12 gap-4 bg-muted/5 border-b border-border/50/50 px-4 py-3 text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                  <div className="col-span-1">Pos</div>
                  <div className="col-span-1 text-center">Trend</div>
                  <div className="col-span-5">Identity</div>
                  <div className="col-span-3">Domain</div>
                  <div className="col-span-2 text-right">Score</div>
                </div>

                <AnimatePresence>
                  {(searchQuery ? filteredTeams : rest).map((team) => (
                    <motion.div 
                      layout
                      key={team.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      onClick={() => setSelectedTeam(team)}
                      className="grid grid-cols-12 gap-4 bg-background/20 hover:bg-cyan-500/5 hover:border-cyan-500/20 px-4 py-4 items-center group transition-colors duration-150 cursor-pointer"
                    >
                      <div className="col-span-1 font-mono text-sm font-semibold text-muted-foreground group-hover:text-cyan-500 transition-colors duration-150">
                        {String(team.rank).padStart(2, '0')}
                      </div>
                      <div className="col-span-1 flex justify-center">
                        {team.score_change > 0 ? (
                          <Icons.trendingUp className="w-4 h-4 text-cyan-500" />
                        ) : team.score_change < 0 ? (
                          <Icons.trendingDown className="w-4 h-4 text-red-500" />
                        ) : (
                          <Icons.minus className="w-4 h-4 text-muted-foreground" />
                        )}
                      </div>
                      <div className="col-span-5 flex flex-col">
                        <span className="font-semibold text-base tracking-tight">{team.team_name}</span>
                        <span className="text-[10px] font-mono text-muted-foreground">{team.college_name}</span>
                      </div>
                      <div className="col-span-3 text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                        {team.track_name}
                      </div>
                      <div className="col-span-2 text-right font-mono font-bold text-lg">
                        {team.avg_total.toFixed(1)}
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>

          <div className="xl:col-span-4 flex flex-col gap-12">
            {/* Pinned Current Team */}
            <div>
              <h3 className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-4 border-b border-border/50 pb-2">Your Telemetry</h3>
              <div className="border border-border/50 p-6 bg-muted/10 rounded-xl flex flex-col items-center justify-center text-center min-h-[150px]">
                {profile ? (
                  userTeam ? (
                    <>
                      <div className="text-[10px] font-mono uppercase tracking-widest text-cyan-500 mb-2">Rank {String(userTeam.rank).padStart(2, '0')}</div>
                      <div className="text-lg font-semibold tracking-tight mb-1">{userTeam.team_name}</div>
                      <div className="text-3xl font-mono font-bold text-foreground mb-1">{userTeam.avg_total.toFixed(1)}</div>
                      <div className="text-[10px] font-mono text-muted-foreground">Average Score</div>
                    </>
                  ) : (
                    <>
                      <Icons.user className="w-6 h-6 text-muted-foreground mb-4" />
                      <div className="text-sm font-medium tracking-tight mb-2">{profile.full_name || 'Authenticated User'}</div>
                      <div className="text-xs text-muted-foreground">You are not currently assigned to an active team.</div>
                    </>
                  )
                ) : (
                  <>
                    <Icons.user className="w-6 h-6 text-muted-foreground mb-4" />
                    <div className="text-sm font-medium tracking-tight mb-2">Unidentified User</div>
                    <div className="text-xs text-muted-foreground">Authenticate to view your team's live standing.</div>
                  </>
                )}
              </div>
            </div>

            {/* Activity Feed */}
            <div>
              <h3 className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-4 border-b border-border/50 pb-2">Live Activity Stream</h3>
              <div className="flex flex-col border border-border/50 bg-muted/5 min-h-[200px] rounded-xl overflow-hidden">
                 {activities.length > 0 ? (
                   <div className="flex flex-col divide-y divide-border/50">
                     {activities.map(act => (
                       <div key={act.id} className="p-4 bg-background/50 flex flex-col gap-1">
                         <div className="flex items-center justify-between">
                           <span className="text-[10px] font-mono text-cyan-500 uppercase tracking-widest">{act.mentorName} scored</span>
                           <span className="text-[10px] text-muted-foreground font-mono">{act.time}</span>
                         </div>
                         <div className="flex items-center justify-between mt-1">
                           <span className="text-sm font-semibold truncate pr-4">{act.teamName}</span>
                           <span className="text-sm font-mono font-bold bg-muted/20 px-2 py-0.5 rounded text-cyan-500">+{act.score}</span>
                         </div>
                       </div>
                     ))}
                   </div>
                 ) : (
                   <div className="p-6 flex flex-col items-center justify-center text-center h-full">
                     <Icons.activity className="w-6 h-6 text-muted-foreground mb-4 opacity-50" />
                     <div className="text-sm text-muted-foreground font-mono">Stream empty. Awaiting judge evaluations...</div>
                   </div>
                 )}
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* TEAM DETAILS DRAWER */}
      <AnimatePresence>
        {selectedTeam && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedTeam(null)}
              className="fixed inset-0 bg-background/95 backdrop-blur-sm z-50 cursor-pointer"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-full max-w-lg bg-background border-l border-border/50 z-50 flex flex-col shadow-2xl"
            >
              <div className="flex items-center justify-between p-6 border-b border-border/50">
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-1">Team Identity</div>
                  <h2 className="text-2xl font-semibold tracking-tight">{selectedTeam.team_name}</h2>
                </div>
                <button 
                  onClick={() => setSelectedTeam(null)}
                  className="p-2 hover:bg-muted/10 transition-colors duration-150 rounded"
                >
                  <Icons.close className="w-5 h-5 text-muted-foreground" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-12">
                
                {/* Key Metrics */}
                <div className="grid grid-cols-2 gap-px bg-border/30 rounded-2xl overflow-hidden backdrop-blur-md shadow-2xl border border-border/50">
                  <div className="bg-background p-6 flex flex-col justify-center">
                    <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-2">Track & Mentor</div>
                    <div className="text-sm font-semibold truncate mb-1">{selectedTeam.track_name}</div>
                    <div className="text-[10px] font-mono text-cyan-500">Mentor: {selectedTeam.mentor_name}</div>
                  </div>
                  <div className="bg-background p-6 flex flex-col justify-center">
                    <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-2">Average Score</div>
                    <div className="text-3xl font-mono font-bold text-cyan-500">{selectedTeam.avg_total.toFixed(1)}</div>
                  </div>
                </div>



                {/* Judge Progress Simulation */}
                <div>
                  <h3 className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-4 border-b border-border/50 pb-2">Judgement Progress</h3>
                  <div className="flex flex-col gap-px bg-border/30 rounded-2xl overflow-hidden backdrop-blur-md shadow-2xl border border-border/50">
                    {selectedTeam.evaluation_count > 0 ? (
                      Array.from({ length: selectedTeam.evaluation_count }).map((_, idx) => (
                        <div key={idx} className="flex justify-between items-center p-4 bg-background border-b border-border/50 last:border-b-0">
                          <span className="text-sm font-medium">Evaluation {idx + 1}</span>
                          <div className="flex items-center gap-2 text-cyan-500">
                            <Icons.check className="w-4 h-4" />
                            <span className="text-[10px] font-mono uppercase tracking-widest">Recorded</span>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="p-4 bg-background text-center flex flex-col items-center justify-center gap-2">
                        <Icons.clock className="w-4 h-4 text-muted-foreground opacity-50" />
                        <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">No evaluations yet</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Latest Feedback */}
                <div>
                  <h3 className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-4 border-b border-border/50 pb-2">Latest Feedback</h3>
                  {selectedTeam.latest_feedback ? (
                    <div className="p-6 bg-muted/5 border border-border/50 text-sm leading-relaxed text-muted-foreground">
                      {selectedTeam.latest_feedback}
                    </div>
                  ) : (
                    <div className="p-6 bg-muted/5 border border-border/50 text-sm font-mono text-muted-foreground text-center">
                      No feedback recorded yet.
                    </div>
                  )}
                </div>

              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

function PodiumColumn({ team, place, onClick }: { team?: LeaderboardTeam; place: 1 | 2 | 3; onClick?: () => void }) {
  const isFirst = place === 1;
  const placeLabels = { 1: 'P1', 2: 'P2', 3: 'P3' };

  if (!team) {
    return (
      <div className={`flex flex-col p-8 border-b md:border-b-0 md:border-r border-border/50 last:border-r-0 ${isFirst ? 'bg-cyan-500/5 shadow-[inset_0_0_0_1px_rgba(6,182,212,0.1)]' : ''}`}>
        <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-4 flex justify-between items-center">
          <span>Rank</span>
          <span className={isFirst ? 'text-cyan-500 font-bold' : ''}>{placeLabels[place]}</span>
        </div>
        <div className="text-3xl font-semibold tracking-tight mb-2 opacity-20">TBD</div>
        <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-12 opacity-20">Pending</div>
        <div className="mt-auto pt-8 border-t border-border/50">
          <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-1 opacity-20">Score</div>
          <div className={`text-5xl font-mono font-bold tracking-tighter opacity-20 ${isFirst ? 'text-cyan-500' : 'text-foreground'}`}>
            --
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      onClick={onClick}
      className={`group cursor-pointer flex flex-col p-8 border-b md:border-b-0 md:border-r border-border/50 last:border-r-0 transition-colors duration-150 ${isFirst ? 'bg-cyan-500/5 hover:bg-cyan-500/10 shadow-[inset_0_0_0_1px_rgba(6,182,212,0.1)] hover:shadow-[0_0_30px_rgba(6,182,212,0.15)] relative overflow-hidden' : 'hover:bg-muted/10'}`}
    >
      <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-4 flex justify-between items-center group-hover:text-cyan-500 transition-colors duration-150">
        <span>Rank</span>
        <span className={isFirst ? 'text-cyan-500 font-bold' : ''}>{placeLabels[place]}</span>
      </div>
      <div className="text-3xl font-semibold tracking-tight mb-2 line-clamp-1">{team.team_name}</div>
      <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-12">{team.track_name}</div>
      
      <div className="mt-auto pt-8 border-t border-border/50">
        <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-1">Score</div>
        <div className={`text-5xl font-mono font-bold tracking-tighter ${isFirst ? 'text-cyan-500' : 'text-foreground'}`}>
          {team.avg_total.toFixed(1)}
        </div>
      </div>
    </div>
  );
}
