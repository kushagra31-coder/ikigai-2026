import { Container, Section, Grid } from '@/components/layout';
import { PUBLIC_CONTENT } from '@/components/constants/public-content';
import { Fade, Scale, Hover } from '@/components/motion';
import { GlassCard } from '@/components/data-display/GlassCard';

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
                    <div className="w-24 h-24 bg-white/5 rounded-xl mb-6 flex items-center justify-center">
                      <span className="text-xs text-muted-foreground">Logo</span>
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
