'use client';

import { Icons } from '@/components/constants/icons';
import { motion } from 'framer-motion';

export default function WorkspaceLoading() {
  return (
    <div className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-background/80 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="flex flex-col items-center"
      >
        <div className="relative">
          <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full scale-150 animate-pulse" />
          <Icons.logo className="w-16 h-16 text-primary relative z-10 animate-bounce" />
        </div>
        <h2 className="mt-8 text-xl font-bold tracking-widest uppercase">Loading Workspace</h2>
        
        <div className="mt-6 w-48 h-1 bg-white/10 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-primary"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </div>
  );
}
