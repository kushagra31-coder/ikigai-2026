import { SupabaseClient } from '@supabase/supabase-js';
import { AdminSettings } from '../../../lib/supabase/repository/interfaces';
import { ISettingsRepository } from '../../../lib/supabase/repository/interfaces';
import { BaseRepository } from '../../../lib/supabase/repository/BaseRepository';
import { Result } from '../../../types/result';
import { Database } from '../../../types/database.types';

export class SupabaseSettingsRepository extends BaseRepository<AdminSettings, 'settings'> implements ISettingsRepository {
  constructor(client: SupabaseClient<Database>) {
    super(client, 'settings'); // Fixed table name
  }

  protected mapRowToModel(row: Database['public']['Tables']['settings']['Row']): AdminSettings {
    return row.value as unknown as AdminSettings;
  }

  async getSettings(): Promise<Result<AdminSettings>> {
    const query = this.supabase.from(this.tableName).select('*').limit(1).single() as unknown as PromiseLike<{ data: Database['public']['Tables']['settings']['Row'] | null; error: unknown }>;
    const result = await this.executeQuery<Database['public']['Tables']['settings']['Row']>(query, 'settings.getSettings');
    
    if (!result.success) return result;

    return { success: true, data: this.mapRowToModel(result.data) };
  }
}
