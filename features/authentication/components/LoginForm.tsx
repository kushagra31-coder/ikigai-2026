'use client';

import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Button } from '@/components/primitives/button';
import { Input } from '@/components/primitives/input';
import { Label } from '@/components/primitives/label';
import { GoogleButton } from './GoogleButton';
import { useRouter, useSearchParams } from 'next/navigation';

export const LoginForm = () => {
  const { signInWithEmail } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const isNotWhitelisted = searchParams?.get('error') === 'not_whitelisted';
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      await signInWithEmail(email, password);
      router.push('/workspace');
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Failed to sign in. Please check your credentials.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-6">
      <div className="flex flex-col items-center text-center space-y-3">
        <img 
          src="/images/ikigai-logo.png" 
          alt="IKIGAI 2026" 
          className="h-14 w-auto object-contain mb-2 animate-fade-in" 
        />
        <h1 className="text-3xl font-bold tracking-tight">Welcome back</h1>
        <p className="text-muted-foreground">Sign in to your account</p>
      </div>

      {isNotWhitelisted && (
        <div className="p-4 text-sm text-red-500 bg-red-500/10 border border-red-500/20 rounded-xl text-center">
          <strong>Access Denied:</strong> Your email is not whitelisted for access. Only authorized Mentors and Admins can log in.
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input 
            id="email" 
            type="email" 
            placeholder="m@example.com" 
            required 
            pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"
            title="Please enter a valid email address ending with a proper domain (e.g., @gmail.com)"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
          />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <a href="#" className="text-sm text-muted-foreground hover:underline">Forgot password?</a>
          </div>
          <Input 
            id="password" 
            type="password" 
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
          />
        </div>
        
        {error && (
          <div className="p-3 text-sm text-red-500 bg-red-100 rounded-md">
            {error}
          </div>
        )}

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? 'Signing in...' : 'Sign in'}
        </Button>
      </form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>

      <GoogleButton />
    </div>
  );
};
