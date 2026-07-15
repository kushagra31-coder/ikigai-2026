'use client';

import { motion } from 'framer-motion';

export const IkigaiLogoVector = ({ className = "" }: { className?: string }) => {
  return (
    <svg 
      viewBox="0 0 560 150" 
      className={`w-full h-auto font-sans font-black tracking-tighter select-none ${className}`}
    >
      <defs>
        {/* Gradient for the first I */}
        <linearGradient id="i-grad" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#ec4899" />
        </linearGradient>

        {/* Mask to cut out the top left of the I */}
        <mask id="i-mask">
          <rect x="0" y="0" width="600" height="200" fill="white" />
          {/* Pixel cutouts */}
          <rect x="15" y="15" width="10" height="10" fill="black" />
          <rect x="25" y="15" width="10" height="10" fill="black" />
          <rect x="15" y="25" width="10" height="10" fill="black" />
          <rect x="30" y="30" width="8" height="8" fill="black" />
          <rect x="20" y="40" width="8" height="8" fill="black" />
        </mask>



        {/* Mask for the G constellation to stay inside the letter */}
        <mask id="g-mask">
          <text x="255" y="115" fontSize="110" fill="white">G</text>
        </mask>
      </defs>

      {/* --- Floating Pixels --- */}
      <g>
        {[
          { x: 10, y: 10, s: 8 }, { x: 25, y: 5, s: 6 }, 
          { x: 5, y: 25, s: 7 }, { x: 35, y: 15, s: 5 },
          { x: -5, y: 15, s: 6 }, { x: 15, y: -5, s: 8 }
        ].map((p, i) => (
          <motion.rect
            key={i}
            x={p.x}
            y={p.y}
            width={p.s}
            height={p.s}
            fill="#ec4899"
            initial={{ opacity: 1, x: p.x, y: p.y }}
            animate={{ 
              opacity: [1, 0, 1],
              x: p.x - Math.random() * 20 - 10,
              y: p.y - Math.random() * 20 - 10 
            }}
            transition={{
              duration: 2 + Math.random(),
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </g>

      {/* --- Base Text --- */}
      <g fill="white">
        {/* I (Pixelated) */}
        <text x="20" y="115" fontSize="110" fill="url(#i-grad)" mask="url(#i-mask)">I</text>
        
        {/* K I */}
        <text x="80" y="115" fontSize="110">K</text>
        <text x="180" y="115" fontSize="110">I</text>
        
        {/* G */}
        <text x="255" y="115" fontSize="110">G</text>
        
        {/* A (No crossbar, using Lambda) */}
        <text x="360" y="115" fontSize="110">Λ</text>
        
        {/* I */}
        <text x="470" y="115" fontSize="110">I</text>
      </g>

      {/* --- Constellation Overlay (Inside G) --- */}
      <g mask="url(#g-mask)">
        <motion.g
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* Nodes */}
          <circle cx="270" cy="40" r="2.5" fill="white" />
          <circle cx="290" cy="35" r="2" fill="white" />
          <circle cx="310" cy="45" r="3" fill="white" />
          <circle cx="265" cy="65" r="2" fill="white" />
          <circle cx="285" cy="75" r="1.5" fill="white" />
          <circle cx="315" cy="85" r="2.5" fill="white" />
          <circle cx="275" cy="95" r="2" fill="white" />
          <circle cx="300" cy="105" r="3" fill="white" />
          
          {/* Connections */}
          <path d="M270,40 L290,35 L310,45" fill="none" stroke="white" strokeWidth="1" opacity="0.7" />
          <path d="M270,40 L265,65 L285,75 L315,85" fill="none" stroke="white" strokeWidth="1" opacity="0.7" />
          <path d="M265,65 L275,95 L300,105 L315,85" fill="none" stroke="white" strokeWidth="1" opacity="0.7" />
        </motion.g>
      </g>

      {/* --- Swoosh for A --- */}
      <motion.path
        d="M 365 115 Q 405 60 445 115" 
        fill="none" 
        stroke="white" 
        strokeWidth="8" 
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 2, ease: "easeInOut", repeat: Infinity, repeatType: "mirror" }}
      />
    </svg>
  );
};
