import { useAuthContext } from '@/components/providers/AuthProvider';
import { AuthService } from '../services/auth.service';

export const useAuth = () => {
  const state = useAuthContext();
  return {
    ...state,
    // Bind explicitly so `this` is preserved inside AuthService methods
    signInWithGoogle: () => AuthService.signInWithGoogle(),
    signOut: () => AuthService.signOut(),
  };
};
