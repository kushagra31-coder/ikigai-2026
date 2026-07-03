import { useQuery } from '@tanstack/react-query';
import { MentorService } from '../services/mentor.service';

export function useMentorDashboard() {
  return useQuery({
    queryKey: ['mentorDashboardStats'],
    queryFn: () => MentorService.getDashboardStats(),
  });
}
