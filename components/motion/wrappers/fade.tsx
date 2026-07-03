'use client';

import { motion, HTMLMotionProps } from 'framer-motion';
import { fadeVariants } from '../variants';
import { transitions } from '../transitions';

interface FadeProps extends HTMLMotionProps<"div"> {
  delay?: number;
  duration?: 'fast' | 'normal' | 'slow' | 'intro';
}

export const Fade = ({ children, delay = 0, duration = 'normal', ...props }: FadeProps) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={fadeVariants}
      transition={{ ...transitions[duration], delay }}
      {...props}
    >
      {children}
    </motion.div>
  );
};
