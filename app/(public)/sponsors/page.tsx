'use client';
// Force rebuild to clear hydration cache

import { Container, Section, Grid } from '@/components/layout';
import { Fade, Scale, Hover } from '@/components/motion';
import { GlassCard } from '@/components/data-display/GlassCard';
import Image from 'next/image';
import { useState } from 'react';
import IKIGAI2026_CONFIG from '@/config/event.config';

function SponsorCard({ sponsor, idx }: { sponsor: any; idx: number }) {
  const [imgError, setImgError] = useState(false);

  return (
    <Scale delay={idx * 0.08}>
      <Hover>
        <a
          href={sponsor.website !== '#' ? sponsor.website : undefined}
          target={sponsor.website !== '#' ? '_blank' : undefined}
          rel="noreferrer"
          className="block h-full"
        >
          <GlassCard className="h-full flex flex-col items-center justify-center text-center group border-none !bg-transparent hover:!bg-white/5 p-8 min-h-[200px] relative overflow-hidden transition-colors">
            <span className="absolute top-4 right-4 text-[9px] font-bold uppercase tracking-wider text-primary/60">
              {sponsor.category}
            </span>

            <div className="w-full flex items-center justify-center mb-4">
              <div className="relative w-32 h-20 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
              {!imgError ? (
                <Image
                  src={sponsor.logo}
                  alt={`${sponsor.name} Logo`}
                  fill
                  className="object-contain filter invert opacity-90 transition-all duration-300 group-hover:scale-110 group-hover:opacity-100"
                  sizes="(max-width: 768px) 50vw, 20vw"
                  loading="lazy"
                  onError={() => setImgError(true)}
                />
              ) : (
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center text-white font-bold text-lg shadow-lg"
                  style={{ backgroundColor: sponsor.color || '#7c3aed' }}
                >
                  {sponsor.shortName?.substring(0, 2).toUpperCase() || sponsor.name.substring(0, 2).toUpperCase()}
                </div>
              )}
              </div>
            </div>

            <h3 className="text-xs font-bold text-center tracking-wide text-muted-foreground group-hover:text-foreground transition-colors leading-tight">
              {sponsor.name}
            </h3>
          </GlassCard>
        </a>
      </Hover>
    </Scale>
  );
}

export default function SponsorsPage() {
  const sponsors = IKIGAI2026_CONFIG.sponsors;

  // Separate into organizing team and other sponsors
  const organizingTeam = sponsors.filter((s: any) => s.category === 'Organized By');
  const otherSponsors = sponsors.filter((s: any) => s.category !== 'Organized By');

  const grouped = otherSponsors.reduce((acc: any, s: any) => {
    if (!acc[s.category]) acc[s.category] = [];
    acc[s.category].push(s);
    return acc;
  }, {});

  return (
    <Section className="pt-32 min-h-screen">
      <Container>
        <Fade>
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h1 className="text-display font-bold">Organizing Team</h1>
            <p className="text-body-l text-muted-foreground">
              The driving force behind IKIGAI 2026.
            </p>
          </div>
        </Fade>

        <div className="mb-12">
          <Grid className="grid-cols-2 sm:grid-cols-3 gap-8 md:gap-12 max-w-5xl mx-auto">
            {organizingTeam.map((sponsor: any, idx: number) => (
              <SponsorCard key={sponsor.name} sponsor={sponsor} idx={idx} />
            ))}
          </Grid>
        </div>

        <div className="py-24" /> {/* Spacer */}

        <Fade>
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h1 className="text-display font-bold">Our Partners & Sponsors</h1>
            <p className="text-body-l text-muted-foreground">
              IKIGAI 2026 is made possible by our generous partners and sponsors.
            </p>
          </div>
        </Fade>

        <div className="space-y-12">
          {Object.entries(grouped).map(([category, items]: any) => (
            <div key={category}>
              <Fade>
                <h2 className="text-center text-sm font-bold uppercase tracking-[0.2em] text-primary mb-6">
                  {category}
                </h2>
              </Fade>
              <Grid className="grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8 md:gap-10">
                {items.map((sponsor: any, idx: number) => (
                  <SponsorCard key={sponsor.name} sponsor={sponsor} idx={idx} />
                ))}
              </Grid>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
