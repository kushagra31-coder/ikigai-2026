import { useQuery } from '@tanstack/react-query';
import { AdminService } from '../services/admin.service';

export function useAdminDashboard() {
  // Aggregate stats from multiple endpoints
  const teamsQuery = useQuery({ queryKey: ['adminTeams'], queryFn: () => AdminService.getTeams() });
  const mentorsQuery = useQuery({ queryKey: ['adminMentors'], queryFn: () => AdminService.getMentors() });
  const tracksQuery = useQuery({ queryKey: ['adminTracks'], queryFn: () => AdminService.getTracks() });
  const sessionsQuery = useQuery({ queryKey: ['adminSessions'], queryFn: () => AdminService.getSessions() });
  
  const loading = teamsQuery.isLoading || mentorsQuery.isLoading || tracksQuery.isLoading || sessionsQuery.isLoading;
  const error = teamsQuery.error || mentorsQuery.error || tracksQuery.error || sessionsQuery.error;
  
  const refresh = () => {
    teamsQuery.refetch();
    mentorsQuery.refetch();
    tracksQuery.refetch();
    sessionsQuery.refetch();
  };

  const data = loading ? undefined : {
    totalTeams: teamsQuery.data?.length || 0,
    totalMentors: mentorsQuery.data?.length || 0,
    totalTracks: tracksQuery.data?.length || 0,
    activeSessions: sessionsQuery.data?.filter(s => s.status === 'ACTIVE').length || 0
  };

  return { data, loading, error, refresh, actions: {} };
}
