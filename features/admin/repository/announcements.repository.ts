import { SupabaseClient } from '@supabase/supabase-js';
import { Announcement } from '../types';
import { IAnnouncementRepository } from '../../../lib/supabase/repository/interfaces';
import { BaseRepository } from '../../../lib/supabase/repository/BaseRepository';
import { Result } from '../../../types/result';
import { Database } from '../../../types/database.types';

export class SupabaseAnnouncementsRepository extends BaseRepository<Announcement, 'announcements'> implements IAnnouncementRepository {
  constructor(client: SupabaseClient<Database>) {
    super(client, 'announcements');
  }

  protected mapRowToModel(row: Database['public']['Tables']['announcements']['Row']): Announcement {
    return {
      id: row.id,
      title: row.title,
      content: row.content,
      priority: (row.priority as 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL') || 'NORMAL',
      createdAt: row.created_at,
      status: row.is_published ? 'PUBLISHED' : 'DRAFT',
      pinned: row.pinned || false,
      audience: (row.audience as 'ALL' | 'TEAMS' | 'MENTORS') || 'ALL',
      publishAt: row.published_at || undefined
    };
  }

  async getAnnouncements(): Promise<Result<Announcement[]>> {
    const query = this.supabase.from(this.tableName).select('*').order('created_at', { ascending: false }) as unknown as PromiseLike<{ data: Database['public']['Tables']['announcements']['Row'][] | null; error: unknown }>;
    const result = await this.executeQuery<Database['public']['Tables']['announcements']['Row'][]>(query, 'announcements.getAnnouncements');
    
    if (!result.success) return result;

    return { success: true, data: result.data.map(row => this.mapRowToModel(row)) };
  }
}
