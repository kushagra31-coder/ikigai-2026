import { EVENT_CONFIG } from '@/config/event.config';
import { Icons } from './icons';

export const PUBLIC_CONTENT = {
  hero: {
    eventTitle: EVENT_CONFIG.name,
    tagline: EVENT_CONFIG.type,
    description: EVENT_CONFIG.description,
    primaryCta: "Register Now",
    secondaryCta: "Learn More",
    countdownDate: EVENT_CONFIG.timeline.finalRoundStart
  },
  about: {
    title: `What is ${EVENT_CONFIG.name}?`,
    vision: EVENT_CONFIG.description,
    objectives: "We aim to provide a platform for students to tackle real-world problems using cutting-edge technology.",
    organizer: `Organized by ${EVENT_CONFIG.organizers}.`,
    duration: `${EVENT_CONFIG.timeline.hackathonDurationHours} Hours of Non-stop Coding`,
    venue: EVENT_CONFIG.venue
  },
  statistics: {
    tracks: EVENT_CONFIG.tracks.length,
    mentors: 20, // Remains mocked per rules
    prizePool: EVENT_CONFIG.prizePool,
    participants: 300, // Remains mocked per rules
    hours: EVENT_CONFIG.timeline.hackathonDurationHours
  },
  tracks: EVENT_CONFIG.tracks.map(t => ({
    id: t.id,
    title: t.name,
    description: `Compete in the ${t.name} track.`,
    icon: t.icon as keyof typeof Icons
  })),
  timeline: [
    {
      id: "reg-deadline",
      title: "Registration Deadline",
      date: new Date(EVENT_CONFIG.timeline.registrationDeadline).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      status: "upcoming"
    },
    {
      id: "event-starts",
      title: "Hackathon Begins",
      date: new Date(EVENT_CONFIG.timeline.finalRoundStart).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      status: "upcoming"
    }
  ],
  sponsors: EVENT_CONFIG.sponsors.map((name, idx) => ({
    id: `sponsor-${idx}`,
    name,
    logo: "/placeholder-sponsor.svg",
    website: "#",
    tier: "Partner"
  })),
  faq: EVENT_CONFIG.faqs.map((f, i) => ({
    id: `faq-${i}`,
    question: f.question,
    answer: f.answer
  })),
  contact: {
    email: EVENT_CONFIG.contacts.email,
    phone: EVENT_CONFIG.contacts.phone,
    facultyCoords: "TBD",
    studentCoords: "TBD",
    socialLinks: {
      instagram: "#",
      linkedin: "#",
      github: "#"
    }
  },
  footer: {
    copyright: `© 2026 ${EVENT_CONFIG.name}. Made with ❤️`,
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" }
    ]
  }
};
