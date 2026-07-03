import { Navbar } from '@/components/landing/Navbar';
import { Footer } from '@/components/landing/Footer';
import { ReactNode } from 'react';
import { Metadata } from 'next';

import IKIGAI2026_CONFIG from '@/config/event.config';

export const metadata: Metadata = {
  title: `${IKIGAI2026_CONFIG.branding.eventName} | ${IKIGAI2026_CONFIG.branding.slogan}`,
  description: IKIGAI2026_CONFIG.branding.mission,
  openGraph: {
    title: IKIGAI2026_CONFIG.branding.eventName,
    description: IKIGAI2026_CONFIG.branding.mission,
    url: IKIGAI2026_CONFIG.social.website,
    siteName: IKIGAI2026_CONFIG.branding.eventName,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: IKIGAI2026_CONFIG.branding.eventName,
    description: IKIGAI2026_CONFIG.branding.mission,
  }
};

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Global Animated Background Overlay */}
      <div className="fixed inset-0 z-[-1] bg-background">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background" />
        {/* Subtle animated floating glow spots */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] animate-pulse pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-[120px] animate-pulse pointer-events-none animation-delay-2000" />
      </div>

      <Navbar />
      <main className="flex-1 flex flex-col pt-20">
        {children}
      </main>
      <Footer />
    </div>
  );
}
