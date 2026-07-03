import { Container, Section, Stack } from '@/components/layout';
import { PUBLIC_CONTENT } from '@/components/constants/public-content';
import { Fade, Slide } from '@/components/motion';
import { GlassCard } from '@/components/data-display/GlassCard';

export const metadata = {
  title: 'Timeline | IKIGAI 2026',
  description: 'Event schedule and timeline for IKIGAI 2026.',
};

export default function TimelinePage() {
  return (
    <Section className="pt-32 min-h-screen">
      <Container>
        <Fade>
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h1 className="text-display font-bold">Event Schedule</h1>
            <p className="text-body-l text-muted-foreground">
              Mark your calendar for these important dates.
            </p>
          </div>
        </Fade>

        <div className="max-w-4xl mx-auto relative mt-16">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-accent/50 to-transparent -translate-x-1/2" />
          
          <Stack className="space-y-12">
            {PUBLIC_CONTENT.timeline.map((item, idx) => (
              <Slide key={item.id} direction={idx % 2 === 0 ? "right" : "up"} delay={idx * 0.1}>
                <div className={`relative flex items-center md:justify-between ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                  <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-primary shadow-glow -translate-x-1/2" />
                  
                  <div className="w-full pl-12 md:pl-0 md:w-[45%]">
                    <GlassCard className="p-6">
                      <span className="text-sm font-bold text-accent mb-2 block">{item.date}</span>
                      <h3 className="text-xl font-bold">{item.title}</h3>
                    </GlassCard>
                  </div>
                </div>
              </Slide>
            ))}
          </Stack>
        </div>
      </Container>
    </Section>
  );
}
