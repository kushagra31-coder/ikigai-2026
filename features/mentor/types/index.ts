import { EvaluationStatus } from '@/features/evaluation/types';

export type TaskPriority = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
export type TaskStatus = 'PENDING' | 'ACCEPTED' | 'IN_PROGRESS' | 'SUBMITTED' | 'APPROVED' | 'REJECTED' | 'OVERDUE';
export type SubmissionStatus = 'NOT_STARTED' | 'DRAFT' | 'SUBMITTED';

export interface MentorTask {
  id: string;
  teamId: string;
  teamName: string;
  title: string;
  description: string;
  priority: TaskPriority;
  status: TaskStatus;
  deadline: string; // ISO date string
  sessionId: string;
  createdAt: string;
}

export interface AssignedTeam {
  id: string;
  name: string;
  track: string;
  leaderName: string;
  membersCount: number;
  submissionStatus: SubmissionStatus;
  evaluationStatus: EvaluationStatus;
  currentScore: number | null; // out of 10
  pendingTasks: number;
}

export interface TeamDetails extends AssignedTeam {
  githubUrl?: string;
  presentationUrl?: string;
  videoUrl?: string;
  hasZipUpload?: boolean;
}

export interface MentorDashboardStats {
  mentorName: string;
  department: string;
  currentSession: {
    id: string;
    name: string;
    startTime: string;
    endTime: string;
    status: 'ACTIVE' | 'UPCOMING' | 'COMPLETED';
  };
  assignedTeamsCount: number;
  completedEvaluations: number;
  pendingEvaluations: number;
  averageScoreGiven: number; // raw total average, or percentage (we'll use 10-point scale)
}

export interface EvaluationHistoryRecord {
  id: string;
  sessionId: string;
  sessionName: string;
  teamId: string;
  teamName: string;
  date: string;
  score: number; // 10-point scale
  status: EvaluationStatus;
  remarks: string;
  revision: number;
}
