import { useQuery } from '@tanstack/react-query';
import { AdminService } from '../services/admin.service';
import { createClient as supabase } from '@/lib/supabase/client';

export function useAdminDashboard() {
  // Aggregate stats from multiple endpoints
  const teamsQuery = useQuery({ queryKey: ['adminTeams'], queryFn: () => AdminService.getTeams() });
  const mentorsQuery = useQuery({ queryKey: ['adminMentors'], queryFn: () => AdminService.getMentors() });
  const tracksQuery = useQuery({ queryKey: ['adminTracks'], queryFn: () => AdminService.getTracks() });
  const sessionsQuery = useQuery({ queryKey: ['adminSessions'], queryFn: () => AdminService.getSessions() });
  
  // New queries for live stats
  const submissionsQuery = useQuery({ 
    queryKey: ['adminSubmissions'], 
    queryFn: async () => {
      const { data, error } = await supabase().from('submissions').select('id');
      if (error) throw error;
      return data;
    }
  });

  const evaluationsQuery = useQuery({ 
    queryKey: ['adminEvaluations'], 
    queryFn: async () => {
      const { data, error } = await supabase().from('evaluations').select('id, submission_id, status');
      if (error) throw error;
      return data;
    }
  });
  
  const loading = teamsQuery.isLoading || mentorsQuery.isLoading || tracksQuery.isLoading || sessionsQuery.isLoading || submissionsQuery.isLoading || evaluationsQuery.isLoading;
  const error = teamsQuery.error || mentorsQuery.error || tracksQuery.error || sessionsQuery.error || submissionsQuery.error || evaluationsQuery.error;
  
  const refresh = () => {
    teamsQuery.refetch();
    mentorsQuery.refetch();
    tracksQuery.refetch();
    sessionsQuery.refetch();
    submissionsQuery.refetch();
    evaluationsQuery.refetch();
  };

  const totalTeams = teamsQuery.data?.length || 0;
  const totalSubmissions = submissionsQuery.data?.length || 0;
  const totalEvaluations = evaluationsQuery.data?.length || 0;
  const pendingReviews = Math.max(0, totalSubmissions - totalEvaluations);
  
  const data = loading ? undefined : {
    totalTeams,
    totalMentors: mentorsQuery.data?.length || 0,
    totalTracks: tracksQuery.data?.length || 0,
    activeSessions: sessionsQuery.data?.filter((s: any) => s.status === 'ACTIVE').length || 0,
    totalSubmissions,
    totalEvaluations,
    pendingReviews
  };

  return { data, loading, error, refresh, actions: {} };
}
