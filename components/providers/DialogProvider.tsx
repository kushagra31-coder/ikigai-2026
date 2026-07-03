'use client';

import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Icons } from '@/components/constants/icons';
import { Button } from '@/components/primitives/button';

interface DialogConfig {
  title: string;
  description?: string;
  content: ReactNode;
  actions?: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

interface DialogContextType {
  openDialog: (config: DialogConfig) => void;
  closeDialog: () => void;
}

const DialogContext = createContext<DialogContextType | undefined>(undefined);

export const DialogProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [config, setConfig] = useState<DialogConfig | null>(null);

  const openDialog = useCallback((newConfig: DialogConfig) => {
    setConfig(newConfig);
    setIsOpen(true);
  }, []);

  const closeDialog = useCallback(() => {
    setIsOpen(false);
    setTimeout(() => setConfig(null), 300); // Wait for exit animation
  }, []);

  // Handle ESC key
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) closeDialog();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, closeDialog]);

  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl'
  };

  return (
    <DialogContext.Provider value={{ openDialog, closeDialog }}>
      {children}
      <AnimatePresence>
        {isOpen && config && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 bg-background/80 backdrop-blur-sm"
              onClick={closeDialog}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2, type: 'spring', damping: 25, stiffness: 300 }}
              className={`relative w-full ${sizeClasses[config.size || 'md']} bg-card border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]`}
            >
              <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold">{config.title}</h2>
                  {config.description && <p className="text-sm text-muted-foreground mt-1">{config.description}</p>}
                </div>
                <Button variant="ghost" size="icon" onClick={closeDialog} className="shrink-0 -mr-2">
                  <Icons.close className="w-5 h-5" />
                </Button>
              </div>
              <div className="p-6 overflow-y-auto">
                {config.content}
              </div>
              {config.actions && (
                <div className="px-6 py-4 border-t border-white/10 bg-muted/10 flex justify-end gap-3">
                  {config.actions}
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </DialogContext.Provider>
  );
};

export const useDialog = () => {
  const context = useContext(DialogContext);
  if (!context) throw new Error('useDialog must be used within DialogProvider');
  return context;
};
