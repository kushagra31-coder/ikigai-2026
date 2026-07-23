'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { Button } from '@/components/primitives/button';
import { Icons } from '@/components/constants/icons';
import { AuthService } from '@/features/authentication/services/auth.service';
import { NotificationBell } from './NotificationBell';
import IKIGAI2026_CONFIG from '@/config/event.config';
import { WORKSPACE_NAV } from '@/features/workspace/config/workspace.config';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<string>('USER');
  const { scrollY } = useScroll();
  const pathname = usePathname();

  // Status mapping
  const statusConfig: Record<string, { label: string; color: string }> = {
    'PRE_EVENT': { label: 'PRE-HACKATHON', color: 'bg-muted-foreground' },
    'LIVE': { label: 'LIVE EVENT', color: 'bg-primary animate-pulse' },
    'POST_EVENT': { label: 'POST-HACKATHON', color: 'bg-muted-foreground' }
  };
  const currentStatus = statusConfig['LIVE'];

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const session = await AuthService.getSession();
        setIsAuthenticated(!!session);
        const user = session?.user as any;
        if (user?.user_metadata?.role) {
          setUserRole(user.user_metadata.role);
        }
      } catch {
        setIsAuthenticated(false);
      }
    };
    checkAuth();
  }, [pathname]);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 20);
  });

  const publicLinks = [
    { name: 'Home', href: '/' },
    { name: 'Tracks', href: '/tracks' },
    { name: 'Timeline', href: '/timeline' },
    { name: 'Leaderboard', href: '/leaderboard' },
    { name: 'Rulebook', href: '/rulebook' },
    { name: 'Leadership', href: '/leadership' },
    { name: 'Sponsors', href: '/sponsors' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Downloads', href: '/downloads' }
  ];

  const isWorkspace = pathname.startsWith('/workspace');
  const workspaceLinks = WORKSPACE_NAV.filter(nav => nav.roles.includes(userRole as any)).map(n => ({
    name: n.title,
    href: n.href,
  }));

  const activeLinks = isWorkspace ? workspaceLinks : publicLinks;

  if (isWorkspace) {
    return null;
  }

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-background/80 backdrop-blur-md border-b border-border h-16' : 'bg-transparent h-20'
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 h-full flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-3">
            <Icons.cpu className="w-5 h-5 text-primary" />
            <span className="font-semibold text-sm tracking-wide text-foreground">IKIGAI</span>
          </Link>
          
          {/* Status Badge */}
          <div className="hidden sm:flex items-center gap-2 px-2.5 py-1 bg-muted/20 border border-border rounded-full text-[9px] font-mono uppercase tracking-widest text-muted-foreground">
            <span className={`w-1.5 h-1.5 rounded-full ${currentStatus.color}`} />
            {currentStatus.label}
          </div>
        </div>

        <nav className="hidden lg:flex items-center gap-8">
          {activeLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`text-xs font-mono uppercase tracking-widest transition-colors duration-150 ${
                pathname === link.href ? 'text-foreground font-bold' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">

          
          {isAuthenticated ? (
            <>
              <NotificationBell />
              <Button asChild variant="outline" size="sm" className="h-8 px-4 text-[10px] font-mono uppercase tracking-widest border-border transition-transform hover:scale-[0.98]">
                <Link href={isWorkspace ? '/' : '/workspace'}>{isWorkspace ? 'Exit OS' : 'Dashboard'}</Link>
              </Button>
            </>
          ) : (
            <Button asChild variant="default" size="sm" className="h-8 px-5 text-[10px] font-mono uppercase tracking-widest transition-transform hover:scale-[0.98] rounded-none">
              <Link href="/login">Login</Link>
            </Button>
          )}
        </div>
      </div>
    </motion.header>
  );
};
