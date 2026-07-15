'use client';

import { useState } from 'react';
import { Container, Section, Stack } from '@/components/layout';
import IKIGAI2026_CONFIG from '@/config/event.config';
import { Fade, Slide } from '@/components/motion';
import { Icons } from '@/components/constants/icons';
import { motion, AnimatePresence } from 'framer-motion';

export default function RulebookPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const sections = [
    { id: 'eligibility', title: 'Eligibility Criteria', items: IKIGAI2026_CONFIG.rulebook.eligibility },
    { id: 'registration', title: 'Registration Rules', items: IKIGAI2026_CONFIG.rulebook.registration },
    { id: 'project-rules', title: 'Project Rules', items: IKIGAI2026_CONFIG.rulebook.projectRules },
    { id: 'submission', title: 'Submission Requirements', items: IKIGAI2026_CONFIG.rulebook.submission },
    { id: 'guidelines', title: 'Participant Guidelines', items: IKIGAI2026_CONFIG.rulebook.participantGuidelines },
    { id: 'conduct', title: 'Code of Conduct', items: IKIGAI2026_CONFIG.rulebook.codeOfConduct },
    { id: 'why', title: 'Why Participate?', items: IKIGAI2026_CONFIG.rulebook.whyParticipate },
    { id: 'important', title: 'Important Notes', items: IKIGAI2026_CONFIG.rulebook.importantNotes },
    { id: 'judging', title: 'Judging Criteria', items: IKIGAI2026_CONFIG.rulebook.judging.map((j: any) => `${j.name} (${j.weight}%)`) },
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

        <Stack className="space-y-4">
          {sections.map((section, idx) => {
            const isOpen = openIndex === idx;

            return (
              <Slide key={section.id} direction="up" delay={idx * 0.1}>
                <div className="border border-white/10 rounded-xl overflow-hidden bg-card/40 backdrop-blur-sm">
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : idx)}
                    className="w-full px-8 py-5 flex items-center justify-between text-left hover:bg-white/5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    aria-expanded={isOpen}
                  >
                    <span className={`text-heading-m font-semibold ${isOpen ? 'text-primary' : 'text-foreground'}`}>
                      {section.title}
                    </span>
                    <Icons.chevronDown 
                      className={`w-6 h-6 text-muted-foreground transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                    />
                  </button>
                  
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                      >
                        <div className="px-8 pb-6 border-t border-white/5 pt-4">
                          <ul className="space-y-4">
                            {section.items.map((item: string, itemIdx: number) => (
                              <li key={itemIdx} className="flex items-start">
                                <span className="text-accent mr-3 mt-1">•</span>
                                <span className="text-body-m text-muted-foreground leading-relaxed">{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Slide>
            );
          })}
        </Stack>
      </Container>
    </Section>
  );
}
