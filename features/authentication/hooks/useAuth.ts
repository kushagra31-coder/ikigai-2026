import { useAuthContext } from '@/components/providers/AuthProvider';
import { AuthService } from '../services/auth.service';

export const useAuth = () => {
  const state = useAuthContext();
  return {
    ...state,
    signInWithGoogle: AuthService.signInWithGoogle,
    signInWithEmail: AuthService.signInWithEmail,
    signUpWithEmail: AuthService.signUpWithEmail,
    signOut: AuthService.signOut,
    resetPassword: AuthService.resetPassword,
  };
};
