import { useQuery } from '@tanstack/react-query';
import { AdminService } from '../services/admin.service';

export function useAdminTracks() {
  const query = useQuery({ queryKey: ['adminTracks'], queryFn: () => AdminService.getTracks() });
  return { data: query.data, loading: query.isLoading, error: query.error, refresh: query.refetch, actions: {} };
}
