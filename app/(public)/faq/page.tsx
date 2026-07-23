'use client';

import { Container } from '@/components/layout';
import { PUBLIC_CONTENT } from '@/components/constants/public-content';
import { Icons } from '@/components/constants/icons';
import { FaqSearch } from '@/components/faq/FaqSearch';
import { useState } from 'react';

export default function FAQPage() {
  const { faq, contact } = PUBLIC_CONTENT;
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="min-h-screen bg-background text-foreground mt-20">
      {/* Hero */}
      <div className="bg-background text-foreground py-32 border-b border-border/30 relative overflow-hidden">
        {/* Subtle glowing background orb */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none" />
        
        <Container className="relative z-10">
          <div className="max-w-4xl">
            <div className="text-[10px] font-mono uppercase tracking-widest text-cyan-500 mb-8 flex items-center gap-4">
              <span className="w-12 h-px bg-cyan-500/30" />
              Knowledge Base
            </div>
            <h1 className="text-6xl md:text-8xl font-semibold tracking-tighter mb-8 leading-[0.9]">
              FAQ &<br />Guidelines
            </h1>
            <p className="text-2xl text-muted-foreground font-light leading-relaxed max-w-2xl">
              Answers to common questions regarding competition structure, eligibility, and evaluation criteria.
            </p>
          </div>
        </Container>
      </div>

      <Container className="py-24">
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-16 xl:gap-24">

          {/* Sidebar */}
          <div className="xl:col-span-4 flex flex-col gap-8">
            {/* Search input — owned here, passed to FaqSearch */}
            <div className="relative w-full">
              <Icons.search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
              <input
                type="text"
                placeholder="Search knowledge base..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-muted/5 border border-border/50 rounded-xl px-12 py-4 text-sm focus:outline-none focus:border-cyan-500/50 focus:bg-background transition-all duration-300 text-foreground placeholder:text-muted-foreground shadow-[inset_0_2px_10px_rgba(0,0,0,0.1)]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Clear search"
                >
                  <Icons.close className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Result count badge */}
            {searchQuery && (
              <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                {(() => {
                  const tokens = searchQuery.toLowerCase().split(/\s+/).filter(Boolean);
                  const count = faq.filter(f => {
                    const text = `${f.question} ${f.answer}`.toLowerCase();
                    return tokens.every(token => text.includes(token));
                  }).length;
                  return `${count} result${count !== 1 ? 's' : ''} found`;
                })()}
              </div>
            )}

            {/* Contact block */}
            <div className="border border-border/50 bg-muted/5 rounded-xl p-8 hover:border-cyan-500/30 hover:shadow-[0_0_20px_rgba(6,182,212,0.05)] transition-all duration-300">
              <h3 className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-4 border-b border-border/50 pb-2">
                Still need help?
              </h3>
              <p className="text-sm text-foreground/80 leading-relaxed mb-6">
                If you cannot find the answer you are looking for, contact operations directly.
              </p>
              <a
                href={`mailto:${contact.email}`}
                className="text-sm font-semibold text-cyan-500 hover:text-cyan-400 transition-colors flex items-center gap-2 group"
              >
                <Icons.mail className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
                {contact.email}
              </a>
            </div>
          </div>

          {/* FAQ Accordion — shared component with controlled search */}
          <div className="xl:col-span-8">
            <FaqSearch
              items={faq}
              externalQuery={searchQuery}
            />
          </div>
        </div>
      </Container>
    </div>
  );
}
