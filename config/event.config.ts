export const EVENT_CONFIG = {
  name: 'IKIGAI 2026',
  type: 'National-level Hackathon',
  organizers: 'Acropolis Institute of Technology and Research (AITR), Indore',
  venue: 'Acropolis Institute Campus, Indore',
  prizePool: '₹1,03,000',
  teamSize: {
    min: 2,
    max: 4,
    mandatoryCondition: 'Each team MUST include at least one female participant.'
  },
  timeline: {
    registrationDeadline: '2026-08-01T23:59:59Z',
    finalRoundStart: '2026-08-21T09:00:00Z',
    finalRoundEnd: '2026-08-23T21:00:00Z',
    hackathonDurationHours: 36,
  },
  tracks: [
    { id: 'T_AIML', name: 'Artificial Intelligence & Machine Learning', icon: 'cpu' },
    { id: 'T_CV', name: 'Computer Vision', icon: 'eye' },
    { id: 'T_AGRI', name: 'Agricultural Technology & Smart Farming', icon: 'leaf' },
    { id: 'T_SPORTS', name: 'Sports Analytics using AI & Machine Learning', icon: 'activity' },
    { id: 'T_WEB_MOBILE', name: 'Web & Mobile Applications', icon: 'smartphone' },
    { id: 'T_EMERGING', name: 'Emerging Technologies and Innovation', icon: 'zap' }
  ],
  sponsors: [
    "ACROPOLIS",
    "CSIT",
    "CY",
    "IEEE TEMS",
    "IEEE Student Branch",
    "AWaDH IIT Ropar",
    "CLAYGROUNDS",
    "SportsAlgo",
    "TCS",
    "unstop"
  ],
  judgingCriteria: [
    { id: 'C_INNOVATION', name: 'Innovation and Creativity', weight: 0.3 },
    { id: 'C_TECH_COMPLEXITY', name: 'Technical Complexity', weight: 0.3 },
    { id: 'C_IMPACT', name: 'Real-world Impact', weight: 0.2 },
    { id: 'C_PRESENTATION', name: 'Presentation & UI/UX', weight: 0.2 }
  ],
  eligibility: 'Open to undergraduate, postgraduate, and diploma students, as well as recent graduates from recognized institutions. Inter-college and inter-specialization teams are permitted.',
  description: 'Our vision is to foster innovation, collaboration, and rapid problem-solving among the brightest minds. We aim to provide a platform for students to tackle real-world problems using cutting-edge technology.',
  contacts: {
    email: 'TODO — Official Information Required',
    phone: 'TODO — Official Information Required'
  },
  faqs: [
    { question: 'What is the team size?', answer: '2-4 members, with at least one female participant.' },
    { question: 'What is the registration deadline?', answer: 'August 1, 2026.' }
  ]
};
