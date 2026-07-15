'use client';

import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { IkigaiLogoVector } from '@/components/landing/animations/IkigaiLogoVector';

export const LandingIntro = ({ onComplete }: { onComplete: () => void }) => {
  useEffect(() => {
    // Set immediately so if they reload during animation, it doesn't replay
    sessionStorage.setItem('ikigai_intro_played', 'true');
    
    const timer = setTimeout(() => {
      onComplete();
    }, 2800); // reduced from 4500 to 2800 for snappier load

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 0.6, delay: 2.2, ease: 'easeInOut' }}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black pointer-events-none overflow-hidden"
    >
      {/* Subtle Purple Glow Background */}
      <motion.div 
        className="absolute inset-0 flex items-center justify-center"
        animate={{ scale: [1, 1.2, 5], opacity: [0, 0.5, 0] }}
        transition={{ duration: 2.8, times: [0, 0.5, 1], ease: [0.5, 0, 0.2, 1] }}
      >
        <div className="w-[300px] h-[300px] md:w-[450px] md:h-[450px] rounded-full blur-[60px] opacity-70 bg-purple-600/30" />
      </motion.div>

      {/* The Vector Logo Zoom */}
      <motion.div
        animate={{ 
          scale: [0.3, 1, 1, 15], 
          opacity: [0, 1, 1, 0] 
        }}
        transition={{ 
          duration: 2.8,
          times: [0, 0.2, 0.5, 1],
          ease: [0.5, 0, 0.2, 1] 
        }}
        className="flex flex-col items-center justify-center relative z-10 w-full max-w-[80vw] md:max-w-2xl px-4"
      >
        <IkigaiLogoVector className="drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]" />
      </motion.div>
    </motion.div>
  );
};
