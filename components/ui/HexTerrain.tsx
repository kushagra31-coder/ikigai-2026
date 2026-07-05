'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

export default function HexTerrain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    // Mouse interaction
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let targetMouseX = mouseX;
    let targetMouseY = mouseY;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resize);
    resize();

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = e.clientX;
      targetMouseY = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Hexagon parameters
    const hexRadius = 30; // Size of hexagon
    const hexWidth = Math.sqrt(3) * hexRadius;
    const hexHeight = 2 * hexRadius;
    const xOffset = hexWidth;
    const yOffset = hexHeight * 0.75;

    // Precompute a single hexagon path
    const drawHexagon = (x: number, y: number, z: number, glow: number) => {
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 180) * (60 * i - 30);
        // The z value lifts the hexagon upwards on the screen (Y axis)
        const vx = x + hexRadius * Math.cos(angle);
        const vy = y + hexRadius * Math.sin(angle) - z; 
        if (i === 0) ctx.moveTo(vx, vy);
        else ctx.lineTo(vx, vy);
      }
      ctx.closePath();

      // Dynamic styling based on elevation (z) and mouse glow
      const baseOpacity = 0.15 + Math.max(0, z / 60);
      const finalOpacity = Math.min(1, baseOpacity + glow);
      
      // Fill for depth (slightly lighter than pure background)
      ctx.fillStyle = `rgba(10, 10, 10, 0.95)`;
      ctx.fill();
      
      // Emerald Green strokes
      ctx.strokeStyle = `rgba(16, 185, 129, ${finalOpacity})`;
      ctx.lineWidth = glow > 0.1 ? 1.5 : 1;
      ctx.stroke();

      // Draw vertical walls for the 3D effect if lifted
      if (z > 2) {
        ctx.beginPath();
        // Draw lines from the bottom 3 vertices downwards
        for (let i = 1; i <= 3; i++) {
          const angle = (Math.PI / 180) * (60 * i - 30);
          const vx = x + hexRadius * Math.cos(angle);
          const vyTop = y + hexRadius * Math.sin(angle) - z;
          const vyBottom = y + hexRadius * Math.sin(angle);
          
          ctx.moveTo(vx, vyTop);
          ctx.lineTo(vx, vyBottom);
        }
        ctx.strokeStyle = `rgba(16, 185, 129, ${finalOpacity * 0.3})`;
        ctx.stroke();
      }
    };

    const draw = () => {
      time += 0.02;
      
      // Smooth mouse follow
      mouseX += (targetMouseX - mouseX) * 0.1;
      mouseY += (targetMouseY - mouseY) * 0.1;

      // Pure black background
      ctx.fillStyle = '#050505';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Isometric view transform (squash Y to make it look like a floor)
      ctx.save();
      ctx.translate(canvas.width / 2, canvas.height / 3);
      ctx.scale(1, 0.6); // Flatten height to create 3D perspective

      // Calculate grid boundaries based on screen size
      const cols = Math.ceil(canvas.width / hexWidth) + 4;
      const rows = Math.ceil((canvas.height * 2) / yOffset) + 4;
      
      const startCol = -Math.floor(cols / 2);
      const startRow = -2;

      // Render from back to front (top to bottom) for proper 3D occlusion
      for (let row = startRow; row < rows; row++) {
        for (let col = startCol; col < Math.floor(cols / 2); col++) {
          
          // Calculate base X and Y on the flat grid
          let x = col * xOffset;
          if (row % 2 !== 0) {
            x += xOffset / 2;
          }
          const y = row * yOffset;

          // Inverse transform mouse position to grid space for interaction
          const dx = x - (mouseX - canvas.width / 2);
          const dy = y - ((mouseY - canvas.height / 3) / 0.6); // Un-scale Y
          const distanceToMouse = Math.sqrt(dx * dx + dy * dy);

          // Ripple effect from mouse
          const ripple = Math.max(0, 250 - distanceToMouse) / 250;
          
          // Continuous ocean wave math
          const wave1 = Math.sin(col * 0.2 + time) * 20;
          const wave2 = Math.cos(row * 0.15 - time * 0.8) * 20;
          const autonomousWave = wave1 + wave2;

          // Combine for final Z elevation
          const zElevation = autonomousWave + (ripple * 80) * Math.sin(time * 5 - distanceToMouse * 0.05);
          
          // Hover glow intensity
          const glow = Math.max(0, 1 - distanceToMouse / 250) + (ripple * 0.5);

          // Only draw if within reasonable screen bounds (optimization)
          if (y - zElevation > -200 && y - zElevation < canvas.height * 2) {
             drawHexagon(x, y, Math.max(0, zElevation), glow);
          }
        }
      }

      ctx.restore();
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
      transition={{ duration: 2 }}
      className="fixed inset-0 z-[-1] pointer-events-none"
    >
      {/* Heavy vignette shadow to fade edges into darkness */}
      <div className="absolute inset-0 z-10 pointer-events-none shadow-[inset_0_0_150px_100px_rgba(5,5,5,1)]" />
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
      />
    </motion.div>
  );
}
