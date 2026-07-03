'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Icons, IconType } from '@/components/constants/icons';
import { WORKSPACE_NAV, WORKSPACE_ACTIONS } from '../config/workspace.config';
import { useWorkspace } from '../context/WorkspaceContext';

export const CommandMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const router = useRouter();
  const { role } = useWorkspace();

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if ((e.key === 'k' && (e.metaKey || e.ctrlKey)) || (e.key === '/' && !isOpen && document.activeElement?.tagName !== 'INPUT' && document.activeElement?.tagName !== 'TEXTAREA')) {
      e.preventDefault();
      setIsOpen((open) => !open);
    }
    if (e.key === 'Escape') {
      setIsOpen(false);
    }
  }, [isOpen]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const filteredNav = WORKSPACE_NAV.filter(
    (nav) => 
      nav.roles.includes(role || 'USER') && 
      nav.title.toLowerCase().includes(search.toLowerCase())
  );

  const filteredActions = WORKSPACE_ACTIONS.filter(
    (action) => 
      action.roles.includes(role || 'USER') &&
      action.title.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelect = (href?: string) => {
    if (href) {
      router.push(href);
    }
    setIsOpen(false);
    setSearch('');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[20vh] px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="relative w-full max-w-lg bg-card border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
          >
            <div className="flex items-center px-4 py-3 border-b border-white/10">
              <Icons.search className="w-5 h-5 text-muted-foreground mr-3" />
              <input
                autoFocus
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search pages and actions..."
                className="flex-1 bg-transparent outline-none text-foreground placeholder:text-muted-foreground"
              />
              <kbd className="hidden sm:inline-flex px-2 py-1 bg-white/5 rounded text-xs text-muted-foreground ml-2 font-mono">
                ESC
              </kbd>
            </div>

            <div className="max-h-[60vh] overflow-y-auto p-2">
              {filteredNav.length > 0 && (
                <div className="mb-4">
                  <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground">Pages</div>
                  {filteredNav.map((item) => {
                    const IconComp = Icons[item.icon] as IconType;
                    return (
                      <button
                        key={item.href}
                        onClick={() => handleSelect(item.href)}
                        className="w-full flex items-center px-2 py-2.5 text-sm rounded-lg hover:bg-white/5 transition-colors text-left"
                      >
                        {IconComp && <IconComp className="w-4 h-4 mr-3 text-muted-foreground" />}
                        {item.title}
                      </button>
                    );
                  })}
                </div>
              )}

              {filteredActions.length > 0 && (
                <div>
                  <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground">Actions</div>
                  {filteredActions.map((item) => {
                    const IconComp = Icons[item.icon] as IconType;
                    return (
                      <button
                        key={item.id}
                        onClick={() => handleSelect()}
                        className="w-full flex items-center justify-between px-2 py-2.5 text-sm rounded-lg hover:bg-white/5 transition-colors text-left group"
                      >
                        <div className="flex items-center">
                          {IconComp && <IconComp className="w-4 h-4 mr-3 text-muted-foreground group-hover:text-primary transition-colors" />}
                          <span>{item.title}</span>
                        </div>
                        <div className="flex gap-1">
                          {item.shortcut.map(key => (
                            <kbd key={key} className="px-2 py-0.5 bg-white/5 rounded text-[10px] text-muted-foreground font-mono uppercase">
                              {key}
                            </kbd>
                          ))}
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}

              {filteredNav.length === 0 && filteredActions.length === 0 && (
                <div className="py-8 text-center text-sm text-muted-foreground">
                  No results found.
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
