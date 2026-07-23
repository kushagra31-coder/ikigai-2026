"use client";

import { Container } from "@/components/layout";
import {
  LEADERSHIP_CONFIG,
  type LeadershipMember,
} from "@/config/leadership.config";
import Image from "next/image";
import { Users, Building2, GraduationCap, Check, X, ArrowUpRight } from "lucide-react";
import { Icons } from "@/components/constants/icons";
import { useState, useEffect } from "react";
import smartcrop from "smartcrop";
import { AnimatePresence, motion } from "framer-motion";
import { SmartCropImage } from "@/components/ui/smart-crop-image";


export default function LeadershipPage() {
  const convenors = LEADERSHIP_CONFIG.filter((m) => m.category === "Convenors");
  const facultyCoords = LEADERSHIP_CONFIG.filter(
    (m) => m.category === "Faculty Coordinators"
  );
  const studentCommittee = LEADERSHIP_CONFIG.filter(
    (m) => m.category === "Student Committee"
  );

  return (
    <div className="min-h-screen bg-background text-foreground pb-32">
      {/* Hero Section */}
      <div className="bg-foreground text-background py-24 mb-16 relative overflow-hidden">
        <Container>
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-12 relative z-10 pt-10">
            <div className="max-w-2xl">
              <h2 className="text-muted-foreground font-medium tracking-widest uppercase mb-4 text-sm">
                Leadership
              </h2>
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-2">
                The minds behind
              </h1>
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-cyan-500 mb-6">
                IKIGAI.
              </h1>
              <p className="text-lg md:text-xl text-background/70 font-light leading-relaxed max-w-xl">
                A diverse team of academicians, industry experts, and student
                leaders united by a shared vision to drive innovation and create
                impact.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-8 lg:gap-16 pb-2">
              <div className="text-center">
                <div className="flex justify-center mb-3">
                  <GraduationCap className="w-8 h-8 text-cyan-500" strokeWidth={1.5} />
                </div>
                <div className="text-4xl font-bold">5</div>
                <div className="text-xs text-background/50 uppercase tracking-wider mt-2 font-semibold">Faculty</div>
              </div>
              <div className="text-center">
                <div className="flex justify-center mb-3">
                  <Users className="w-8 h-8 text-cyan-500" strokeWidth={1.5} />
                </div>
                <div className="text-4xl font-bold">19</div>
                <div className="text-xs text-background/50 uppercase tracking-wider mt-2 font-semibold">Student Committee</div>
              </div>
              <div className="text-center">
                <div className="flex justify-center mb-3">
                  <Building2 className="w-8 h-8 text-cyan-500" strokeWidth={1.5} />
                </div>
                <div className="text-4xl font-bold">1</div>
                <div className="text-xs text-background/50 uppercase tracking-wider mt-2 font-semibold">CSIT Department</div>
              </div>
            </div>
          </div>
        </Container>
      </div>

      <Container>
        <div className="flex flex-col gap-24">
          
          {/* CONVENOR */}
          {convenors.length > 0 && (
            <section>
              <div className="flex justify-between items-end border-b border-border/50 pb-4 mb-10">
                <h3 className="text-xl font-medium tracking-wide uppercase text-muted-foreground border-l-4 border-cyan-500 pl-4">
                  CONVENOR
                </h3>
                <span className="text-sm text-muted-foreground/60 hidden sm:inline-block">Leading IKIGAI 2026</span>
              </div>
              
              <div className="grid grid-cols-1 gap-8">
                {convenors.map((member, idx) => (
                  <ConvenorCard key={idx} member={member} />
                ))}
              </div>
            </section>
          )}

          {/* FACULTY LEADERSHIP */}
          {facultyCoords.length > 0 && (
            <section>
              <div className="flex justify-between items-end border-b border-border/50 pb-4 mb-10">
                <h3 className="text-xl font-medium tracking-wide uppercase text-muted-foreground border-l-4 border-cyan-500 pl-4">
                  FACULTY LEADERSHIP
                </h3>
                <span className="text-sm text-muted-foreground/60 hidden sm:inline-block">The academic backbone of IKIGAI</span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {facultyCoords.map((member, idx) => (
                  <FacultyCard key={idx} member={member} />
                ))}
              </div>
            </section>
          )}

          {/* STUDENT EXECUTIVE COMMITTEE */}
          {studentCommittee.length > 0 && (() => {
            const teams = [
              { title: "Web Development", keyword: "website" },
              { title: "Sponsorship Team", keyword: "sponsorship" },
              { title: "Design & Creative", keyword: "designing" },
              { title: "Promotion & Outreach", keyword: "promotion" },
              { title: "Video Production", keyword: "video editing" },
            ];

            const matchedIds = new Set<string>();
            const groupedMembers = teams.map(team => {
              const members = studentCommittee.filter(m => {
                if (matchedIds.has(m.name)) return false;
                if (m.responsibility?.toLowerCase().includes(team.keyword)) {
                  matchedIds.add(m.name);
                  return true;
                }
                return false;
              });
              return { title: team.title, members };
            }).filter(g => g.members.length > 0);
            
            const unassigned = studentCommittee.filter(m => !matchedIds.has(m.name));
            if (unassigned.length > 0) {
              groupedMembers.push({ title: "Core Members", members: unassigned });
            }

            return (
              <section className="flex flex-col gap-16 mt-8">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end border-b border-border/50 pb-4 gap-4">
                  <h3 className="text-xl font-medium tracking-wide uppercase text-muted-foreground border-l-4 border-cyan-500 pl-4">
                    STUDENT EXECUTIVE COMMITTEE
                  </h3>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-muted-foreground/60 hidden sm:inline-block">Future leaders. Today.</span>
                  </div>
                </div>
                
                <div className="flex flex-col">
                  {groupedMembers.map((group, groupIdx) => (
                    <div key={groupIdx} className={`flex flex-col gap-10 pb-16 ${groupIdx > 0 ? 'border-t border-border/50 pt-16' : ''}`}>
                      <h4 className="text-2xl font-light text-foreground">{group.title}</h4>
                      <div className="flex flex-wrap gap-x-16 gap-y-12">
                        {group.members.map((member, idx) => (
                          <StudentCard key={idx} member={member} />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            );
          })()}

        </div>
      </Container>
    </div>
  );
}

function ConvenorCard({ member }: { member: LeadershipMember }) {
  const initials = member.name.substring(0, 2).toUpperCase();

  return (
    <div className="bg-card rounded-3xl shadow-sm border border-border/50 overflow-hidden flex flex-col md:flex-row hover:border-border transition-colors duration-300">
      <div className="w-full md:w-[320px] lg:w-[400px] aspect-[4/3] md:aspect-auto relative shrink-0 bg-muted/30">
        {member.photo ? (
          <SmartCropImage
            src={member.photo}
            alt={member.name}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-5xl font-semibold text-muted-foreground/30">
              {initials}
            </span>
          </div>
        )}
      </div>

      <div className="p-8 md:p-12 flex flex-col lg:flex-row gap-8 lg:gap-12 flex-1">
        <div className="flex-1 flex flex-col justify-center">
          <h4 className="text-3xl lg:text-4xl font-semibold tracking-tight mb-3 text-foreground">{member.name}</h4>
          <p className="text-foreground text-lg font-medium mb-2">
            {member.designation}
          </p>
          <p className="text-muted-foreground text-sm lg:text-base mb-8">{member.department}</p>
          <p className="text-muted-foreground text-sm lg:text-base leading-relaxed font-light">
            {member.bio}
          </p>
        </div>

        <div className="lg:w-[350px] shrink-0 border-t lg:border-t-0 lg:border-l border-border/50 pt-8 lg:pt-0 lg:pl-10 relative flex flex-col justify-center">
          {(member.email || member.linkedin) && (
            <div className="absolute top-0 right-0 lg:-mt-2 hidden md:block">
              <a
                href={member.linkedin ? member.linkedin : `mailto:${member.email}`}
                target="_blank"
                rel="noreferrer"
                className="w-11 h-11 rounded-xl border border-border/50 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground/30 hover:bg-foreground/5 transition-all"
              >
                {member.linkedin ? <Icons.linkedin className="w-5 h-5" /> : <Icons.mail className="w-5 h-5" />}
              </a>
            </div>
          )}
          
          <h5 className="text-xs font-mono tracking-widest text-muted-foreground/80 uppercase mb-6 mt-2 lg:mt-0">
            Key Responsibilities
          </h5>
          <ul className="flex flex-col gap-4">
            {member.achievements && member.achievements.length > 0 ? (
              member.achievements.map((ach, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-foreground/80">
                  <Check className="w-4 h-4 text-cyan-500 shrink-0 mt-0.5" />
                  <span className="leading-snug">{ach}</span>
                </li>
              ))
            ) : (
              // Fallbacks if no achievements are set
              <>
                <li className="flex items-start gap-3 text-sm text-foreground/80">
                  <Check className="w-4 h-4 text-cyan-500 shrink-0 mt-0.5" />
                  <span className="leading-snug">Overall event strategy and execution</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-foreground/80">
                  <Check className="w-4 h-4 text-cyan-500 shrink-0 mt-0.5" />
                  <span className="leading-snug">Industry & academic collaborations</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-foreground/80">
                  <Check className="w-4 h-4 text-cyan-500 shrink-0 mt-0.5" />
                  <span className="leading-snug">Innovation and research initiatives</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-foreground/80">
                  <Check className="w-4 h-4 text-cyan-500 shrink-0 mt-0.5" />
                  <span className="leading-snug">Student mentorship and guidance</span>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

function FacultyCard({ member }: { member: LeadershipMember }) {
  const [isOpen, setIsOpen] = useState(false);
  const initials = member.name.substring(0, 2).toUpperCase();

  // Prevent scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <>
      <div 
        onClick={() => setIsOpen(true)}
        className="bg-card/50 backdrop-blur-sm rounded-3xl shadow-sm border border-border/50 p-6 flex gap-6 items-center group hover:border-foreground/30 hover:bg-foreground/5 cursor-pointer transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-foreground/5"
      >
        <div className="w-28 h-28 rounded-2xl overflow-hidden relative shrink-0 bg-muted/30 border border-white/10 shadow-inner">
          {member.photo ? (
            <SmartCropImage
              src={member.photo}
              alt={member.name}
              className="group-hover:scale-110 transition-transform duration-700 ease-out"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-3xl font-semibold text-muted-foreground/30">
                {initials}
              </span>
            </div>
          )}
          {/* Subtle overlay gradient on card image */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        </div>

        <div className="flex flex-col flex-1 h-full py-1">
          <h4 className="text-xl font-bold tracking-tight mb-1 text-foreground leading-tight group-hover:text-cyan-500 transition-colors">
            {member.name}
          </h4>
          <p className="text-cyan-500 text-sm font-semibold tracking-wide mb-1.5 line-clamp-1 uppercase">
            {member.designation}
          </p>
          <p className="text-muted-foreground text-xs font-medium mb-4 line-clamp-1">{member.department}</p>
          
          <div className="mt-auto">
            <span className="text-[11px] font-bold text-muted-foreground/80 group-hover:text-cyan-500 transition-colors flex items-center gap-2 uppercase tracking-[0.2em]">
              View Profile 
              <span className="w-4 h-px bg-current group-hover:w-8 transition-all duration-500" />
            </span>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <motion.div 
              initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
              animate={{ opacity: 1, backdropFilter: "blur(8px)" }}
              exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0 bg-black/40 dark:bg-black/60"
              onClick={() => setIsOpen(false)}
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-card/90 dark:bg-[#111]/90 backdrop-blur-2xl border border-white/20 dark:border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.2)] rounded-[2rem] w-full max-w-3xl relative z-10 overflow-hidden flex flex-col sm:flex-row"
            >
              {/* Subtle gradient glowing effect behind modal */}
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-cyan-500/10 to-transparent pointer-events-none" />

              <button 
                onClick={() => setIsOpen(false)}
                className="absolute top-5 right-5 z-20 w-10 h-10 flex items-center justify-center bg-black/5 hover:bg-black/10 dark:bg-white/5 dark:hover:bg-white/10 backdrop-blur-md rounded-full text-foreground/50 hover:text-foreground transition-all duration-300 hover:rotate-90"
              >
                <X className="w-5 h-5" />
              </button>
              
              <div className="w-full sm:w-2/5 aspect-[4/5] sm:aspect-auto relative bg-muted/30 shrink-0 border-r border-border/50">
                {member.photo ? (
                  <>
                    <SmartCropImage
                      src={member.photo}
                      alt={member.name}
                    />
                    {/* Inner shadow/gradient for image blend */}
                    <div className="absolute inset-0 shadow-[inset_-20px_0_40px_rgba(0,0,0,0.05)] dark:shadow-[inset_-20px_0_40px_rgba(0,0,0,0.3)] pointer-events-none" />
                  </>
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-muted/50 to-muted">
                    <span className="text-6xl font-bold text-muted-foreground/20">
                      {initials}
                    </span>
                  </div>
                )}
              </div>
              
              <div className="p-8 sm:p-12 flex-1 flex flex-col justify-center relative">
                <h3 className="text-3xl font-extrabold tracking-tight mb-2 text-foreground bg-clip-text text-transparent bg-gradient-to-br from-foreground to-foreground/70">
                  {member.name}
                </h3>
                <p className="text-cyan-500 font-bold uppercase tracking-widest text-xs mb-2">{member.designation}</p>
                <p className="text-muted-foreground text-sm font-medium mb-8 flex items-center gap-2">
                  <Building2 className="w-4 h-4 opacity-50" />
                  {member.department}
                </p>
                
                {member.bio && (
                  <p className="text-foreground/70 text-[15px] leading-relaxed mb-10 font-light">
                    {member.bio}
                  </p>
                )}
                
                <div className="mt-auto pt-4 flex gap-4 relative z-10">
                  {member.linkedin ? (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center h-12 px-8 rounded-full bg-foreground text-background font-semibold hover:opacity-90 transition-all duration-300 gap-3 shadow-lg shadow-foreground/10 hover:shadow-foreground/20 hover:-translate-y-0.5"
                    >
                      <Icons.linkedin className="w-5 h-5 text-background" />
                      <span>LinkedIn Profile</span>
                    </a>
                  ) : member.email ? (
                    <a
                      href={`mailto:${member.email}`}
                      className="inline-flex items-center justify-center h-12 px-8 rounded-full bg-foreground text-background font-semibold hover:opacity-90 transition-all duration-300 gap-3 shadow-lg shadow-foreground/10 hover:shadow-foreground/20 hover:-translate-y-0.5"
                    >
                      <Icons.mail className="w-5 h-5 text-background" />
                      <span>Email Profile</span>
                    </a>
                  ) : null}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

function StudentCard({ member }: { member: LeadershipMember }) {
  const initials = member.name.substring(0, 2).toUpperCase();

  return (
    <div className="flex flex-col gap-4 group relative w-[180px]">
      <div className="w-20 h-20 rounded-full overflow-hidden relative shrink-0 bg-muted/30">
        {member.photo ? (
          <SmartCropImage
            src={member.photo}
            alt={member.name}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xl font-semibold text-muted-foreground/40">
              {initials}
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-col">
        <div className="flex items-center gap-2 mb-1">
          <h4 className="font-light text-[17px] tracking-tight text-foreground group-hover:opacity-80 transition-opacity">
            {member.name}
          </h4>
          <ArrowUpRight strokeWidth={1} className="w-5 h-5 text-foreground opacity-60 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </div>
        <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-mono leading-relaxed">
          {member.designation}
        </p>
      </div>
      
      {member.linkedin && (
        <a 
          href={member.linkedin} 
          target="_blank" 
          rel="noreferrer"
          className="absolute inset-0 z-10"
          aria-label={`LinkedIn for ${member.name}`}
        >
          <span className="sr-only">LinkedIn Profile</span>
        </a>
      )}
    </div>
  );
}
