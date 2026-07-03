'use client';

import { MentorDashboard } from '@/features/mentor/components/MentorDashboard';
import { Container, Section } from '@/components/layout';
import { ToastProvider } from '@/components/providers/ToastProvider';

export default function MentorPlayground() {
  return (
    <ToastProvider>
      <Section className="min-h-screen pt-24 bg-background">
        <Container className="space-y-8">
          <div className="mb-8 border-b border-white/10 pb-4">
            <h1 className="text-3xl font-bold">Mentor Workspace Playground</h1>
            <p className="text-muted-foreground mt-1">
              Test the mentor dashboard components strictly isolated from auth guards.
            </p>
          </div>
          <MentorDashboard />
        </Container>
      </Section>
    </ToastProvider>
  );
}
