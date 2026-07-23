'use client';

import { Container } from '@/components/layout';
import IKIGAI2026_CONFIG from '@/config/event.config';
import { Button } from '@/components/primitives/button';
import Link from 'next/link';
import { Icons } from '@/components/constants/icons';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { fetchTrackStatistics, TrackStatistics, NormalizedTeam } from '@/lib/data/teams';

export default function TracksPage() {
  const tracks = IKIGAI2026_CONFIG.tracks;
  const [trackStats, setTrackStats] = useState<Record<string, TrackStatistics>>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const configTracks = tracks.map((t) => ({ id: t.id, title: t.title }));
        const stats = await fetchTrackStatistics(configTracks);
        setTrackStats(stats);
      } catch (e) {
        console.error('Failed to load track data', e);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground mt-20">
      {/* Hero */}
      <div className="bg-foreground text-background py-32 border-b border-border">
        <Container>
          <div className="max-w-4xl">
            <div className="text-[10px] font-mono uppercase tracking-widest text-background/50 mb-8 flex items-center gap-4">
              <span className="w-12 h-px bg-background/20" />
              Strategic Domains
            </div>
            <h1 className="text-6xl md:text-8xl font-semibold tracking-tighter mb-8 leading-[0.9]">
              Innovation<br />Tracks
            </h1>
            <p className="text-2xl text-background/70 font-light leading-relaxed max-w-2xl">
              Five critical domains designed to solve real-world problems. Review the technical constraints and deliverables required for each track.
            </p>
          </div>
        </Container>
      </div>

      {/* Track Sections */}
      <div>
        {tracks.map((track, idx) => {
          const stats = trackStats[track.id];
          return (
            <motion.section
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              key={track.id}
              id={track.id}
              className="border-b border-border py-32 even:bg-muted/10 relative group"
            >
              <Container>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">

                  {/* ── Left: Track Identity + Stats ── */}
                  <div className="lg:col-span-5 flex flex-col gap-10">
                    <div>
                      <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-6">
                        Domain 0{idx + 1}
                      </div>
                      <h2 className="text-4xl md:text-5xl font-semibold tracking-tighter mb-6">
                        {track.title}
                      </h2>
                      <p className="text-xl text-muted-foreground leading-relaxed font-light">
                        {track.description}
                      </p>
                    </div>

                    {/* Stats Grid */}
                    {isLoading ? (
                      <div className="border border-border bg-background flex items-center justify-center min-h-[240px]">
                        <Icons.spinner className="w-6 h-6 animate-spin text-muted-foreground" />
                      </div>
                    ) : (
                      <div className="border border-border bg-background">
                        {/* Row 1: Teams + Mentors */}
                        <div className="grid grid-cols-2 divide-x divide-border border-b border-border">
                          <div className="p-6">
                            <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-3">
                              Total Teams
                            </div>
                            <div className="text-4xl font-mono font-semibold">
                              {stats?.totalTeams ?? 0}
                            </div>
                          </div>
                          <div className="p-6">
                            <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-3">
                              Mentors
                            </div>
                            <div className="text-4xl font-mono font-semibold text-primary">
                              {stats?.totalTeams ? Math.max(1, Math.ceil(stats.totalTeams / 5)) : '—'}
                            </div>
                          </div>
                        </div>

                        {/* Row 2: Evaluated + Pending */}
                        <div className="grid grid-cols-2 divide-x divide-border border-b border-border">
                          <div className="p-6">
                            <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-3">
                              Evaluated
                            </div>
                            <div className="text-2xl font-mono font-semibold text-primary">
                              {stats?.evaluatedTeams ?? 0}
                            </div>
                          </div>
                          <div className="p-6">
                            <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-3">
                              Pending
                            </div>
                            <div className="text-2xl font-mono font-semibold text-orange-500">
                              {stats?.pendingTeams ?? 0}
                            </div>
                          </div>
                        </div>

                        {/* Row 3: Track Leader */}
                        <div className="p-6 bg-primary/5 border-b border-border">
                          <div className="text-[10px] font-mono uppercase tracking-widest text-primary mb-2">
                            Track Leader
                          </div>
                          <div className="font-semibold text-lg truncate">
                            {stats?.currentLeader ?? 'TBD'}
                          </div>
                          {stats?.highestScore && stats.highestScore > 0 ? (
                            <div className="text-xs font-mono text-muted-foreground mt-1">
                              Score: {stats.highestScore.toFixed(1)}
                            </div>
                          ) : null}
                        </div>

                        {/* View Full Leaderboard */}
                        <div className="p-4 bg-background group-hover:bg-muted/30 transition-colors">
                          <Link
                            href={`/leaderboard?track=${track.id}`}
                            className="flex items-center justify-center gap-2 text-[10px] font-mono uppercase tracking-widest text-muted-foreground group-hover:text-cyan-500 transition-colors duration-300 py-2"
                          >
                            View Full Leaderboard
                            <Icons.arrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform duration-300" />
                          </Link>
                        </div>
                      </div>
                    )}

                    {/* Download Button */}
                    <div>
                      {track.problemStatementUrl && track.problemStatementUrl !== '#' ? (
                        <Button asChild size="lg" className="w-full h-14 px-12 text-sm tracking-wide rounded-none">
                          <Link href={track.problemStatementUrl} download>
                            Download Problem Statement
                          </Link>
                        </Button>
                      ) : (
                        <Button
                          disabled
                          size="lg"
                          className="w-full h-14 px-12 text-sm tracking-wide rounded-none opacity-50 cursor-not-allowed"
                        >
                          Statement Coming Soon
                        </Button>
                      )}
                    </div>
                  </div>

                  {/* ── Right: Live Roster ── */}
                  <div className="lg:col-span-7 flex flex-col gap-12">

                    {/* Tech Stack Tags */}
                    <div>
                      <h3 className="text-sm font-semibold uppercase tracking-widest text-foreground mb-6 font-mono border-b border-border pb-4">
                        Permitted Stack & Technologies
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {['Open Source', 'Language Agnostic', 'Bring Your Own Stack', 'Any Framework', 'AI Tools Permitted'].map((tech) => (
                          <span
                            key={tech}
                            className="px-4 py-2 border border-border/50 bg-muted/20 text-xs font-mono uppercase tracking-widest text-muted-foreground hover:border-cyan-500/50 hover:text-cyan-500 transition-colors cursor-default"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Assigned Teams Roster */}
                    <div className="flex-1 flex flex-col bg-muted/5 border border-border">
                      <div className="p-6 border-b border-border flex justify-between items-center bg-background">
                        <div>
                          <h3 className="text-sm font-semibold uppercase tracking-widest text-foreground font-mono">
                            Assigned Teams
                          </h3>
                          {!isLoading && (
                            <div className="text-[10px] font-mono text-muted-foreground mt-1">
                              {stats?.totalTeams ?? 0} team{(stats?.totalTeams ?? 0) !== 1 ? 's' : ''} registered
                            </div>
                          )}
                        </div>
                        <Link
                          href={`/leaderboard?track=${track.id}`}
                          className="text-[10px] font-mono uppercase tracking-widest text-primary hover:underline flex items-center gap-1"
                        >
                          Leaderboard <Icons.arrowRight className="w-3 h-3" />
                        </Link>
                      </div>

                      <div className="flex-1 max-h-[480px] overflow-y-auto">
                        {isLoading ? (
                          <div className="p-12 text-center text-sm font-mono text-muted-foreground animate-pulse">
                            Syncing telemetry...
                          </div>
                        ) : stats && stats.teams.length > 0 ? (
                          <div className="flex flex-col gap-px bg-border">
                            {/* Table Header */}
                            <div className="grid grid-cols-12 gap-2 bg-muted/20 px-4 py-2 text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                              <div className="col-span-1">#</div>
                              <div className="col-span-5">Team</div>
                              <div className="col-span-3">Members</div>
                              <div className="col-span-3 text-right">Score</div>
                            </div>
                            {stats.teams
                              .sort((a: NormalizedTeam, b: NormalizedTeam) => b.avgScore - a.avgScore)
                              .map((team: NormalizedTeam, i: number) => (
                                <div
                                  key={team.id}
                                  className="grid grid-cols-12 gap-2 bg-background hover:bg-muted/10 px-4 py-4 transition-colors items-center"
                                >
                                  <div className="col-span-1 text-[10px] font-mono text-muted-foreground">
                                    {String(i + 1).padStart(2, '0')}
                                  </div>
                                  <div className="col-span-5 font-semibold text-sm tracking-tight truncate">
                                    {team.name}
                                  </div>
                                  <div className="col-span-3 text-[10px] font-mono text-muted-foreground">
                                    {team.members.length > 0
                                      ? `${team.members.length} member${team.members.length !== 1 ? 's' : ''}`
                                      : '—'}
                                  </div>
                                  <div className="col-span-3 text-right font-mono font-bold text-sm">
                                    {team.evaluated ? (
                                      <span className="text-primary">{team.avgScore.toFixed(1)}</span>
                                    ) : (
                                      <span className="text-muted-foreground/50">Pending</span>
                                    )}
                                  </div>
                                </div>
                              ))}
                          </div>
                        ) : (
                          <div className="p-16 text-center">
                            <div className="text-sm font-mono text-muted-foreground mb-2">
                              No teams assigned yet
                            </div>
                            <div className="text-[10px] font-mono text-muted-foreground/50">
                              Teams will appear here once they register and are assigned to this track.
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </Container>
            </motion.section>
          );
        })}
      </div>
    </div>
  );
}
