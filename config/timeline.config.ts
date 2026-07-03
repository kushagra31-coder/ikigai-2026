export const TIMELINE_CONFIG = [
  {
    id: "round1",
    title: "Round 1: Online Idea Submission",
    type: "submission",
    start: "2026-06-30T00:00:00Z",
    end: "2026-07-25T23:59:59Z",
    description: "Submit your initial ideas and project proposals online.",
    attachments: [
      { name: "PPT Template", url: "/downloads/ppt-template.pptx" },
      { name: "Problem Statement", url: "/downloads/problem-statement.pdf" }
    ],
    notes: [
      "Maximum 12 Slides",
      "One PPT/PDF",
      "One female member mandatory"
    ],
    status: "completed" // compute dynamically later or leave static
  },
  {
    id: "screening",
    title: "Screening & Shortlisting",
    type: "evaluation",
    start: "2026-06-30T00:00:00Z",
    end: "2026-08-05T23:59:59Z",
    description: "Evaluation of ideas, shortlisting of teams, and notification.",
    attachments: [],
    notes: [
      "Judges decision is final",
      "Shortlisted teams will be notified via email"
    ],
    status: "upcoming"
  },
  {
    id: "grand-finale",
    title: "Grand Finale: 36 Hours Offline Hackathon",
    type: "event",
    start: "2026-08-21T09:00:00Z",
    end: "2026-08-23T21:00:00Z",
    description: "The ultimate 36-hour offline hackathon experience at the Acropolis campus.",
    attachments: [
      { name: "Schedule", url: "/images/posters/schedule.jpg" }
    ],
    notes: [
      "Bring your own hardware",
      "Food and accommodation provided"
    ],
    status: "upcoming"
  }
];
