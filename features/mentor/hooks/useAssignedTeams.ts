import { useQuery } from '@tanstack/react-query';
import { MentorService } from '../services/mentor.service';

export function useAssignedTeams() {
  return useQuery({
    queryKey: ['assignedTeams'],
    queryFn: () => MentorService.getAssignedTeams(),
  });
}
