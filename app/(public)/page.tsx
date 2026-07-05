import { Container, Section, Grid, Flex, Stack } from '@/components/layout';
import { Button } from '@/components/primitives/button';
import { GlassCard } from '@/components/data-display/GlassCard';
import { Fade, Slide, Scale, Hover } from '@/components/motion';
import { LandingIntroWrapper } from '@/components/landing/animations/LandingIntroWrapper';
import { Countdown } from '@/components/landing/hero/Countdown';
// Force rebuild to clear hydration cache
import { PUBLIC_CONTENT } from '@/components/constants/public-content';
import { Icons, IconType } from '@/components/constants/icons';
import { SponsorCard } from '@/components/landing/SponsorCard';
import Link from 'next/link';

import SoftAurora from '@/components/ui/SoftAurora';
import FlowingMenu from '@/components/ui/FlowingMenu';

export default function Home() {
  const flowingMenuItems = [
    { link: '#', text: 'Hackathon', image: '/images/sponsors/unstop.png' },
    { link: '#', text: 'Innovation', image: '/images/sponsors/tcs.png' },
    { link: '#', text: 'Technology', image: '/images/sponsors/acropolis.png' },
    { link: '#', text: 'Future', image: '/images/sponsors/csit.png' }
  ];

  return (
    <>
      <LandingIntroWrapper />
      
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex flex-col justify-center items-center overflow-hidden">
        {/* We rely on the global layout background here now */}
        
        <Container className="relative z-10 text-center">
          <Fade delay={0.1} duration="slow">
            <h1 className="text-display md:text-[6rem] font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-br from-white via-white to-white/40 leading-tight">
              {PUBLIC_CONTENT.hero.eventTitle}
            </h1>
          </Fade>
          
          <Fade delay={0.2} duration="slow">
            <p className="mt-6 text-heading-l md:text-heading-xl text-primary font-bold tracking-tight">
              {PUBLIC_CONTENT.hero.tagline}
            </p>
          </Fade>
          
          <Fade delay={0.3}>
            <p className="mt-6 text-body-l text-muted-foreground max-w-2xl mx-auto">
              {PUBLIC_CONTENT.hero.description}
            </p>
          </Fade>
          
          <Fade delay={0.4}>
            <Flex className="mt-10 justify-center gap-4">
              <Button asChild size="lg" variant="primary" className="text-base px-8 h-12 shadow-glow">
                <Link href="/login?mode=register">{PUBLIC_CONTENT.hero.primaryCta}</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-base px-8 h-12 backdrop-blur-sm">
                <Link href="#about">{PUBLIC_CONTENT.hero.secondaryCta}</Link>
              </Button>
            </Flex>
          </Fade>
          
          <Countdown targetDate={PUBLIC_CONTENT.hero.countdownDate} />
        </Container>
      </section>

      {/* About Section */}
      <Section id="about" className="relative">
        <Container>
          <Grid className="grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <Slide direction="right">
              <div className="space-y-6">
                <Badge>About Event</Badge>
                <h2 className="text-heading-xl leading-tight">{PUBLIC_CONTENT.about.title}</h2>
                <p className="text-body-l text-muted-foreground">{PUBLIC_CONTENT.about.vision}</p>
                <p className="text-body-l text-muted-foreground">{PUBLIC_CONTENT.about.objectives}</p>
                
                <Flex className="gap-6 pt-4">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-full bg-primary/10">
                      <Icons.clock className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-bold text-lg">36 Hours</p>
                      <p className="text-sm text-muted-foreground">Non-stop</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-full bg-accent/10">
                      <Icons.mapPin className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <p className="font-bold text-lg">In-Person</p>
                      <p className="text-sm text-muted-foreground">Main Campus</p>
                    </div>
                  </div>
                </Flex>
              </div>
            </Slide>
            
            <Slide direction="up" delay={0.2}>
              <Grid className="grid-cols-1 sm:grid-cols-2 gap-6">
                <GlassCard className="text-center p-8 flex flex-col justify-center items-center h-full">
                  <h3 className="text-5xl font-black text-primary">{PUBLIC_CONTENT.statistics.tracks}</h3>
                  <p className="mt-2 text-sm text-muted-foreground uppercase tracking-wider font-semibold">Tracks</p>
                </GlassCard>
                <GlassCard className="text-center p-8 flex flex-col justify-center items-center h-full">
                  <h3 className="text-5xl font-black text-secondary">₹2.5L</h3>
                  <p className="mt-2 text-sm text-muted-foreground uppercase tracking-wider font-semibold">Prize Pool</p>
                </GlassCard>
              </Grid>
            </Slide>
          </Grid>
        </Container>
      </Section>

      {/* Tracks Section */}
      <Section className="bg-card/20 relative">
        <Container>
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <Badge variant="secondary">Innovation Areas</Badge>
            <h2 className="text-heading-xl">Hackathon Tracks</h2>
            <p className="text-body-l text-muted-foreground">
              Choose your domain and build solutions that create real impact.
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-6">
            {PUBLIC_CONTENT.tracks.map((track, idx) => {
              const IconComp = Icons[track.icon as keyof typeof Icons] as IconType;
              return (
                <Scale key={track.id} delay={idx * 0.1} className="w-full md:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)]">
                  <Hover className="h-full">
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
          </div>
        </Container>
      </Section>

      {/* Sponsors Section */}
      <Section id="sponsors" className="relative">
        <Container>
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-heading-xl md:text-[4rem] font-black leading-tight">Our Sponsors</h2>
            <p className="text-body-l text-muted-foreground">
              IKIGAI 2026 is made possible by our generous partners and sponsors.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {PUBLIC_CONTENT.sponsors.map((sponsor) => (
              <SponsorCard
                key={sponsor.id}
                id={sponsor.id}
                name={sponsor.name}
                logo={sponsor.logo}
                tier={sponsor.tier}
                website={sponsor.website}
              />
            ))}
          </div>

        </Container>
      </Section>

      {/* Timeline Preview */}
      <Section className="bg-card/20 relative">
        <Container>
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-heading-xl">Event Schedule</h2>
            <p className="text-body-l text-muted-foreground">Mark your calendar for these important dates.</p>
          </div>
          
          <div className="max-w-4xl mx-auto relative">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-accent/50 to-transparent -translate-x-1/2" />
            
            <Stack className="space-y-12">
              {PUBLIC_CONTENT.timeline.slice(0, 4).map((item, idx) => (
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
            
            <div className="mt-12 text-center">
              <Button asChild variant="outline">
                <Link href="/timeline">View Full Schedule</Link>
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      {/* Flowing Menu Section */}
      <div className="h-[400px] w-full relative overflow-hidden bg-background border-y border-white/10">
        <FlowingMenu 
          items={flowingMenuItems}
          speed={20}
          textColor="#ffffff"
          bgColor="#0D0A11"
          marqueeBgColor="#8B5CF6"
          marqueeTextColor="#ffffff"
          borderColor="#333333"
        />
      </div>

      {/* CTA Section */}
      <Section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/10" />
        <Container className="relative z-10 text-center max-w-3xl space-y-8">
          <Scale>
            <h2 className="text-heading-xl md:text-[4rem] font-black leading-tight">Ready to build the future?</h2>
            <p className="text-xl text-muted-foreground mt-4">
              Join 300+ hackers in the most awaited hackathon of the year.
            </p>
            <div className="mt-10">
              <Button asChild size="lg" variant="primary" className="text-lg px-12 h-14 shadow-glow">
                <Link href="/login?mode=register">Register Now</Link>
              </Button>
            </div>
          </Scale>
        </Container>
      </Section>
    </>
  );
}

const Badge = ({ children, variant = "primary" }: { children: React.ReactNode, variant?: "primary" | "secondary" }) => (
  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold tracking-wide ${variant === 'primary' ? 'bg-primary/20 text-primary' : 'bg-secondary/20 text-secondary'}`}>
    {children}
  </span>
);
