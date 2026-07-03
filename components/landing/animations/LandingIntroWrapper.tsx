'use client';

import { useState } from 'react';
import { LandingIntro } from '@/components/landing/animations/LandingIntro';

export const LandingIntroWrapper = () => {
  const [showIntro, setShowIntro] = useState(true);

  if (!showIntro) return null;

  return <LandingIntro onComplete={() => setShowIntro(false)} />;
};
