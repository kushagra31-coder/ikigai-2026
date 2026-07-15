'use client';
// Force rebuild to clear hydration cache

import Image from 'next/image';
import { useState } from 'react';
import { GlassCard } from '@/components/data-display/GlassCard';

interface SponsorCardProps {
  id: string;
  name: string;
  logo: string;
  tier: string;
  website?: string;
}

export function SponsorCard({ name, logo, tier, website }: SponsorCardProps) {
  const [imgError, setImgError] = useState(false);
  const initials = name.substring(0, 2).toUpperCase();
  const content = (
    <div className="p-6 flex flex-col items-center justify-center min-h-[180px] group relative transition-all duration-300 hover:bg-white/5 rounded-2xl">
      <div className="relative w-[80%] h-24 mb-4 flex items-center justify-center">
        {!imgError ? (
            <Image
              src={logo}
              alt={`${name} Logo`}
              fill
              className="object-contain filter invert opacity-90 transition-all duration-300 group-hover:scale-110 group-hover:opacity-100"
              sizes="(max-width: 768px) 50vw, 20vw"
            loading="lazy"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center text-primary font-black text-lg">
            {initials}
          </div>
        )}
      </div>
      <h3 className="text-xs font-bold text-center tracking-widest uppercase text-muted-foreground group-hover:text-primary transition-colors line-clamp-2 leading-tight">
        {name}
      </h3>
      <span className="text-[10px] uppercase text-primary/50 font-bold mt-2 tracking-widest">{tier}</span>
    </div>
  );

  if (website && website !== '#') {
    return (
      <a href={website} target="_blank" rel="noreferrer" className="block h-full">
        {content}
      </a>
    );
  }

  return content;
}
