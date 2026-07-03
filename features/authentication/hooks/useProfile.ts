import { useAuthContext } from '@/components/providers/AuthProvider';

export const useProfile = () => {
  const { profile, role, loading } = useAuthContext();
  return { profile, role, isLoading: loading };
};
