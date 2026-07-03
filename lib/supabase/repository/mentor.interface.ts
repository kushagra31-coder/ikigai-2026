import { AssignedTeam, EvaluationHistoryRecord, MentorDashboardStats, MentorTask, TeamDetails } from '../../../features/mentor/types';
import { Result } from '../../../types/result';

export interface IMentorWorkspaceRepository {
  getDashboardStats(): Promise<Result<MentorDashboardStats>>;
  getAssignedTeams(): Promise<Result<AssignedTeam[]>>;
  getTeamDetails(teamId: string): Promise<Result<TeamDetails>>;
  getTasks(): Promise<Result<MentorTask[]>>;
  createTask(task: Omit<MentorTask, 'id' | 'createdAt'>): Promise<Result<MentorTask>>;
  updateTaskStatus(taskId: string, status: MentorTask['status']): Promise<Result<void>>;
  getEvaluationHistory(): Promise<Result<EvaluationHistoryRecord[]>>;
}
