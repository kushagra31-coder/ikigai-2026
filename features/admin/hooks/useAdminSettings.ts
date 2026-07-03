import { useQuery } from '@tanstack/react-query';
import { AdminService } from '../services/admin.service';

export function useAdminSettings() {
  const query = useQuery({ queryKey: ['adminSettings'], queryFn: () => AdminService.getSettings() });
  return { data: query.data, loading: query.isLoading, error: query.error, refresh: query.refetch, actions: {} };
}
