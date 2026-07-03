import { Container, Section, Grid } from '@/components/layout';
import IKIGAI2026_CONFIG from '@/config/event.config';
import { Fade, Scale, Hover } from '@/components/motion';
import { GlassCard } from '@/components/data-display/GlassCard';
import Image from 'next/image';
import { Icons } from '@/components/constants/icons';

export const metadata = {
  title: 'Leadership | IKIGAI 2026',
  description: 'Meet the organizing committee and leadership team behind IKIGAI 2026.',
};

export default function LeadershipPage() {
  return (
    <Section className="pt-32 min-h-screen">
      <Container>
        <Fade>
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h1 className="text-display font-bold">Leadership Team</h1>
            <p className="text-body-l text-muted-foreground">
              Meet the minds behind {IKIGAI2026_CONFIG.branding.eventName}.
            </p>
          </div>
        </Fade>

        <Grid className="grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {IKIGAI2026_CONFIG.leadership.map((leader, idx) => {
            const initials = leader.name.split(' ').map((n: string) => n[0]).join('').substring(0, 2).toUpperCase();
            
            return (
              <Scale key={idx} delay={idx * 0.1}>
                <Hover>
                  <GlassCard className="h-full flex flex-col items-center justify-center text-center group border-white/5 hover:border-primary/50 p-6">
                    <div className="relative w-32 h-32 rounded-full mb-6 overflow-hidden bg-primary/20 flex items-center justify-center ring-2 ring-transparent group-hover:ring-primary/50 transition-all">
                      {leader.photo ? (
                        <Image
                          src={leader.photo}
                          alt={leader.name}
                          fill
                          className="object-cover"
                          sizes="128px"
                          loading="lazy"
                        />
                      ) : (
                        <span className="text-3xl font-bold text-primary">{initials}</span>
                      )}
                    </div>
                    <h3 className="text-heading-s mb-1">{leader.name}</h3>
                    <p className="text-primary font-medium text-sm mb-1">{leader.designation}</p>
                    <p className="text-muted-foreground text-xs">{leader.department}</p>
                    
                    {(leader.email || leader.linkedin) && (
                      <div className="flex items-center gap-3 mt-4 pt-4 border-t border-white/5 w-full justify-center">
                        {leader.email && (
                          <a href={`mailto:${leader.email}`} className="text-muted-foreground hover:text-primary transition-colors">
                            <Icons.mail className="w-4 h-4" />
                            <span className="sr-only">Email {leader.name}</span>
                          </a>
                        )}
                        {leader.linkedin && (
                          <a href={leader.linkedin} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                            <Icons.linkedin className="w-4 h-4" />
                            <span className="sr-only">LinkedIn {leader.name}</span>
                          </a>
                        )}
                      </div>
                    )}
                  </GlassCard>
                </Hover>
              </Scale>
            );
          })}
        </Grid>
      </Container>
    </Section>
  );
}
