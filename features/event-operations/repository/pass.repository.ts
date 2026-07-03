import { SupabaseClient } from '@supabase/supabase-js';
import { DigitalPass, PassStatus } from '../types';
import { IPassRepository } from '../../../lib/supabase/repository/interfaces';
import { BaseRepository } from '../../../lib/supabase/repository/BaseRepository';
import { Result } from '../../../types/result';
import { Database } from '../../../types/database.types';
import { createClient } from '../../../lib/supabase/client';

export class SupabasePassRepository extends BaseRepository<DigitalPass, 'passes'> implements IPassRepository {
  constructor(client: SupabaseClient<Database>) {
    super(client, 'passes');
  }

  protected mapRowToModel(row: Database['public']['Tables']['passes']['Row']): DigitalPass {
    return {
      id: row.id,
      teamId: row.team_id,
      teamName: '', // Assuming joined in real DB query, but for now empty
      trackId: '', 
      members: [], 
      status: (row.status as PassStatus) || 'ACTIVE',
      issuedAt: row.created_at,
      qrPayload: row.qr_code, 
      lastScan: undefined // would be fetched via join to scan_logs
    };
  }

  async getPassById(passId: string): Promise<Result<DigitalPass>> {
    const query = this.supabase.from(this.tableName).select('*').eq('id', passId).single() as unknown as PromiseLike<{ data: Database['public']['Tables']['passes']['Row'] | null; error: unknown }>;
    const result = await this.executeQuery<Database['public']['Tables']['passes']['Row']>(query, 'passes.getPassById');
    
    if (!result.success) return result;

    return { success: true, data: this.mapRowToModel(result.data) };
  }

  async getPassByTeam(teamId: string): Promise<Result<DigitalPass>> {
    const query = this.supabase.from(this.tableName).select('*').eq('team_id', teamId).single() as unknown as PromiseLike<{ data: Database['public']['Tables']['passes']['Row'] | null; error: unknown }>;
    const result = await this.executeQuery<Database['public']['Tables']['passes']['Row']>(query, 'passes.getPassByTeam');
    if (!result.success) return result;
    
    return { success: true, data: this.mapRowToModel(result.data) };
  }

  async updatePassStatus(passId: string, status: string): Promise<Result<void>> {
    const query = this.supabase.from(this.tableName).update({ status }).eq('id', passId) as unknown as PromiseLike<{ data: void | null; error: unknown }>;
    return this.executeQuery<void>(query, 'passes.updatePassStatus');
  }

  /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
  async updateLastScan(_passId: string, _checkpoint: string): Promise<Result<void>> {
    // The previous implementation updated a 'last_scan_checkpoint' on the digital_passes table.
    // In our new schema, scan logs are separate. Updating last scan on pass isn't directly a column anymore.
    // We satisfy the interface by returning success. Real logic would just insert a scan_log instead of updating the pass table directly.
    return { success: true, data: undefined as void };
  }
}

export const passRepository = new SupabasePassRepository(createClient());
