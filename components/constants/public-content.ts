import IKIGAI2026_CONFIG from '@/config/event.config';
import { Icons } from './icons';

export const PUBLIC_CONTENT = {
  hero: {
    eventTitle: IKIGAI2026_CONFIG.branding.eventName,
    tagline: IKIGAI2026_CONFIG.branding.tagline,
    description: IKIGAI2026_CONFIG.branding.slogan,
    primaryCta: "Register Now",
    secondaryCta: "Learn More",
    countdownDate: IKIGAI2026_CONFIG.timeline.find(t => t.id === 'grand-finale')?.start || new Date().toISOString()
  },
  about: {
    title: `What is ${IKIGAI2026_CONFIG.branding.eventName}?`,
    vision: IKIGAI2026_CONFIG.branding.mission,
    objectives: "We aim to provide a platform for students to tackle real-world problems using cutting-edge technology.",
    organizer: `Organized by ${IKIGAI2026_CONFIG.branding.organizer.institute}.`,
    duration: `${IKIGAI2026_CONFIG.statistics.hours} Hours of Non-stop Coding`,
    venue: IKIGAI2026_CONFIG.branding.organizer.location
  },
  statistics: {
    tracks: IKIGAI2026_CONFIG.statistics.tracks,
    mentors: IKIGAI2026_CONFIG.statistics.mentorCount,
    prizePool: IKIGAI2026_CONFIG.statistics.prizePool,
    participants: IKIGAI2026_CONFIG.statistics.expectedParticipants,
    hours: IKIGAI2026_CONFIG.statistics.hours
  },
  tracks: IKIGAI2026_CONFIG.tracks.map(t => ({
    id: t.id,
    title: t.title,
    description: t.description,
    icon: (t.icon as keyof typeof Icons) || "code"
  })),
  timeline: IKIGAI2026_CONFIG.timeline.map(t => ({
    id: t.id,
    title: t.title,
    date: new Date(t.start).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
    status: t.status
  })),
  sponsors: IKIGAI2026_CONFIG.sponsors.map((s, idx) => ({
    id: `sponsor-${idx}`,
    name: s.name,
    logo: s.logo,
    website: s.website,
    tier: s.category
  })),
  faq: IKIGAI2026_CONFIG.branding.faqs.map((f, i) => ({
    id: `faq-${i}`,
    question: f.question,
    answer: f.answer
  })),
  contact: {
    email: IKIGAI2026_CONFIG.contacts.generalSupport.email,
    phone: IKIGAI2026_CONFIG.contacts.generalSupport.phone || "TBD",
    facultyCoords: IKIGAI2026_CONFIG.leadership.filter(l => l.designation.includes("Faculty")).map(l => l.name),
    studentCoords: IKIGAI2026_CONFIG.leadership.filter(l => l.designation.includes("Student")).map(l => l.name),
    socialLinks: {
      instagram: IKIGAI2026_CONFIG.social.instagram,
      linkedin: "#", // Add if available
      github: "#", // Add if available
      website: IKIGAI2026_CONFIG.social.website
    }
  },
  footer: {
    copyright: `© 2026 ${IKIGAI2026_CONFIG.branding.eventName}. All systems operational.`,
    links: [
      { label: "Rulebook", href: "/rulebook" },
      { label: "Contact Operations", href: "/contact" }
    ]
  }
};
