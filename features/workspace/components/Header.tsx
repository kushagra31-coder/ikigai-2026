'use client';

import { usePathname } from 'next/navigation';
import { Icons } from '@/components/constants/icons';
import { Button } from '@/components/primitives/button';
import { useWorkspace } from '../context/WorkspaceContext';
import { UserMenu } from './UserMenu';
import { NotificationBell } from './NotificationBell';
import { ThemeToggle } from '@/components/providers/ThemeToggle';

export const Header = () => {
  const { openSidebar } = useWorkspace();
  const pathname = usePathname();

  const segments = pathname.split('/').filter(Boolean);
  const breadcrumb = segments.map(seg => seg.charAt(0).toUpperCase() + seg.slice(1)).join(' / ');

  return (
    <header className="h-16 border-b border-border bg-background flex items-center px-6 justify-between sticky top-0 z-30 w-full shrink-0 shadow-sm">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={openSidebar} className="lg:hidden text-muted-foreground hover:text-foreground -ml-2">
          <Icons.menu className="h-5 w-5" />
        </Button>
        <div className="hidden sm:flex items-center text-xs font-semibold text-muted-foreground uppercase tracking-widest">
          {breadcrumb}
        </div>
      </div>
      
      <div className="flex items-center gap-3">
        <button className="hidden sm:flex items-center px-3 py-1.5 bg-white/5 hover:bg-white/10 transition-colors rounded-md text-xs text-muted-foreground border border-white/5 cursor-pointer">
          <Icons.search className="w-3.5 h-3.5 mr-2" />
          <span>Search</span>
          <div className="flex items-center gap-1 ml-4">
            <kbd className="px-1.5 py-0.5 bg-background rounded-[4px] border border-white/10 font-mono text-[10px] font-semibold">Ctrl</kbd>
            <kbd className="px-1.5 py-0.5 bg-background rounded-[4px] border border-white/10 font-mono text-[10px] font-semibold">K</kbd>
          </div>
        </button>
        
        <Button variant="ghost" size="icon" className="sm:hidden text-muted-foreground hover:text-foreground">
          <Icons.search className="h-4 w-4" />
        </Button>
        
        <div className="flex items-center gap-1 pl-2 border-l border-white/10 ml-2">
          <ThemeToggle />
          <NotificationBell />
          <UserMenu />
        </div>
      </div>
    </header>
  );
};
