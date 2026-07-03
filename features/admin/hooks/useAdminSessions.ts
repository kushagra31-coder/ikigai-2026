import { useQuery } from '@tanstack/react-query';
import { AdminService } from '../services/admin.service';

export function useAdminSessions() {
  const query = useQuery({ queryKey: ['adminSessions'], queryFn: () => AdminService.getSessions() });
  return { data: query.data, loading: query.isLoading, error: query.error, refresh: query.refetch, actions: {} };
}
