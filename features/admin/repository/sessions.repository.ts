import { SupabaseClient } from '@supabase/supabase-js';
import { AdminSession, SessionState } from '../types';
import { ISessionRepository } from '../../../lib/supabase/repository/interfaces';
import { BaseRepository } from '../../../lib/supabase/repository/BaseRepository';
import { Result } from '../../../types/result';
import { Database } from '../../../types/database.types';

export class SupabaseSessionsRepository extends BaseRepository<AdminSession, 'judging_sessions'> implements ISessionRepository {
  constructor(client: SupabaseClient<Database>) {
    super(client, 'judging_sessions');
  }

  protected mapRowToModel(row: Database['public']['Tables']['judging_sessions']['Row']): AdminSession {
    return {
      id: row.id,
      name: 'Session ' + row.id.substring(0, 4), // Not in DB
      trackId: row.track_id,
      mentorId: 'unassigned', // Not in DB directly on session
      startTime: row.start_time,
      endTime: row.end_time,
      status: (row.status as SessionState) || SessionState.SCHEDULED,
      maximumTeams: 10, // Not in DB
      completedEvaluations: 0, // Should be computed
      pendingEvaluations: 0, // Should be computed
    };
  }

  async getSessions(): Promise<Result<AdminSession[]>> {
    const query = this.supabase.from(this.tableName).select('*') as unknown as PromiseLike<{ data: Database['public']['Tables']['judging_sessions']['Row'][] | null; error: unknown }>;
    const result = await this.executeQuery<Database['public']['Tables']['judging_sessions']['Row'][]>(query, 'sessions.getSessions');
    
    if (!result.success) return result;

    return { success: true, data: result.data.map(row => this.mapRowToModel(row)) };
  }
}
