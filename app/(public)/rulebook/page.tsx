import { Container, Section, Stack } from '@/components/layout';
import IKIGAI2026_CONFIG from '@/config/event.config';
import { Fade, Slide } from '@/components/motion';
import { GlassCard } from '@/components/data-display/GlassCard';

export const metadata = {
  title: 'Rulebook | IKIGAI 2026',
  description: 'Official rulebook, eligibility, and guidelines for IKIGAI 2026.',
};

export default function RulebookPage() {
  const sections = [
    { id: 'eligibility', title: 'Eligibility Criteria', items: IKIGAI2026_CONFIG.rulebook.eligibility },
    { id: 'registration', title: 'Registration Rules', items: IKIGAI2026_CONFIG.rulebook.registration },
    { id: 'project-rules', title: 'Project Rules', items: IKIGAI2026_CONFIG.rulebook.projectRules },
    { id: 'submission', title: 'Submission Requirements', items: IKIGAI2026_CONFIG.rulebook.submission },
    { id: 'guidelines', title: 'Participant Guidelines', items: IKIGAI2026_CONFIG.rulebook.participantGuidelines },
    { id: 'conduct', title: 'Code of Conduct', items: IKIGAI2026_CONFIG.rulebook.codeOfConduct },
    { id: 'why', title: 'Why Participate?', items: IKIGAI2026_CONFIG.rulebook.whyParticipate },
    { id: 'important', title: 'Important Notes', items: IKIGAI2026_CONFIG.rulebook.importantNotes },
  ];

  return (
    <Section className="pt-32 min-h-screen">
      <Container className="max-w-4xl">
        <Fade>
          <div className="text-center mb-16 space-y-4">
            <h1 className="text-display font-bold">Official Rulebook</h1>
            <p className="text-body-l text-muted-foreground">
              Please read carefully. Participation implies agreement to all rules.
            </p>
          </div>
        </Fade>

        <Stack className="space-y-12">
          {sections.map((section, idx) => (
            <Slide key={section.id} direction="up" delay={idx * 0.1}>
              <GlassCard className="p-8">
                <h2 className="text-heading-l mb-6 text-primary">{section.title}</h2>
                <ul className="space-y-4">
                  {section.items.map((item: string, itemIdx: number) => (
                    <li key={itemIdx} className="flex items-start">
                      <span className="text-accent mr-3 mt-1">•</span>
                      <span className="text-body-m text-muted-foreground leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </GlassCard>
            </Slide>
          ))}

          <Slide direction="up" delay={sections.length * 0.1}>
            <GlassCard className="p-8 border-accent/50">
              <h2 className="text-heading-l mb-6 text-accent">Judging Criteria</h2>
              <ul className="space-y-4">
                {IKIGAI2026_CONFIG.rulebook.judging.map((item: any, itemIdx: number) => (
                  <li key={itemIdx} className="flex items-center justify-between border-b border-white/5 pb-4 last:border-0 last:pb-0">
                    <span className="text-body-m font-semibold">{item.name}</span>
                    <span className="text-body-l font-bold text-accent">{item.weight}%</span>
                  </li>
                ))}
              </ul>
            </GlassCard>
          </Slide>
        </Stack>
      </Container>
    </Section>
  );
}
