'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export const DotBackground = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 z-[-1] bg-background overflow-hidden pointer-events-none">
      
      {/* Interactive Cursor Glow */}
      <motion.div
        className="absolute w-[800px] h-[800px] rounded-full blur-[120px] opacity-30 bg-primary/40 pointer-events-none"
        animate={{
          x: mousePosition.x - 400,
          y: mousePosition.y - 400,
        }}
        transition={{
          type: "tween",
          ease: "easeOut",
          duration: 0.5
        }}
      />
      
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full blur-[80px] opacity-20 bg-accent/30 pointer-events-none"
        animate={{
          x: mousePosition.x - 200,
          y: mousePosition.y - 200,
        }}
        transition={{
          type: "tween",
          ease: "easeOut",
          duration: 0.15
        }}
      />

      {/* Dot Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-40" 
        style={{
          backgroundImage: 'radial-gradient(circle at center, rgba(255,255,255,0.15) 1.5px, transparent 1.5px)',
          backgroundSize: '24px 24px',
        }}
      />
      
      {/* Edge Vignette */}
      <div className="absolute inset-0 bg-background [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black_80%)]" />
    </div>
  );
};
