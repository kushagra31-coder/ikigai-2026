import { SupabaseClient } from '@supabase/supabase-js';
import { ScanLog, Checkpoint, ScanResultStatus } from '../types';
import { IScanRepository } from '../../../lib/supabase/repository/interfaces';
import { BaseRepository } from '../../../lib/supabase/repository/BaseRepository';
import { Result } from '../../../types/result';
import { Database } from '../../../types/database.types';
import { createClient } from '../../../lib/supabase/client';

export class SupabaseScanRepository extends BaseRepository<ScanLog, 'scan_logs'> implements IScanRepository {
  constructor(client: SupabaseClient<Database>) {
    super(client, 'scan_logs');
  }

  protected mapRowToModel(row: Database['public']['Tables']['scan_logs']['Row']): ScanLog {
    return {
      id: row.id,
      passId: row.pass_id,
      teamId: row.team_id,
      checkpoint: row.checkpoint as Checkpoint,
      volunteerId: 'unassigned', // Not in DB
      result: row.result as ScanResultStatus,
      timestamp: row.scanned_at,
      deviceId: 'unassigned', // Not in DB
    };
  }

  async recordScan(log: ScanLog): Promise<Result<ScanLog>> {
    const payload = {
      pass_id: log.passId,
      team_id: log.teamId,
      checkpoint: log.checkpoint,
      result: log.result,
      scanned_at: log.timestamp,
    };
    const query = this.supabase.from(this.tableName).insert(payload as never).select().single() as unknown as PromiseLike<{ data: Database['public']['Tables']['scan_logs']['Row'] | null; error: unknown }>;
    const result = await this.executeQuery<Database['public']['Tables']['scan_logs']['Row']>(query, 'scanLogs.recordScan');
    
    if (!result.success) return result;
    return { success: true, data: this.mapRowToModel(result.data) };
  }

  async hasScanned(teamId: string, checkpoint: string): Promise<Result<boolean>> {
    const query = this.supabase
      .from(this.tableName)
      .select('id', { count: 'exact', head: true })
      .eq('team_id', teamId)
      .eq('checkpoint', checkpoint)
      .eq('result', ScanResultStatus.VALID) as unknown as PromiseLike<{ data: { id: string }[]; error: unknown; count: number | null }>;
      
    const result = await this.executeQuery<unknown>(query as PromiseLike<{ data: unknown | null; error: unknown }>, 'scanLogs.hasScanned');
    if (!result.success) return result;
    
    const { count, error } = await query;
    if (error) {
      return { success: false, error: this.handleError(error, 'scanLogs.hasScanned') };
    }
    return { success: true, data: (count || 0) > 0 };
  }

  async getLogs(filter?: { checkpoint?: Checkpoint; teamId?: string }): Promise<Result<ScanLog[]>> {
    let query = this.supabase.from(this.tableName).select('*').order('scanned_at', { ascending: false });
    
    if (filter?.checkpoint) {
      query = query.eq('checkpoint', filter.checkpoint);
    }
    if (filter?.teamId) {
      query = query.eq('team_id', filter.teamId);
    }

    const castQuery = query as unknown as PromiseLike<{ data: Database['public']['Tables']['scan_logs']['Row'][] | null; error: unknown }>;
    const result = await this.executeQuery<Database['public']['Tables']['scan_logs']['Row'][]>(castQuery, 'scanLogs.getLogs');
    if (!result.success) return result;

    return { success: true, data: result.data.map(row => this.mapRowToModel(row)) };
  }
}

export const scanLogRepository = new SupabaseScanRepository(createClient());
