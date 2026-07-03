import { useQuery } from '@tanstack/react-query';
import { AdminService } from '../services/admin.service';

export function useAdminAnnouncements() {
  const query = useQuery({ queryKey: ['adminAnnouncements'], queryFn: () => AdminService.getAnnouncements() });
  return { data: query.data, loading: query.isLoading, error: query.error, refresh: query.refetch, actions: {} };
}
