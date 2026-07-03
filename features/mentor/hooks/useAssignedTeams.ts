import { useQuery } from '@tanstack/react-query';
import { MentorService } from '../services/mentor.service';

export function useAssignedTeams() {
  return useQuery({
    queryKey: ['assignedTeams'],
    queryFn: () => MentorService.getAssignedTeams(),
  });
}

export function useTeamDetails(teamId: string) {
  return useQuery({
    queryKey: ['teamDetails', teamId],
    queryFn: () => MentorService.getTeamDetails(teamId),
    enabled: !!teamId,
  });
}
