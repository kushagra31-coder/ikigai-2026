/**
 * lib/data/teams.ts
 *
 * Shared Team Data Layer — Single source of truth for all team/track data.
 *
 * Used by:
 *   - app/(public)/tracks/page.tsx
 *   - app/(public)/leaderboard/page.tsx
 *   - app/(public)/page.tsx (homepage)
 *   - app/(workspace)/workspace/mentor/page.tsx
 *   - app/(workspace)/workspace/admin/ pages
 *
 * Never duplicate this logic in individual pages.
 */

import { createClient } from '@/lib/supabase/client';

// ─── Types ────────────────────────────────────────────────────────────────────

export type TeamMember = {
  name: string;
};

export type NormalizedTeam = {
  id: string;
  name: string;
  trackId: string;
  trackName: string;
  avgScore: number;
  evaluated: boolean;
  latestFeedback: string | null;
  github: string | null;
  presentation: string | null;
  members: TeamMember[];
};

export type TrackStatistics = {
  trackId: string;
  trackName: string;
  totalTeams: number;
  evaluatedTeams: number;
  pendingTeams: number;
  currentLeader: string | null;
  highestScore: number;
  teams: NormalizedTeam[];
};

// ─── Shared Fetch ─────────────────────────────────────────────────────────────

/**
 * Fetch all teams with their track assignments, submissions, and evaluation scores.
 * Teams are normalized.
 */
export async function fetchTeams(): Promise<NormalizedTeam[]> {
  const db = createClient();

  const [
    { data: teamsData },
    { data: submissionsData },
    { data: evalsData }
  ] = await Promise.all([
    db.from('teams').select('id, name, track_id, tracks(id, name)'),
    db.from('submissions').select('id, team_id, presentation_url'),
    db.from('evaluations').select('submission_id, total_score, feedback, updated_at'),
  ]);

  if (!teamsData) return [];

  // Build score map: team_id → { total, count, latestFeedback }
  const scoreMap = new Map<string, { total: number; count: number; feedback: string | null; date: Date | null }>();
  (evalsData ?? []).forEach((ev) => {
    if (ev.total_score === null) return;
    const sub = (submissionsData ?? []).find((s) => s.id === ev.submission_id);
    if (!sub) return;
    const cur = scoreMap.get(sub.team_id) ?? { total: 0, count: 0, feedback: null, date: null };
    const evDate = ev.updated_at ? new Date(ev.updated_at) : null;
    scoreMap.set(sub.team_id, {
      total: cur.total + ev.total_score,
      count: cur.count + 1,
      feedback: ev.feedback && (!cur.date || (evDate && evDate > cur.date)) ? ev.feedback : cur.feedback,
      date: evDate && (!cur.date || evDate > cur.date) ? evDate : cur.date,
    });
  });

  return teamsData.map((t): NormalizedTeam => {
    const score = scoreMap.get(t.id);
    const avg = score && score.count > 0 ? Number((score.total / score.count).toFixed(2)) : 0;
    const sub = (submissionsData ?? []).find((s) => s.team_id === t.id);

    const tracksField = t.tracks as any;
    const trackId = t.track_id || (Array.isArray(tracksField) ? tracksField[0]?.id : tracksField?.id) || 'unknown';
    const trackName = (Array.isArray(tracksField) ? tracksField[0]?.name : tracksField?.name) ?? 'Unknown';

    return {
      id: t.id,
      name: t.name,
      trackId: trackId,
      trackName: trackName,
      avgScore: avg,
      evaluated: !!score && score.count > 0,
      latestFeedback: score?.feedback ?? null,
      github: (sub as any)?.repository_url ?? null,
      presentation: sub?.presentation_url ?? null,
      members: [], // We omit members for now or fetch later if needed
    };
  });
}

/**
 * Fetch and group all teams by track, computing per-track statistics.
 * Used by Track pages, homepage track cards, and admin dashboards.
 */
export async function fetchTrackStatistics(configTracks: { id: string; title: string }[]): Promise<Record<string, TrackStatistics>> {
  const allTeams = await fetchTeams();

  const stats: Record<string, TrackStatistics> = {};

  configTracks.forEach((configTrack) => {
    const trackTeams = allTeams.filter(
      (t) =>
        t.trackId === configTrack.id ||
        t.trackName.toLowerCase() === configTrack.title.toLowerCase()
    );

    const evaluatedTeams = trackTeams.filter((t) => t.evaluated);
    const pendingTeams = trackTeams.filter((t) => !t.evaluated);

    let leader: string | null = null;
    let highestScore = -1;
    evaluatedTeams.forEach((t) => {
      if (t.avgScore > highestScore) {
        highestScore = t.avgScore;
        leader = t.name;
      }
    });

    stats[configTrack.id] = {
      trackId: configTrack.id,
      trackName: configTrack.title,
      totalTeams: trackTeams.length,
      evaluatedTeams: evaluatedTeams.length,
      pendingTeams: pendingTeams.length,
      currentLeader: leader,
      highestScore: highestScore > 0 ? highestScore : 0,
      teams: trackTeams,
    };
  });

  return stats;
}

/**
 * Fetch teams assigned to a specific track (by trackId from config).
 */
export async function fetchTeamsByTrack(
  trackId: string,
  configTrackTitle: string
): Promise<NormalizedTeam[]> {
  const allTeams = await fetchTeams();
  return allTeams.filter(
    (t) =>
      t.trackId === trackId ||
      t.trackName.toLowerCase() === configTrackTitle.toLowerCase()
  );
}

/**
 * Fetch full leaderboard sorted by score, with rank assigned.
 */
export async function fetchLeaderboard(): Promise<(NormalizedTeam & { rank: number; scoreChange: number })[]> {
  const teams = await fetchTeams();
  const sorted = [...teams].sort((a, b) => b.avgScore - a.avgScore);
  return sorted.map((t, i) => ({
    ...t,
    rank: i + 1,
    scoreChange: 0,
  }));
}
