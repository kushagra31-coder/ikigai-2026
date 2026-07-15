import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { AdminService } from '../services/admin.service';

export function useAdminMentors() {
  const queryClient = useQueryClient();
  const query = useQuery({ queryKey: ['adminMentors'], queryFn: () => AdminService.getMentors() });
  
  const assignTrack = useMutation({
    mutationFn: ({ mentorId, trackId }: { mentorId: string, trackId: string }) => AdminService.assignMentorTrack(mentorId, trackId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['adminMentors'] })
  });

  return { 
    data: query.data, 
    loading: query.isLoading, 
    error: query.error, 
    refresh: query.refetch, 
    actions: { assignTrack: assignTrack.mutateAsync } 
  };
}
