import { useQuery } from '@tanstack/react-query';
import { AdminService } from '../services/admin.service';

export function useAdminLogs() {
  const query = useQuery({ queryKey: ['adminLogs'], queryFn: () => AdminService.getLogs() });
  return { data: query.data, loading: query.isLoading, error: query.error, refresh: query.refetch, actions: {} };
}
