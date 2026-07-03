import { useAuthContext } from '@/components/providers/AuthProvider';
import { AuthService } from '../services/auth.service';

export const useAuth = () => {
  const state = useAuthContext();
  return {
    ...state,
    // Bind explicitly so `this` is preserved inside AuthService methods
    signInWithGoogle: () => AuthService.signInWithGoogle(),
    signInWithEmail: (email: string, password: string) => AuthService.signInWithEmail(email, password),
    signUpWithEmail: (email: string, password: string, fullName: string) => AuthService.signUpWithEmail(email, password, fullName),
    signOut: () => AuthService.signOut(),
    resetPassword: (email: string) => AuthService.resetPassword(email),
  };
};
