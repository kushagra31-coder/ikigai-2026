'use client';

import { Container, Section, Grid, Stack, Flex } from "@/components/layout";
import { Button } from "@/components/primitives/button";
import { Input } from "@/components/primitives/input";
import { Badge } from "@/components/primitives/badge";
import { GlassCard } from "@/components/data-display/GlassCard";
import { Fade, Slide, Scale, Hover } from "@/components/motion";
import { EmptyState } from "@/components/feedback/EmptyState";
import { ErrorState } from "@/components/feedback/ErrorState";
import { Icons } from "@/components/constants/icons";

export default function SandboxPage() {
  return (
    <Container className="py-24 space-y-24">
      {/* Header */}
      <Fade duration="intro">
        <div className="space-y-4 text-center max-w-2xl mx-auto">
          <h1 className="text-display text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-secondary">
            IKIGAI Design System
          </h1>
          <p className="text-body-l text-muted-foreground">
            A comprehensive showcase of reusable components built with Tailwind v4, Framer Motion, and shadcn/ui.
          </p>
        </div>
      </Fade>

      {/* Typography */}
      <Section className="space-y-8">
        <h2 className="text-heading-xl border-b pb-4">Typography</h2>
        <Stack className="space-y-6">
          <div><p className="text-display">Display Text</p><p className="text-caption">.text-display</p></div>
          <div><p className="text-hero">Hero Text</p><p className="text-caption">.text-hero</p></div>
          <div><p className="text-heading-xl">Heading XL</p><p className="text-caption">.text-heading-xl</p></div>
          <div><p className="text-heading-l">Heading L</p><p className="text-caption">.text-heading-l</p></div>
          <div><p className="text-heading-m">Heading M</p><p className="text-caption">.text-heading-m</p></div>
          <div><p className="text-heading-s">Heading S</p><p className="text-caption">.text-heading-s</p></div>
          <div><p className="text-body-l">Body Large (Lorem ipsum dolor sit amet.)</p></div>
          <div><p className="text-body-m">Body Medium (Lorem ipsum dolor sit amet.)</p></div>
          <div><p className="text-body-s">Body Small (Lorem ipsum dolor sit amet.)</p></div>
          <div><p className="text-tiny">TINY UPPERCASE</p></div>
        </Stack>
      </Section>

      {/* Buttons */}
      <Section className="space-y-8">
        <h2 className="text-heading-xl border-b pb-4">Buttons</h2>
        <Grid className="grid-cols-2 md:grid-cols-4 gap-4">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="danger">Danger</Button>
          <Button variant="success">Success</Button>
          <Button isLoading>Loading</Button>
          <Button disabled>Disabled</Button>
        </Grid>
      </Section>

      {/* Glass Cards */}
      <Section className="space-y-8">
        <h2 className="text-heading-xl border-b pb-4">Data Display (Cards & Glassmorphism)</h2>
        <Grid>
          <Slide direction="up" delay={0.1}>
            <GlassCard>
              <h3 className="text-heading-m mb-2">Glass Card 1</h3>
              <p className="text-body-m text-muted-foreground">Notice the subtle blur and gradient border.</p>
            </GlassCard>
          </Slide>
          <Slide direction="up" delay={0.2}>
            <GlassCard>
              <h3 className="text-heading-m mb-2">Glass Card 2</h3>
              <p className="text-body-m text-muted-foreground">Hover over this card to see the purple glow.</p>
            </GlassCard>
          </Slide>
          <Slide direction="up" delay={0.3}>
            <Hover lift={-10}>
              <GlassCard>
                <h3 className="text-heading-m mb-2">Interactive Card</h3>
                <p className="text-body-m text-muted-foreground">Wrapped in a Framer Motion Hover component.</p>
              </GlassCard>
            </Hover>
          </Slide>
        </Grid>
      </Section>

      {/* Forms */}
      <Section className="space-y-8">
        <h2 className="text-heading-xl border-b pb-4">Forms</h2>
        <div className="max-w-md space-y-4">
          <Input placeholder="Standard Input..." />
          <Input placeholder="Error Input..." error />
        </div>
      </Section>

      {/* Feedback States */}
      <Section className="space-y-8">
        <h2 className="text-heading-xl border-b pb-4">Feedback States</h2>
        <Grid>
          <Scale>
            <EmptyState 
              title="No data found" 
              description="There is no data to display here yet."
              actionLabel="Create New"
              onAction={() => alert('Clicked')}
            />
          </Scale>
          <Scale delay={0.1}>
            <ErrorState />
          </Scale>
        </Grid>
      </Section>
      
      {/* Misc Elements */}
      <Section className="space-y-8">
        <h2 className="text-heading-xl border-b pb-4">Badges & Flex</h2>
        <Flex className="gap-4 flex-wrap">
          <Badge>Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="destructive">Destructive</Badge>
          <Icons.star className="w-5 h-5 text-warning" />
        </Flex>
      </Section>
    </Container>
  );
}
