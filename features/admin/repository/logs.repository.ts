import { SupabaseClient } from '@supabase/supabase-js';
import { AuditLog } from '../types';
import { ILogRepository } from '../../../lib/supabase/repository/interfaces';
import { BaseRepository } from '../../../lib/supabase/repository/BaseRepository';
import { Result } from '../../../types/result';
import { Database } from '../../../types/database.types';

export class SupabaseLogsRepository extends BaseRepository<AuditLog, 'activity_logs'> implements ILogRepository {
  constructor(client: SupabaseClient<Database>) {
    super(client, 'activity_logs');
  }

  protected mapRowToModel(row: Database['public']['Tables']['activity_logs']['Row']): AuditLog {
    const meta = (row.metadata as Record<string, unknown>) || {};
    return {
      id: row.id,
      user: row.profile_id || 'System',
      role: (meta.role as string) || 'VISITOR',
      action: row.action,
      module: row.entity_type,
      target: row.entity_id || (meta.target as string) || '',
      result: (meta.result as 'SUCCESS' | 'FAILURE' | 'WARNING') || 'SUCCESS',
      severity: (meta.severity as 'INFO' | 'WARN' | 'ERROR') || 'INFO',
      timestamp: row.created_at,
    };
  }

  async getLogs(): Promise<Result<AuditLog[]>> {
    const query = this.supabase.from(this.tableName).select('*').order('created_at', { ascending: false }) as unknown as PromiseLike<{ data: Database['public']['Tables']['activity_logs']['Row'][] | null; error: unknown }>;
    const result = await this.executeQuery<Database['public']['Tables']['activity_logs']['Row'][]>(query, 'logs.getLogs');
    
    if (!result.success) return result;

    return { success: true, data: result.data.map(row => this.mapRowToModel(row)) };
  }

  async addLog(entry: Omit<AuditLog, 'id'>): Promise<Result<void>> {
    const payload = {
      profile_id: entry.user === 'System' ? null : entry.user,
      action: entry.action,
      entity_type: entry.module,
      entity_id: null,
      metadata: {
        role: entry.role,
        target: entry.target,
        result: entry.result,
        severity: entry.severity,
      },
    };
    const query = this.supabase.from(this.tableName).insert(payload as never) as unknown as PromiseLike<{ data: void | null; error: unknown }>;
    return this.executeQuery<void>(query, 'logs.addLog');
  }
}
