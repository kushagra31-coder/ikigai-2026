import { Container, Section, Grid, Flex, Stack } from '@/components/layout';
import { PUBLIC_CONTENT } from '@/components/constants/public-content';
import { Fade, Slide } from '@/components/motion';
import { GlassCard } from '@/components/data-display/GlassCard';
import { Icons } from '@/components/constants/icons';
import { Button } from '@/components/primitives/button';

export const metadata = {
  title: 'Contact | IKIGAI 2026',
  description: 'Get in touch with the IKIGAI 2026 team.',
};

export default function ContactPage() {
  return (
    <Section className="pt-32 min-h-screen">
      <Container className="max-w-5xl">
        <Fade>
          <div className="text-center mb-16 space-y-4">
            <h1 className="text-display font-bold">Get in Touch</h1>
            <p className="text-body-l text-muted-foreground">
              Have questions? We&apos;re here to help.
            </p>
          </div>
        </Fade>

        <Grid className="grid-cols-1 lg:grid-cols-2 gap-12">
          <Slide direction="right">
            <Stack className="space-y-6">
              <GlassCard className="p-8">
                <h3 className="text-heading-m mb-6 border-b border-white/10 pb-4">Contact Information</h3>
                <Stack className="space-y-4">
                  <Flex className="gap-4 text-muted-foreground">
                    <Icons.mail className="w-5 h-5 text-primary" />
                    <a href={`mailto:${PUBLIC_CONTENT.contact.email}`} className="hover:text-primary transition-colors">
                      {PUBLIC_CONTENT.contact.email}
                    </a>
                  </Flex>
                  <Flex className="gap-4 text-muted-foreground">
                    <Icons.phone className="w-5 h-5 text-primary" />
                    <span>{PUBLIC_CONTENT.contact.phone}</span>
                  </Flex>
                  <Flex className="gap-4 text-muted-foreground items-start">
                    <Icons.mapPin className="w-5 h-5 text-primary shrink-0 mt-1" />
                    <span>
                      {PUBLIC_CONTENT.about.organizer}<br />
                      {PUBLIC_CONTENT.about.venue}
                    </span>
                  </Flex>
                </Stack>
              </GlassCard>

              <GlassCard className="p-8">
                <h3 className="text-heading-m mb-6 border-b border-white/10 pb-4">Coordinators</h3>
                <Grid className="grid-cols-2 gap-6">
                  <div>
                    <span className="text-sm text-secondary uppercase font-bold tracking-wider mb-2 block">Faculty</span>
                    <ul className="text-muted-foreground space-y-1">
                      {PUBLIC_CONTENT.contact.facultyCoords.map((name, i) => (
                        <li key={i}>{name}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <span className="text-sm text-secondary uppercase font-bold tracking-wider mb-2 block">Students</span>
                    <ul className="text-muted-foreground space-y-1">
                      {PUBLIC_CONTENT.contact.studentCoords.map((name, i) => (
                        <li key={i}>{name}</li>
                      ))}
                    </ul>
                  </div>
                </Grid>
              </GlassCard>

              <Flex className="gap-4 pt-4">
                <Button asChild variant="outline" size="icon" className="rounded-full w-12 h-12">
                  <a href={PUBLIC_CONTENT.contact.socialLinks.instagram} target="_blank" rel="noreferrer">
                    <Icons.instagram className="w-5 h-5" />
                  </a>
                </Button>
                <Button asChild variant="outline" size="icon" className="rounded-full w-12 h-12">
                  <a href={PUBLIC_CONTENT.contact.socialLinks.linkedin} target="_blank" rel="noreferrer">
                    <Icons.linkedin className="w-5 h-5" />
                  </a>
                </Button>
                <Button asChild variant="outline" size="icon" className="rounded-full w-12 h-12">
                  <a href={PUBLIC_CONTENT.contact.socialLinks.github} target="_blank" rel="noreferrer">
                    <Icons.github className="w-5 h-5" />
                  </a>
                </Button>
              </Flex>
            </Stack>
          </Slide>

          <Slide direction="up" delay={0.2}>
            <GlassCard className="p-2 min-h-[400px] overflow-hidden group">
              {/* Maps Iframe */}
              <iframe 
                className="w-full h-[400px] rounded-xl"
                style={{ border: 0 }}
                loading="lazy" 
                allowFullScreen 
                src="https://www.openstreetmap.org/export/embed.html?bbox=75.924%2C22.814%2C75.952%2C22.826&amp;layer=mapnik&amp;marker=22.8218%2C75.9437"
              ></iframe>
            </GlassCard>
          </Slide>
        </Grid>
      </Container>
    </Section>
  );
}
