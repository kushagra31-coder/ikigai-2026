import { useQuery } from '@tanstack/react-query';
import { MentorService } from '../services/mentor.service';

export function useEvaluationHistory() {
  return useQuery({
    queryKey: ['evaluationHistory'],
    queryFn: () => MentorService.getEvaluationHistory(),
  });
}
