'use client';

import { Container } from '@/components/layout';
import IKIGAI2026_CONFIG from '@/config/event.config';
import { PUBLIC_CONTENT } from '@/components/constants/public-content';
import { Icons } from '@/components/constants/icons';

export default function AboutPage() {
  const { branding, statistics } = IKIGAI2026_CONFIG;
  const { about } = PUBLIC_CONTENT;

  return (
    <div className="min-h-screen bg-background text-foreground mt-20">
      <div className="bg-foreground text-background py-32 border-b border-border">
        <Container>
          <div className="max-w-4xl">
            <div className="text-[10px] font-mono uppercase tracking-widest text-background/50 mb-8 flex items-center gap-4">
              <span className="w-12 h-px bg-background/20" />
              Organizational Context
            </div>
            <h1 className="text-6xl md:text-8xl font-semibold tracking-tighter mb-8 leading-[0.9]">About<br/>{branding.eventName}</h1>
            <p className="text-2xl text-background/70 font-light leading-relaxed max-w-2xl">
              Driving national AI innovation through a rigorous, high-stakes technical competition.
            </p>
          </div>
        </Container>
      </div>

      <Container className="py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-32">
          
          <div className="lg:col-span-4 flex flex-col gap-12">
            <div>
              <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-4 border-b border-border pb-2">Mission</div>
              <p className="text-sm leading-relaxed text-foreground/80">{about.vision}</p>
            </div>
            <div>
              <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-4 border-b border-border pb-2">Objectives</div>
              <p className="text-sm leading-relaxed text-foreground/80">{about.objectives}</p>
            </div>
            <div className="bg-muted/10 border border-border p-6 flex flex-col items-center justify-center text-center">
              <Icons.users className="w-8 h-8 text-primary mb-4" />
              <div className="text-3xl font-semibold tracking-tight">{statistics.expectedParticipants || "5000"}+</div>
              <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Engineers Expected</div>
            </div>
          </div>

          <div className="lg:col-span-8 flex flex-col gap-16">
            <section>
              <h2 className="text-3xl font-semibold tracking-tighter mb-6">{about.title}</h2>
              <div className="prose prose-neutral dark:prose-invert max-w-none text-foreground/80 leading-relaxed">
                <p className="mb-6">{branding.slogan}</p>
                <p className="mb-6">{about.organizer} We are hosting {about.duration} at {about.venue}.</p>
              </div>
            </section>

            <section className="pt-16 border-t border-border">
              <h2 className="text-3xl font-semibold tracking-tighter mb-8">Core Tenets</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="border border-border p-8 hover:border-primary/50 transition-colors">
                  <div className="text-[10px] font-mono uppercase tracking-widest text-primary mb-4">Tenet 01</div>
                  <h3 className="text-lg font-semibold mb-2">Meritocratic Evaluation</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">All submissions are evaluated through a strict, reproducible rubic prioritizing working code over theoretical models.</p>
                </div>
                <div className="border border-border p-8 hover:border-primary/50 transition-colors">
                  <div className="text-[10px] font-mono uppercase tracking-widest text-primary mb-4">Tenet 02</div>
                  <h3 className="text-lg font-semibold mb-2">Architectural Rigor</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">Scalability, security, and fault tolerance are prerequisites, not optional features.</p>
                </div>
              </div>
            </section>
          </div>
          
        </div>
      </Container>
    </div>
  );
}
