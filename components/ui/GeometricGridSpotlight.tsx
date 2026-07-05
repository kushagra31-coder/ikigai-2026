'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function GeometricGridSpotlight() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    
    // Start at center
    setMousePosition({
      x: window.innerWidth / 2,
      y: window.innerHeight / 2
    });

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  if (!isMounted) return null;

  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none bg-black overflow-hidden">
      {/* Precision Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-20" 
        style={{
          backgroundImage: `
            linear-gradient(to right, #ffffff 1px, transparent 1px),
            linear-gradient(to bottom, #ffffff 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}
      />
      
      {/* Dark mask with spotlight hole cutting through to the grid */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, transparent 0%, #000000 80%)`
        }}
        transition={{ type: 'tween', ease: 'linear', duration: 0 }}
      />
      
      {/* Very faint emerald glow at center of spotlight */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: `radial-gradient(300px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(16, 185, 129, 0.05), transparent 60%)`
        }}
        transition={{ type: 'tween', ease: 'linear', duration: 0 }}
      />
    </div>
  );
}
