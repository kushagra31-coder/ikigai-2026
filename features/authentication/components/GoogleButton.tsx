'use client';

import { Button } from '@/components/primitives/button';
import { useAuth } from '../hooks/useAuth';
import { useState } from 'react';
import { LogIn } from 'lucide-react';
import { useRouter } from 'next/navigation';

export const GoogleButton = () => {
  const { signInWithGoogle } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true);
      await signInWithGoogle();
      router.push('/workspace');
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button 
      variant="outline" 
      onClick={handleGoogleSignIn} 
      disabled={isLoading}
      className="w-full flex items-center justify-center gap-2"
    >
      <LogIn className="h-4 w-4" />
      {isLoading ? 'Redirecting...' : 'Continue with Google'}
    </Button>
  );
};
