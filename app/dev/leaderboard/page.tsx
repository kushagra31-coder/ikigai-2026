import React from 'react';
import { Container, Section } from '@/components/layout';
import { LeaderboardPlayground } from './components/LeaderboardPlayground';

export default function LeaderboardDevPage() {
  return (
    <div className="min-h-screen bg-background pt-24 pb-12">
      <Container>
        <Section className="py-8">
          <LeaderboardPlayground />
        </Section>
      </Container>
    </div>
  );
}
