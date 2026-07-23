import Link from 'next/link';
import { Icons } from '@/components/constants/icons';
import { PUBLIC_CONTENT } from '@/components/constants/public-content';
import { Container } from '@/components/layout';

export const Footer = () => {
  return (
    <footer className="bg-[#0a0a0a] text-foreground py-16 border-t border-border/20">
      <Container>
        <div className="flex flex-col md:flex-row justify-between items-start mb-16 gap-8">
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-3">
              <Icons.activity className="w-5 h-5 text-primary" />
              <span className="text-sm font-bold tracking-widest">{PUBLIC_CONTENT.hero.eventTitle}</span>
            </Link>
            <p className="text-muted-foreground text-xs max-w-xs leading-relaxed font-mono">
              National AI Innovation Challenge. Build the future with top engineers and designers.
            </p>
          </div>
          <div className="flex gap-4">
            <a href="#" aria-label="Camera" className="w-10 h-10 rounded-full border border-border/40 flex items-center justify-center hover:bg-foreground/5 transition-colors">
              <svg className="w-4 h-4 text-muted-foreground hover:text-foreground transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
            </a>
            <a href="#" aria-label="Globe" className="w-10 h-10 rounded-full border border-border/40 flex items-center justify-center hover:bg-foreground/5 transition-colors">
              <svg className="w-4 h-4 text-muted-foreground hover:text-foreground transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"></path></svg>
            </a>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center text-xs font-mono text-muted-foreground/60 border-t border-border/20 pt-8">
          <div>{PUBLIC_CONTENT.footer.copyright}</div>
          <div className="flex flex-wrap gap-6 mt-4 md:mt-0">
            <Link href="/rulebook" className="hover:text-foreground transition-colors duration-150">Rulebook</Link>
            <Link href="/contact" className="hover:text-foreground transition-colors duration-150">Contact Operations</Link>
            <Link href="/privacy" className="hover:text-foreground transition-colors duration-150">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-foreground transition-colors duration-150">Terms of Service</Link>
          </div>
        </div>
      </Container>
    </footer>
  );
};
