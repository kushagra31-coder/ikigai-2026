'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import DotField from './DotField';

export default function DynamicBackground() {
  const pathname = usePathname();

  // Determine color palette based on route
  let gradientFrom = "#9333ea"; // Brand Purple
  let gradientTo = "#06b6d4"; // Brand Cyan
  let glowColor = "rgba(147, 51, 234, 0.25)";
  
  // Variables for UI elements to sync
  let glowPrimary = "rgba(147, 51, 234, 0.5)"; // Used for drop shadows
  let glowSecondary = "rgba(6, 182, 212, 0.6)"; // Used for buttons
  let glowRgba = "rgba(147, 51, 234, 0.12)"; // Used for GlassCard spotlights

  if (pathname.startsWith('/login') || pathname.startsWith('/register') || pathname.startsWith('/auth')) {
    // Auth Pages: Deep Purple & Hot Pink
    gradientFrom = "#a855f7"; // Purple
    gradientTo = "#ec4899"; // Pink
    glowColor = "rgba(168, 85, 247, 0.3)";
    glowPrimary = "rgba(168, 85, 247, 0.5)";
    glowSecondary = "rgba(236, 72, 153, 0.6)";
    glowRgba = "rgba(168, 85, 247, 0.15)";
  } else if (pathname.startsWith('/dashboard') || pathname.startsWith('/admin')) {
    // Dashboard: Electric Blue & Deep Indigo
    gradientFrom = "#3b82f6"; // Blue
    gradientTo = "#4338ca"; // Indigo
    glowColor = "rgba(59, 130, 246, 0.3)";
    glowPrimary = "rgba(59, 130, 246, 0.5)";
    glowSecondary = "rgba(67, 56, 202, 0.6)";
    glowRgba = "rgba(59, 130, 246, 0.15)";
  } else if (pathname.startsWith('/tracks') || pathname.startsWith('/about')) {
    // Tracks/Info: Orange & Red
    gradientFrom = "#f97316"; // Orange
    gradientTo = "#ef4444"; // Red
    glowColor = "rgba(249, 115, 22, 0.3)";
    glowPrimary = "rgba(249, 115, 22, 0.5)";
    glowSecondary = "rgba(239, 68, 68, 0.6)";
    glowRgba = "rgba(249, 115, 22, 0.15)";
  }

  // Inject CSS variables globally on route change
  React.useEffect(() => {
    document.documentElement.style.setProperty('--glow-primary', glowPrimary);
    document.documentElement.style.setProperty('--glow-secondary', glowSecondary);
    document.documentElement.style.setProperty('--glow-rgba', glowRgba);
  }, [pathname, glowPrimary, glowSecondary, glowRgba]);

  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none transition-colors duration-1000">
      <DotField
        dotRadius={1.5}
        dotSpacing={14}
        bulgeStrength={67}
        glowRadius={160}
        sparkle={false}
        waveAmplitude={0}
        cursorRadius={500}
        cursorForce={0.1}
        bulgeOnly
        gradientFrom={gradientFrom}
        gradientTo={gradientTo}
        glowColor={glowColor}
      />
    </div>
  );
}
