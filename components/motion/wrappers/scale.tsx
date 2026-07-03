'use client';

import { motion, HTMLMotionProps } from 'framer-motion';
import { scaleVariants } from '../variants';
import { transitions } from '../transitions';

interface ScaleProps extends HTMLMotionProps<"div"> {
  delay?: number;
  spring?: boolean;
}

export const Scale = ({ children, delay = 0, spring = false, ...props }: ScaleProps) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={scaleVariants}
      transition={{ ...(spring ? transitions.spring : transitions.normal), delay }}
      {...props}
    >
      {children}
    </motion.div>
  );
};
