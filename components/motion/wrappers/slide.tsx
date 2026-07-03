'use client';

import { motion, HTMLMotionProps } from 'framer-motion';
import { slideUpVariants, slideDownVariants, slideRightVariants } from '../variants';
import { transitions } from '../transitions';

interface SlideProps extends HTMLMotionProps<"div"> {
  delay?: number;
  direction?: 'up' | 'down' | 'right';
  duration?: 'fast' | 'normal' | 'slow';
}

export const Slide = ({ 
  children, 
  delay = 0, 
  direction = 'up',
  duration = 'normal', 
  ...props 
}: SlideProps) => {
  const variants = direction === 'up' ? slideUpVariants : direction === 'down' ? slideDownVariants : slideRightVariants;
  
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={variants}
      transition={{ ...transitions[duration], delay }}
      {...props}
    >
      {children}
    </motion.div>
  );
};
