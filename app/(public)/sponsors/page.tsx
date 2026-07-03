import { Container, Section, Grid } from '@/components/layout';
import { PUBLIC_CONTENT } from '@/components/constants/public-content';
import { Fade, Scale, Hover } from '@/components/motion';
import { GlassCard } from '@/components/data-display/GlassCard';
import Image from 'next/image';

export const metadata = {
  title: 'Sponsors | IKIGAI 2026',
  description: 'Our partners and sponsors for IKIGAI 2026.',
};

export default function SponsorsPage() {
  return (
    <Section className="pt-32 min-h-screen">
      <Container>
        <Fade>
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h1 className="text-display font-bold">Our Sponsors</h1>
            <p className="text-body-l text-muted-foreground">
              IKIGAI 2026 is made possible by our generous partners and sponsors.
            </p>
          </div>
        </Fade>

        <Grid className="grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PUBLIC_CONTENT.sponsors.map((sponsor, idx) => (
            <Scale key={sponsor.id} delay={idx * 0.1}>
              <Hover>
                <a href={sponsor.website} target="_blank" rel="noreferrer" className="block h-full">
                  <GlassCard className="h-full flex flex-col items-center justify-center text-center group border-white/5 hover:border-primary/50 p-8">
                    <div className="relative w-full h-24 mb-6">
                      <Image
                        src={sponsor.logo}
                        alt={`${sponsor.name} Logo`}
                        fill
                        className="object-contain filter grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        loading="lazy"
                      />
                    </div>
                    <h3 className="text-heading-m mb-2 group-hover:text-primary transition-colors">{sponsor.name}</h3>
                    <span className="text-xs uppercase tracking-wider text-accent font-semibold">{sponsor.tier}</span>
                  </GlassCard>
                </a>
              </Hover>
            </Scale>
          ))}
        </Grid>
      </Container>
    </Section>
  );
}
