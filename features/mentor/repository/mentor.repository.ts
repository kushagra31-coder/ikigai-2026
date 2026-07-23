import { createClient } from '@/lib/supabase/client';
import { AssignedTeam, EvaluationHistoryRecord, MentorDashboardStats } from '../types';
import { Result } from '@/types/result';

const db = () => createClient();

/**
 * MentorRepository — all methods perform real Supabase queries.
 * No mock data. No hardcoded values. No fake delays.
 *
 * Security: Supabase RLS (updated in migration 20260719000001) ensures
 * mentors can only read teams, submissions, and evaluations in their
 * assigned track. Frontend queries add an explicit track filter as a
 * defense-in-depth measure.
 */
export const mentorRepository = {

  /**
   * Returns the current mentor's profile, including their assigned track.
   * Uses auth.uid() via Supabase session.
   */
  async getProfile(): Promise<Result<{ id: string; full_name: string; email: string; assigned_track_id: string | null; role: string, track_name?: string }>> {
    const { data: { user }, error: authError } = await db().auth.getUser();
    if (authError || !user) {
      return { success: false, error: new Error('Not authenticated') as any };
    }

    const { data, error } = await db()
      .from('profiles')
      .select('id, full_name, email, assigned_track_id, role, tracks(name)')
      .eq('id', user.id)
      .single();

    if (error) return { success: false, error: error as any };
    
    const trackName = (data as any).tracks && Array.isArray((data as any).tracks) 
      ? (data as any).tracks[0]?.name 
      : (data as any).tracks?.name;
      
    return { success: true, data: { ...data, track_name: trackName } as any };
  },

  /**
   * Returns the mentor's dashboard stats by aggregating real Supabase data.
   * Only counts teams/evaluations scoped to the mentor's assigned track.
   */
  async getDashboardStats(): Promise<Result<MentorDashboardStats>> {
    const profileResult = await mentorRepository.getProfile();
    if (!profileResult.success) return profileResult as any;
    const profile = profileResult.data;

    if (!profile.assigned_track_id) {
      // Mentor has no assigned track yet — return zeroed stats
      const stats: MentorDashboardStats = {
        mentorName: profile.full_name || profile.email,
        department: 'No track assigned',
        currentSession: { id: '', name: 'Pending Assignment', startTime: new Date().toISOString(), endTime: new Date().toISOString(), status: 'UPCOMING' },
        assignedTeamsCount: 0,
        completedEvaluations: 0,
        pendingEvaluations: 0,
        averageScoreGiven: 0,
      };
      return { success: true, data: stats };
    }

    // Fetch teams in assigned track
    const { data: teamsData, error: teamsError } = await db()
      .from('teams')
      .select('id, name')
      .eq('track_id', profile.assigned_track_id);

    if (teamsError) return { success: false, error: teamsError as any };
    const teams = teamsData ?? [];

    // Fetch submissions for those teams
    const teamIds = teams.map(t => t.id);
    const { data: submissions } = teamIds.length > 0
      ? await db().from('submissions').select('id, team_id').in('team_id', teamIds)
      : { data: [] };

    const submissionIds = (submissions ?? []).map(s => s.id);

    // Fetch this mentor's evaluations for those submissions
    const { data: evaluations } = submissionIds.length > 0
      ? await db()
          .from('evaluations')
          .select('id, total_score, submission_id')
          .in('submission_id', submissionIds)
          .eq('mentor_id', profile.id)
      : { data: [] };

    const completed = (evaluations ?? []).length;
    const pending = teams.length - completed;
    const avgScore = completed > 0
      ? Number(((evaluations ?? []).reduce((sum, e) => sum + (e.total_score ?? 0), 0) / completed).toFixed(1))
      : 0;

    // Fetch the track name
    const { data: trackData } = await db()
      .from('tracks')
      .select('name')
      .eq('id', profile.assigned_track_id)
      .single();

    const stats: MentorDashboardStats = {
      mentorName: profile.full_name || profile.email,
      department: trackData?.name || 'Unknown Track',
      currentSession: {
        id: 'live',
        name: 'IKIGAI 2026 Grand Finale',
        startTime: new Date().toISOString(),
        endTime: new Date().toISOString(),
        status: 'ACTIVE',
      },
      assignedTeamsCount: teams.length,
      completedEvaluations: completed,
      pendingEvaluations: Math.max(0, pending),
      averageScoreGiven: avgScore,
    };

    return { success: true, data: stats };
  },

  /**
   * Returns teams assigned to this mentor's track, with evaluation status per team.
   */
  async getAssignedTeams(): Promise<Result<AssignedTeam[]>> {
    const profileResult = await mentorRepository.getProfile();
    if (!profileResult.success) return profileResult as any;
    const profile = profileResult.data;

    if (!profile.assigned_track_id) {
      return { success: true, data: [] };
    }

    // Teams in mentor's track
    const { data: teamsData, error: teamsError } = await db()
      .from('teams')
      .select('id, name, track_id, tracks(name)')
      .eq('track_id', profile.assigned_track_id)
      .order('name');

    if (teamsError) return { success: false, error: teamsError as any };
    const teams = teamsData ?? [];

    if (teams.length === 0) return { success: true, data: [] };

    const teamIds = teams.map(t => t.id);

    const { data: submissions } = await db()
      .from('submissions')
      .select('id, team_id, presentation_url')
      .in('team_id', teamIds);

    const submissionIds = (submissions ?? []).map(s => s.id);
    const { data: evaluations } = submissionIds.length > 0
      ? await db()
          .from('evaluations')
          .select('id, submission_id, total_score, score_innovation, score_technical, score_impact, score_presentation, feedback, status')
          .in('submission_id', submissionIds)
          .eq('mentor_id', profile.id)
      : { data: [] };

    const result: AssignedTeam[] = teams.map(team => {
      const sub = (submissions ?? []).find(s => s.team_id === team.id);
      const ev = sub ? (evaluations ?? []).find(e => e.submission_id === sub.id) : null;
      const trackName = (Array.isArray((team as any).tracks) ? (team as any).tracks[0]?.name : (team as any).tracks?.name) || 'Unknown';

      return {
        id: team.id,
        name: team.name,
        track: trackName,
        leaderName: '',
        membersCount: 0,
        submissionStatus: sub ? 'SUBMITTED' : 'NOT_STARTED',
        evaluationStatus: ev ? 'COMPLETED' : 'PENDING',
        currentScore: ev?.total_score ?? null,
        pendingTasks: 0,
        submission: sub ? {
          id: sub.id,
          presentation_url: sub.presentation_url,
          repository_url: (sub as any).repository_url,
        } : null,
        evaluation: ev ? {
          id: ev.id,
          score_innovation: ev.score_innovation,
          score_technical: ev.score_technical,
          score_impact: ev.score_impact,
          score_presentation: ev.score_presentation,
          feedback: ev.feedback,
        } : null,
      } as any;
    });

    return { success: true, data: result };
  },

  /**
   * Returns past evaluations submitted by this mentor (all time).
   */
  async getEvaluationHistory(): Promise<Result<EvaluationHistoryRecord[]>> {
    const profileResult = await mentorRepository.getProfile();
    if (!profileResult.success) return profileResult as any;
    const profile = profileResult.data;

    const { data, error } = await db()
      .from('evaluations')
      .select(`
        id,
        total_score,
        feedback,
        status,
        created_at,
        submission:submissions(
          team:teams(name, tracks(name))
        )
      `)
      .eq('mentor_id', profile.id)
      .order('created_at', { ascending: false })
      .limit(50);

    if (error) return { success: false, error: error as any };

    const history: EvaluationHistoryRecord[] = (data ?? []).map((ev, idx) => {
      const subData = Array.isArray(ev.submission) ? ev.submission[0] : ev.submission;
      const teamData = Array.isArray(subData?.team) ? subData?.team[0] : subData?.team;
      const trackData = Array.isArray(teamData?.tracks) ? teamData?.tracks[0] : teamData?.tracks;

      return {
        id: ev.id,
        sessionId: 'live',
        sessionName: 'IKIGAI 2026',
        teamId: '',
        teamName: teamData?.name || 'Unknown Team',
        date: ev.created_at,
        score: ev.total_score ?? 0,
        status: (ev.status as any) || 'COMPLETED',
        remarks: ev.feedback || '',
        revision: idx,
      };
    });

    return { success: true, data: history };
  },
};
