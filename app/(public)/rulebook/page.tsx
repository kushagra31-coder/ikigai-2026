'use client';

import { useState, useEffect } from 'react';
import IKIGAI2026_CONFIG from '@/config/event.config';
import { PUBLIC_CONTENT } from '@/components/constants/public-content';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Container } from '@/components/layout';

export default function RulebookPage() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="min-h-screen bg-[#050505] text-[#FAFAFA] font-sans selection:bg-white/10 selection:text-white pb-32">
      {/* Progress Indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-[#06B6D4] z-50 origin-left"
        style={{ scaleX }}
      />

      {/* Hero */}
      <div className="pt-40 pb-32 border-b border-white/[0.08]">
        <Container>
          <div className="max-w-5xl">
            <div className="text-[11px] font-mono uppercase tracking-widest text-[#9A9A9A] mb-12 flex items-center gap-4">
              <span className="w-12 h-px bg-[#9A9A9A]/30" />
              Official Documentation
            </div>
            <h1 className="text-[clamp(4rem,10vw,8rem)] font-medium tracking-tighter leading-[0.9] mb-12">
              The<br />Rulebook
            </h1>
            <p className="text-[20px] md:text-[28px] text-[#9A9A9A] font-light leading-relaxed max-w-2xl">
              The definitive guide to participation, evaluation, and conduct at IKIGAI 2026.
            </p>
          </div>
        </Container>
      </div>

      {/* Chapter 01: Eligibility (Left Header, Right Content) */}
      <section className="py-32 border-b border-white/[0.08] relative">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
            <div className="lg:col-span-5 lg:sticky top-32 h-fit">
              <div className="text-[8rem] md:text-[12rem] font-medium tracking-tighter leading-none text-white/5 mb-4">
                01
              </div>
              <h2 className="text-4xl md:text-5xl font-medium tracking-tight mb-6">Eligibility</h2>
              <div className="w-12 h-px bg-[#06B6D4] mb-8" />
              <p className="text-[#9A9A9A] text-lg leading-relaxed">
                Who can participate in the challenge.
              </p>
            </div>
            
            <div className="lg:col-span-7 flex flex-col justify-center pt-8 lg:pt-32">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-white/[0.08] border border-white/[0.08]">
                {IKIGAI2026_CONFIG.rulebook.eligibility.map((item, idx) => (
                  <div key={idx} className="bg-[#0D0D0D] p-10 hover:bg-[#111111] transition-colors duration-500">
                    <p className="text-[17px] text-[#FAFAFA] leading-relaxed font-light">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Chapter 02: Team Rules (Right Header, Left Content) */}
      <section className="py-32 border-b border-white/[0.08] relative bg-[#0A0A0A]">
        <Container>
          <div className="flex flex-col-reverse lg:grid lg:grid-cols-12 gap-16 lg:gap-24">
            <div className="lg:col-span-7 flex flex-col justify-center pt-8 lg:pt-32">
              <div className="flex flex-col gap-12">
                <div className="space-y-8">
                  <h3 className="text-[11px] font-mono uppercase tracking-widest text-[#06B6D4]">Registration Protocol</h3>
                  <ul className="flex flex-col gap-6 list-none p-0 m-0">
                    {IKIGAI2026_CONFIG.rulebook.registration.map((item, idx) => (
                      <li key={idx} className="flex gap-6 items-start">
                        <span className="text-[#9A9A9A] font-mono text-sm mt-1">{String(idx + 1).padStart(2, '0')}</span>
                        <p className="text-[18px] text-[#FAFAFA] font-light leading-relaxed">{item}</p>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="w-full h-px bg-white/[0.08]" />
                
                <div className="space-y-8">
                  <h3 className="text-[11px] font-mono uppercase tracking-widest text-[#06B6D4]">Project Constraints</h3>
                  <ul className="flex flex-col gap-6 list-none p-0 m-0">
                    {IKIGAI2026_CONFIG.rulebook.projectRules.map((item, idx) => (
                      <li key={idx} className="flex gap-6 items-start">
                        <span className="text-[#9A9A9A] font-mono text-sm mt-1">{String(idx + 1).padStart(2, '0')}</span>
                        <p className="text-[18px] text-[#FAFAFA] font-light leading-relaxed">{item}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 lg:sticky top-32 h-fit lg:text-right flex flex-col lg:items-end">
              <div className="text-[8rem] md:text-[12rem] font-medium tracking-tighter leading-none text-white/5 mb-4">
                02
              </div>
              <h2 className="text-4xl md:text-5xl font-medium tracking-tight mb-6">Team & Project</h2>
              <div className="w-12 h-px bg-[#06B6D4] mb-8" />
              <p className="text-[#9A9A9A] text-lg leading-relaxed max-w-sm">
                Strict protocols regarding team formation and intellectual property.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Chapter 03: Submission Rules (Centered Composition) */}
      <section className="py-40 border-b border-white/[0.08]">
        <Container>
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
            <div className="text-[8rem] md:text-[12rem] font-medium tracking-tighter leading-none text-white/5 mb-8">
              03
            </div>
            <h2 className="text-4xl md:text-6xl font-medium tracking-tight mb-8">Submission</h2>
            <div className="w-px h-24 bg-gradient-to-b from-[#06B6D4] to-transparent mb-16" />
            
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-px bg-white/[0.08] border border-white/[0.08] text-left">
              {IKIGAI2026_CONFIG.rulebook.submission.map((item, idx) => (
                <div key={idx} className="bg-[#0D0D0D] p-8 md:p-12 aspect-square flex flex-col justify-end hover:bg-[#111111] transition-colors duration-500">
                  <div className="text-[11px] font-mono text-[#9A9A9A] mb-auto">Deliverable {idx + 1}</div>
                  <p className="text-[18px] text-[#FAFAFA] font-light leading-tight">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Chapter 04: Judging Criteria (Full Width Split Table) */}
      <section className="py-32 border-b border-white/[0.08] bg-[#0A0A0A]">
        <Container>
          <div className="mb-24 flex flex-col md:flex-row justify-between items-end gap-8 border-b border-white/[0.08] pb-12">
            <div>
              <div className="text-[8rem] md:text-[12rem] font-medium tracking-tighter leading-none text-white/5 mb-4">
                04
              </div>
              <h2 className="text-4xl md:text-5xl font-medium tracking-tight">Evaluation Matrix</h2>
            </div>
            <p className="text-[#9A9A9A] text-lg leading-relaxed max-w-md text-left md:text-right">
              The exact rubric used by our panel of industry experts and engineers.
            </p>
          </div>

          <div className="flex flex-col gap-px bg-white/[0.08]">
            {IKIGAI2026_CONFIG.rulebook.judging.map((j: any, idx: number) => (
              <div key={idx} className="group flex flex-col md:flex-row bg-[#0D0D0D] hover:bg-[#111111] transition-colors duration-500">
                <div className="w-full md:w-1/3 p-8 md:p-12 border-b md:border-b-0 md:border-r border-white/[0.08] flex items-center">
                  <div className="text-4xl font-light text-[#FAFAFA]">{j.weight}%</div>
                </div>
                <div className="w-full md:w-2/3 p-8 md:p-12 flex items-center">
                  <h3 className="text-2xl font-medium text-[#FAFAFA] group-hover:text-[#06B6D4] transition-colors duration-500">{j.name}</h3>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Chapter 05: Code of Conduct & Guidelines (Split Layout) */}
      <section className="py-32 border-b border-white/[0.08]">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
            
            {/* Guidelines */}
            <div>
               <div className="text-[6rem] font-medium tracking-tighter leading-none text-white/5 mb-4">
                05
              </div>
              <h2 className="text-3xl font-medium tracking-tight mb-12">Required Gear</h2>
              <div className="flex flex-col gap-px bg-white/[0.08] border border-white/[0.08]">
                {IKIGAI2026_CONFIG.rulebook.participantGuidelines.map((item, idx) => (
                  <div key={idx} className="bg-[#0D0D0D] p-6 px-8 hover:bg-[#111111] transition-colors flex items-center gap-4">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#06B6D4]" />
                    <span className="text-[16px] text-[#FAFAFA] font-light">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Code of conduct */}
            <div>
              <div className="text-[6rem] font-medium tracking-tighter leading-none text-white/5 mb-4">
                06
              </div>
              <h2 className="text-3xl font-medium tracking-tight mb-12">Code of Conduct</h2>
              <div className="flex flex-col gap-px bg-white/[0.08] border border-white/[0.08]">
                {IKIGAI2026_CONFIG.rulebook.codeOfConduct.map((item, idx) => (
                  <div key={idx} className="bg-[#050505] p-8 hover:bg-[#0D0D0D] transition-colors">
                    <p className="text-[17px] text-[#9A9A9A] font-light leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </Container>
      </section>

      {/* Schedule / Timeline (Full Width Editorial Block) */}
      <section className="py-32 border-b border-white/[0.08] bg-[#0A0A0A]">
        <Container>
          <div className="mb-24 text-center">
            <div className="text-[8rem] md:text-[12rem] font-medium tracking-tighter leading-none text-white/5 mb-4">
              07
            </div>
            <h2 className="text-4xl md:text-5xl font-medium tracking-tight">Timeline</h2>
          </div>

          <div className="max-w-4xl mx-auto">
            {PUBLIC_CONTENT.timeline.map((item, idx) => (
              <div key={idx} className="group border-t border-white/[0.08] py-8 flex flex-col md:flex-row md:items-baseline gap-4 md:gap-12 hover:border-[#06B6D4]/30 transition-colors duration-500">
                <div className="w-48 shrink-0">
                  <span className="text-[11px] font-mono uppercase tracking-widest text-[#9A9A9A] group-hover:text-[#06B6D4] transition-colors">
                    {item.date}
                  </span>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-medium text-[#FAFAFA] mb-2">{item.title}</h3>
                  <p className="text-[#9A9A9A] font-light">{item.status}</p>
                </div>
              </div>
            ))}
            <div className="border-t border-white/[0.08]" />
          </div>
        </Container>
      </section>

      {/* Footer Info */}
      <Container>
        <div className="pt-32 flex flex-col md:flex-row justify-between items-start md:items-center text-[11px] font-mono uppercase tracking-widest text-[#9A9A9A]">
          <span>Document Version 2.0.4</span>
          <span>End of Rulebook</span>
        </div>
      </Container>
    </div>
  );
}
