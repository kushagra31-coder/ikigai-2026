/**
 * config/leadership.config.ts
 *
 * Centralized data source for all leadership & committee members.
 * Update this file to change any person's info — never hardcode in UI components.
 *
 * Schema per member:
 *   name          — Full display name
 *   designation   — Title / role label
 *   department    — Dept or team name
 *   category      — Groups: "Convenors" | "Faculty Coordinators" | "Director" |
 *                   "Chief Patron" | "Patrons" | "Student Committee"
 *   photo         — Path relative to /public (null = show initial avatar)
 *   email         — Optional contact email (null if not provided)
 *   linkedin      — Full LinkedIn URL (null if not provided)
 *   bio           — Short biography / description shown in expanded profile
 *   skills        — Array of tag strings (responsibilities / expertise)
 *   responsibility — (Student Committee only) Maps to responsibility section grouping
 *   achievements  — Optional notable achievements array
 */

export type LeadershipMember = {
  name: string;
  designation: string;
  department: string;
  category: string;
  photo: string | null;
  email: string | null;
  linkedin: string | null;
  bio: string;
  skills: string[];
  responsibility?: string;
  achievements?: string[];
};

export const LEADERSHIP_CONFIG: LeadershipMember[] = [
  // ── CONVENORS ────────────────────────────────────────────────────────────────
  {
    name: "Dr. Shilpa Bhalerao",
    designation: "Convenor",
    department: "HOD, CSIT",
    category: "Convenors",
    photo: "/images/leadership/shilpa-bhalerao.jpg",
    email: "shilpabhalerao@acropolis.in",
    linkedin: "https://www.linkedin.com/in/dr-shilpa-bhalerao-a08b978/",
    bio: "Dr. Shilpa Bhalerao serves as the Head of the Department of Computer Science and Information Technology at Acropolis Institute of Technology and Research. With over two decades of academic and research experience, she leads the IKIGAI 2026 initiative to foster innovation and technology leadership among students.",
    skills: ["Academic Leadership", "AI Research", "Event Management", "Curriculum Design"],
    achievements: ["HOD, CSIT — Acropolis Institute", "Convenor — IKIGAI 2026"]
  },

  // ── FACULTY COORDINATORS ─────────────────────────────────────────────────────
  {
    name: "Dr. Vandana Kate",
    designation: "Faculty Coordinator",
    department: "CSIT Department",
    category: "Faculty Coordinators",
    photo: "/images/leadership/vandana-kate.jpg",
    email: null,
    linkedin: "https://www.linkedin.com/in/vandana-kate/",
    bio: "Dr. Vandana Kate is a faculty member in the CSIT Department with deep expertise in machine learning, data science, and smart systems. She plays a key coordination role in managing IKIGAI 2026's judging process and track evaluation framework.",
    skills: ["Machine Learning", "Data Science", "Evaluation Design", "Mentoring"],
    achievements: ["Faculty Coordinator — IKIGAI 2026"]
  },
  {
    name: "Prof. Chanchal Bansal",
    designation: "Faculty Coordinator",
    department: "CSIT Department",
    category: "Faculty Coordinators",
    photo: "/images/leadership/chanchal-bansal.jpg",
    email: null,
    linkedin: "https://www.linkedin.com/in/chanchal-bansal-4211bb6a/",
    bio: "Prof. Chanchal Bansal brings extensive experience in software engineering and project-based learning to IKIGAI 2026. She oversees operational coordination and ensures participant welfare throughout the hackathon.",
    skills: ["Software Engineering", "Project Management", "Operations", "Research"],
    achievements: ["Faculty Coordinator — IKIGAI 2026"]
  },
  {
    name: "Prof. Nidhi Nigam",
    designation: "Faculty Coordinator",
    department: "CSIT Department",
    category: "Faculty Coordinators",
    photo: "/images/leadership/nidhi-nigam.jpg",
    email: null,
    linkedin: "https://www.linkedin.com/in/nidhi-nigam-572a01165/",
    bio: "Prof. Nidhi Nigam specializes in algorithms, competitive programming, and emerging computing paradigms. She coordinates track-level mentorship and technical evaluation standards for IKIGAI 2026.",
    skills: ["Algorithms", "Competitive Programming", "Technical Evaluation", "Mentoring"],
    achievements: ["Faculty Coordinator — IKIGAI 2026"]
  },

  
  // ── STUDENT COMMITTEE ─────────────────────────────────────────────────────────
  {
    name: "Kushagra Singh Tomar",
    designation: "Lead Developer",
    department: "CSIT — 3rd Year",
    category: "Student Committee",
    photo: "/images/students/kushagra .jpeg",
    email: "kushagra@ikigai.com",
    linkedin: "https://www.linkedin.com/in/kushagra-singh-tomar-94ba55277/",
    bio: "Kushagra is the architect behind the IKIGAI 2026 competition platform. He designed and built the entire system from the ground up — including real-time leaderboard, mentor dashboard, admin control, and certificate generation pipeline.",
    skills: ["Next.js", "TypeScript", "Supabase", "System Design", "Full-Stack Development"],
    responsibility: "Website",
    achievements: ["Built IKIGAI 2026 platform from scratch", "Real-time evaluation system architect"]
  },
  {
    name: "Dewanshi Gaikwad",
    designation: "Event Coordinator",
    department: "CSIT",
    category: "Student Committee",
    photo: "/images/students/dewanshi.jpeg",
    email: null,
    linkedin: "https://www.linkedin.com/in/dewanshi-gaikwad-9819143a0",
    bio: "Dewanshi coordinates the operational logistics for IKIGAI 2026, ensuring smooth execution of all event phases from registration to grand finale.",
    skills: ["Designing", "Sponsorship", "Event Management", "Logistics"],
    responsibility: "Designing, Sponsorship",
    achievements: []
  },
  {
    name: "Aditya Tripathi",
    designation: "Sponsorship Lead",
    department: "CSIT",
    category: "Student Committee",
    photo: "/images/students/aditiya.jpeg",
    email: null,
    linkedin: "https://linkedin.com/in/aditya-tripathi1085",
    bio: "Aditya manages corporate and community sponsorships for IKIGAI 2026, building relationships with technology companies and partners.",
    skills: ["Sponsorship Acquisition", "Business Development"],
    responsibility: "Sponsorship",
    achievements: []
  },
  {
    name: "Harshvardhan",
    designation: "Sponsorship Team",
    department: "CSIT",
    category: "Student Committee",
    photo: "/images/students/harshvardhan.jpeg",
    email: null,
    linkedin: "https://www.linkedin.com/in/harsh-vardhan-singh-baghel-943375367",
    bio: "Harshvardhan helps in securing resources and building strategic relationships with industry partners for IKIGAI 2026.",
    skills: ["Sponsorship", "Communication"],
    responsibility: "Sponsorship",
    achievements: []
  },
  {
    name: "Ashu Garg",
    designation: "Sponsorship Team",
    department: "CSIT",
    category: "Student Committee",
    photo: "/images/students/ashu.jpeg",
    email: null,
    linkedin: "https://www.linkedin.com/in/ashu-garg2005",
    bio: "Ashu works on driving sponsorship initiatives and securing funding to elevate the hackathon experience for participants.",
    skills: ["Sponsorship", "Management"],
    responsibility: "Sponsorship",
    achievements: []
  },
  {
    name: "Kanak Goyal",
    designation: "Sponsorship Team",
    department: "CSIT",
    category: "Student Committee",
    photo: "/images/students/kanak.jpeg",
    email: null,
    linkedin: "https://www.linkedin.com/in/kanak-goyal-aitr",
    bio: "Kanak contributes to the sponsorship outreach, helping secure valuable partnerships with technology companies.",
    skills: ["Sponsorship", "Networking"],
    responsibility: "Sponsorship",
    achievements: []
  },
  {
    name: "Anuj Malviya",
    designation: "Sponsorship Team",
    department: "CSIT",
    category: "Student Committee",
    photo: "/images/students/anuj.jpeg",
    email: null,
    linkedin: "https://www.linkedin.com/in/anuj-malviya-b37a59316",
    bio: "Anuj is responsible for contacting potential sponsors and maintaining relationships to support the event logistics.",
    skills: ["Sponsorship", "Communication"],
    responsibility: "Sponsorship",
    achievements: []
  },
  {
    name: "Khushal Mishra",
    designation: "Sponsorship Team",
    department: "CSIT",
    category: "Student Committee",
    photo: "/images/students/khushal.jpeg",
    email: null,
    linkedin: "https://www.linkedin.com/in/khushal-mishra-414351341",
    bio: "Khushal assists in acquiring resources and negotiating with sponsors to ensure a high-quality event experience.",
    skills: ["Sponsorship", "Negotiation"],
    responsibility: "Sponsorship",
    achievements: []
  },
  {
    name: "Jiya Pagare",
    designation: "Sponsorship Team",
    department: "CSIT",
    category: "Student Committee",
    photo: "/images/students/jiya.jpeg",
    email: null,
    linkedin: "https://www.linkedin.com/in/jiya-p-184b50278",
    bio: "Jiya actively works with the sponsorship team to secure resources and build partnerships for IKIGAI 2026.",
    skills: ["Sponsorship", "Networking"],
    responsibility: "Sponsorship",
    achievements: []
  },
  {
    name: "Aanchal Gupta",
    designation: "Creative Lead",
    department: "CSIT",
    category: "Student Committee",
    photo: "/images/students/aanchal.jpeg",
    email: null,
    linkedin: "https://www.linkedin.com/in/aanchal-gupta-b8b510377",
    bio: "Aanchal leads designing, promotion, and content strategies, ensuring consistent branding and widespread outreach.",
    skills: ["Designing", "Promotion", "Content Strategy"],
    responsibility: "Designing, Promotion, Content",
    achievements: []
  },
  {
    name: "Disha Bhawsar",
    designation: "Promotion Team",
    department: "CSIT",
    category: "Student Committee",
    photo: "/images/students/disha.jpg.jpeg",
    email: null,
    linkedin: "https://www.linkedin.com/in/disha-bhawsar",
    bio: "Disha drives the promotional campaigns, spreading awareness about the competition and driving student registrations.",
    skills: ["Promotion", "Social Media"],
    responsibility: "Promotion",
    achievements: []
  },
  {
    name: "Mitali Rajput",
    designation: "Design Team",
    department: "CSIT",
    category: "Student Committee",
    photo: "/images/students/mitali.jpeg",
    email: null,
    linkedin: "https://www.linkedin.com/in/mitali-rajput-8abba6352",
    bio: "Mitali works on producing creative digital assets and cohesive visual designs that reflect the core themes of IKIGAI.",
    skills: ["Designing", "Creativity"],
    responsibility: "Designing",
    achievements: []
  },
  {
    name: "Shaifali Kartik Chavan",
    designation: "Promotion Team",
    department: "CSIT",
    category: "Student Committee",
    photo: "/images/students/shaifali.jpeg",
    email: null,
    linkedin: "https://www.linkedin.com/in/shaifali-kartik-chavan-86b8b9253",
    bio: "Shaifali manages social media channels and orchestrates promotional campaigns to increase participant engagement.",
    skills: ["Promotion", "Digital Marketing"],
    responsibility: "Promotion",
    achievements: []
  },
  {
    name: "Bhagyesh Jain",
    designation: "Web & Design",
    department: "CSIT",
    category: "Student Committee",
    photo: "/images/students/bhagyesh.jpeg",
    email: null,
    linkedin: "https://www.linkedin.com/in/bhagyesh-jain-a1a86a3a2/",
    bio: "Bhagyesh bridges the gap between design and web development, implementing striking interfaces and managing digital outreach.",
    skills: ["Designing", "Website Management"],
    responsibility: "Designing, Website",
    achievements: []
  },
  {
    name: "Jayshree Chouhan",
    designation: "Promotion Team",
    department: "CSIT",
    category: "Student Committee",
    photo: "/images/students/jayshree.PNG",
    email: null,
    linkedin: "https://www.linkedin.com/in/jayshree-chouhan-b1864b37b",
    bio: "Jayshree executes outreach strategies and ensures active communication with the student communities regarding the event.",
    skills: ["Promotion", "Outreach"],
    responsibility: "Promotion",
    achievements: []
  },
  {
    name: "Mihika Tiwari",
    designation: "Promotion Team",
    department: "CSIT",
    category: "Student Committee",
    photo: "/images/students/mihika.jpeg",
    email: null,
    linkedin: "www.linkedin.com/in/mihika-tiwari-9935b532a",
    bio: "Mihika leverages her networking skills to promote IKIGAI 2026 across various college platforms and tech communities.",
    skills: ["Promotion", "Networking"],
    responsibility: "Promotion",
    achievements: []
  },
  {
    name: "Tushar Kadam",
    designation: "Video Editing Team",
    department: "CSIT",
    category: "Student Committee",
    photo: "/images/students/tushar.jpeg",
    email: null,
    linkedin: "https://www.linkedin.com/in/tushar-kadam-a876a3359",
    bio: "Tushar edits compelling promotional videos and creates dynamic media content to visually narrate the IKIGAI story.",
    skills: ["Video Editing", "Motion Graphics"],
    responsibility: "Video Editing",
    achievements: []
  },
  {
    name: "Tanishq Mangal",
    designation: "Design Team",
    department: "CSIT",
    category: "Student Committee",
    photo: "/images/students/tanishq.png",
    email: null,
    linkedin: "https://www.linkedin.com/in/tanishq-mangal-643734304",
    bio: "Tanishq designs captivating graphics and user interfaces, elevating the aesthetic standard of the hackathon.",
    skills: ["Designing", "Graphic Arts"],
    responsibility: "Designing",
    achievements: []
  },
  {
    name: "Yash Raj Pandit",
    designation: "Video Editor",
    department: "CSIT",
    category: "Student Committee",
    photo: null,
    email: null,
    linkedin: null,
    bio: "Yash produces high-quality video content to highlight key moments and generate excitement for the competition.",
    skills: ["Video Editing", "Production"],
    responsibility: "Video Editing",
    achievements: []
  },
  {
    name: "Nainsi Patidar",
    designation: "Promotion Team",
    department: "CSIT",
    category: "Student Committee",
    photo: "/images/students/Nainsi_photo.png",
    email: null,
    linkedin: "https://www.linkedin.com/in/nainsi-patidar-388834307/",
    bio: "Nancy actively campaigns for the event, ensuring that the mission of IKIGAI 2026 reaches a wide audience.",
    skills: ["Promotion", "Campaigning"],
    responsibility: "Promotion",
    achievements: []
  }
];
