import Link from 'next/link';
import { Icons } from '@/components/constants/icons';
import IKIGAI2026_CONFIG from '@/config/event.config';
import { PUBLIC_CONTENT } from '@/components/constants/public-content';

export const Footer = () => {
  return (
    <footer className="border-t border-white/5 bg-background py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-3">
              <Icons.cpu className="w-5 h-5 text-primary" />
              <span className="font-semibold text-sm tracking-wide">IKIGAI 2026</span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
              National AI Innovation Challenge. Build the future with top engineers and designers.
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <a href={IKIGAI2026_CONFIG.social.instagram} className="p-2.5 rounded-full border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-colors text-muted-foreground hover:text-white group">
              <Icons.instagram className="w-4 h-4 transition-transform group-hover:scale-110 duration-200" />
            </a>
            <a href={IKIGAI2026_CONFIG.social.website} className="p-2.5 rounded-full border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-colors text-muted-foreground hover:text-white group">
              <Icons.globe className="w-4 h-4 transition-transform group-hover:scale-110 duration-200" />
            </a>
          </div>
        </div>
        
        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <div>{PUBLIC_CONTENT.footer.copyright}</div>
          <div className="flex gap-6">
            {PUBLIC_CONTENT.footer.links.map(link => (
              <Link key={link.label} href={link.href} className="hover:text-white transition-colors">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
