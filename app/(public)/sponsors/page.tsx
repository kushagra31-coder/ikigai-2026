"use client";

import { Container } from "@/components/layout";
import { SPONSORS_CONFIG } from "@/config/sponsors.config";
import Image from "next/image";
import { motion } from "framer-motion";
import { ReactNode } from "react";

const TIER_1 = ["Powered By"];
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
    <div className="min-h-screen bg-[#050505] text-[#FAFAFA] font-sans selection:bg-white/10 selection:text-white pb-32 overflow-hidden">
      <div className="pt-40 pb-32">
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

      <div className="flex flex-col gap-32">
        {CATEGORY_ORDER.map((category) => {
          const categorySponsors = SPONSORS_CONFIG.filter((s) => s.category === category);
          if (categorySponsors.length === 0) return null;

          const isTier1 = TIER_1.includes(category);
          const isTier2 = TIER_2.includes(category);

          return (
            <section key={category} className="w-full">
              <Container>
                <div className="mb-12 border-b border-white/[0.04] pb-6">
                  <h2 className="text-[14px] md:text-[16px] font-mono uppercase tracking-widest text-[#9A9A9A] flex items-center gap-4">
                    {category}
                    <span className="flex-1 h-px bg-white/[0.02]" />
                  </h2>
                </div>

                <motion.div
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: "-100px" }}
                  className={`group/sponsors ${
                    isTier1
                      ? "flex flex-col gap-6"
                      : isTier2
                      ? "grid grid-cols-1 md:grid-cols-2 gap-6"
                      : "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
                  }`}
                >
                  {categorySponsors.map((sponsor) => (
                    <motion.div key={sponsor.name} variants={fadeUpItem} className="h-full">
                      {isTier1 ? (
                        <Tier1EditorialSponsor sponsor={sponsor} />
                      ) : isTier2 ? (
                        <Tier2StructuredSponsor sponsor={sponsor} />
                      ) : (
                        <Tier3WallSponsor sponsor={sponsor} />
                      )}
                    </motion.div>
                  ))}
                </motion.div>
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

// ─── UTILS & WRAPPERS ──────────────────────────────────────────────────────────

function SponsorWrapper({ children, className, href }: { children: ReactNode; className: string; href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`group relative block w-full overflow-hidden transition-all duration-[350ms] ease-out hover:-translate-y-[2px] ${className}`}
    >
      <div className="relative z-10 w-full h-full flex flex-col justify-between">
        {children}
      </div>
    </a>
  );
}

// Removed getLogoClasses in favor of standard img tags

// ─── TIER 1: POWERED BY (Side-by-Side Composition) ─────────────────────────

function Tier1EditorialSponsor({ sponsor }: { sponsor: Sponsor }) {
  const opticalSize = OPTICAL_SIZING[sponsor.shortName || ""] || "h-[80px] max-w-[300px] w-auto";

  return (
    <SponsorWrapper
      href={sponsor.website}
      className="bg-[#050505] border border-white/[0.08] hover:border-white/[0.2] hover:bg-[#0A0A0A] shadow-2xl rounded-[2rem] p-2 md:p-3"
    >
      <div className="flex flex-col lg:flex-row gap-6 h-full">
        {/* Left: Hugging White Canvas */}
        <div className="self-start bg-white rounded-[1.5rem] py-6 px-8 flex items-center justify-center mt-4 ml-4">
          <img
            src={sponsor.logo}
            alt={`${sponsor.name} logo`}
            className={`${opticalSize} object-contain transition-all duration-[350ms] scale-100 group-hover:scale-[1.02]`}
          />
        </div>

        {/* Right: Dark Text Area */}
        <div className="flex-1 flex flex-col justify-center text-left py-8 px-6 lg:px-12">
          <h3 className="text-[28px] md:text-[36px] font-medium tracking-tight text-white leading-tight mb-4">
            {sponsor.name}
          </h3>
          {sponsor.description && (
            <p className="text-[16px] md:text-[18px] text-[#9A9A9A] font-light leading-relaxed max-w-[400px]">
              {sponsor.description}
            </p>
          )}
          <span className="text-[12px] font-mono uppercase tracking-widest text-white flex items-center gap-3 mt-8">
            Explore Partnership
            <span className="block w-6 h-px bg-white/20 group-hover:bg-white transition-colors duration-[350ms]" />
          </span>
        </div>
      </div>
    </SponsorWrapper>
  );
}

// ─── TIER 2: ACADEMIC & TECH (Structured Editorial Card) ───────────────────

function Tier2StructuredSponsor({ sponsor }: { sponsor: Sponsor }) {
  const opticalSize = OPTICAL_SIZING[sponsor.shortName || ""] || "h-[50px] max-w-[200px] w-auto";

  return (
    <SponsorWrapper
      href={sponsor.website}
      className="h-full bg-[#050505] border border-white/[0.08] hover:border-white/[0.2] hover:bg-[#0A0A0A] shadow-xl rounded-2xl p-2 md:p-3 flex flex-col"
    >
      {/* Top: Hugging White Canvas */}
      <div className="self-start bg-white rounded-xl py-4 px-6 md:px-8 flex justify-center items-center mb-5">
        <img
          src={sponsor.logo}
          alt={`${sponsor.name} logo`}
          className={`${opticalSize} object-contain transition-all duration-[350ms] scale-100 group-hover:scale-[1.02]`}
        />
      </div>

      {/* Middle/Bottom: Typography */}
      <div className="flex flex-col w-full flex-1 px-6 md:px-8 pb-6 md:pb-8 text-left">
        <h3 className="text-[20px] font-semibold tracking-tight text-white mb-2">
          {sponsor.name}
        </h3>
        {sponsor.description && (
          <p className="text-[14px] text-[#9A9A9A] font-normal leading-relaxed mb-6 flex-1">
            {sponsor.description}
          </p>
        )}
        <span className="text-[11px] font-bold uppercase tracking-widest text-white flex items-center gap-2 mt-auto">
          Explore
          <span className="block w-4 h-px bg-white/20 group-hover:bg-white transition-colors duration-[350ms]" />
        </span>
      </div>
    </SponsorWrapper>
  );
}

// ─── TIER 3: COMMUNITY & HIRING (Minimal Logo Wall) ────────────────────────

function Tier3WallSponsor({ sponsor }: { sponsor: Sponsor }) {
  const opticalSize = OPTICAL_SIZING[sponsor.shortName || ""] || "h-[40px] max-w-[150px] w-auto";

  return (
    <SponsorWrapper
      href={sponsor.website}
      className="h-full bg-[#050505] border border-white/[0.04] hover:border-white/[0.15] hover:bg-[#0A0A0A] rounded-xl p-2 flex flex-col min-h-[220px]"
    >
      <div className="self-start bg-white rounded-lg py-3 px-4 flex justify-center items-center mb-4">
        <img
          src={sponsor.logo}
          alt={`${sponsor.name} logo`}
          className={`${opticalSize} object-contain transition-all duration-[350ms] scale-100 group-hover:scale-[1.02]`}
        />
      </div>
      
      <div className="flex flex-col w-full px-4 pb-4 text-left">
        <h3 className="text-[16px] font-semibold tracking-tight text-white mb-1">
          {sponsor.name}
        </h3>
        {sponsor.description && (
          <p className="text-[13px] text-[#9A9A9A] font-normal leading-relaxed">
            {sponsor.description}
          </p>
        )}
      </div>
    </SponsorWrapper>
  );
}
