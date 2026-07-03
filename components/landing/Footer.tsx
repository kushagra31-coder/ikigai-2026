import Link from 'next/link';
import { Icons } from '@/components/constants/icons';
import { PUBLIC_CONTENT } from '@/components/constants/public-content';

export const Footer = () => {
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
              <span className="font-bold text-xl tracking-tight">IKIGAI 2026</span>
            </Link>
            <p className="text-muted-foreground max-w-sm">
              {PUBLIC_CONTENT.hero.description}
            </p>
            <div className="flex items-center gap-4 pt-2">
              <a href={PUBLIC_CONTENT.contact.socialLinks.instagram} target="_blank" rel="noreferrer" className="p-2 bg-card rounded-full hover:bg-primary/20 transition-colors">
                <Icons.instagram className="w-5 h-5 text-foreground" />
              </a>
              <a href={PUBLIC_CONTENT.contact.socialLinks.linkedin} target="_blank" rel="noreferrer" className="p-2 bg-card rounded-full hover:bg-primary/20 transition-colors">
                <Icons.linkedin className="w-5 h-5 text-foreground" />
              </a>
              <a href={PUBLIC_CONTENT.contact.socialLinks.github} target="_blank" rel="noreferrer" className="p-2 bg-card rounded-full hover:bg-primary/20 transition-colors">
                <Icons.github className="w-5 h-5 text-foreground" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Explore</h4>
            <ul className="space-y-3">
              <li><Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">About</Link></li>
              <li><Link href="/tracks" className="text-muted-foreground hover:text-primary transition-colors">Tracks</Link></li>
              <li><Link href="/timeline" className="text-muted-foreground hover:text-primary transition-colors">Timeline</Link></li>
              <li><Link href="/sponsors" className="text-muted-foreground hover:text-primary transition-colors">Sponsors</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-3">
              <li><Link href="/faq" className="text-muted-foreground hover:text-primary transition-colors">FAQ</Link></li>
              <li><Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">Contact Us</Link></li>
              <li className="text-muted-foreground flex items-center gap-2">
                <Icons.mail className="w-4 h-4" />
                {PUBLIC_CONTENT.contact.email}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
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
