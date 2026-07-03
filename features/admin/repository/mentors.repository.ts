import { SupabaseClient } from '@supabase/supabase-js';
import { AdminMentor } from '../types';
import { IMentorRepository } from '../../../lib/supabase/repository/interfaces';
import { BaseRepository } from '../../../lib/supabase/repository/BaseRepository';
import { Result } from '../../../types/result';
import { Database } from '../../../types/database.types';

export class SupabaseMentorsRepository extends BaseRepository<AdminMentor, 'profiles'> implements IMentorRepository {
  constructor(client: SupabaseClient<Database>) {
    super(client, 'profiles');
  }

  protected mapRowToModel(row: Database['public']['Tables']['profiles']['Row']): AdminMentor {
    return {
      id: row.id,
      name: row.full_name,
      department: 'General', // Not in DB
      availability: 'ONLINE', // Not in DB
      assignedTeams: 0, // Should be computed
      assignedSessions: 0, // Should be computed
      currentLoad: 0, // Should be computed
      maximumCapacity: 5, // Not in DB
      evaluationProgress: 0, // Should be computed
    };
  }

  async getMentors(): Promise<Result<AdminMentor[]>> {
    const query = this.supabase.from(this.tableName).select('*').eq('role', 'MENTOR') as unknown as PromiseLike<{ data: Database['public']['Tables']['profiles']['Row'][] | null; error: unknown }>;
    const result = await this.executeQuery<Database['public']['Tables']['profiles']['Row'][]>(query, 'mentors.getMentors');
    
    if (!result.success) return result;

    return { success: true, data: result.data.map(row => this.mapRowToModel(row)) };
  }
}
