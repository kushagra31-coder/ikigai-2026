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

  protected mapRowToModel(row: any): AdminMentor {
    const trackData = Array.isArray(row.tracks) ? row.tracks[0] : row.tracks;
    
    return {
      id: row.id,
      name: row.full_name,
      email: row.email,
      department: 'General', // Not in DB
      availability: 'ONLINE', // Not in DB
      trackId: row.assigned_track_id || undefined,
      trackName: trackData?.name || undefined,
      assignedTeams: 0, // Should be computed
      assignedSessions: 0, // Should be computed
      currentLoad: 0, // Should be computed
      maximumCapacity: 5, // Not in DB
      evaluationProgress: 0, // Should be computed
    };
  }

  async getMentors(): Promise<Result<AdminMentor[]>> {
    const query = this.supabase.from(this.tableName).select('*, tracks(name)').eq('role', 'MENTOR') as any;
    const result = await this.executeQuery<any[]>(query, 'mentors.getMentors');
    
    if (!result.success) return result;

    return { success: true, data: result.data.map(row => this.mapRowToModel(row)) };
  }

  async assignTrack(mentorId: string, trackId: string): Promise<Result<void>> {
    const query = this.supabase
      .from('profiles')
      .update({ assigned_track_id: trackId } as any)
      .eq('id', mentorId) as any;
    return this.executeQuery<void>(query, 'mentors.assignTrack');
  }
}
