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
    <div className="flex flex-col h-full bg-card border-r border-white/5 shadow-2xl">
      <div className="h-16 flex items-center px-6 border-b border-white/5">
        <Link href="/" className="flex items-center group">
          <img 
            src="/images/ikigai-logo.png" 
            alt="IKIGAI 2026" 
            className="h-8 w-auto object-contain transition-transform group-hover:scale-105 duration-200"
          />
        </Link>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={closeSidebar} 
          className="ml-auto lg:hidden text-muted-foreground hover:text-foreground"
        >
          <Icons.close className="w-5 h-5" />
        </Button>
      </div>
      
      <div className="flex-1 overflow-y-auto py-6 px-4 flex flex-col gap-2">
        <div className="px-2 mb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
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
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${
                isActive 
                  ? 'bg-primary/10 text-primary font-medium' 
                  : 'text-muted-foreground hover:text-foreground hover:bg-white/5'
              } ${item.disabled ? 'opacity-50 pointer-events-none' : ''}`}
            >
              {IconComp && <IconComp className="w-5 h-5" />}
              {item.title}
            </Link>
          );
        })}
      </div>
      
      <div className="p-4 border-t border-white/5">
        <div className="bg-white/5 rounded-xl p-4 flex items-start gap-3">
          <Icons.info className="w-5 h-5 text-primary shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-medium text-foreground">Need Help?</p>
            <p className="text-[10px] text-muted-foreground mt-1 leading-relaxed">
              Check the documentation or contact support via Ctrl+K.
            </p>
          </div>
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
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 bottom-0 w-72 z-50 lg:hidden"
            >
              {SidebarContent}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
