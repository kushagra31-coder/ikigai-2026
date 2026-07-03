'use client';

import { useState } from 'react';
import { Icons } from '@/components/constants/icons';
import { Button } from '@/components/primitives/button';
import { motion, AnimatePresence } from 'framer-motion';

export const NotificationBell = () => {
  const [isOpen, setIsOpen] = useState(false);
  const unreadCount = 2; // Placeholder

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="icon"
        className="relative text-muted-foreground hover:text-foreground"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Notifications"
      >
        <Icons.bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full" />
        )}
      </Button>

      <AnimatePresence>
        {isOpen && (
          <>
            <div 
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="absolute right-0 mt-2 w-80 bg-card border border-white/10 rounded-xl shadow-2xl z-50 overflow-hidden"
            >
              <div className="px-4 py-3 border-b border-white/10 flex justify-between items-center">
                <h3 className="font-semibold">Notifications</h3>
                {unreadCount > 0 && (
                  <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded-full font-medium">
                    {unreadCount} New
                  </span>
                )}
              </div>
              
              <div className="max-h-[300px] overflow-y-auto">
                <div className="p-4 flex gap-4 hover:bg-white/5 transition-colors border-b border-white/5 cursor-pointer">
                  <div className="w-2 h-2 mt-1.5 bg-primary rounded-full shrink-0" />
                  <div>
                    <p className="text-sm font-medium">Welcome to IKIGAI 2026</p>
                    <p className="text-xs text-muted-foreground mt-1">Get ready to build the future. Make sure to complete your profile.</p>
                    <p className="text-[10px] text-muted-foreground mt-2">Just now</p>
                  </div>
                </div>
                <div className="p-4 flex gap-4 hover:bg-white/5 transition-colors cursor-pointer opacity-70">
                  <div className="w-2 h-2 mt-1.5 bg-transparent rounded-full shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Team matching is open</p>
                    <p className="text-xs text-muted-foreground mt-1">Looking for a team? Check out the team building dashboard.</p>
                    <p className="text-[10px] text-muted-foreground mt-2">2 hours ago</p>
                  </div>
                </div>
              </div>
              
              <div className="p-2 border-t border-white/10 bg-muted/20">
                <Button variant="ghost" className="w-full text-xs h-8">
                  Mark all as read
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
