'use client';
import { useState, useEffect } from 'react';
import { GlassCard } from '@/components/data-display/GlassCard';
import { Fade } from '@/components/motion';

export const Countdown = ({ targetDate }: { targetDate: string }) => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsClient(true);
    const timer = setInterval(() => {
      const difference = new Date(targetDate).getTime() - new Date().getTime();
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  if (!isClient) return null;

  return (
    <Fade delay={0.4}>
      <div className="flex gap-2 md:gap-4 justify-center mt-12">
        {Object.entries(timeLeft).map(([label, value]) => (
          <GlassCard key={label} className="p-3 md:p-6 min-w-[70px] md:min-w-[120px] text-center flex flex-col items-center shadow-sm hover:bg-white/5 transition-colors">
            <span className="text-3xl md:text-5xl font-bold font-mono text-primary tracking-tighter">
              {String(value).padStart(2, '0')}
            </span>
            <span className="text-[10px] md:text-xs mt-2 text-muted-foreground uppercase tracking-widest font-medium">
              {label}
            </span>
          </GlassCard>
        ))}
      </div>
    </Fade>
  );
};
