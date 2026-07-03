import { SupabaseClient } from '@supabase/supabase-js';
import { Track } from '../types';
import { ITrackRepository } from '../../../lib/supabase/repository/interfaces';
import { BaseRepository } from '../../../lib/supabase/repository/BaseRepository';
import { Result } from '../../../types/result';
import { Database } from '../../../types/database.types';

export class SupabaseTracksRepository extends BaseRepository<Track, 'tracks'> implements ITrackRepository {
  constructor(client: SupabaseClient<Database>) {
    super(client, 'tracks');
  }

  protected mapRowToModel(row: Database['public']['Tables']['tracks']['Row']): Track {
    return {
      id: row.id,
      name: row.name,
      description: row.description || '',
      icon: row.icon || 'Star',
      status: (row.status as 'ACTIVE' | 'DRAFT' | 'ARCHIVED') || 'ACTIVE',
      teamCount: 0, // Should be computed
      mentorCount: 0, // Should be computed
      sessionCount: 0, // Should be computed
      visibility: (row.visibility as 'PUBLIC' | 'PRIVATE') || 'PUBLIC',
    };
  }

  async getTracks(): Promise<Result<Track[]>> {
    const query = this.supabase.from(this.tableName).select('*') as unknown as PromiseLike<{ data: Database['public']['Tables']['tracks']['Row'][] | null; error: unknown }>;
    const result = await this.executeQuery<Database['public']['Tables']['tracks']['Row'][]>(query, 'tracks.getTracks');
    
    if (!result.success) return result;

    return { success: true, data: result.data.map(row => this.mapRowToModel(row)) };
  }
}
