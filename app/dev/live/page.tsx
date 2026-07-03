import React from 'react';
import { Container, Section } from '@/components/layout';
import { LiveSystemPlayground } from './components/LiveSystemPlayground';

export default function LiveSystemDevPage() {
  return (
    <div className="min-h-screen bg-background pt-24 pb-12">
      <Container>
        <Section className="py-8">
          <div className="mb-8">
            <h1 className="text-4xl font-black mb-2">Live Event System</h1>
            <p className="text-muted-foreground">Phase 13 Playground. Verify the Event Bus architecture, Activity Feed, Notifications, and Status synchronization.</p>
          </div>
          <LiveSystemPlayground />
        </Section>
      </Container>
    </div>
  );
}
