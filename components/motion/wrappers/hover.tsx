'use client';

import { motion, HTMLMotionProps } from 'framer-motion';
import { transitions } from '../transitions';

interface HoverProps extends HTMLMotionProps<"div"> {
  scale?: number;
  lift?: number;
}

export const Hover = ({ children, scale = 1.02, lift = -5, ...props }: HoverProps) => {
  return (
    <motion.div
      whileHover={{ scale, y: lift }}
      whileTap={{ scale: 0.98 }}
      transition={transitions.fast}
      {...props}
    >
      {children}
    </motion.div>
  );
};
