'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Icons, IconType } from '@/components/constants/icons';
import { Button } from '@/components/primitives/button';
import { useWorkspace } from '../context/WorkspaceContext';
import { WORKSPACE_NAV } from '../config/workspace.config';

export const Sidebar = () => {
  const { isSidebarOpen, closeSidebar, role } = useWorkspace();
  const pathname = usePathname();

  const filteredNav = WORKSPACE_NAV.filter(nav => nav.roles.includes(role || 'USER'));

  const SidebarContent = (
    <div className="flex flex-col h-full bg-background border-r border-border shadow-sm">
      <div className="h-16 flex items-center px-6 border-b border-border bg-background">
        <Link href="/" className="flex items-center gap-2 group">
          <Icons.cpu className="w-5 h-5 text-primary" />
          <span className="font-semibold text-sm tracking-wide">IKIGAI 2026</span>
        </Link>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={closeSidebar} 
          className="ml-auto lg:hidden text-muted-foreground hover:text-foreground"
        >
          <Icons.close className="w-4 h-4" />
        </Button>
      </div>
      
      <div className="flex-1 overflow-y-auto py-6 px-4 flex flex-col gap-1">
        <div className="px-2 mb-3 text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">
          Workspace
        </div>
        {filteredNav.map((item) => {
          const isActive = pathname === item.href;
          const IconComp = Icons[item.icon] as IconType;
          return (
            <Link 
              key={item.href} 
              href={item.href}
              onClick={() => {
                if (window.innerWidth < 1024) {
                  closeSidebar();
                }
              }}
              className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors text-sm font-medium ${
                isActive 
                  ? 'bg-primary/10 text-primary' 
                  : 'text-muted-foreground hover:text-foreground hover:bg-white/5'
              } ${item.disabled ? 'opacity-50 pointer-events-none' : ''}`}
            >
              {IconComp && <IconComp className="w-4 h-4 shrink-0" />}
              {item.title}
            </Link>
          );
        })}
      </div>
      
      <div className="p-4 mt-auto">
        <div className="bg-white/[0.02] border border-white/5 rounded-lg p-3 flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Icons.info className="w-4 h-4 text-primary" />
            <span className="text-xs font-semibold text-foreground">Need Help?</span>
          </div>
          <p className="text-[10px] text-muted-foreground leading-relaxed">
            Press <kbd className="font-mono bg-white/5 px-1 py-0.5 rounded">Ctrl K</kbd> to search docs or contact support.
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-64 h-full shrink-0 relative z-20">
        {SidebarContent}
      </aside>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
              onClick={closeSidebar}
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.25 }}
              className="fixed top-0 left-0 bottom-0 w-72 z-50 lg:hidden border-r border-border"
            >
              {SidebarContent}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
