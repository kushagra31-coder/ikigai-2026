export const TIMELINE_CONFIG = [
  {
    id: "registrations-open",
    title: "Registrations Open",
    type: "registration",
    start: "2026-07-01T00:00:00+05:30",
    end: "2026-08-05T23:59:59+05:30",
    description: "Teams can start registering and forming groups.",
    attachments: [],
    notes: ["One female member mandatory", "Team size: 2–4 members"],
    status: "completed"
  },
  {
    id: "idea-submission",
    title: "Idea Submission",
    type: "submission",
    start: "2026-08-05T00:00:00+05:30",
    end: "2026-08-05T23:59:59+05:30",
    description: "Submit your innovative project idea for screening.",
    attachments: [
      { name: "PPT Template", url: "/downloads/ppt-template.pptx" },
      { name: "Problem Statement", url: "/downloads/problem-statement.pdf" }
    ],
    notes: [
      "Maximum 12 Slides",
      "Submit as PPT or PDF",
      "One female member mandatory"
    ],
    status: "upcoming"
  },
  {
    id: "screening-results",
    title: "Screening Results",
    type: "evaluation",
    start: "2026-08-10T00:00:00+05:30",
    end: "2026-08-10T23:59:59+05:30",
    description: "Selected teams move to the final offline round.",
    attachments: [],
    notes: [
      "Shortlisted teams notified via email",
      "Judge's decision is final"
    ],
    status: "upcoming"
  },
  {
    id: "opening-ceremony",
    title: "Opening Ceremony",
    type: "event",
    start: "2026-08-21T09:00:00+05:30",
    end: "2026-08-21T11:00:00+05:30",
    description: "Keynotes, networking and official hackathon kickoff.",
    attachments: [],
    notes: ["Report by 8:30 AM", "Attendance mandatory"],
    status: "upcoming"
  },
  {
    id: "grand-finale",
    title: "36 Hours of Hacking",
    type: "event",
    start: "2026-08-21T11:00:00+05:30",
    end: "2026-08-22T23:00:00+05:30",
    description: "Build, innovate and collaborate with mentors at the Acropolis campus.",
    attachments: [],
    notes: [
      "Food and accommodation provided",
      "Mentors available round the clock",
      "Bring your own hardware"
    ],
    status: "upcoming"
  },
  {
    id: "final-presentations",
    title: "Final Presentations",
    type: "presentation",
    start: "2026-08-23T09:00:00+05:30",
    end: "2026-08-23T15:00:00+05:30",
    description: "Teams showcase solutions before judges.",
    attachments: [],
    notes: [
      "Each team gets 10 minutes to present",
      "Demo must be live"
    ],
    status: "upcoming"
  },
  {
    id: "winners-ceremony",
    title: "Winners & Closing Ceremony",
    type: "ceremony",
    start: "2026-08-23T16:00:00+05:30",
    end: "2026-08-23T20:00:00+05:30",
    description: "Prize distribution, networking and event wrap-up.",
    attachments: [],
    notes: ["All teams must be present", "Certificates distributed"],
    status: "upcoming"
  }
];
