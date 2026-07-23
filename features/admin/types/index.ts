export enum EventState {
  PLANNING = 'PLANNING',
  REGISTRATION_OPEN = 'REGISTRATION_OPEN',
  REGISTRATION_CLOSED = 'REGISTRATION_CLOSED',
  MENTORING = 'MENTORING',
  SUBMISSION_OPEN = 'SUBMISSION_OPEN',
  SUBMISSION_CLOSED = 'SUBMISSION_CLOSED',
  EVALUATION = 'EVALUATION',
  LEADERBOARD_PREVIEW = 'LEADERBOARD_PREVIEW',
  RESULTS_PUBLISHED = 'RESULTS_PUBLISHED',
  EVENT_COMPLETED = 'EVENT_COMPLETED',
  MAINTENANCE = 'MAINTENANCE'
}

export enum SessionState {
  CREATED = 'CREATED',
  SCHEDULED = 'SCHEDULED',
  ACTIVE = 'ACTIVE',
  PAUSED = 'PAUSED',
  LOCKED = 'LOCKED',
  COMPLETED = 'COMPLETED',
  PUBLISHED = 'PUBLISHED',
  ARCHIVED = 'ARCHIVED'
}

export interface Track {
  id: string;
  name: string;
  description: string;
  icon: string;
  status: 'ACTIVE' | 'DRAFT' | 'ARCHIVED';
  teamCount: number;
  mentorCount: number;
  sessionCount: number;
  visibility: 'PUBLIC' | 'PRIVATE';
}

export interface AdminMentor {
  id: string;
  name: string;
  email: string;
  department: string;
  availability: 'ONLINE' | 'BUSY' | 'OFFLINE';
  trackId?: string;
  trackName?: string;
  assignedTeams: number;
  assignedSessions: number;
  currentLoad: number; // percentage
  maximumCapacity: number; // max teams
  evaluationProgress: number; // percentage
}

export interface AdminSession {
  id: string;
  name: string;
  trackId: string;
  mentorId: string;
  startTime: string;
  endTime: string;
  status: SessionState;
  maximumTeams: number;
  completedEvaluations: number;
  pendingEvaluations: number;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  status: 'DRAFT' | 'PREVIEW' | 'SCHEDULED' | 'PUBLISHED' | 'EXPIRED' | 'ARCHIVED';
  pinned: boolean;
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  audience: 'ALL' | 'TEAMS' | 'MENTORS';
  createdAt: string;
  publishAt?: string;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  user: string;
  role: string;
  action: string;
  module: string;
  target: string;
  result: 'SUCCESS' | 'FAILURE' | 'WARNING';
  severity: 'INFO' | 'WARN' | 'ERROR';
}

export interface AdminTeam {
  id: string;
  name: string;
  trackId?: string;
  mentorId?: string;
  membersCount: number;
  submissionStatus: 'NOT_STARTED' | 'DRAFT' | 'SUBMITTED';
  isLocked: boolean;
}
