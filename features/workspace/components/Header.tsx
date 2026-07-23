'use client';

import { usePathname } from 'next/navigation';
import { Icons } from '@/components/constants/icons';
import { Button } from '@/components/primitives/button';
import { useWorkspace } from '../context/WorkspaceContext';
import { UserMenu } from './UserMenu';
import { NotificationBell } from './NotificationBell';

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
        <div className="flex items-center gap-1 pl-2 border-l border-white/10 ml-2">
          <NotificationBell />
          <UserMenu />
        </div>
      </div>
    </header>
  );
};
