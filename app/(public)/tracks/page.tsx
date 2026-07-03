import { Container, Section, Grid } from '@/components/layout';
import { PUBLIC_CONTENT } from '@/components/constants/public-content';
import { Fade, Scale, Hover } from '@/components/motion';
import { GlassCard } from '@/components/data-display/GlassCard';
import { Icons, IconType } from '@/components/constants/icons';

export const metadata = {
  title: 'Tracks | IKIGAI 2026',
  description: 'Explore the hackathon tracks for IKIGAI 2026.',
};

export default function TracksPage() {
  return (
    <Section className="pt-32 min-h-screen">
      <Container>
        <Fade>
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h1 className="text-display font-bold">Hackathon Tracks</h1>
            <p className="text-body-l text-muted-foreground">
              Choose your domain and build solutions that create real impact.
            </p>
          </div>
        </Fade>

        <Grid className="grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PUBLIC_CONTENT.tracks.map((track, idx) => {
            const IconComp = Icons[track.icon as keyof typeof Icons] as IconType;
            return (
              <Scale key={track.id} delay={idx * 0.1}>
                <Hover>
                  <GlassCard className="h-full flex flex-col group border-white/5 hover:border-primary/50">
                    <div className="p-4 rounded-xl bg-primary/10 w-fit mb-6 group-hover:scale-110 transition-transform">
                      {IconComp && <IconComp className="w-8 h-8 text-primary" />}
                    </div>
                    <h3 className="text-heading-m mb-3 group-hover:text-primary transition-colors">{track.title}</h3>
                    <p className="text-muted-foreground flex-1">{track.description}</p>
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
