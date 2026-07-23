'use client';

import { Container } from '@/components/layout';
import { Button } from '@/components/primitives/button';
import { PUBLIC_CONTENT } from '@/components/constants/public-content';
import { Icons } from '@/components/constants/icons';
import IKIGAI2026_CONFIG from '@/config/event.config';
import { SPONSORS_CONFIG } from '@/config/sponsors.config';
import { LEADERSHIP_CONFIG, type LeadershipMember } from '@/config/leadership.config';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FaqSearch } from '@/components/faq/FaqSearch';
import { fetchTrackStatistics, TrackStatistics } from '@/lib/data/teams';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

// ─── Types ────────────────────────────────────────────────────────────────────

type Member = LeadershipMember;

// ─── Leadership Profile Modal (same as /leadership page) ─────────────────────

function ProfileModal({ member, onClose }: { member: Member; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" role="dialog" aria-modal="true">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-background/90 backdrop-blur-sm cursor-pointer"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        className="relative w-full max-w-3xl bg-background border border-border shadow-2xl flex flex-col md:flex-row overflow-hidden z-10"
      >
        {/* Portrait */}
        <div className="w-full md:w-60 aspect-[3/4] md:aspect-auto relative bg-muted/5 border-r border-border flex-shrink-0">
          {member.photo ? (
            <Image
              src={member.photo}
              alt={member.name}
              fill
              className="object-cover object-top"
              sizes="(max-width: 768px) 100vw, 240px"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-[5rem] font-bold text-foreground/10 select-none">
              {member.name.charAt(0)}
            </div>
          )}
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-background/90 to-transparent">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/20 border border-primary/40 text-primary text-[10px] font-mono uppercase tracking-widest">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              {member.category}
            </div>
          </div>
        </div>
        {/* Info */}
        <div className="flex-1 p-8 flex flex-col gap-6">
          <div className="flex justify-between items-start">
            <div>
              <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-2">
                {member.designation}
              </div>
              <h2 className="text-3xl font-semibold tracking-tighter">{member.name}</h2>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-muted/10 transition-colors rounded" aria-label="Close">
              <Icons.close className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>
          <div className="h-px bg-border" />
          <div className="grid grid-cols-2 gap-6">
            <div>
              <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-2">Department</div>
              <div className="font-medium text-sm">{member.department || 'Core Operations'}</div>
            </div>
            <div>
              <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-2">Status</div>
              <div className="flex items-center gap-2 font-medium text-sm">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                Active — IKIGAI 2026
              </div>
            </div>
          </div>
          {member.bio && (
            <p className="text-sm text-muted-foreground/90 leading-relaxed">{member.bio}</p>
          )}
          <div className="flex gap-3 flex-wrap mt-auto pt-4">
            {member.linkedin && (
              <a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 border border-border text-xs font-mono uppercase tracking-widest hover:border-primary hover:text-primary transition-colors"
              >
                <Icons.globe className="w-3.5 h-3.5" />
                LinkedIn
              </a>
            )}
            {member.email && (
              <a
                href={`mailto:${member.email}`}
                className="inline-flex items-center gap-2 px-4 py-2 border border-border text-xs font-mono uppercase tracking-widest hover:border-primary hover:text-primary transition-colors"
              >
                <Icons.mail className="w-3.5 h-3.5" />
                Email
              </a>
            )}
            <button
              onClick={onClose}
              className="px-4 py-2 border border-border text-xs font-mono uppercase tracking-widest hover:border-foreground transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// ─── Track Card (Homepage) — dynamic stats, no hardcoded numbers ──────────────

function TrackCard({
  track,
  index,
  stats,
  isLoadingStats,
}: {
  track: (typeof PUBLIC_CONTENT.tracks)[number];
  index: number;
  stats?: TrackStatistics;
  isLoadingStats: boolean;
}) {
  return (
    <Link
      href={`/tracks#${track.id}`}
      className="group relative col-span-1 bg-foreground p-8 min-h-[420px] flex flex-col border-r border-background/20 last:border-r-0 hover:bg-white/5 transition-all duration-300 overflow-hidden"
    >
      {/* Index + status */}
      <div className="text-background/50 font-mono text-sm mb-8 flex justify-between items-center flex-shrink-0">
        <span>0{index + 1}</span>
        <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-primary uppercase text-[10px] tracking-widest">
          View Track
        </span>
      </div>

      {/* Title + description */}
      <div className="relative z-10 flex-1 flex flex-col">
        <h3 className="text-xl lg:text-2xl font-semibold tracking-tighter mb-4 leading-tight group-hover:-translate-y-1 transition-transform duration-300">
          {track.title}
        </h3>
        <p className="text-sm text-background/60 leading-relaxed line-clamp-3 flex-1">
          {track.description}
        </p>
      </div>

      {/* Stats — always occupies space, revealed on hover */}
      <div className="mt-6 pt-5 border-t border-background/20 opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 flex-shrink-0">
        {isLoadingStats ? (
          <div className="grid grid-cols-2 gap-3 text-[10px] font-mono uppercase tracking-widest">
            {[0, 1, 2, 3].map((n) => (
              <div key={n} className="animate-pulse">
                <div className="h-2 bg-background/10 rounded mb-2 w-2/3" />
                <div className="h-3 bg-background/20 rounded w-1/2" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-x-4 gap-y-4 text-[10px] font-mono uppercase tracking-widest">
            <div>
              <div className="text-background/40 mb-1.5">Teams</div>
              <div className="text-background font-bold">
                {stats?.totalTeams ?? 0} Active
              </div>
            </div>
            <div>
              <div className="text-background/40 mb-1.5">Evaluated</div>
              <div className="text-primary font-bold">
                {stats?.evaluatedTeams ?? 0} Done
              </div>
            </div>
            <div>
              <div className="text-background/40 mb-1.5">Pending</div>
              <div className="text-background font-bold">
                {stats?.pendingTeams ?? 0}
              </div>
            </div>
            <div>
              <div className="text-background/40 mb-1.5">Leader</div>
              <div className="text-background font-bold truncate max-w-[80px]">
                {stats?.currentLeader ?? 'TBD'}
              </div>
            </div>
          </div>
        )}
      </div>
    </Link>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function LandingPage() {
  const tracks = PUBLIC_CONTENT.tracks;
  const timeline = PUBLIC_CONTENT.timeline;
  const sponsors = SPONSORS_CONFIG;
  const faqs = PUBLIC_CONTENT.faq;

  // Leadership modal
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);

  // FAQ search
  const [faqQuery, setFaqQuery] = useState('');

  // Dynamic track stats
  const [trackStats, setTrackStats] = useState<Record<string, TrackStatistics>>({});
  const [isLoadingStats, setIsLoadingStats] = useState(true);

  useEffect(() => {
    const configTracks = IKIGAI2026_CONFIG.tracks.map((t) => ({ id: t.id, title: t.title }));
    fetchTrackStatistics(configTracks)
      .then(setTrackStats)
      .catch(console.error)
      .finally(() => setIsLoadingStats(false));
  }, []);

  // Leadership — use only faculty for the homepage panel
  const panelMembers = LEADERSHIP_CONFIG.filter((m) =>
    ['Director', 'Chief Patron', 'Convenors', 'Faculty Coordinators'].includes(m.category)
  ).slice(0, 4);

  return (
    <>
      {/* ─── HERO ─── */}
      <section className="relative min-h-screen flex flex-col pt-32 pb-16 bg-background">
        <Container className="flex-1 grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left */}
          <div className="lg:col-span-5 flex flex-col items-start justify-center text-left h-full">
            <div className="flex items-center gap-2 px-3 py-1.5 mb-8 bg-foreground/5 border border-border text-[10px] font-bold tracking-widest uppercase">
              <span className="w-1.5 h-1.5 bg-primary animate-pulse" />
              National AI Competition
            </div>
            <h1 className="text-6xl md:text-7xl font-semibold tracking-tighter mb-8 leading-[1.05] text-foreground">
              {PUBLIC_CONTENT.hero.eventTitle}
            </h1>
            <p className="text-xl text-muted-foreground mb-12 leading-relaxed max-w-md font-light">
              {PUBLIC_CONTENT.hero.tagline}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <Button asChild size="lg" className="h-14 px-10 text-sm tracking-wide rounded-none transition-transform hover:scale-[0.98] duration-150">
                <Link href="/leaderboard">View Leaderboard</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="h-14 px-10 text-sm tracking-wide rounded-none transition-transform hover:scale-[0.98] duration-150">
                <Link href="/rulebook">Read Rulebook</Link>
              </Button>
            </div>
          </div>

          {/* Right: Live stats bento */}
          <div className="lg:col-span-7 h-full flex flex-col justify-center">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border border border-border">
              <div className="col-span-2 bg-background p-8 flex flex-col justify-between min-h-[180px]">
                <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-mono">Live Capacity</div>
                <div>
                  <div className="text-5xl font-semibold tracking-tighter text-foreground mb-1">
                    {PUBLIC_CONTENT.statistics.participants}+
                  </div>
                  <div className="text-sm text-muted-foreground">Registered Innovators</div>
                </div>
              </div>
              <div className="col-span-2 bg-primary/5 p-8 flex flex-col justify-between min-h-[180px]">
                <div className="text-[10px] uppercase tracking-widest text-primary font-mono">Prize Pool</div>
                <div>
                  <div className="text-5xl font-semibold tracking-tighter text-primary mb-1">
                    {PUBLIC_CONTENT.statistics.prizePool}
                  </div>
                  <div className="text-sm text-primary/70">Total Awards</div>
                </div>
              </div>
              <div className="col-span-2 md:col-span-1 bg-background p-6 flex flex-col justify-between min-h-[140px]">
                <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-mono">Domains</div>
                <div className="text-3xl font-semibold tracking-tighter">{PUBLIC_CONTENT.statistics.tracks}</div>
              </div>
              <div className="col-span-2 md:col-span-3 bg-background p-6 flex flex-col justify-between min-h-[140px]">
                <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-mono flex justify-between">
                  <span>Current Phase</span>
                  <span className="text-primary">{timeline[0]?.date}</span>
                </div>
                <div className="text-xl font-medium tracking-tight mt-auto">{timeline[0]?.title}</div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ─── LEADERBOARD PREVIEW ─── */}
      <section className="py-24 bg-muted/5 border-t border-border">
        <Container>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4 text-[10px] font-mono uppercase tracking-widest text-primary">
                <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
                Live Standings
              </div>
              <h2 className="text-4xl md:text-5xl font-semibold tracking-tighter">Realtime Leaderboard</h2>
            </div>
            <Button asChild variant="outline" className="font-mono text-xs uppercase tracking-widest rounded-none">
              <Link href="/leaderboard">View Full Rankings →</Link>
            </Button>
          </div>

          <div className="border border-border bg-background flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-border">
            <div className="flex-1 p-8 md:p-12 flex flex-col items-center justify-center text-center min-h-[200px]">
              <Icons.activity className="w-8 h-8 text-muted-foreground mb-4 opacity-40" />
              <div className="text-sm font-semibold mb-2">Live Telemetry Active</div>
              <p className="text-xs text-muted-foreground max-w-xs leading-relaxed">
                Scores update in real-time as judges submit evaluations via Mission Control.
              </p>
              <Button asChild size="sm" variant="outline" className="mt-6 font-mono text-[10px] uppercase tracking-widest rounded-none">
                <Link href="/leaderboard">Open Full Standings →</Link>
              </Button>
            </div>
            <div className="flex-1 bg-muted/5 p-8 flex flex-col justify-center gap-4">
              <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground border-b border-border pb-3 mb-2">
                Domain Overview
              </div>
              {tracks.slice(0, 3).map((track) => (
                <Link
                  key={track.id}
                  href={`/tracks#${track.id}`}
                  className="flex items-center justify-between group hover:text-primary transition-colors duration-150"
                >
                  <span className="text-sm font-medium tracking-tight">{track.title}</span>
                  <span className="text-[10px] font-mono text-muted-foreground group-hover:text-primary transition-colors">
                    {isLoadingStats ? '—' : `${trackStats[track.id]?.totalTeams ?? 0} teams`}
                  </span>
                </Link>
              ))}
              <Link
                href="/tracks"
                className="text-[10px] font-mono uppercase tracking-widest text-primary hover:underline mt-2 flex items-center gap-1"
              >
                All tracks <Icons.arrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* ─── TRACKS: Dynamic Cards ─── */}
      <section className="py-32 bg-foreground text-background border-y border-border">
        <Container>
          <div className="flex justify-between items-end mb-24 border-b border-background/20 pb-8">
            <div>
              <div className="text-[10px] font-mono uppercase tracking-widest text-background/50 mb-4">Core Domains</div>
              <h2 className="text-5xl font-semibold tracking-tighter">Strategic Tracks</h2>
            </div>
            <Link href="/tracks" className="text-sm tracking-wide uppercase font-mono hover:text-primary transition-colors duration-150">
              View All Domains →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-px bg-background/20 border border-background/20">
            {tracks.map((track, i) => (
              <TrackCard
                key={track.id}
                track={track}
                index={i}
                stats={trackStats[track.id]}
                isLoadingStats={isLoadingStats}
              />
            ))}
          </div>
        </Container>
      </section>

      {/* ─── TIMELINE ─── */}
      <section className="py-32 bg-background border-b border-border relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/5 via-background to-background pointer-events-none" />
        <Container className="relative">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-8 border-b border-border pb-8">
            <div>
              <div className="text-[10px] font-mono uppercase tracking-widest text-primary mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                Live Tracking
              </div>
              <h2 className="text-5xl font-semibold tracking-tighter">Mission Roadmap</h2>
            </div>
            <div className="text-sm font-mono uppercase tracking-widest text-muted-foreground text-right">
              <div>All times in IST</div>
              <div>Strict enforcement</div>
            </div>
          </div>

          <div className="relative border-l border-border/50 ml-4 md:ml-0 md:border-l-0 md:border-t md:flex md:flex-row pt-12 md:pt-0 mt-12 md:mt-24">
            {timeline.map((phase, index) => {
              const status = index === 0 ? 'completed' : index === 1 ? 'active' : 'upcoming';
              return (
                <div key={phase.id} className="relative flex-1 group md:px-6 mb-12 md:mb-0 last:mb-0 pl-8 md:pl-6 border-l md:border-l-0 md:border-r border-transparent md:border-border/30 last:border-r-0 hover:bg-white/2 transition-colors duration-300 md:pt-12">
                  <div className={`absolute left-0 md:left-6 md:top-0 md:-translate-y-1/2 w-3 h-3 -translate-x-[6.5px] md:translate-x-0 rounded-full border-2 transition-all duration-300
                    ${status === 'active' ? 'bg-primary border-primary shadow-[0_0_15px_rgba(var(--primary),0.5)]' :
                      status === 'completed' ? 'bg-foreground border-foreground' : 'bg-background border-border'}`}
                  />
                  <div className="flex items-center gap-3 mb-6">
                    <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">P0{index + 1}</span>
                    {status === 'active' && (
                      <span className="px-2 py-0.5 bg-primary/20 text-primary text-[9px] uppercase font-bold tracking-widest border border-primary/30 rounded">
                        Active Phase
                      </span>
                    )}
                    {status === 'completed' && (
                      <span className="px-2 py-0.5 bg-foreground/10 text-foreground text-[9px] uppercase font-bold tracking-widest border border-foreground/20 rounded">
                        Locked
                      </span>
                    )}
                  </div>
                  <div className={`transition-opacity duration-300 ${status === 'upcoming' ? 'opacity-40' : 'opacity-100'}`}>
                    <h3 className="text-xl font-semibold tracking-tight mb-2 text-foreground group-hover:text-primary transition-colors">
                      {phase.title}
                    </h3>
                    <div className="text-sm font-mono uppercase tracking-widest text-muted-foreground mb-4">{phase.date}</div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{phase.status}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* ─── RULEBOOK PREVIEW ─── */}
      <section className="py-24 bg-background border-b border-border">
        <Container>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8 border-b border-border pb-8">
            <div>
              <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-4">Official Documentation</div>
              <h2 className="text-4xl md:text-5xl font-semibold tracking-tighter">Competition Rules</h2>
            </div>
            <Button asChild variant="default" className="font-mono text-xs uppercase tracking-widest rounded-none">
              <Link href="/rulebook">Read Full Rulebook</Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Icons.fileText, title: 'Eligibility & Teams', desc: 'Rules governing participant qualifications, team formations, and cross-college collaborations.' },
              { icon: Icons.shield, title: 'Submission Protocol', desc: 'Strict requirements for code repositories, presentation decks, and final deployment links.' },
              { icon: Icons.star, title: 'Judging Criteria', desc: 'The exact rubric our judging panel uses, weighted by Innovation, Technical execution, and Impact.' },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="p-8 border border-border bg-muted/5">
                <Icon className="w-6 h-6 text-primary mb-4" />
                <h3 className="text-lg font-semibold mb-2">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ─── LEADERSHIP: Horizontal List — View Profile opens modal ─── */}
      <section className="py-32 bg-background border-b border-border overflow-hidden">
        <Container>
          <div className="flex justify-between items-end mb-24">
            <h2 className="text-5xl font-semibold tracking-tighter">Judging Panel</h2>
            <Link href="/leadership" className="text-sm tracking-wide uppercase font-mono hover:text-primary transition-colors duration-150">
              Full Roster →
            </Link>
          </div>

          <div className="flex flex-col border-t border-border">
            {panelMembers.map((member, i) => (
              <button
                key={i}
                onClick={() => setSelectedMember(member)}
                className="group grid grid-cols-1 md:grid-cols-12 items-center border-b border-border py-8 hover:px-4 transition-all duration-250 text-left w-full"
              >
                <div className="md:col-span-1 text-muted-foreground font-mono text-xs uppercase tracking-widest">
                  {String(i + 1).padStart(2, '0')}
                </div>
                <div className="md:col-span-5 text-3xl font-semibold tracking-tight text-foreground group-hover:text-primary transition-colors duration-150">
                  {member.name}
                </div>
                <div className="md:col-span-4 text-sm text-muted-foreground">
                  {member.designation}
                </div>
                <div className="md:col-span-2 text-right opacity-0 group-hover:opacity-100 transition-opacity duration-250 hidden md:block">
                  <span className="text-xs font-mono uppercase tracking-widest text-primary flex items-center justify-end gap-1">
                    View Profile <Icons.arrowRight className="w-3 h-3" />
                  </span>
                </div>
              </button>
            ))}
          </div>
        </Container>
      </section>

      {/* ─── FAQ — shared component with live search ─── */}
      <section className="py-32 bg-muted/20 border-b border-border">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            {/* Sidebar */}
            <div className="lg:col-span-4 flex flex-col gap-8">
              <div>
                <h2 className="text-4xl font-semibold tracking-tighter mb-4">Operations & FAQ</h2>
                <p className="text-muted-foreground">
                  Strict guidelines and answers regarding the competition mechanics.
                </p>
              </div>

              {/* Contact */}
              <div className="border border-border bg-background p-8">
                <h3 className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-4">Direct Contact</h3>
                <a href={`mailto:${PUBLIC_CONTENT.contact.email}`} className="text-lg font-medium mb-1 hover:text-primary transition-colors flex items-center gap-2">
                  <Icons.mail className="w-4 h-4" />
                  {PUBLIC_CONTENT.contact.email}
                </a>
                <div className="text-muted-foreground text-sm mt-1">{PUBLIC_CONTENT.contact.phone}</div>
              </div>

              {/* Search input — connected to FaqSearch below */}
              <div className="relative">
                <Icons.search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search knowledge base..."
                  value={faqQuery}
                  onChange={(e) => setFaqQuery(e.target.value)}
                  className="w-full bg-background border border-border px-12 py-4 text-sm focus:outline-none focus:border-primary transition-colors duration-150 text-foreground placeholder:text-muted-foreground"
                />
                {faqQuery && (
                  <button
                    onClick={() => setFaqQuery('')}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    aria-label="Clear search"
                  >
                    <Icons.close className="w-4 h-4" />
                  </button>
                )}
              </div>

              <Link
                href="/faq"
                className="text-xs font-mono uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
              >
                View All FAQs <Icons.arrowRight className="w-3 h-3" />
              </Link>
            </div>

            {/* FAQ Accordion — same shared component used by /faq page */}
            <div className="lg:col-span-8">
              <FaqSearch
                items={faqs}
                externalQuery={faqQuery}
              />
            </div>
          </div>
        </Container>
      </section>

      {/* ─── SPONSORS: Marquee Strip ─── */}
      <section className="py-24 bg-background border-b border-border overflow-hidden">
        <Container>
          <div className="flex justify-between items-end mb-12 border-b border-border pb-4">
            <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
              Strategic Partners
            </div>
            <Link href="/sponsors" className="text-xs font-mono uppercase tracking-widest hover:text-primary transition-colors duration-150">
              View All Partners →
            </Link>
          </div>
        </Container>

        <div className="relative w-full overflow-hidden flex items-center h-32 mt-12 before:absolute before:left-0 before:top-0 before:z-10 before:h-full before:w-32 before:bg-gradient-to-r before:from-background before:to-transparent after:absolute after:right-0 after:top-0 after:z-10 after:h-full after:w-32 after:bg-gradient-to-l after:from-background after:to-transparent">
          <style dangerouslySetInnerHTML={{__html: `
            @keyframes sponsorMarquee {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
            .animate-sponsor-marquee {
              animation: sponsorMarquee 40s linear infinite;
              display: flex;
              width: max-content;
            }
            .animate-sponsor-marquee:hover {
              animation-play-state: paused;
            }
          `}} />
          <div className="animate-sponsor-marquee gap-24 px-12">
            {[...sponsors, ...sponsors].map((sponsor, idx) => (
              <Link key={idx} href="/sponsors" className="group relative w-36 h-16 flex-shrink-0 opacity-50 hover:opacity-100 transition-all duration-250 hover:scale-105">
                <Image
                  src={sponsor.logo}
                  alt={sponsor.name}
                  fill
                  className="object-contain"
                />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="bg-foreground text-background py-20">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 justify-between items-end border-b border-background/20 pb-16 mb-8">
            <div>
              <h2 className="text-5xl font-semibold tracking-tighter mb-4">{PUBLIC_CONTENT.hero.eventTitle}</h2>
              <p className="text-background/60">{PUBLIC_CONTENT.hero.tagline}</p>
            </div>
            <div className="md:text-right flex flex-col md:items-end">
              <div className="text-background/50 font-mono text-xs uppercase tracking-widest mb-4">Operations</div>
              <Button asChild className="bg-background text-foreground hover:bg-background/90 rounded-none px-8 py-6 h-auto text-sm transition-transform hover:scale-[0.98] duration-150 w-full sm:w-auto">
                <Link href="/login">Platform Login</Link>
              </Button>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center text-xs font-mono text-background/40">
            <div>{PUBLIC_CONTENT.footer.copyright}</div>
            <div className="flex flex-wrap gap-8 mt-4 md:mt-0">
              {PUBLIC_CONTENT.footer.links.map((link, i) => (
                <Link key={i} href={link.href} className="hover:text-background transition-colors duration-150">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </Container>
      </footer>

      {/* ─── Leadership Profile Modal ─── */}
      <AnimatePresence>
        {selectedMember && (
          <ProfileModal
            member={selectedMember}
            onClose={() => setSelectedMember(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
