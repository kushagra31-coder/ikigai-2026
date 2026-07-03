'use client';

import { Icons } from '@/components/constants/icons';
import { Button } from '@/components/primitives/button';
import { useTheme } from './ThemeProvider';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="icon"
        className="text-muted-foreground hover:text-foreground"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle Theme"
      >
        <Icons.sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <Icons.moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      </Button>

      <AnimatePresence>
        {isOpen && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="absolute right-0 mt-2 w-32 bg-card border border-white/10 rounded-xl shadow-2xl z-50 overflow-hidden py-1"
            >
              <button 
                onClick={() => { setTheme('light'); setIsOpen(false); }}
                className={`w-full flex items-center px-3 py-2 text-sm ${theme === 'light' ? 'bg-primary/20 text-primary' : 'text-muted-foreground hover:bg-white/5'}`}
              >
                <Icons.sun className="w-4 h-4 mr-2" />
                Light
              </button>
              <button 
                onClick={() => { setTheme('dark'); setIsOpen(false); }}
                className={`w-full flex items-center px-3 py-2 text-sm ${theme === 'dark' ? 'bg-primary/20 text-primary' : 'text-muted-foreground hover:bg-white/5'}`}
              >
                <Icons.moon className="w-4 h-4 mr-2" />
                Dark
              </button>
              <button 
                onClick={() => { setTheme('system'); setIsOpen(false); }}
                className={`w-full flex items-center px-3 py-2 text-sm ${theme === 'system' ? 'bg-primary/20 text-primary' : 'text-muted-foreground hover:bg-white/5'}`}
              >
                <Icons.settings className="w-4 h-4 mr-2" />
                System
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
