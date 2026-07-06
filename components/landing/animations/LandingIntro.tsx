'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Icons } from '@/components/constants/icons';

export const LandingIntro = ({ onComplete }: { onComplete: () => void }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsClient(true);
    // Play intro only once per session
    const hasPlayed = sessionStorage.getItem('ikigai_intro_played');
    if (hasPlayed) {
      onComplete();
      return;
    }

    const timer = setTimeout(() => {
      sessionStorage.setItem('ikigai_intro_played', 'true');
      onComplete();
    }, 3500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  if (!isClient) return null;

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0, filter: 'blur(10px)' }}
      transition={{ duration: 0.8, delay: 2.5, ease: 'easeInOut' }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black pointer-events-none"
    >
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ 
          scale: [0.5, 1.2, 1, 0.8], 
          opacity: [0, 1, 1, 0] 
        }}
        transition={{ 
          duration: 3,
          times: [0, 0.3, 0.7, 1],
          ease: 'easeInOut' 
        }}
        className="flex flex-col items-center justify-center relative"
      >
        <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full scale-150 animate-pulse" />
        <img 
          src="/images/ikigai-logo.png" 
          alt="IKIGAI 2026" 
          className="h-28 w-auto object-contain relative z-10" 
        />
      </motion.div>
    </motion.div>
  );
};
