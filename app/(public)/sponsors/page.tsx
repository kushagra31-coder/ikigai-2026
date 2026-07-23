"use client";

import { Container } from "@/components/layout";
import { SPONSORS_CONFIG } from "@/config/sponsors.config";
import Image from "next/image";
import { motion } from "framer-motion";
import { ReactNode } from "react";

const TIER_1 = ["Powered By", "Organizing Departments"];
const TIER_2 = ["Academic Partners", "Technology Partners"];
const TIER_3 = ["Hiring Partners", "Community Partners"];
const CATEGORY_ORDER = [...TIER_1, ...TIER_2, ...TIER_3];

type Sponsor = (typeof SPONSORS_CONFIG)[0];

const OPTICAL_SIZING: Record<string, string> = {
  // Tier 1 (Powered By)
  "AITR": "h-[100px] md:h-[140px] max-w-[280px] md:max-w-[440px] w-auto",
  
  // Tier 2 (Academic & Tech)
  "CSIT": "h-[65px] md:h-[85px] max-w-[200px] md:max-w-[280px] w-auto",
  "CY": "h-[70px] md:h-[90px] max-w-[140px] md:max-w-[180px] w-auto",
  "AWaDH": "h-[70px] md:h-[90px] max-w-[140px] md:max-w-[180px] w-auto",
  "Clay": "h-[65px] md:h-[85px] max-w-[160px] md:max-w-[200px] w-auto",
  "SA": "h-[65px] md:h-[85px] max-w-[160px] md:max-w-[200px] w-auto",
  
  // Tier 2 (Hiring - Wide Text Logos)
  "TCS": "h-[55px] md:h-[70px] max-w-[180px] md:max-w-[240px] w-auto",
  "Unstop": "h-[55px] md:h-[70px] max-w-[180px] md:max-w-[240px] w-auto",

  // Tier 3 (Community)
  "IEEE TEMS": "h-[45px] md:h-[60px] max-w-[140px] md:max-w-[180px] w-auto",
  "IEEE SB": "h-[45px] md:h-[60px] max-w-[140px] md:max-w-[180px] w-auto"
};

const staggerContainer: any = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 }
  }
};

const fadeUpItem: any = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
  }
};

export default function SponsorsPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-[#FAFAFA] font-sans selection:bg-white/10 selection:text-white pb-32 overflow-hidden relative">
      
      {/* ─── STRUCTURAL PAGE BACKGROUND ─── */}
      <div className="fixed inset-0 pointer-events-none z-0 flex justify-center opacity-30">
        <div className="w-full max-w-[1400px] h-full flex justify-between px-6 lg:px-12">
          <div className="w-px h-full bg-white/[0.03]" />
          <div className="w-px h-full bg-white/[0.03] hidden md:block" />
          <div className="w-px h-full bg-white/[0.03] hidden lg:block" />
          <div className="w-px h-full bg-white/[0.03] hidden md:block" />
          <div className="w-px h-full bg-white/[0.03]" />
        </div>
      </div>

      <div className="pt-40 pb-32 relative z-10">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-4xl"
          >
            <div className="text-[11px] font-mono uppercase tracking-widest text-[#9A9A9A] mb-8 flex items-center gap-4">
              <span className="w-8 h-px bg-[#9A9A9A]/30" />
              Strategic Network
            </div>
            <h1 className="text-[clamp(3.5rem,8vw,7rem)] font-medium tracking-tighter leading-[0.95] mb-12">
              Our Trusted<br />Partners
            </h1>
            <p className="text-[18px] md:text-[24px] text-[#9A9A9A] font-light leading-[1.6] max-w-2xl">
              The organizations providing infrastructure, funding, and intellectual mentorship for the IKIGAI Challenge.
            </p>
          </motion.div>
        </Container>
      </div>

      <div className="flex flex-col gap-24">
        {CATEGORY_ORDER.map((category) => {
          const categorySponsors = SPONSORS_CONFIG.filter((s) => s.category === category);
          if (categorySponsors.length === 0) return null;

          return (
            <section key={category} className="w-full relative z-10">
              <Container>
                <div className="border border-white/[0.06] bg-[#0A0A0A] p-8 md:p-16 relative overflow-hidden group/section">
                  
                  {/* Corner accents */}
                  <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-white/30 transition-colors duration-500 group-hover/section:border-white/60 -translate-x-px -translate-y-px" />
                  <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-white/30 transition-colors duration-500 group-hover/section:border-white/60 translate-x-px -translate-y-px" />
                  <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-white/30 transition-colors duration-500 group-hover/section:border-white/60 -translate-x-px translate-y-px" />
                  <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-white/30 transition-colors duration-500 group-hover/section:border-white/60 translate-x-px translate-y-px" />
                  
                  {/* Subtle Tech Grid inside the block */}
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

                  <div className="mb-16 border-b border-white/[0.06] pb-6 relative z-10">
                    <h2 className="text-[14px] md:text-[16px] font-mono uppercase tracking-widest text-[#9A9A9A] flex items-center gap-4">
                      <span className="w-1.5 h-1.5 bg-white/20" />
                      {category}
                      <span className="flex-1 h-px bg-white/[0.02]" />
                    </h2>
                  </div>

                  <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="show"
                    className="relative z-10 flex flex-wrap justify-center gap-x-20 gap-y-16"
                  >
                  {categorySponsors.map((sponsor) => (
                    <motion.div key={sponsor.name} variants={fadeUpItem} className="h-full">
                      <a 
                        href={sponsor.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative flex flex-col items-center justify-center p-4 min-h-[160px] transition-all duration-300 hover:scale-105"
                      >
                        <div className="w-64 h-28 relative opacity-80 group-hover:opacity-100 transition-opacity mb-4">
                          <img
                            src={sponsor.logo}
                            alt={`${sponsor.name} logo`}
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <div className="text-center mt-2">
                          <h3 className="text-sm font-medium tracking-tight text-white mb-1">
                            {sponsor.name}
                          </h3>
                          {sponsor.description && (
                            <p className="text-xs text-[#9A9A9A] font-light leading-relaxed max-w-[240px]">
                              {sponsor.description}
                            </p>
                          )}
                        </div>
                      </a>
                    </motion.div>
                  ))}
                  </motion.div>
                </div>
              </Container>
            </section>
          );
        })}
      </div>

      <Container>
        <div className="pt-40 flex justify-between items-center text-[11px] font-mono uppercase tracking-widest text-[#9A9A9A] border-t border-white/[0.04] mt-32">
          <span>End of Roster</span>
          <span>IKIGAI 2026</span>
        </div>
      </Container>
    </div>
  );
}
