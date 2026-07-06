'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { Button } from '@/components/primitives/button';
import { Icons } from '@/components/constants/icons';
import { AuthService } from '@/features/authentication/services/auth.service';
import IKIGAI2026_CONFIG from '@/config/event.config';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const pathname = usePathname();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const session = await AuthService.getSession();
        setIsAuthenticated(!!session);
      } catch {
        setIsAuthenticated(false);
      }
    };
    checkAuth();
  }, []);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() || 0;
    if (latest > previous && latest > 150) {
      setIsHidden(true);
    } else {
      setIsHidden(false);
    }
    setIsScrolled(latest > 50);
  });

  const links = [
    { name: 'About', href: '/about' },
    { name: 'Tracks', href: '/tracks' },
    { name: 'Timeline', href: '/timeline' },
    { name: 'Sponsors', href: '/sponsors' },
    { name: 'Leadership', href: '/leadership' },
    { name: 'Downloads', href: '/downloads' },
    { name: 'Rulebook', href: '/rulebook' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <>
      <motion.nav
        variants={{
          visible: { y: 0, opacity: 1 },
          hidden: { y: "-100%", opacity: 0 }
        }}
        animate={isHidden ? "hidden" : "visible"}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
          isScrolled ? 'bg-background/80 backdrop-blur-md border-b border-white/10' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center group">
            <img 
              src="/images/ikigai-logo.png" 
              alt="IKIGAI 2026" 
              className="h-10 w-auto object-contain transition-transform group-hover:scale-105 duration-200"
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <div className="flex items-center gap-6">
              {links.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    pathname === link.href ? 'text-primary' : 'text-muted-foreground'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
            
            <div className="flex items-center gap-4 border-l border-white/10 pl-8">
              {isAuthenticated ? (
                <Button asChild variant="primary">
                  <Link href="/workspace">Dashboard</Link>
                </Button>
              ) : (
                <>
                  <Button asChild variant="ghost">
                    <Link href="/login">Login</Link>
                  </Button>
                  <Button asChild variant="primary">
                    <Link href="/login?mode=register">Register</Link>
                  </Button>
                </>
              )}
            </div>
          </div>

          {/* Mobile Toggle */}
          <button 
            className="md:hidden p-2 text-foreground"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <Icons.close className="w-6 h-6" /> : <Icons.menu className="w-6 h-6" />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-background/95 backdrop-blur-xl md:hidden pt-24 px-4 flex flex-col">
          <div className="flex flex-col gap-4">
            {links.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`text-2xl font-semibold p-4 rounded-xl ${
                  pathname === link.href ? 'bg-primary/10 text-primary' : 'text-foreground'
                }`}
              >
                {link.name}
              </Link>
            ))}
            
            <div className="h-px bg-white/10 my-4" />
            
            {isAuthenticated ? (
              <Button asChild variant="primary" size="lg" className="w-full justify-center">
                <Link href="/workspace">Go to Dashboard</Link>
              </Button>
            ) : (
              <div className="flex flex-col gap-4">
                <Button asChild variant="outline" size="lg" className="w-full justify-center">
                  <Link href="/login">Login</Link>
                </Button>
                <Button asChild variant="primary" size="lg" className="w-full justify-center">
                  <Link href="/login?mode=register">Register Now</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
