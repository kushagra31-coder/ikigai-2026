import Link from 'next/link';
import { Icons } from '@/components/constants/icons';
import { PUBLIC_CONTENT } from '@/components/constants/public-content';
import IKIGAI2026_CONFIG from '@/config/event.config';

export const Footer = () => {
  const social = IKIGAI2026_CONFIG.social;

  return (
    <footer className="border-t border-white/10 bg-background">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">

          {/* Brand */}
          <div className="space-y-4 md:col-span-2">
            <Link href="/" className="flex items-center gap-2">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Icons.logo className="w-6 h-6 text-primary" />
              </div>
              <div>
                <span className="font-bold text-xl tracking-tight block">IKIGAI 2026</span>
                <span className="text-xs text-muted-foreground">CSIT-AITR Indore</span>
              </div>
            </Link>
            <p className="text-muted-foreground max-w-sm text-sm leading-relaxed">
              A national-level hackathon bringing together innovators from across India to build impactful technology solutions.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href={social.instagram}
                target="_blank"
                rel="noreferrer"
                aria-label="Follow us on Instagram"
                className="p-2.5 bg-card rounded-full hover:bg-primary/20 hover:scale-110 transition-all"
              >
                <Icons.instagram className="w-4 h-4 text-foreground" />
              </a>
              <a
                href="#"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="p-2.5 bg-card rounded-full hover:bg-primary/20 hover:scale-110 transition-all"
              >
                <Icons.linkedin className="w-4 h-4 text-foreground" />
              </a>
              <a
                href={social.unstop || '#'}
                target="_blank"
                rel="noreferrer"
                aria-label="Register on Unstop"
                className="p-2.5 bg-card rounded-full hover:bg-primary/20 hover:scale-110 transition-all"
              >
                <span className="w-4 h-4 text-xs font-black text-foreground flex items-center justify-center">U</span>
              </a>
              <a
                href={social.whatsapp}
                target="_blank"
                rel="noreferrer"
                aria-label="Join WhatsApp Group"
                className="p-2.5 bg-card rounded-full hover:bg-green-500/20 hover:scale-110 transition-all"
              >
                <Icons.whatsapp className="w-4 h-4 text-foreground" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Explore</h4>
            <ul className="space-y-3">
              <li><Link href="/about" className="text-muted-foreground hover:text-primary transition-colors text-sm">About</Link></li>
              <li><Link href="/tracks" className="text-muted-foreground hover:text-primary transition-colors text-sm">Tracks</Link></li>
              <li><Link href="/timeline" className="text-muted-foreground hover:text-primary transition-colors text-sm">Timeline</Link></li>
              <li><Link href="/sponsors" className="text-muted-foreground hover:text-primary transition-colors text-sm">Sponsors</Link></li>
              <li><Link href="/rulebook" className="text-muted-foreground hover:text-primary transition-colors text-sm">Rulebook</Link></li>
              <li><Link href="/downloads" className="text-muted-foreground hover:text-primary transition-colors text-sm">Downloads</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-3">
              <li><Link href="/faq" className="text-muted-foreground hover:text-primary transition-colors text-sm">FAQ</Link></li>
              <li><Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors text-sm">Contact Us</Link></li>
              <li className="text-muted-foreground flex items-center gap-2 text-sm">
                <Icons.mail className="w-3.5 h-3.5 shrink-0" />
                <a href={`mailto:${PUBLIC_CONTENT.contact.email}`} className="hover:text-primary transition-colors break-all">
                  {PUBLIC_CONTENT.contact.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-sm">
            {PUBLIC_CONTENT.footer.copyright}
          </p>
          <div className="flex items-center gap-6 text-sm">
            {PUBLIC_CONTENT.footer.links.map((link) => (
              <Link key={link.label} href={link.href} className="text-muted-foreground hover:text-foreground transition-colors">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
