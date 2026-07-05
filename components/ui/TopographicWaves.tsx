'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

export default function TopographicWaves() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    console.log("TopographicWaves mounted");
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;
    
    // Mouse interaction variables
    let targetMouseX = 0;
    let targetMouseY = 0;
    let mouseX = 0;
    let mouseY = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resize);
    resize();

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = (e.clientX / window.innerWidth) - 0.5;
      targetMouseY = (e.clientY / window.innerHeight) - 0.5;
    };
    window.addEventListener('mousemove', handleMouseMove);

    const draw = () => {
      time += 0.002;
      
      // Smooth mouse interpolation (easing)
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      // Solid black background
      ctx.fillStyle = '#050505';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const numLines = Math.floor(canvas.height / 25);
      const width = canvas.width;
      const height = canvas.height;
      const centerY = height / 2;

      for (let i = 0; i < numLines; i++) {
        ctx.beginPath();
        
        // Base y position for this line
        const yOffset = (height / numLines) * i;
        
        // Gradient color for lines (fading out at edges)
        const normalizedY = Math.abs(yOffset - centerY) / centerY;
        const opacity = Math.max(0.02, 0.15 - (normalizedY * 0.1));
        
        // Emerald Green lines
        ctx.strokeStyle = `rgba(16, 185, 129, ${opacity})`;
        ctx.lineWidth = 1.5;

        for (let x = 0; x <= width; x += 15) {
          // Complex intersecting sine waves to create topographic fluid motion
          const normalizedX = x / width;
          
          // Wave 1: Slow, large sweeping wave
          const wave1 = Math.sin(normalizedX * 4 + time + i * 0.1) * 80;
          
          // Wave 2: Faster, smaller rippling wave
          const wave2 = Math.sin(normalizedX * 8 - time * 1.5 + i * 0.05) * 30;
          
          // Wave 3: Mouse reactive wave
          const wave3 = Math.sin(normalizedX * 5 + time * 2) * (mouseY * 100) * Math.sin(i * 0.1);
          
          // X-shift based on mouse to give a 3D parallax feel
          const xShift = mouseX * 50 * (i / numLines);

          const y = yOffset + wave1 + wave2 + wave3;
          
          if (x === 0) {
            ctx.moveTo(x + xShift, y);
          } else {
            ctx.lineTo(x + xShift, y);
          }
        }
        ctx.stroke();
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isMounted]);

  if (!isMounted) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="fixed inset-0 z-[-1] pointer-events-none"
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
      />
    </motion.div>
  );
}
