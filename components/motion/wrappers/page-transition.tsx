'use client';

import { motion } from 'framer-motion';
import { pageTransitionVariants } from '../variants';
import { transitions } from '../transitions';
import { ReactNode } from 'react';

export const PageTransition = ({ children }: { children: ReactNode }) => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={pageTransitionVariants}
      transition={transitions.slow}
      className="w-full h-full"
    >
      {children}
    </motion.div>
  );
};
