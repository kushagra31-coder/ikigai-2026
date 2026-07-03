import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { AdminService } from '../services/admin.service';

export function useAdminTeams() {
  const queryClient = useQueryClient();
  const query = useQuery({ queryKey: ['adminTeams'], queryFn: () => AdminService.getTeams() });

  const bulkAssignMentor = useMutation({
    mutationFn: ({ teamIds, mentorId }: { teamIds: string[], mentorId: string }) => AdminService.bulkAssignMentor(teamIds, mentorId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['adminTeams'] })
  });

  const bulkAssignTrack = useMutation({
    mutationFn: ({ teamIds, trackId }: { teamIds: string[], trackId: string }) => AdminService.bulkAssignTrack(teamIds, trackId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['adminTeams'] })
  });

  const bulkLockUnlock = useMutation({
    mutationFn: ({ teamIds, isLocked }: { teamIds: string[], isLocked: boolean }) => AdminService.bulkLockUnlock(teamIds, isLocked),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['adminTeams'] })
  });

  return {
    data: query.data,
    loading: query.isLoading,
    error: query.error,
    refresh: query.refetch,
    actions: {
      bulkAssignMentor: bulkAssignMentor.mutateAsync,
      bulkAssignTrack: bulkAssignTrack.mutateAsync,
      bulkLockUnlock: bulkLockUnlock.mutateAsync
    }
  };
}
