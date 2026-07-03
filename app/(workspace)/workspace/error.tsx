'use client';

import { useEffect } from 'react';
import { Icons } from '@/components/constants/icons';
import { Button } from '@/components/primitives/button';
import { motion } from 'framer-motion';

export default function WorkspaceError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] p-4 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-card border border-white/10 rounded-2xl p-8 shadow-2xl flex flex-col items-center"
      >
        <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mb-6">
          <Icons.warning className="w-8 h-8 text-destructive" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Something went wrong!</h2>
        <p className="text-muted-foreground text-sm mb-8">
          An unexpected error occurred in the workspace. Our team has been notified.
        </p>
        <div className="flex gap-4 w-full">
          <Button variant="outline" className="flex-1" onClick={() => window.location.href = '/'}>
            Go Home
          </Button>
          <Button variant="primary" className="flex-1" onClick={() => reset()}>
            Try Again
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
