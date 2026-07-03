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

  // Generate breadcrumb from pathname
  const segments = pathname.split('/').filter(Boolean);
  const breadcrumb = segments.map(seg => seg.charAt(0).toUpperCase() + seg.slice(1)).join(' / ');

  return (
    <header className="h-16 border-b border-white/5 bg-background/50 backdrop-blur-md flex items-center px-4 justify-between sticky top-0 z-30 w-full">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={openSidebar} className="lg:hidden text-muted-foreground hover:text-foreground">
          <Icons.menu className="h-5 w-5" />
        </Button>
        <div className="hidden sm:flex items-center text-sm text-muted-foreground font-medium">
          {breadcrumb}
        </div>
      </div>
      
      <div className="flex items-center gap-2 sm:gap-4">
        <div className="hidden sm:flex items-center mr-2 px-3 py-1.5 bg-white/5 rounded-full text-xs text-muted-foreground border border-white/5">
          <Icons.search className="w-3.5 h-3.5 mr-2" />
          <span>Press</span>
          <kbd className="mx-1 px-1.5 py-0.5 bg-background rounded border border-white/10 font-mono text-[10px] uppercase font-semibold text-foreground">Ctrl K</kbd>
          <span>to search</span>
        </div>
        
        <Button variant="ghost" size="icon" className="sm:hidden text-muted-foreground hover:text-foreground">
          <Icons.search className="h-5 w-5" />
        </Button>
        
        <ThemeToggle />
        <NotificationBell />
        <div className="w-px h-6 bg-white/10 mx-1 hidden sm:block" />
        <UserMenu />
      </div>
    </header>
  );
};
