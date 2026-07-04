'use client';

import Dock from '@/components/ui/Dock';
import { Home as HomeIcon, Map as MapIcon, Users as UsersIcon, LogIn as LogInIcon } from 'lucide-react';

export function LandingDock() {
  const dockItems = [
    { icon: <HomeIcon size={18} />, label: 'Home', onClick: () => window.scrollTo({ top: 0, behavior: 'smooth' }) },
    { icon: <MapIcon size={18} />, label: 'About', onClick: () => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }) },
    { icon: <UsersIcon size={18} />, label: 'Sponsors', onClick: () => document.getElementById('sponsors')?.scrollIntoView({ behavior: 'smooth' }) },
    { icon: <LogInIcon size={18} />, label: 'Register', onClick: () => window.location.href = '/login?mode=register' },
  ];

  return (
    <div className="fixed bottom-0 left-0 w-full h-0 z-50 pointer-events-none">
      <div className="pointer-events-auto">
        <Dock 
          items={dockItems}
          panelHeight={68}
          baseItemSize={50}
          magnification={70}
        />
      </div>
    </div>
  );
}
