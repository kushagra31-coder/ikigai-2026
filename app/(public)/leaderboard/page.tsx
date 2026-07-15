'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createClient as supabase } from '@/lib/supabase/client';
import { Icons } from '@/components/constants/icons';
import { Card } from '@/components/primitives/card';
import IKIGAI2026_CONFIG from '@/config/event.config';

// Types for our local mapping
type LeaderboardTeam = {
  id: string;
  rank: number;
  team_name: string;
  college_name: string;
  track_name: string;
  avg_total: number;
  latest_feedback: string | null;
};

export default function LeaderboardPage() {
  const [teams, setTeams] = useState<LeaderboardTeam[]>([]);
  const [tracks, setTracks] = useState<string[]>(['All Tracks']);
  const [activeTrack, setActiveTrack] = useState('All Tracks');
  const [isLoading, setIsLoading] = useState(true);
  const [mode, setMode] = useState<'hidden' | 'live' | 'final'>('live'); // Defaulting to live for now

  useEffect(() => {
    fetchLeaderboard();
    fetchLeaderboardMode();
    
    // Subscribe to evaluations table for real-time updates
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
    // Fetch teams, submissions, and evaluations
    // Note: Since we don't have a public_leaderboard view yet, we compute it here.
    const { data: teamsData } = await supabase().from('teams').select('id, name, tracks(name)');
    const { data: submissionsData } = await supabase().from('submissions').select('id, team_id');
    const { data: evalsData } = await supabase().from('evaluations').select('submission_id, total_score, feedback, updated_at');

    if (!teamsData || !submissionsData || !evalsData) {
      setIsLoading(false);
      return;
    }

    // Map evaluations to teams
    const teamScores = new Map<string, { total: number; count: number; latest_feedback: string | null; last_updated: Date | null }>();
    evalsData.forEach((ev) => {
      if (ev.total_score === null) return;
      const sub = submissionsData.find((s) => s.id === ev.submission_id);
      if (!sub) return;
      
      const current = teamScores.get(sub.team_id) || { total: 0, count: 0, latest_feedback: null, last_updated: null };
      
      let newFeedback = current.latest_feedback;
      let newDate = current.last_updated;
      const evDate = ev.updated_at ? new Date(ev.updated_at) : null;
      
      if (ev.feedback && (!newDate || (evDate && evDate > newDate))) {
        newFeedback = ev.feedback;
        newDate = evDate;
      }

      teamScores.set(sub.team_id, { 
        total: current.total + ev.total_score, 
        count: current.count + 1,
        latest_feedback: newFeedback,
        last_updated: newDate
      });
    });

    // Fetch valid teams from certificates.json
    let certTeams: string[] = [];
    try {
      const certRes = await fetch('/certificates.json');
      if (certRes.ok) {
        const certData = await certRes.json();
        const teamsSet = new Set<string>();
        certData.forEach((c: any) => {
          if (c.team && c.team.trim() !== '') {
            teamsSet.add(c.team.trim());
          }
        });
        certTeams = Array.from(teamsSet);
      }
    } catch (e) {
      console.error("Failed to load certificates.json", e);
    }

    let leaderboard: LeaderboardTeam[] = teamsData.map((t) => {
      const scoreData = teamScores.get(t.id) || { total: 0, count: 0, latest_feedback: null, last_updated: null };
      const avg = scoreData.count > 0 ? Number((scoreData.total / scoreData.count).toFixed(2)) : 0;
      return {
        id: t.id,
        rank: 0, // calculated after sort
        team_name: t.name,
        college_name: 'CSIT-AITR', // Placeholder
        track_name: (Array.isArray(t.tracks) ? t.tracks[0]?.name : (t.tracks as any)?.name) || 'Unknown',
        avg_total: avg,
        latest_feedback: scoreData.latest_feedback,
      };
    });

    // Add missing teams from certificates.json as virtual teams with 0 score
    const existingDbNames = new Set(leaderboard.map(t => t.team_name.trim().toLowerCase()));
    const virtualTeams = certTeams
      .filter(name => !existingDbNames.has(name.toLowerCase()))
      .map((name, idx) => ({
        id: `virtual-${idx}`,
        rank: 0,
        team_name: name,
        college_name: 'Unknown',
        track_name: 'All Tracks',
        avg_total: 0,
        latest_feedback: null,
      }));

    leaderboard = [...leaderboard, ...virtualTeams];

    // Sort by avg score
    leaderboard.sort((a, b) => b.avg_total - a.avg_total);
    leaderboard.forEach((t, i) => (t.rank = i + 1));

    const configTracks = IKIGAI2026_CONFIG.tracks.map((t: any) => t.name || t.title);
    const uniqueTracks = ['All Tracks', ...configTracks];
    
    setTracks(uniqueTracks);
    setTeams(leaderboard);
    setIsLoading(false);
  };

  const filteredTeams = activeTrack === 'All Tracks' ? teams : teams.filter((t) => t.track_name === activeTrack);
  const top3 = filteredTeams.slice(0, 3);
  const rest = filteredTeams.slice(3);

  if (mode === 'hidden') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4 text-center">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
          <Icons.clock className="w-16 h-16 mx-auto text-primary animate-pulse" />
          <h1 className="text-3xl font-bold tracking-tight">Results Pending</h1>
          <p className="text-muted-foreground max-w-md">The leaderboard will go live once judging is complete. This page refreshes automatically.</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-24 pb-12 px-4 md:px-8">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6">
          <div className="space-y-2">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">Live Leaderboard</h1>
            <p className="text-muted-foreground">Real-time team rankings and scores</p>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full font-bold uppercase tracking-widest text-sm border border-primary/20">
            {mode === 'live' ? (
              <><span className="w-2 h-2 rounded-full bg-primary animate-pulse" /> LIVE</>
            ) : (
              <><Icons.trophy className="w-4 h-4" /> FINAL RESULTS</>
            )}
          </div>
        </header>

        {/* Filters */}
        <div className="flex flex-wrap gap-2">
          {tracks.map((t) => (
            <button
              key={t}
              onClick={() => setActiveTrack(t)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTrack === t 
                  ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20' 
                  : 'bg-card border border-white/10 hover:bg-white/5 text-muted-foreground'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Podium */}
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Icons.spinner className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : filteredTeams.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground">
            <Icons.activity className="w-12 h-12 mx-auto mb-4 opacity-20" />
            <p>No scored teams yet for this track.</p>
          </div>
        ) : (
          <div className="space-y-16">
              <div className="flex flex-col md:flex-row items-end justify-center gap-4 md:gap-8 pt-12 pb-8">
                {/* 2nd Place */}
                {filteredTeams.length > 1 && (
                  <PodiumCard team={filteredTeams[1]} place={2} />
                )}
                
                {/* 1st Place */}
                {filteredTeams.length > 0 && (
                  <PodiumCard team={filteredTeams[0]} place={1} />
                )}
                
                {/* 3rd Place */}
                {filteredTeams.length > 2 && (
                  <PodiumCard team={filteredTeams[2]} place={3} />
                )}
              </div>

            {/* All Teams Table */}
            {filteredTeams.length > 0 && (
              <Card className="p-0 overflow-hidden bg-card/50 border-white/5 backdrop-blur-sm mt-8">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-white/10 bg-black/40">
                        <th className="px-6 py-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider w-12">#</th>
                        <th className="px-6 py-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Team</th>
                        <th className="px-6 py-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden md:table-cell">College</th>
                        <th className="px-6 py-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden lg:table-cell">Track</th>
                        <th className="px-6 py-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Mentor Feedback</th>
                        <th className="px-6 py-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider text-right w-32">Score / 40</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {filteredTeams.map((team, index) => (
                        <motion.tr 
                          key={team.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className={`group hover:bg-white/5 transition-colors ${
                            team.rank === 1 ? 'bg-amber-500/5' :
                            team.rank === 2 ? 'bg-gray-300/5' :
                            team.rank === 3 ? 'bg-orange-800/5' : ''
                          }`}
                        >
                          <td className="px-6 py-4">
                            <span className="font-mono text-muted-foreground">{team.rank}</span>
                          </td>
                          <td className="px-6 py-4 font-bold text-foreground">{team.team_name}</td>
                          <td className="px-6 py-4 text-muted-foreground text-sm hidden md:table-cell">{team.college_name}</td>
                          <td className="px-6 py-4 hidden lg:table-cell">
                            <span className="inline-flex items-center px-2 py-1 rounded-md bg-white/5 text-xs text-muted-foreground border border-white/10">
                              {team.track_name}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            {team.latest_feedback ? (
                              <span className="text-sm text-muted-foreground line-clamp-2 max-w-[200px] italic">
                                &quot;{team.latest_feedback}&quot;
                              </span>
                            ) : (
                              <span className="text-xs text-white/20">-</span>
                            )}
                          </td>
                          <td className="px-6 py-4 text-right">
                            <div className="flex items-center justify-end gap-3">
                              <div className="w-24 h-1.5 bg-black/40 rounded-full overflow-hidden hidden sm:block">
                                <div 
                                  className="h-full bg-primary rounded-full" 
                                  style={{ width: `${Math.min(100, (team.avg_total / 40) * 100)}%` }}
                                />
                              </div>
                              <span className="font-mono font-bold text-lg">{team.avg_total.toFixed(1)}</span>
                            </div>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function PodiumCard({ team, place }: { team: LeaderboardTeam; place: 1 | 2 | 3 }) {
  const isFirst = place === 1;
  const heights = {
    1: 'h-64 sm:h-72',
    2: 'h-52 sm:h-60',
    3: 'h-48 sm:h-52'
  };
  
  const colors = {
    1: 'from-amber-500/20 to-amber-500/5 border-amber-500/30',
    2: 'from-slate-300/20 to-slate-300/5 border-slate-300/30',
    3: 'from-orange-800/20 to-orange-800/5 border-orange-800/30'
  };

  const medals = {
    1: '🏆',
    2: '🥈',
    3: '🥉'
  };

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      className={`relative flex flex-col items-center w-full max-w-[280px] order-${place === 2 ? 1 : place === 1 ? 2 : 3} ${isFirst ? 'z-30' : place === 2 ? 'z-20' : 'z-10'}`}
    >
      <div className={`w-full bg-gradient-to-b ${colors[place]} border rounded-2xl flex flex-col items-center p-6 text-center backdrop-blur-md relative ${heights[place]} justify-end transition-transform hover:scale-[1.02] duration-300`}>
        <div className={`absolute -top-8 bg-background/50 backdrop-blur-xl rounded-full p-3 border ${isFirst ? 'scale-125 border-amber-500/50 shadow-[0_0_30px_rgba(245,158,11,0.3)]' : 'border-white/20'}`}>
          <span className="text-3xl" aria-hidden="true">{medals[place]}</span>
        </div>
        
        <div className="mb-auto mt-4 w-full">
          <h3 className="font-bold text-lg sm:text-xl line-clamp-2 text-foreground mb-1 drop-shadow-md">
            {team.team_name}
          </h3>
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-widest mb-2">
            {place === 1 ? '1st Place' : place === 2 ? '2nd Place' : '3rd Place'}
          </p>
          <div className="inline-block px-2.5 py-1 rounded-md bg-black/40 text-[10px] text-muted-foreground border border-white/5">
            {team.track_name}
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-white/10 w-full">
          <div className="text-3xl sm:text-4xl font-mono font-bold text-foreground drop-shadow-lg">
            {team.avg_total.toFixed(1)}
            <span className="text-sm text-muted-foreground font-sans ml-1">/40</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
