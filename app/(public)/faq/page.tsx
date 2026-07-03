'use client';

import { useState } from 'react';
import { Container, Section, Stack } from '@/components/layout';
import { PUBLIC_CONTENT } from '@/components/constants/public-content';
import { Fade, Slide } from '@/components/motion';
import { Icons } from '@/components/constants/icons';
import { motion, AnimatePresence } from 'framer-motion';

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <Section className="pt-32 min-h-screen">
      <Container className="max-w-3xl">
        <Fade>
          <div className="text-center mb-16 space-y-4">
            <h1 className="text-display font-bold">Frequently Asked Questions</h1>
            <p className="text-body-l text-muted-foreground">
              Everything you need to know about IKIGAI 2026.
            </p>
          </div>
        </Fade>

        <Stack className="space-y-4">
          {PUBLIC_CONTENT.faq.map((item, idx) => {
            const isOpen = openIndex === idx;
            
            return (
              <Slide key={item.id} direction="up" delay={idx * 0.1}>
                <div className="border border-white/10 rounded-xl overflow-hidden bg-card/40 backdrop-blur-sm">
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : idx)}
                    className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-white/5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    aria-expanded={isOpen}
                  >
                    <span className="font-semibold text-lg">{item.question}</span>
                    <Icons.chevronDown 
                      className={`w-5 h-5 text-muted-foreground transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
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
                        <div className="px-6 pb-4 text-muted-foreground border-t border-white/5 pt-4">
                          {item.answer}
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
