import { Container, Section, Grid } from '@/components/layout';
import { PUBLIC_CONTENT } from '@/components/constants/public-content';
import { Fade, Slide } from '@/components/motion';
import { GlassCard } from '@/components/data-display/GlassCard';

export const metadata = {
  title: 'About | IKIGAI 2026',
  description: PUBLIC_CONTENT.about.vision,
};

export default function AboutPage() {
  return (
    <Section className="pt-32 min-h-screen">
      <Container className="max-w-4xl space-y-16">
        <Fade>
          <h1 className="text-display font-bold">About IKIGAI</h1>
        </Fade>

        <Slide direction="up">
          <div className="space-y-6">
            <h2 className="text-heading-l">Our Vision</h2>
            <p className="text-body-l text-muted-foreground leading-relaxed">
              {PUBLIC_CONTENT.about.vision}
            </p>
          </div>
        </Slide>

        <Slide direction="up" delay={0.1}>
          <div className="space-y-6">
            <h2 className="text-heading-l">Objectives</h2>
            <p className="text-body-l text-muted-foreground leading-relaxed">
              {PUBLIC_CONTENT.about.objectives}
            </p>
          </div>
        </Slide>

        <Slide direction="up" delay={0.2}>
          <Grid className="grid-cols-1 md:grid-cols-2 gap-6">
            <GlassCard>
              <h3 className="font-semibold text-primary mb-2">Organizer</h3>
              <p className="text-muted-foreground">{PUBLIC_CONTENT.about.organizer}</p>
            </GlassCard>
            <GlassCard>
              <h3 className="font-semibold text-accent mb-2">Venue</h3>
              <p className="text-muted-foreground">{PUBLIC_CONTENT.about.venue}</p>
            </GlassCard>
          </Grid>
        </Slide>
      </Container>
    </Section>
  );
}
