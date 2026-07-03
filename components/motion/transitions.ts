import { Transition } from 'framer-motion';

export const transitions = {
  // Ultra fast for hover states (150ms)
  fast: { type: 'tween', ease: 'easeOut', duration: 0.15 } as Transition,
  
  // Normal for cards and standard interactions (250ms)
  normal: { type: 'tween', ease: 'easeOut', duration: 0.25 } as Transition,
  
  // Slow for section reveals (500ms)
  slow: { type: 'tween', ease: 'easeInOut', duration: 0.5 } as Transition,
  
  // Spring for playful or organic motion (Scale, Drag, Modals)
  spring: { type: 'spring', stiffness: 300, damping: 25 } as Transition,
  springBouncy: { type: 'spring', stiffness: 400, damping: 15 } as Transition,
  
  // Intro (3500ms)
  intro: { type: 'tween', ease: 'easeInOut', duration: 3.5 } as Transition,
} as const;
