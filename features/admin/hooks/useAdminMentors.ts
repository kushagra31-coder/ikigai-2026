import { useQuery } from '@tanstack/react-query';
import { AdminService } from '../services/admin.service';

export function useAdminMentors() {
  const query = useQuery({ queryKey: ['adminMentors'], queryFn: () => AdminService.getMentors() });
  return { data: query.data, loading: query.isLoading, error: query.error, refresh: query.refetch, actions: {} };
}
