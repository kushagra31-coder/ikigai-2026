import { SupabaseClient } from '@supabase/supabase-js';
import { AssignedTeam, EvaluationHistoryRecord, MentorDashboardStats, MentorTask, TeamDetails } from '../types';
import { IMentorWorkspaceRepository } from '../../../lib/supabase/repository/mentor.interface';
import { BaseRepository } from '../../../lib/supabase/repository/BaseRepository';
import { Result } from '../../../types/result';
import { Database } from '../../../types/database.types';
import { createClient } from '../../../lib/supabase/client';

export class SupabaseMentorRepository extends BaseRepository<unknown, 'profiles'> implements IMentorWorkspaceRepository {
  constructor(client: SupabaseClient<Database>) {
    super(client, 'profiles');
  }

  protected mapRowToModel(row: Database['public']['Tables']['profiles']['Row']): unknown {
    return row;
  }

  async getDashboardStats(): Promise<Result<MentorDashboardStats>> {
    // In a real app, you would query multiple tables and aggregate here.
    const stats: MentorDashboardStats = {
      mentorName: 'Dr. Rahul Sharma',
      department: 'Cybersecurity Mentor',
      currentSession: { id: 'session-1', name: 'Prototype Evaluation', startTime: new Date().toISOString(), endTime: new Date().toISOString(), status: 'ACTIVE' },
      assignedTeamsCount: 4,
      completedEvaluations: 2,
      pendingEvaluations: 2,
      averageScoreGiven: 8.4,
    };
    return { success: true, data: stats };
  }

  async getAssignedTeams(): Promise<Result<AssignedTeam[]>> {
    return { success: true, data: [] };
  }

  /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
  async getTeamDetails(_teamId: string): Promise<Result<TeamDetails>> {
    const error = this.handleError(new Error('Not found'), 'getTeamDetails');
    return { success: false, error };
  }

  async getTasks(): Promise<Result<MentorTask[]>> {
    return { success: true, data: [] };
  }

  async createTask(task: Omit<MentorTask, 'id' | 'createdAt'>): Promise<Result<MentorTask>> {
    return { success: true, data: { ...task, id: 'new', createdAt: new Date().toISOString() } };
  }

  /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
  async updateTaskStatus(_taskId: string, _status: string): Promise<Result<void>> {
    return { success: true, data: undefined };
  }

  async getEvaluationHistory(): Promise<Result<EvaluationHistoryRecord[]>> {
    return { success: true, data: [] };
  }
}

export const mentorRepository = new SupabaseMentorRepository(createClient());
