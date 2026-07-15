'use client';

import { useState, useEffect } from 'react';
import { LandingIntro } from '@/components/landing/animations/LandingIntro';

export const LandingIntroWrapper = () => {
  const [showIntro, setShowIntro] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const hasPlayed = sessionStorage.getItem('ikigai_intro_played');
    if (!hasPlayed) {
      setShowIntro(true);
    }
  }, []);

  if (!mounted) return null;
  if (!showIntro) return null;

  return <LandingIntro onComplete={() => setShowIntro(false)} />;
};
